from abc import ABC, abstractmethod


class EliminazioneDizionarioUseCase(ABC):

    @abstractmethod
    def remove(self, filename: str) -> bool:
        pass

    