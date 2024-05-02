
from chatsql.application.port.incoming.InserimentoDizionarioUseCase import InserimentoDizionarioUseCase
from chatsql.application.port.incoming.EliminazioneDizionarioUseCase import EliminazioneDizionarioUseCase
from chatsql.application.port.incoming.VisualizzaListaDizionariUseCase import VisualizzaListaDizionariUseCase
from chatsql.application.port.incoming.VisualizzaDizionarioCorrenteUseCase import VisualizzaDizionarioCorrenteUseCase

from chatsql.utils import Exceptions
from chatsql.utils.Common import Settings

from flask import Blueprint, request, jsonify 
import os
import datetime

class ManagerController:

    blueprint = None

    def __init__(self,
                 inserimentoDizionarioUseCase: InserimentoDizionarioUseCase,
                 eliminazioneDizionarioUseCase: EliminazioneDizionarioUseCase,
                 visualizzaListaDizionariUseCase: VisualizzaListaDizionariUseCase,
                 visualizzaDizionarioCorrenteUseCase: VisualizzaDizionarioCorrenteUseCase) -> None:
        
        self._inserimentoDizionarioUseCase = inserimentoDizionarioUseCase
        self._eliminazioneDizionarioUseCase = eliminazioneDizionarioUseCase
        self._visualizzaListaDizionariUseCase = visualizzaListaDizionariUseCase
        self._visualizzaDizionarioCorrenteUseCase = visualizzaDizionarioCorrenteUseCase

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

        @manager_page.route('/files', methods=['GET'])
        def handle_list_files():
            
            try:
                
                data = []

                for filename in self._visualizzaListaDizionariUseCase.list_all():
                    
                    data.append({
                        'name': '.'.join(filename.split('.')[:-1]),
                        'loaded': filename == self._visualizzaDizionarioCorrenteUseCase.selected,
                        'extension': filename.split('.')[-1],
                        'date': datetime.datetime.fromtimestamp(os.stat(os.path.join(Settings.folder, filename)).st_ctime),
                        'size': f"{os.stat(os.path.join(Settings.folder, filename)).st_size / 1024.0:.2f} Kb",
                    })

                return jsonify(data)
                
            except BaseException as e:
                if hasattr(e, 'message'):
                    return e.message
                else:
                    return e
        
        @manager_page.route('/select', methods=['POST'])
        def handle_selection():
            
            try:
                print(request.form['selected'])
                self._visualizzaDizionarioCorrenteUseCase.selected = request.form['selected']

                return 'ok'
                
            except BaseException as e:
                if hasattr(e, 'message'):
                    return e.message
                else:
                    return e
                        
        @manager_page.route('/delete', methods=['POST'])
        def handle_delete():
            
            try:

                filename = request.form['filename']
                
                if self._visualizzaDizionarioCorrenteUseCase.selected == filename:
                    self._visualizzaDizionarioCorrenteUseCase.selected = None

                self._eliminazioneDizionarioUseCase.remove(filename)

                return 'ok'
                
            except BaseException as e:
                if hasattr(e, 'message'):
                    return e.message
                else:
                    return e
                

        return manager_page