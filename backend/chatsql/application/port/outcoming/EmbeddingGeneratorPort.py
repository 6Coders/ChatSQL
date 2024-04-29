from typing import List
from abc import ABC, abstractmethod

from chatsql.domain.Embedding import Embedding

class EmbeddingGeneratorPort(ABC):

    @abstractmethod
    def generate(self, texts: List[str]) -> List[Embedding]:
        pass

    