
from chatsql.application.port.incoming.RichiestaPromptUseCase import RichiestaPromptUseCase
from chatsql.application.port.incoming.LoadDizionarioUseCase import LoadDizionarioUseCase
from chatsql.application.port.incoming.VisualizzaDizionarioCorrenteUseCase import VisualizzaDizionarioCorrenteUseCase

from flask import Blueprint, request

class QueryController:

    blueprint = None

    def __init__(self, 
                 richiestaPromptUseCase: RichiestaPromptUseCase,
                 loadDizionarioUseCase: LoadDizionarioUseCase,
                 visualizzaDizionarioCorrenteUseCase: VisualizzaDizionarioCorrenteUseCase) -> None:
        
        self._richiestaPromptUseCase = richiestaPromptUseCase
        self._loadDizionarioUseCase = loadDizionarioUseCase
        self._visualizzaDizionarioCorrenteUseCase = visualizzaDizionarioCorrenteUseCase

    def handle_selected(self):

        return {"result": self._visualizzaDizionarioCorrenteUseCase.selected}

    def handle_prompt_generation(self):

        richiesta = request.form['userRequest']

        self._loadDizionarioUseCase.load(
            self._visualizzaDizionarioCorrenteUseCase.selected
        )
        risposta = self._richiestaPromptUseCase.query(richiesta, self._visualizzaDizionarioCorrenteUseCase.selected)

        data = {
            'result': risposta
        }

        return data
