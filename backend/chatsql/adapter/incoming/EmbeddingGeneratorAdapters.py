
from typing import List
from sentence_transformers import SentenceTransformer
import torch
from backend.chatsql.domain.Embedding import Embedding
from backend.chatsql.application.port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort
import numpy as np
    

class HuggingfaceEmbeddingAdapter(EmbeddingGeneratorPort):

    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2") -> None:
        self.model = SentenceTransformer(model_name)

    def generate(self, texts: List[str], table_names: List[str]) -> List[Embedding]:
        embeddings = []
        for text, table_name in zip(texts, table_names):
            embedding = self.model.encode(text)
            embeddings.append(Embedding(text=text, table_name = table_name, data=embedding))
        return embeddings