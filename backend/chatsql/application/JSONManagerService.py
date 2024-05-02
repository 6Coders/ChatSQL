from typing import List, IO

from .port.incoming.InserimentoDizionarioUseCase import InserimentoDizionarioUseCase
from .port.incoming.EliminazioneDizionarioUseCase import EliminazioneDizionarioUseCase
from .port.incoming.VisualizzaListaDizionariUseCase import VisualizzaListaDizionariUseCase
from .port.incoming.VisualizzaDizionarioCorrenteUseCase import VisualizzaDizionarioCorrenteUseCase
from .port.incoming.LoadDizionarioUseCase import LoadDizionarioUseCase

from .port.outcoming.persistance.BaseJSONRepository import BaseJsonRepository


class JSONManagerService(
    InserimentoDizionarioUseCase,
    EliminazioneDizionarioUseCase,
    VisualizzaListaDizionariUseCase,
    VisualizzaDizionarioCorrenteUseCase
):
    
    def __init__(self, jsonRepository: BaseJsonRepository) -> None:
        
        self._repository = jsonRepository
        self._selectedFile = None

    def add(self, filename: str, stream: IO[bytes]) -> bool:
        return self._repository.save(filename=filename, stream=stream)
    
    def remove(self, filename: str) -> bool:
        if not self._repository.remove(filename=filename):
            raise ValueError(f"`{filename}` non esistente")
        return True
    
    def list_all(self) -> List[str]:
        return self._repository.list_all()
    
    def load(self, filename: str) -> bool:
        self._selectedFile = filename

    @property
    def selected(self) -> str:
        return self._selectedFile
    
    @selected.setter
    def selected(self, filename: str) -> None:
        self._selectedFile = filename
    