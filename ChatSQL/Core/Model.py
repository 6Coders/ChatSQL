from typing import Union, List
from torch import Tensor


class Model():

    def __init__(self, name: str) -> None:
        
        self._name = name

    def info(self):
        return f"Using: '{self._name}'."


    @property
    def name(self): 
        return self._name
    
    @name.setter
    def name(self, other):
        # TODO: fare un controllo della validità del modello inserito:
        #       in caso non lo fosse, verrebbe ritornato un errore http se non erro

        # TODO: re-inizializzare il modello se valido
        self._name = other


    def __str__(self) -> str:
        return self.info()