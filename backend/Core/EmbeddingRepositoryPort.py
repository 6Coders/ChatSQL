from abc import ABC, abstractmethod
from .Embed import Embed

class EmbeddingRepositoryPort(ABC):

    @abstractmethod
    def save(self, embed: Embed) -> Embed:
        pass

    @abstractmethod
    def get(self, id: str) -> Embed:
        pass

    @abstractmethod
    def delete(self, id: str) -> None:
        pass

