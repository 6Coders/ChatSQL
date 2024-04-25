from abc import ABC, abstractmethod


class InserimentoDizionarioUseCase(ABC):

    @abstractmethod
    def remove(self, filename: str) -> bool:
        pass

    