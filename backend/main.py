from flask import Flask
from flask_cors import CORS

from chatsql.adapter.incoming.web.ManagerController import ManagerController
from chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter import JSONRepositoryAdapter

from chatsql.application.JSONManagerService import JSONManagerService

from chatsql.utils.Common import Settings
import os

app = Flask(__name__, static_url_path='', template_folder='../frontend/src/views')
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/heartbeat')
def heartbeat():
    return True


if __name__ == '__main__':

    Settings.folder = os.path.join(os.environ['TEMP'], 'uploads')

    jsonRepository = JSONRepositoryAdapter()
    
    jsonService = JSONManagerService(jsonRepository)

    managerController = ManagerController(
        inserimentoDizionarioUseCase=jsonService,
        eliminazioneDizionarioUseCase=jsonService,
        visualizzaListaDizionariUseCase=jsonService,
        visualizzaDizionarioCorrenteUseCase=jsonService,
    )



    app.register_blueprint(managerController.blueprint)
    app.run(debug=True)

