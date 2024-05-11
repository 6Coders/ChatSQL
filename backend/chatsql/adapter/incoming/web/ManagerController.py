
from backend.chatsql.application.port.incoming.InserimentoDizionarioUseCase import InserimentoDizionarioUseCase
from backend.chatsql.application.port.incoming.EliminazioneDizionarioUseCase import EliminazioneDizionarioUseCase
from backend.chatsql.application.port.incoming.VisualizzaListaDizionariUseCase import VisualizzaListaDizionariUseCase
from backend.chatsql.application.port.incoming.VisualizzaDizionarioCorrenteUseCase import VisualizzaDizionarioCorrenteUseCase
from backend.chatsql.application.EmbeddingSaver import EmbeddingSaver

from backend.chatsql.utils import Exceptions
from backend.chatsql.utils.Common import Settings

from flask import Blueprint, request, jsonify 
import os
import datetime

class ManagerController:

    blueprint = None

    def __init__(self,
                 inserimentoDizionarioUseCase: InserimentoDizionarioUseCase,
                 eliminazioneDizionarioUseCase: EliminazioneDizionarioUseCase,
                 visualizzaListaDizionariUseCase: VisualizzaListaDizionariUseCase,
                 visualizzaDizionarioCorrenteUseCase: VisualizzaDizionarioCorrenteUseCase,
                 embeddingSaver: EmbeddingSaver) -> None:
        
        self._inserimentoDizionarioUseCase = inserimentoDizionarioUseCase
        self._eliminazioneDizionarioUseCase = eliminazioneDizionarioUseCase
        self._visualizzaListaDizionariUseCase = visualizzaListaDizionariUseCase
        self._visualizzaDizionarioCorrenteUseCase = visualizzaDizionarioCorrenteUseCase
        self._embeddingSaver = embeddingSaver

    def handle_upload(self):

        try:

            file = request.files['file']
            self._inserimentoDizionarioUseCase.add(file.filename, file.stream)
            self._embeddingSaver.save(file.filename)

            return 'File aggiunto correttamente'

        except BaseException as e:
            if hasattr(e, 'message'):
                return e.message
            else:
                return 'Non è possibile caricare il file'

    def handle_list_files(self):

        files = self._visualizzaListaDizionariUseCase.list_all()

        for data in files:
            data['loaded'] = data['name'] == self._visualizzaDizionarioCorrenteUseCase.selected

        return files

    def handle_selection(self):

        self._visualizzaDizionarioCorrenteUseCase.selected = request.form['selected']

        return 'ok'

    def handle_delete(self):

        filename = request.data.decode()

        if self._visualizzaDizionarioCorrenteUseCase.selected == filename:
            self._visualizzaDizionarioCorrenteUseCase.selected = None

        self._eliminazioneDizionarioUseCase.remove(filename)

        return 'ok'


