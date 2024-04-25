from typing import List
from abc import ABC, abstractmethod

from chatsql.domain.Embedding import Embedding

class SearchAlgorithm(ABC):

    @abstractmethod
    def search(self, query: Embedding, context: List[Embedding]) -> List[Embedding]:
        pass