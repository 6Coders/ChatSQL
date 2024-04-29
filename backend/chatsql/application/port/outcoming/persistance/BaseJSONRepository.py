from typing import List, IO
from abc import ABC, abstractmethod

class BaseJsonRepository(ABC):

    @abstractmethod
    def save(self, filename: str, stream: IO[bytes]) -> bool:
        pass

    @abstractmethod
    def remove(self, filename: str) -> bool:
        pass
    
    @abstractmethod
    def list_all(self) -> List[str]:
        pass
    
    @abstractmethod
    def load(self, filename: str):
        pass
    