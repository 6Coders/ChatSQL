import pytest
from unittest.mock import Mock, patch
from chatsql.utils import Exceptions
from chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter import JSONRepositoryAdapter
from io import BytesIO

@patch('chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter.Settings')
def test_init(mock_settings):
    mock_settings.folder = '/tmp'
    adapter = JSONRepositoryAdapter()
    assert adapter._folder == '/tmp'

@patch('chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter.Settings')
@patch('builtins.open', new_callable=Mock)
def test_save(mock_open, mock_settings):
    mock_settings.folder = '/tmp'
    adapter = JSONRepositoryAdapter()
    adapter._JSONRepositoryAdapter__already_present = Mock(return_value=False)
    adapter._JSONRepositoryAdapter__is_valid = Mock(return_value=True)
    mock_file = Mock()
    mock_open.return_value = mock_file
    mock_file.__enter__ = Mock(return_value=mock_file)
    mock_file.__exit__ = Mock()

    stream = BytesIO(b'test')
    adapter.save('test.json', stream)
    mock_open.assert_called_once_with('/tmp/test.json', 'w+b')

@patch('chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter.Settings')
@patch('builtins.open', new_callable=Mock)
def test_save_already_present(mock_open, mock_settings):
    mock_settings.folder = '/tmp'
    adapter = JSONRepositoryAdapter()
    adapter._JSONRepositoryAdapter__already_present = Mock(return_value=True)
    stream = [b'test']
    with pytest.raises(Exceptions.FileAlreadyUploaded):
        adapter.save('test.json', stream)