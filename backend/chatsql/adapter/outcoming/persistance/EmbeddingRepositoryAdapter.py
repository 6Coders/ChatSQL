from typing import List

from chatsql.application.port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository

from chatsql.domain.Embedding import Embedding

class EmbeddingRepositoryAdapter(BaseEmbeddingRepository):

    def __init__(self, folder: str) -> None:
        self._folder = folder

    def save(self, filename: str, embeddings: List[Embedding]) -> bool:
        raise NotImplementedError()

    def load(self, filename: str) -> List[Embedding]:
        raise NotImplementedError()

    def remove(self, filename: str) -> bool:
        raise NotImplementedError()
        