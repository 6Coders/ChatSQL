
from chatsql.application.port.incoming.InserimentoDizionarioUseCase import InserimentoDizionarioUseCase
from chatsql.application.port.incoming.EliminazioneDizionarioUseCase import EliminazioneDizionarioUseCase
from chatsql.application.port.incoming.VisualizzaListaDizionariUseCase import VisualizzaListaDizionariUseCase
from chatsql.application.port.incoming.VisualizzaDizionarioCorrenteUseCase import VisualizzaDizionarioCorrenteUseCase
from chatsql.application.port.incoming.LoadDizionarioUseCase import LoadDizionarioUseCase

from chatsql.utils import Exceptions

from flask import Blueprint, request    

class ManagerController:

    blueprint = None

    def __init__(self,
                 inserimentoDizionarioUseCase: InserimentoDizionarioUseCase,
                 eliminazioneDizionarioUseCase: EliminazioneDizionarioUseCase,
                 visualizzaListaDizionariUseCase: VisualizzaListaDizionariUseCase,
                 visualizzaDizionarioCorrenteUseCase: VisualizzaDizionarioCorrenteUseCase,
                 loadDizionarioUseCase: LoadDizionarioUseCase) -> None:
        
        self._inserimentoDizionarioUseCase = inserimentoDizionarioUseCase
        self._eliminazioneDizionarioUseCase = eliminazioneDizionarioUseCase
        self._visualizzaListaDizionariUseCase = visualizzaListaDizionariUseCase
        self._visualizzaDizionarioCorrenteUseCase = visualizzaDizionarioCorrenteUseCase
        self._loadDizionarioUseCase = loadDizionarioUseCase

        self.blueprint = self.__create_blueprint()

    
    def __create_blueprint(self):

        manager_page = Blueprint('ManagerPage', __name__)


        @manager_page.route('/upload', methods=['POST'])
        def handle_upload():
            
            try:
            
                file = request.files['file']

                self._inserimentoDizionarioUseCase.add(file.filename, file.stream)

                return 'File aggiunto correttamente'
            

            except BaseException as e:
                if hasattr(e, 'message'):
                    return e.message
                else:
                    return 'Non è possibile caricare il file'


        return manager_page