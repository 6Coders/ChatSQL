from typing import IO
from abc import ABC, abstractmethod


class InserimentoDizionarioUseCase(ABC):

    @abstractmethod
    def add(self, filename: str, stream: IO[bytes]) -> bool:
        pass

    