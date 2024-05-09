import unittest
from unittest import TestCase

from backend.chatsql.domain.Embedding import Embedding
import numpy as np


class TestEmbedding(TestCase):

    def test_correct_creation(self):
        # Arrange
        text = "example text"
        data = np.array([1, 2, 3])

        # Act
        embedding = Embedding(text=text, data=data)

        # Assert
        self.assertEquals(embedding.text, text)
        self.assertIsNone(
            # Returns None if the arrays are equal
            np.testing.assert_array_equal(
                data,
                embedding.data
            )
        )

    def test_text_and_data_none_creation(self):

        with self.assertRaises(TypeError) as context:

            embedding = Embedding()

    def test_none_text_creation(self):

        with self.assertRaises(ValueError) as context:

            embedding = Embedding(text=None, data=np.array([1, 2, 3]))

    def test_none_data_creation(self):

        with self.assertRaises(ValueError) as context:

            embedding = Embedding(text='default', data=None)


if __name__ == '__main__':
    unittest.main()
