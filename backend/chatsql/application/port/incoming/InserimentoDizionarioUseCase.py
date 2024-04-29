from typing import List
from abc import ABC, abstractmethod


class InserimentoDizionarioUseCase(ABC):

    @abstractmethod
    def add(self, filename: str, stream: List[bytes]) -> bool:
        pass

    