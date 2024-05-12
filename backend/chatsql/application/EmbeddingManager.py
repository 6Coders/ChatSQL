from typing import List
from backend.chatsql.application.port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort
from backend.chatsql.application.port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository


from chatsql.adapter.outcoming.persistance.JSONRepositoryAdapter import JSONRepositoryAdapter

from chatsql.application.EmbeddingSaver import EmbeddingSaver
from chatsql.domain.Embedding import Embedding


from backend.chatsql.utils.Common import Settings
import os
import json

class EmbeddingManager(EmbeddingSaver): 
    
    def __init__(self, embeddingRepository: BaseEmbeddingRepository,
                 embeddingGeneratorPort: EmbeddingGeneratorPort) -> None:
        
        self._embeddingRepository = embeddingRepository
        self._embeddingGeneratorPort = embeddingGeneratorPort
    
    
    def save(self, filename: str) -> bool:
        try:

            #with open(os.path.join(Settings.folder, filename), 'r') as file:
            #    content = file.readlines()
            data = JSONRepositoryAdapter.open(filename)

            tables = data['tables_info']
            table_descriptions =[]
            table_names = []
            for table_name, table_info in tables.items():
                table_descriptions.append(table_info['table_description'])
                table_names.append(table_name)
                #for column in table_info['columns']:
                #    table_descriptions.append(column['column_description'])
                #    table_names.append(table_name)
            print(table_descriptions , table_names)
            embeddings = self._embeddingGeneratorPort.generate(table_descriptions, table_names)
            self._embeddingRepository.save(filename, embeddings)
        except BaseException as e:
            #print(e)
            return e
    
