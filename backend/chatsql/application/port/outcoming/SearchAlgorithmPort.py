from typing import List
from abc import ABC, abstractmethod

from backend.chatsql.domain.Embedding import Embedding

class SearchAlgorithmPort(ABC):

    @abstractmethod
    def search(self, query: Embedding, context: List[Embedding]) -> List[Embedding]:
        pass