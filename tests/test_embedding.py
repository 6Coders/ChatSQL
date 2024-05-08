import unittest
from unittest import TestCase

from backend.chatsql.domain.Embedding import Embedding
import numpy as np

class TestEmbedding(TestCase):
    def test_embedding_creation(self):
        # Arrange
        text = "example text"
        data = np.array([1, 2, 3])

        # Act
        embedding = Embedding(text=text, data=data)

        # Assert
        self.assertEquals(embedding.text, text)
        self.assertIsNone(np.testing.assert_array_equal(
            data,
            embedding.data
        ))  # Returns None if the arrays are equal

if __name__ == '__main__':
    unittest.main()