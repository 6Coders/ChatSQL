from typing import List
from backend.chatsql.application.port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort
from backend.chatsql.application.port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository

from backend.chatsql.application.EmbeddingSaver import EmbeddingSaver
from backend.chatsql.domain.Embedding import Embedding

from backend.chatsql.utils.Common import Settings
import os

class EmbeddingManager(EmbeddingSaver): 
    
    def __init__(self, embeddingRepository: BaseEmbeddingRepository,
                 embeddingGeneratorPort: EmbeddingGeneratorPort) -> None:
        
        self._embeddingRepository = embeddingRepository
        self._embeddingGeneratorPort = embeddingGeneratorPort
    
    
    def save(self, filename: str) -> bool:
        try:

            with open(os.path.join(Settings.folder, filename), 'r') as file:
                content = file.readlines()

            embeddings = self._embeddingGeneratorPort.generate(content)
            self._embeddingRepository.save(filename, embeddings)
        except BaseException as e:
            return e
    
