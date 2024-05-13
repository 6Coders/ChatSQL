import unittest
from unittest.mock import patch, mock_open
import os
import numpy as np

from chatsql.adapter.outcoming.persistance.EmbeddingRepositoryAdapter import EmbeddingRepositoryAdapter

from chatsql.domain.Embedding import Embedding


class TestEmbeddingRepositoryAdapter(unittest.TestCase):
    def setUp(self):
        self.adapter = EmbeddingRepositoryAdapter()

    def tearDown(self):
        pass

    @patch('os.path.join')
    @patch('pickle.dump')
    @patch('builtins.open', new_callable=mock_open)
    def test_save(self, mock_open, mock_dump, mock_join):
        filename = 'test.pkl'
        embeddings = [Embedding('some_text', 'test_table', np.array([i] * 5)) for i in range(5)]
        self.adapter.save(filename, embeddings)

        mock_join.assert_called_once_with(self.adapter._folder, '.'.join(filename.split('.')[:-1]))
        mock_open.assert_called_once_with(mock_join.return_value, 'wb')
        mock_dump.assert_called_once_with(embeddings, mock_open.return_value)

    @patch('os.path.join')
    @patch('pickle.load')
    @patch('builtins.open', new_callable=mock_open)
    def test_load(self, mock_open, mock_load, mock_join):
        filename = 'test.pkl'
        embeddings = [Embedding('some_text', 'test_table', np.array([i] * 5)) for i in range(5)]
        mock_load.return_value = embeddings
        loaded_embeddings = self.adapter.load(filename)

        mock_join.assert_called_once_with(self.adapter._folder, filename)
        mock_open.assert_called_once_with(mock_join.return_value, 'rb')
        mock_load.assert_called_once_with(mock_open.return_value)
        self.assertEqual(loaded_embeddings, embeddings)

    @patch('os.remove')
    @patch('os.path.join')
    def test_remove(self, mock_join, mock_remove):
        filename = 'test.pkl'
        self.adapter.remove(filename)

        mock_join.assert_called_once_with(self.adapter._folder, filename)
        mock_remove.assert_called_once_with(mock_join.return_value)


if __name__ == '__main__':
    unittest.main()
