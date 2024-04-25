
from .port.incoming.RichiestaPromptUseCase import RichiestaPromptUseCase

from .port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository
from .port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort
from .port.outcoming.SearchAlgorithm import SearchAlgorithm

from backend.chatsql.domain.Embedding import Embedding


class PromptService(RichiestaPromptUseCase):

    def __init__(self,
                 embeddingRepository: BaseEmbeddingRepository, 
                 embeddingGeneratorPort: EmbeddingGeneratorPort, 
                 searchAlgorithm: SearchAlgorithm) -> None:
        
        self._embeddingRepository = embeddingRepository
        self._embeddingGeneratorPort = embeddingGeneratorPort
        self._searchAlgorithm = searchAlgorithm


    def query(self, question: str) -> str:
        raise NotImplementedError()