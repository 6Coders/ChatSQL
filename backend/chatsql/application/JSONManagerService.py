from typing import IO, List

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
    VisualizzaDizionarioCorrenteUseCase,
    LoadDizionarioUseCase
):
    
    def __init__(self, jsonRepository: BaseJsonRepository) -> None:
        
        self._jsonRepository = jsonRepository

    def add(self, filename: str, stream: IO[bytes]) -> bool:
        raise NotImplementedError()
    
    def remove(self, filename: str) -> bool:
        raise NotImplementedError()
    
    def list_all(self) -> List[str]:
        raise NotImplementedError()
    
    def selected(self) -> str:
        raise NotImplementedError()
    
    def load(self, filename: str) -> bool:
        raise NotImplementedError()