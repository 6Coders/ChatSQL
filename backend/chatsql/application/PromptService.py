from typing import List

from .port.incoming.RichiestaPromptUseCase import RichiestaPromptUseCase
from .port.incoming.LoadDizionarioUseCase import LoadDizionarioUseCase

from .port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository
from .port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort
from .port.outcoming.SearchAlgorithmPort import SearchAlgorithmPort

from chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter import JSONRepositoryAdapter


from chatsql.utils import Exceptions
from chatsql.domain.Embedding import Embedding



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


    def query(self, question: str, filename: str) -> str:
        query_embs = self._embeddingGeneratorPort.generate([question],"null")[0]
        context = self._searchAlgorithm.search(
            query_embs,
            self._context
        )
        #context = ' '.join([e.text for e in context])

        file_content = JSONRepositoryAdapter.open(filename)
        tables = file_content['tables_info']
        presult = " "
        #result = list(set([e.table_name for e in context]))

        for table_name, similarity in context:
            table_info = tables[table_name]
            presult = presult +"Tabella: "+ table_name
            presult = presult +"\nDescrizione: "+ table_info['table_description']
            presult = presult +"\nColonne:"
            for column in table_info['columns']:
                presult = presult +"\nNome: "+ column['column_name']
                presult = presult +"\nDescrizione :"+ column['column_description']
                presult = presult +"\nTipo: "+ column['attribute_type']
                presult = presult +"\nIndice: "+ str(column['index'])
            primarykey = "\nChiavi primarie: ".join(file_content['primary_key'][table_name])
            presult = presult + primarykey
            presult = presult +"\nChiavi esterne: "
            for foreign_key in file_content['foreign_keys']:
                if foreign_key['table'] == table_name:
                    presult = presult +"\nNome: "+ foreign_key['foreign_key']
                    presult = presult +"\nAttributo: "+ foreign_key['attribute']
                    presult = presult +"\nTabella di riferimento: "+ foreign_key['reference_table']
                    presult = presult +"\nAttributo di riferimento: "+ foreign_key['reference_attribute']
            presult = presult +"\n\n"
            #print(presult)

        return f"""Act as a SQL engineer.\n Given the context below, generate a query for MariaDB to answer the following question: {question}. \n
            {presult}
        """
    
    def load(self, filename: str) -> List[Embedding]:
        if filename == None:
            raise Exceptions.NoFileSelected('Selezionare un dizionario dati prima di poter effettuare richieste')

        if self._loaded_file != filename:
            self._loaded_file = filename

            try:
                self._context = self._embeddingRepository.load(filename)
            except FileNotFoundError:   
                pass

        return self._context

