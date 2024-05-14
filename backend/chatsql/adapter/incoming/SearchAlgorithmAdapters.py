from typing import List

from sklearn.metrics.pairwise import cosine_similarity
from chatsql.application.port.outcoming.SearchAlgorithmPort import SearchAlgorithmPort

from chatsql.domain.Embedding import Embedding


class TestSearchAlgorithm(SearchAlgorithmPort):
    
    def search(self, query: Embedding, context: List[Embedding]) -> List[Embedding]:
        raise NotImplementedError()


class KNN(SearchAlgorithmPort):

    def __init__(self, top_k: int) -> None:
        self._top_k = top_k

    def search(self, query: Embedding, context: List[Embedding]) -> List[Embedding]:
        similarities = {}
        for e in context:
            similarity = cosine_similarity([query.data], [e.data])[0][0]
            similarities[e.table_name] = similarity
        top_tables = sorted(similarities.items(), key=lambda x: x[1], reverse=True)[:self._top_k]
        return top_tables
