from typing import List
from chatsql.application.port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort
from chatsql.application.port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository

from chatsql.application.EmbeddingSaver import EmbeddingSaver
from chatsql.domain.Embedding import Embedding

from chatsql.utils.Common import Settings
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
            print(embeddings)
            self._embeddingRepository.save(filename, embeddings)
        except BaseException as e:
            return e
    
