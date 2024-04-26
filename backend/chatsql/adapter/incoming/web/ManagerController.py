
from chatsql.application.port.incoming.InserimentoDizionarioUseCase import InserimentoDizionarioUseCase
from chatsql.application.port.incoming.EliminazioneDizionarioUseCase import EliminazioneDizionarioUseCase
from chatsql.application.port.incoming.VisualizzaListaDizionariUseCase import VisualizzaListaDizionariUseCase
from chatsql.application.port.incoming.VisualizzaDizionarioCorrenteUseCase import VisualizzaDizionarioCorrenteUseCase
from chatsql.application.port.incoming.LoadDizionarioUseCase import LoadDizionarioUseCase

from flask import Blueprint

class ManagerController:

    def __init__(self,
                 inserimentoDizionarioUseCase: InserimentoDizionarioUseCase,
                 eliminazioneDizionarioUseCasei: EliminazioneDizionarioUseCase,
                 visualizzaListaDizionariUseCase: VisualizzaListaDizionariUseCase,
                 visualizzaDizionarioCorrenteUseCase: VisualizzaDizionarioCorrenteUseCase,
                 loadDizionarioUseCase: LoadDizionarioUseCase) -> None:
        
        self._inserimentoDizionarioUseCase = inserimentoDizionarioUseCase
        self._eliminazioneDizionarioUseCasei = eliminazioneDizionarioUseCasei
        self._visualizzaListaDizionariUseCase = visualizzaListaDizionariUseCase
        self._visualizzaDizionarioCorrenteUseCase = visualizzaDizionarioCorrenteUseCase
        self._loadDizionarioUseCase = loadDizionarioUseCase

        self._blueprint = self.__create_blueprint()

    
    def __create_blueprint(self):

        manager_page = Blueprint('ManagerPage', __name__)


        @manager_page.route('/manage', methods=['GET'])
        def foo():
            pass


        return manager_page