import pytest
from unittest.mock import Mock, call
from backend.chatsql.adapter.incoming.web.QueryController import QueryController
from backend.chatsql.application.port.incoming.RichiestaPromptUseCase import RichiestaPromptUseCase
from backend.chatsql.application.port.incoming.LoadDizionarioUseCase import LoadDizionarioUseCase
from backend.chatsql.application.port.incoming.VisualizzaDizionarioCorrenteUseCase import VisualizzaDizionarioCorrenteUseCase

def test_richiestaPromptUseCase_called():
    mock_richiestaPromptUseCase = Mock(RichiestaPromptUseCase)
    mock_loadDizionarioUseCase = Mock(LoadDizionarioUseCase)
    mock_visualizzaDizionarioCorrenteUseCase = Mock(VisualizzaDizionarioCorrenteUseCase)
    controller = QueryController(mock_richiestaPromptUseCase, mock_loadDizionarioUseCase, mock_visualizzaDizionarioCorrenteUseCase)

    controller._richiestaPromptUseCase()

    mock_richiestaPromptUseCase.assert_called_once()

def test_loadDizionarioUseCase_called():
    mock_richiestaPromptUseCase = Mock(RichiestaPromptUseCase)
    mock_loadDizionarioUseCase = Mock(LoadDizionarioUseCase)
    mock_visualizzaDizionarioCorrenteUseCase = Mock(VisualizzaDizionarioCorrenteUseCase)
    controller = QueryController(mock_richiestaPromptUseCase, mock_loadDizionarioUseCase, mock_visualizzaDizionarioCorrenteUseCase)

    controller._loadDizionarioUseCase()

    mock_loadDizionarioUseCase.assert_called_once()

def test_visualizzaDizionarioCorrenteUseCase_called():
    mock_richiestaPromptUseCase = Mock(RichiestaPromptUseCase)
    mock_loadDizionarioUseCase = Mock(LoadDizionarioUseCase)
    mock_visualizzaDizionarioCorrenteUseCase = Mock(VisualizzaDizionarioCorrenteUseCase)
    controller = QueryController(mock_richiestaPromptUseCase, mock_loadDizionarioUseCase, mock_visualizzaDizionarioCorrenteUseCase)

    controller._visualizzaDizionarioCorrenteUseCase()

    mock_visualizzaDizionarioCorrenteUseCase.assert_called_once()