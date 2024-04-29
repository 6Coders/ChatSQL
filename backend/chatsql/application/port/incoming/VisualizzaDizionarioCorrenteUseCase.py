from typing import IO
from abc import ABC, abstractmethod


class VisualizzaDizionarioCorrenteUseCase(ABC):

    @abstractmethod
    def selected(self) -> str:
        pass
    