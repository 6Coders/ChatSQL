from abc import ABC, abstractmethod


class RichiestaPromptUseCase(ABC):

    @abstractmethod
    def query(self, question: str) -> str:
        pass

    