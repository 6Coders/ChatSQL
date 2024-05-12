from typing import List
from abc import ABC, abstractmethod

from backend.chatsql.domain.Embedding import Embedding

class EmbeddingGeneratorPort(ABC):

    @abstractmethod
    def generate(self, texts: List[str], table_names: List[str]) -> List[Embedding]:
        pass

    