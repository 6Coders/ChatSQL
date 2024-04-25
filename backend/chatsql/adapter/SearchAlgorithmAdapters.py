from typing import List

from backend.chatsql.application.port.outcoming.SearchAlgorithmPort import SearchAlgorithmPort

from backend.chatsql.domain.Embedding import Embedding


class TestSearchAlgorithm(SearchAlgorithmPort):
    
    def search(self, query: Embedding, context: List[Embedding]) -> List[Embedding]:
        raise NotImplementedError()


class KNN(SearchAlgorithmPort):

    def __init__(self, top_k: int) -> None:
        
        self._top_k = top_k

    def search(self, query: Embedding, context: List[Embedding]) -> List[Embedding]:
        raise NotImplementedError()