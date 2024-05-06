
from chatsql.application.port.incoming.RichiestaPromptUseCase import RichiestaPromptUseCase
from chatsql.application.port.incoming.LoadDizionarioUseCase import LoadDizionarioUseCase
from chatsql.application.port.incoming.VisualizzaDizionarioCorrenteUseCase import VisualizzaDizionarioCorrenteUseCase

from flask import Blueprint, request, jsonify

class QueryController:

    blueprint = None

    def __init__(self, 
                 richiestaPromptUseCase: RichiestaPromptUseCase,
                 loadDizionarioUseCase: LoadDizionarioUseCase,
                 visualizzaDizionarioCorrenteUseCase: VisualizzaDizionarioCorrenteUseCase) -> None:
        
        self._richiestaPromptUseCase = richiestaPromptUseCase
        self._loadDizionarioUseCase = loadDizionarioUseCase
        self._visualizzaDizionarioCorrenteUseCase = visualizzaDizionarioCorrenteUseCase

        self.blueprint = self.__create_blueprint()

    
    def __create_blueprint(self):

        query_page = Blueprint('QueryPage', __name__)
    

        @query_page.route('/selected', methods=['GET'])
        def handle_load():
            
            try:

                self._loadDizionarioUseCase.load(
                    self._visualizzaDizionarioCorrenteUseCase.selected
                )

                return 'ok'
                
            except BaseException as e:
                if hasattr(e, 'message'):
                    return e.message
                else:
                    return e

        @query_page.route('/generatePrompt', methods=['POST'])
        def handle_prompt_generation():
            
            try:

                richiesta = request.form['userRequest']
                
                self._loadDizionarioUseCase.load(
                    self._visualizzaDizionarioCorrenteUseCase.selected
                )
                risposta = self._richiestaPromptUseCase.query(richiesta)

                data = {
                    'result': risposta
                }

                return jsonify(data)
                
            except BaseException as e:
                if hasattr(e, 'message'):
                    return e.message
                else:
                    return e


        return query_page