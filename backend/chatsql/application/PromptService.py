from typing import List

from .port.incoming.RichiestaPromptUseCase import RichiestaPromptUseCase
from .port.incoming.LoadDizionarioUseCase import LoadDizionarioUseCase

from .port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository
from .port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort
from .port.outcoming.SearchAlgorithmPort import SearchAlgorithmPort


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


    def query(self, question: str) -> str:
        context = self._searchAlgorithm.search(
            self._embeddingGeneratorPort.generate(question)[0],
            self._context
        )
        context = ' '.join([e.text for e in context])

        return f"""
            Act as a SQL engineer. \n
            Given the context below, generate a query for MariaDB to answer the following question: {question}. \n
            {context}
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

