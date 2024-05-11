from typing import List

from sklearn.metrics.pairwise import cosine_similarity
from transformers.tokenization_utils_base import np

from backend.chatsql.application.port.outcoming.SearchAlgorithmPort import SearchAlgorithmPort

from backend.chatsql.domain.Embedding import Embedding


class TestSearchAlgorithm(SearchAlgorithmPort):
    
    def search(self, query: Embedding, context: List[Embedding]) -> List[Embedding]:
        raise NotImplementedError()


class KNN(SearchAlgorithmPort):

    def __init__(self, top_k: int) -> None:
        
        self._top_k = top_k

    def search(self, query: Embedding, context: List[Embedding]) -> List[Embedding]:
        m = np.array([emb.data.squeeze(axis=0) for emb in context]).reshape(-1, query.data.shape[1])
        similarities = cosine_similarity(m, query.data).flatten()
        indices = np.argsort(similarities)[:self._top_k]
        a= [context[idx] for idx in indices]
        return a