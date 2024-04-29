from abc import ABC, abstractmethod


class LoadDizionarioUseCase(ABC):

    @abstractmethod
    def load(self, filename: str) -> bool:
        pass

    