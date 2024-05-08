from typing import List
from abc import ABC, abstractmethod
from chatsql.domain.Embedding import Embedding


class BaseEmbeddingRepository(ABC):

    @abstractmethod
    def save(self, filename: str, embeddings: List[Embedding]) -> bool:
        pass

    @abstractmethod
    def load(self, filename: str) -> List[Embedding]:
        pass

    @abstractmethod
    def remove(self, filename: str) -> bool:
        pass

