from abc import ABC, abstractmethod


class RichiestaPromptUseCase(ABC):

    @abstractmethod
    def query(self, query: str) -> str:
        pass

    