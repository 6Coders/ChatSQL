from abc import ABC, abstractmethod


class VisualizzaDizionarioCorrenteUseCase(ABC):

    @property
    @abstractmethod
    def selected(self) -> str:
        pass
    
    @selected.setter
    @abstractmethod
    def selected(self, filename) -> None:
        pass
    