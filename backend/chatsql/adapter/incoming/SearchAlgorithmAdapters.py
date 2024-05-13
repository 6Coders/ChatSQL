from typing import List

from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from chatsql.application.port.outcoming.SearchAlgorithmPort import SearchAlgorithmPort

from chatsql.domain.Embedding import Embedding


class TestSearchAlgorithm(SearchAlgorithmPort):
    
    def search(self, query: Embedding, context: List[Embedding]) -> List[Embedding]:
        raise NotImplementedError()


class KNN(SearchAlgorithmPort):

    def __init__(self, top_k: int) -> None:
        self._top_k = top_k

    def search(self, query: Embedding, context: List[Embedding]) -> List[Embedding]:
        #m = np.array([emb.data for emb in context])
        #similarities = cosine_similarity([query.data], m).flatten()
        #indices = np.argsort(similarities)[-self._top_k:]
        #return [context[idx] for idx in indices]
        #context_dict = {emb.table_name: emb.data for emb in context}
        similarities = {}
        for e in context:
            similarity = cosine_similarity([query.data], [e.data])[0][0]
            similarities[e.table_name] = similarity
        top_tables = sorted(similarities.items(), key=lambda x: x[1], reverse=True)[:3]
        return top_tables
