import unittest
from unittest.mock import patch, MagicMock
import numpy as np

from backend.chatsql.adapter.incoming.SearchAlgorithmAdapters import KNN


class TestKNN(unittest.TestCase):
	def test_single_search(self):

		with unittest.mock.patch('backend.chatsql.adapter.incoming.SearchAlgorithmAdapters.cosine_similarity') as mock_cosine_similarity:
			mock_cosine_similarity.return_value = np.array([[0.8, 0.5, 0.2]])

			knn = KNN(top_k=3)

			query = MagicMock()
			query.data = np.array([1, 2, 3])
			context = MagicMock(
				text='test',
				table_name='test_table',
				data=np.array([4, 5, 6])
			)

			result = knn.search(query, [context])

			mock_cosine_similarity.assert_called_once_with([query.data], [context.data])
			self.assertEqual(result, [('test_table', 0.8)])

	def test_k_search(self):

		with (unittest.mock.patch('backend.chatsql.adapter.incoming.SearchAlgorithmAdapters.cosine_similarity') as mock_cosine_similarity):
			mock_cosine_similarity.side_effect = [
				np.array([[0.8]]),
				np.array([[0.3]]),
				np.array([[0.1]])
			]

			knn = KNN(top_k=3)

			query = MagicMock()
			query.data = np.array([1, 2, 3])
			context = [
				MagicMock(
					text='first',
					table_name='first_table',
					data=np.array([4, 5, 6])
				),
				MagicMock(
					text='second',
					table_name='second_table',
					data=np.array([7, 8, 9])
				),
				MagicMock(
				text='third',
				table_name='third_table',
				data=np.array([10, 11, 12])
			)]
			result = knn.search(query, context)

			self.assertEqual(mock_cosine_similarity.call_count, 3)
			self.assertEqual(result, [
				('first_table', 0.8),
				('second_table', 0.3),
				('third_table', 0.1)
			])

	def test_more_than_k_search(self):

		with (unittest.mock.patch('backend.chatsql.adapter.incoming.SearchAlgorithmAdapters.cosine_similarity') as mock_cosine_similarity):
			mock_cosine_similarity.side_effect = [
				np.array([[0.8]]),
				np.array([[0.3]]),
				np.array([[0.1]]),
				np.array([[0.9]]),
				np.array([[0.6]]),
			]

			knn = KNN(top_k=3)

			query = MagicMock()
			query.data = np.array([1, 2, 3])
			context = [
				MagicMock(
					text='first',
					table_name='first_table',
					data=np.array([4, 5, 6])
				),
				MagicMock(
					text='second',
					table_name='second_table',
					data=np.array([7, 8, 9])
				),
				MagicMock(
					text='third',
					table_name='third_table',
					data=np.array([10, 11, 12])
				),
				MagicMock(
					text='fourth',
					table_name='fourth_table',
					data=np.array([13, 14, 15])
				),
				MagicMock(
					text='fifth',
					table_name='fifth_table',
					data=np.array([16, 17, 18])
				)
			]
			result = knn.search(query, context)

			self.assertEqual(mock_cosine_similarity.call_count, 5)
			self.assertEqual(result, [
				('fourth_table', 0.9),
				('first_table', 0.8),
				('fifth_table', 0.6)
			])


if __name__ == '__main__':
	unittest.main()
