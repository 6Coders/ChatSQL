import unittest
from unittest.mock import patch, mock_open, MagicMock, PropertyMock
from io import BytesIO
from datetime import datetime
import os

from backend.chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter import JSONRepositoryAdapter

from backend.chatsql.utils.Common import Settings


class TestJSONRepositoryAdapter(unittest.TestCase):
    def setUp(self):
        Settings.folder = os.getcwd()
        self.adapter = JSONRepositoryAdapter()

    @patch('backend.chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter.copyfileobj')
    @patch('os.path.join')
    @patch('builtins.open', new_callable=mock_open)
    def test_save(self, mock_open, mock_join, mock_copyfileobj):

        filename = 'dbmusica.json'
        mock_join.return_value = os.path.join(os.path.dirname(__file__), 'json', filename)
        stream_data = open(mock_join.return_value, 'r')

        self.adapter._already_present = MagicMock(return_value=False)
        self.adapter._is_valid = MagicMock(return_value=True)

        result = self.adapter.save(filename, stream_data)

        self.adapter._already_present.assert_called_once()
        self.adapter._is_valid.assert_called_once()
        mock_open.assert_called_once()
        mock_copyfileobj.assert_called_once()

        self.assertTrue(result)

    @patch('os.remove')
    @patch('os.path.join')
    def test_remove_file_exists(self, mock_join, mock_remove):

        filename = 'file1.json'

        mock_join.return_value = 'test/'
        mock_remove.return_value = None

        self.adapter._filenames = MagicMock(return_value=['file1.json', 'file2.json'])

        result = self.adapter.remove(filename)

        mock_remove.assert_called_once()

    @patch('os.remove')
    def test_remove_file_not_exists(self, mock_remove):

        filename = 'notInList.json'

        self.adapter._filenames = MagicMock(return_value=['file1.json', 'file2.json'])

        result = self.adapter.remove(filename)

        mock_remove.assert_not_called()

    @patch('os.listdir')
    @patch('os.path.isfile')
    def test_filenames(self, mock_isfile, mock_listdir):

        mock_listdir.return_value = ['file1.json', 'file2.txt', 'file3.json']
        mock_isfile.side_effect = lambda x: x.endswith('.json')

        result = self.adapter._filenames()

        mock_listdir.assert_called()

        self.assertEqual(['file1.json', 'file3.json'], result)

    @patch('os.stat')
    @patch('os.path.join')
    def test_list_all(self, join_mock, mock_stat):
        join_mock.return_value = '/path/to/join'
        self.adapter._filenames = MagicMock(return_value=['file1.json'])

        file1_mock = MagicMock()
        file1_mock.return_value.st_ctime = 1234567890
        file1_mock.return_value.st_size = 1024

        mock_stat.side_effect = file1_mock

        result = self.adapter.list_all()

        expected_result = [{
            'name': 'file1',
            'extension': 'json',
            'date': datetime.fromtimestamp(1234567890),
            'size': '1.00 Kb'
        }]

        self.assertEqual(result, expected_result)

if __name__ == '__main__':
    unittest.main()
