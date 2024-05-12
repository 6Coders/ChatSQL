import unittest
from unittest import TestCase

from backend.chatsql.domain.Embedding import Embedding
import numpy as np


class TestEmbedding(TestCase):

    def test_correct_creation(self):
        # Arrange
        text = "example text"
        table_name = 'test'
        data = np.array([1, 2, 3])

        # Act
        embedding = Embedding(text=text, table_name=table_name, data=data)

        # Assert
        self.assertEquals(embedding.text, text)
        self.assertEquals(embedding.table_name, table_name)
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

            embedding = Embedding(text=None, table_name='test', data=np.array([1, 2, 3]))

    def test_none_table_name_creation(self):

        with self.assertRaises(ValueError) as context:

            embedding = Embedding(text='test', table_name=None, data=np.array([1, 2, 3]))

    def test_none_data_creation(self):

        with self.assertRaises(ValueError) as context:

            embedding = Embedding(text='default', table_name='test', data=None)

    def test_zero_elements_in_data(self):

        with self.assertRaises(ValueError) as context:

            embedding = Embedding(text='default', table_name='test', data=np.array([]))


if __name__ == '__main__':
    unittest.main()
