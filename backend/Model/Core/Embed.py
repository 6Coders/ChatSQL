from typing import Union, List

from torch import Tensor

class Embed():

    def __init__(self, text: Union[List[str], str], embedding: Tensor) -> None:
        
        self._text = text
        self._data = embedding


    @property
    def text(self) -> str:
        return self._text
    
    @property
    def embedding(self) -> Tensor:
        return self._data
        
    def __str__(self) -> str:
        return f"Text: {self.text} \nShape: {self.embedding.shape} \nDim: {self.embedding.dim()} \nType: {self.embedding.type()}"
