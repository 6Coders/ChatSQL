from typing import List
from chatsql.application.port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort
from chatsql.application.port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository

from chatsql.application.EmbeddingSaver import EmbeddingSaver
from chatsql.domain.Embedding import Embedding

class EmbeddingManager(EmbeddingSaver): 
    
    def __init__(self, embeddingRepository: BaseEmbeddingRepository) -> None:
        
        self._embeddingRepository = embeddingRepository
    
    
    def save(self, filename: str, embeddings: List[Embedding]) -> bool:
        try:
            self._embeddingRepository.save(filename, embeddings)
        except BaseException as e:
            return e
    
