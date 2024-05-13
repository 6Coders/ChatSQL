import unittest
from unittest import TestCase

from chatsql.domain.Embedding import Embedding
from chatsql.adapter.incoming.EmbeddingGeneratorAdapters import HuggingfaceEmbeddingAdapter

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
        self.assertEqual(embedding.text, text)
        self.assertEqual(embedding.table_name, table_name)
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


class TestHuggingfaceEmbeddingAdapter(unittest.TestCase):
    def setUp(self):
        self.adapter = HuggingfaceEmbeddingAdapter()

    def test_generate(self):
        texts = ['test1', 'test2']
        table_names = ['first_table', 'second_table']
        embeddings = self.adapter.generate(texts, table_names)

        self.assertEqual(len(embeddings), len(texts))
        for embedding in embeddings:
            self.assertEqual(embedding.text, embedding.text)
            self.assertEqual(embedding.table_name, embedding.table_name)
            self.assertTrue(embedding.data.size != 0)
            self.assertIsInstance(embedding.data, np.ndarray)


if __name__ == '__main__':
    unittest.main()
