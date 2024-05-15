import unittest
from unittest.mock import MagicMock, patch
from backend.chatsql.adapter.incoming.web.QueryController import QueryController

from flask import Flask
import json

class TestQueryController(unittest.TestCase):

    def setUp(self):
        
        app = Flask(__name__)
        app.config['TESTING'] = True

        self.mock_richiestaPromptUseCase = MagicMock()
        self.mock_loadDizionarioUseCase = MagicMock()
        self.mock_visualizzaDizionarioCorrenteUseCase = MagicMock()
        self.controller = QueryController(
            self.mock_richiestaPromptUseCase,
            self.mock_loadDizionarioUseCase,
            self.mock_visualizzaDizionarioCorrenteUseCase
        )

        self.inserimentoDizionario = MagicMock()
        self.eliminazioneDizionario = MagicMock()
        self.visualizzaListaDizionari = MagicMock(return_value=[])
        self.visualizzaDizionarioCorrente = MagicMock()
        self.embeddingSaver = MagicMock()

        app.route('/selected', methods=["GET"])         (self.controller.handle_selected)
        app.route('/generatePrompt', methods=["POST"])  (self.controller.handle_prompt_generation)

        self.client = app.test_client()

    def test_handle_selected(self):

        self.mock_visualizzaDizionarioCorrenteUseCase.selected = "selected_value"

        result = self.client.get('/selected')

        self.assertEqual(result.status_code, 200)
        self.assertEqual(json.loads(result.data.decode()), {"result": "selected_value"})

    def test_handle_prompt_generation(self):

        self.mock_visualizzaDizionarioCorrenteUseCase.selected = "selected_value"
        self.mock_richiestaPromptUseCase.query.return_value = "mocked_response"

        result = self.client.post('generatePrompt', data={
            'userRequest': 'mocked_request'
        })

        self.mock_loadDizionarioUseCase.load.assert_called_once_with("selected_value")
        self.mock_richiestaPromptUseCase.query.assert_called_once_with("mocked_request")
        self.assertEqual(json.loads(result.data.decode()), {'result': 'mocked_response'})

if __name__ == "__main__":
    unittest.main()
