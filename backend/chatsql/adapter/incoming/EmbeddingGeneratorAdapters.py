
from typing import List
from transformers import AutoTokenizer, AutoModel
import torch
from chatsql.domain.Embedding import Embedding
from chatsql.application.port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort
import numpy as np

class TestEmbeddingAdapter(EmbeddingGeneratorPort):

    def generate(self, texts: List[str]) -> List[Embedding]:
        return [Embedding(
            text='test', 
            data=np.array([1, 2, 3], dtype=np.float32)
        ) for _ in texts]
    

class HuggingfaceEmbeddingAdapter(EmbeddingGeneratorPort):

    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2") -> None:
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name)

    def generate(self, texts: List[str]) -> List[Embedding]:
        embeddings = []
        for text in texts:
            inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)
            with torch.no_grad():
                outputs = self.model(**inputs)
            last_hidden_states = outputs.last_hidden_state
            mean_embedding = np.mean(last_hidden_states.numpy(), axis=1) 
            embeddings.append(Embedding(text=text, data=mean_embedding))
        return embeddings