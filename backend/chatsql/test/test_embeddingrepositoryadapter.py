import os
import numpy as np
import pytest
from unittest.mock import patch, MagicMock
from backend.chatsql.domain.Embedding import Embedding
from backend.chatsql.application.port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository
from backend.chatsql.utils import Exceptions, Common
from backend.chatsql.adapter.outcoming.persistance.EmbeddingRepositoryAdapter import EmbeddingRepositoryAdapter

class TestEmbeddingRepositoryAdapter:
    @pytest.fixture
    def adapter(self):
        return EmbeddingRepositoryAdapter()

    @pytest.fixture
    def embeddings(self):
        return [Embedding('some_text', np.array([i]*5)) for i in range(5)]

    @patch('numpy.save')
    def test_save(self, mock_save, adapter, embeddings):
        filename = 'test.npy'
        adapter._folder = '/dummy/path'
        filepath = os.path.join(adapter._folder, '.'.join(filename.split('.')[:-1]))

        adapter.save(filename, embeddings)
        mock_save.assert_called_once_with(filepath, embeddings)

    @patch('numpy.load')
    def test_load(self, mock_load, adapter, embeddings):
        filename = 'test.npy'
        adapter._folder = '/dummy/path'
        filepath = os.path.join(adapter._folder, filename)

        mock_load.return_value = np.array(embeddings)
        loaded_embeddings = adapter.load(filename)
        mock_load.assert_called_once_with(filepath, allow_pickle=True)
        assert loaded_embeddings == embeddings

    @patch('os.remove')
    def test_remove(self, mock_remove, adapter):
        filename = 'test.npy'
        adapter._folder = '/dummy/path'
        filepath = os.path.join(adapter._folder, filename)
        adapter.remove(filename)
        mock_remove.assert_called_once_with(filepath)