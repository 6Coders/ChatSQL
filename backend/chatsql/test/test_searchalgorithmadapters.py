import numpy as np
import pytest
from chatsql.adapter.incoming.SearchAlgorithmAdapters import TestSearchAlgorithm, KNN
from chatsql.domain.Embedding import Embedding

class TestTestSearchAlgorithm:
    @pytest.fixture
    def algorithm(self):
        return TestSearchAlgorithm()

    def test_search(self, algorithm):
        query = Embedding('query', np.array([1, 2, 3], dtype=np.float32))
        context = [Embedding('context', np.array([4, 5, 6], dtype=np.float32))]
        with pytest.raises(NotImplementedError):
            algorithm.search(query, context)

class TestKNN:
    @pytest.fixture
    def algorithm(self):
        return KNN(5)

    def test_init(self, algorithm):
        assert algorithm._top_k == 5

    def test_search(self, algorithm):
        query = Embedding('query', np.array([[1, 2, 3]], dtype=np.float32))
        context = [Embedding('context', np.array([[i, i+1, i+2]], dtype=np.float32)) for i in range(7)]
        result = algorithm.search(query, context)
        assert len(result) == algorithm._top_k
        for embedding in result:
            assert isinstance(embedding, Embedding)