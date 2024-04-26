
from chatsql.application.port.incoming.RichiestaPromptUseCase import RichiestaPromptUseCase

from flask import Blueprint

class QueryController:

    def __init__(self, richiestaPromptUseCase: RichiestaPromptUseCase) -> None:
        
        self._richiestaPromptUseCase = richiestaPromptUseCase

        self._blueprint = self.__create_blueprint()

    
    def __create_blueprint(self):

        query_page = Blueprint('QueryPage', __name__)


        @query_page.route('/query', methods=['GET'])
        def foo():
            pass


        return query_page