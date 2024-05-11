from typing import List
from abc import ABC, abstractmethod

from chatsql.domain.Embedding import Embedding

class LoadDizionarioUseCase(ABC):

    @abstractmethod
    def load(self, filename: str) -> List[Embedding]:
        pass

    