from flask import Flask, jsonify
from flask_cors import CORS

from chatsql.adapter.incoming.web.ManagerController import ManagerController
from chatsql.adapter.incoming.web.QueryController import QueryController

from chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter import JSONRepositoryAdapter
from chatsql.adapter.outcoming.persistance.EmbeddingRepositoryAdapter import EmbeddingRepositoryAdapter

from chatsql.application.JSONManagerService import JSONManagerService
from chatsql.application.PromptService import PromptService
from chatsql.application.EmbeddingManager import EmbeddingManager

from chatsql.adapter.incoming.SearchAlgorithmAdapters import KNN

from chatsql.utils.Exceptions import CustomException
from chatsql.utils.Common import Settings
import os

app = Flask(__name__, static_url_path='', template_folder='../frontend/src/views')

CORS(app, resources={r'/*': {'origins': '*'}}, supports_credentials=True)

@app.route('/heartbeat')
def heartbeat():
    return True

@app.errorhandler(CustomException)
def handle(e):
    return jsonify(400, e.message)

from chatsql.adapter.incoming.EmbeddingGeneratorAdapters import HuggingfaceEmbeddingAdapter, TestEmbeddingAdapter

if __name__ == '__main__':

    temp_dir = os.environ.get('TMP') or os.environ.get('TMPDIR') or os.getcwd()
    Settings.folder = os.path.join(temp_dir, 'uploads')

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

    app.route('/upload', methods=["POST"])  (managerController.handle_upload)
    app.route('/files', methods=["GET"])    (managerController.handle_list_files)
    app.route('/select', methods=["POST"])  (managerController.handle_selection)
    app.route('/delete', methods=["DELETE"])(managerController.handle_delete)

    app.route('/selected', methods=["GET"])         (queryController.handle_selected)
    app.route('/generatePrompt', methods=["POST"])  (queryController.handle_prompt_generation)

    app.run(port=8000, debug=True)

