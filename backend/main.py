from flask import Flask
from flask_cors import CORS

from chatsql.adapter.incoming.web.ManagerController import ManagerController
from chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter import JSONRepositoryAdapter

from chatsql.application.JSONManagerService import JSONManagerService

from chatsql.utils.Common import Settings
import os

app = Flask(__name__, static_url_path='', template_folder='../frontend/src/views')

# Abilita il supporto CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# Imposta la cartella temporanea per gli upload
Settings.folder = os.path.join(os.environ['TEMP'], 'uploads')

# Inizializza il repository e il servizio JSON
jsonRepository = JSONRepositoryAdapter()
jsonService = JSONManagerService(jsonRepository)

# Crea il controller e registra il blueprint
managerController = ManagerController(
    inserimentoDizionarioUseCase=jsonService,
    eliminazioneDizionarioUseCase=jsonService,
    visualizzaListaDizionariUseCase=jsonService,
    visualizzaDizionarioCorrenteUseCase=jsonService,
)
app.register_blueprint(managerController.blueprint)

app.testing = True

