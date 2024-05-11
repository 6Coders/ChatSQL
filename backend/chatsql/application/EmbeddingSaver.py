from typing import List
from abc import ABC, abstractmethod

from backend.chatsql.domain.Embedding import Embedding

class EmbeddingSaver(ABC):

    @abstractmethod
    def save(self, filename: str, embeddings: List[Embedding]) -> bool:
        pass