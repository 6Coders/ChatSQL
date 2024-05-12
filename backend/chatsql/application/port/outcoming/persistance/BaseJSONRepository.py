from typing import List
from abc import ABC, abstractmethod

class BaseJsonRepository(ABC):

    @abstractmethod
    def save(self, filename: str, stream: List[bytes]) -> bool:
        pass

    @abstractmethod
    def remove(self, filename: str) -> bool:
        pass
    
    @abstractmethod
    def list_all(self) -> List[dict]:
        pass
