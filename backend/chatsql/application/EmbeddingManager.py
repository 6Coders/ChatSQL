from os.path import join
from typing import List
from backend.chatsql.application.port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort
from backend.chatsql.application.port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository

from backend.chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter import JSONRepositoryAdapter

from backend.chatsql.application.EmbeddingSaver import EmbeddingSaver
from backend.chatsql.domain.Embedding import Embedding

from backend.chatsql.utils.Common import Settings
import os
import json

from werkzeug.utils import secure_filename

from backend.chatsql.application.JSONManagerService import JSONManagerService


class EmbeddingManager(EmbeddingSaver):
    
    def __init__(self, embeddingRepository: BaseEmbeddingRepository,
                 embeddingGeneratorPort: EmbeddingGeneratorPort) -> None:
        
        self._embeddingRepository = embeddingRepository
        self._embeddingGeneratorPort = embeddingGeneratorPort
    
    
    def save(self, filename: str) -> bool:
        try:

            data = JSONManagerService.read(filename)

            tables = data['tables_info']
            table_descriptions =[]
            table_names = []
            for table_name, table_info in tables.items():
                table_descriptions.append(table_info['table_description'])
                table_names.append(table_name)

            embeddings = self._embeddingGeneratorPort.generate(table_descriptions, table_names)
            self._embeddingRepository.save(filename, embeddings)

        except BaseException as e:
            #print(e)
            return e
    
    def remove(self, filename: str) -> bool:

        try:
            folder = os.path.join(Settings.folder)
            os.remove(os.path.join(folder, filename))

        except Exception as e:
            return e