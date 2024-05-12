import pytest
from chatsql.adapter.incoming.web.ManagerController import ManagerController
from unittest.mock import Mock
from werkzeug.datastructures import FileStorage
import io
from flask import Flask

@pytest.fixture
def app():
    inserimentoDizionarioUseCase = Mock()
    eliminazioneDizionarioUseCase = Mock()
    visualizzaListaDizionariUseCase = Mock()
    visualizzaDizionarioCorrenteUseCase = Mock()
    embeddingSaver = Mock()

    manager_controller = ManagerController(inserimentoDizionarioUseCase, eliminazioneDizionarioUseCase, visualizzaListaDizionariUseCase, visualizzaDizionarioCorrenteUseCase, embeddingSaver)

    app = Flask(__name__)
    app.register_blueprint(manager_controller.blueprint)

    return app

@pytest.fixture
def client(app):
    return app.test_client()

def test_upload_route(client):
    data = {
        'file': (io.BytesIO(b'{"key": "value"}'), 'test.json')
    }
    response = client.post('/upload', data=data, content_type='multipart/form-data')
    assert response.status_code == 200
    assert response.data == b'File aggiunto correttamente'

def test_selected_route(client):
    data = {
        'selected': 'test.json'
    }
    response = client.post('/select', data=data)
    assert response.status_code == 200
    assert response.data == b'ok'

def test_delete_route(client):
    response = client.delete('/delete', data='test.json')
    assert response.status_code == 200