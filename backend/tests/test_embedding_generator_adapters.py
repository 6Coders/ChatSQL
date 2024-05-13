import unittest

from chatsql.adapter.incoming.EmbeddingGeneratorAdapters import HuggingfaceEmbeddingAdapter
import numpy as np

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