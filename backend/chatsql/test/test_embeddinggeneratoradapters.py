import numpy as np
import pytest
from backend.chatsql.adapter.incoming.EmbeddingGeneratorAdapters import TestEmbeddingAdapter, HuggingfaceEmbeddingAdapter

class TestTestEmbeddingAdapter:
    @pytest.fixture
    def adapter(self):
        return TestEmbeddingAdapter()

    def test_generate(self, adapter):
        texts = ['test1', 'test2']
        embeddings = adapter.generate(texts)
        assert len(embeddings) == len(texts)
        for embedding in embeddings:
            assert embedding.text == 'test'
            assert np.array_equal(embedding.data, np.array([1, 2, 3], dtype=np.float32))

class TestHuggingfaceEmbeddingAdapter:
    @pytest.fixture
    def adapter(self):
        return HuggingfaceEmbeddingAdapter()

    def test_generate(self, adapter):
        texts = ['test1', 'test2']
        embeddings = adapter.generate(texts)
        assert len(embeddings) == len(texts)
        for embedding in embeddings:
            assert embedding.text in texts
            assert isinstance(embedding.data, np.ndarray)