
from typing import List
from backend.chatsql.domain.Embedding import Embedding
from chatsql.application.port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort


import numpy as np

class TestEmbeddingAdapter(EmbeddingGeneratorPort):

    def generate(self, texts: List[str]) -> List[Embedding]:
        return Embedding(
            text='tets', 
            data=np.array([1, 2, 3], dtype=np.float32)
        )
    

class HuggingfaceEmbeddingAdapter(EmbeddingGeneratorPort):

    def __init__(self, model_name: str) -> None:
        pass

    def generate(self, texts: List[str]) -> List[Embedding]:
        return NotImplementedError()