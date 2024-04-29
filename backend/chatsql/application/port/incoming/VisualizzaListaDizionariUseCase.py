from typing import List
from abc import ABC, abstractmethod


class VisualizzaListaDizionariUseCase(ABC):

    @abstractmethod
    def list_all(self) -> List[str]:
        pass

    