import json
from os.path import join
from typing import List

from werkzeug.utils import secure_filename

from .JSONManagerService import JSONManagerService
from .port.incoming.RichiestaPromptUseCase import RichiestaPromptUseCase
from .port.incoming.LoadDizionarioUseCase import LoadDizionarioUseCase

from .port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository
from .port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort
from .port.outcoming.SearchAlgorithmPort import SearchAlgorithmPort

from backend.chatsql.utils import Exceptions
from backend.chatsql.domain.Embedding import Embedding

from ..adapter.outcoming.persistance.JSONRepositoryAdapter import JSONRepositoryAdapter
from ..utils.Common import Settings


class PromptService(RichiestaPromptUseCase,
                    LoadDizionarioUseCase):

    def __init__(self,
                 embeddingRepository: BaseEmbeddingRepository, 
                 embeddingGeneratorPort: EmbeddingGeneratorPort, 
                 searchAlgorithm: SearchAlgorithmPort,
                 ) -> None:
        
        self._embeddingRepository = embeddingRepository
        self._embeddingGeneratorPort = embeddingGeneratorPort

        self._searchAlgorithm = searchAlgorithm
        
        self._loaded_file = None
        self._context = None
        self._file_content =  None

    def query(self, question: str) -> str:
        query_embs = self._embeddingGeneratorPort.generate([question],"null")[0]
        result = self._searchAlgorithm.search(
            query_embs,
            self._context
        )

        tables = self._file_content['tables_info']
        presult = " "

        for table_name, similarity in result:
            table_info = tables[table_name]
            presult = presult +"Tabella: "+ table_name
            presult = presult +"\nDescrizione: "+ table_info['table_description']
            presult = presult +"\nColonne:"
            for column in table_info['columns']:
                presult = presult +"\nNome: "+ column['column_name']
                presult = presult +"\nDescrizione :"+ column['column_description']
                presult = presult +"\nTipo: "+ column['attribute_type']
                presult = presult +"\nIndice: "+ str(column['index'])
            primarykey = "\nChiavi primarie: ".join(self._file_content['primary_key'][table_name])
            presult = presult + primarykey
            presult = presult +"\nChiavi esterne: "
            for foreign_key in self._file_content['foreign_keys']:
                if foreign_key['table'] == table_name:
                    presult = presult +"\nNome: "+ foreign_key['foreign_key']
                    presult = presult +"\nAttributo: "+ foreign_key['attribute']
                    presult = presult +"\nTabella di riferimento: "+ foreign_key['reference_table']
                    presult = presult +"\nAttributo di riferimento: "+ foreign_key['reference_attribute']
            presult = presult +"\n\n"

        return f"""Act as a SQL engineer.\n Given the context below, generate a query for MariaDB to answer the following question: {question}. \n
            {presult}
        """
    
    def load(self, filename: str) -> List[Embedding]:
        if filename == None:
            raise Exceptions.NoFileSelected('Selezionare un dizionario dati prima di poter effettuare richieste')

        if self._loaded_file != filename:
            self._loaded_file = filename

            try:
                self._file_content = JSONManagerService.read(filename + '.json')

                self._context = self._embeddingRepository.load(filename)
            except Exception as e:
                return e

        return self._context

