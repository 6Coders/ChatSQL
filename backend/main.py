from flask import Flask
from flask_cors import CORS

from chatsql.adapter.incoming.web.ManagerController import ManagerController
from chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter import JSONRepositoryAdapter


from chatsql.application.JSONManagerService import JSONManagerService

import os

app = Flask(__name__, static_url_path='', template_folder='../frontend/src/views')
CORS(app, resources={r'/*': {'origins': '*'}})

if __name__ == '__main__':

    uploads_folder = os.path.join(os.getcwd(), 'uploads')

    jsonRepository = JSONRepositoryAdapter()
    jsonRepository.folder = uploads_folder
    
    jsonService = JSONManagerService(jsonRepository)

    managerController = ManagerController(
        inserimentoDizionarioUseCase=jsonService,
        eliminazioneDizionarioUseCase=jsonService,
        visualizzaListaDizionariUseCase=jsonService,
        visualizzaDizionarioCorrenteUseCase=jsonService,
        loadDizionarioUseCase=jsonService
    )



    app.register_blueprint(managerController.blueprint)
    app.run(debug=True)

