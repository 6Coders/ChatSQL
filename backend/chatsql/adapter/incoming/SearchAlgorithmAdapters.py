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
        query_embedding = query.data.reshape(1, -1)
        similarities = cosine_similarity(query_embedding, [emb.data for emb in context])
        indices = np.argsort(similarities[0])[-self._top_k:][::-1]
        return [context[idx] for idx in indices]
    #ES. per utilizzo
    #match = KNN(top_k=3)
    #match = match.search(query, context)
    #for emb in match: \n print(emb.text)