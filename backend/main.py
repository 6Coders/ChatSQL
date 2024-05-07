from flask import Flask
from flask_cors import CORS

from chatsql.adapter.incoming.web.ManagerController import ManagerController
from chatsql.adapter.incoming.web.QueryController import QueryController

from chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter import JSONRepositoryAdapter
from chatsql.adapter.outcoming.persistance.EmbeddingRepositoryAdapter import EmbeddingRepositoryAdapter

from chatsql.application.JSONManagerService import JSONManagerService
from chatsql.application.PromptService import PromptService
from chatsql.application.EmbeddingManager import EmbeddingManager

from chatsql.adapter.incoming.SearchAlgorithmAdapters import KNN

from chatsql.utils.Common import Settings
import os

app = Flask(__name__, static_url_path='', template_folder='../frontend/src/views')
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/heartbeat')
def heartbeat():
    return True

from chatsql.adapter.incoming.EmbeddingGeneratorAdapters import HuggingfaceEmbeddingAdapter, TestEmbeddingAdapter

if __name__ == '__main__':

    Settings.folder = os.path.join(os.environ['TEMP'], 'uploads')

    jsonRepository = JSONRepositoryAdapter()
    managerService = JSONManagerService(jsonRepository)


    embeddingRepository = EmbeddingRepositoryAdapter()
    embeddingGeneratorPort = HuggingfaceEmbeddingAdapter()
    promptService = PromptService(
        embeddingGeneratorPort=embeddingGeneratorPort,
        embeddingRepository=embeddingRepository,
        searchAlgorithm=KNN(top_k=3)
    )


    embeddingSaver = EmbeddingManager(
        embeddingRepository=embeddingRepository,
        embeddingGeneratorPort=embeddingGeneratorPort
    )

    managerController = ManagerController(
        inserimentoDizionarioUseCase=managerService,
        eliminazioneDizionarioUseCase=managerService,
        visualizzaListaDizionariUseCase=managerService,
        visualizzaDizionarioCorrenteUseCase=managerService,
        embeddingSaver=embeddingSaver
    )

    queryController = QueryController(
        richiestaPromptUseCase=promptService,
        loadDizionarioUseCase=promptService,
        visualizzaDizionarioCorrenteUseCase=managerService
    )

    app.register_blueprint(managerController.blueprint)
    app.register_blueprint(queryController.blueprint)
    app.run(debug=True)

