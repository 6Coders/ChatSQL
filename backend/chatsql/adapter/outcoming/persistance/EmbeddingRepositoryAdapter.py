from typing import List
import os
import numpy as np
from backend.chatsql.domain.Embedding import Embedding
from backend.chatsql.application.port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository

from backend.chatsql.utils import Exceptions, Common

class EmbeddingRepositoryAdapter(BaseEmbeddingRepository):

    def __init__(self) -> None:
        self._folder = Common.Settings.folder

    def save(self, filename: str, embeddings: List[Embedding]) -> bool:
        try:
            filepath = os.path.join(self._folder, '.'.join(filename.split('.')[:-1]))
            np.save(filepath, embeddings)
            return True
        except Exception as e:
            raise Exceptions.FileNotSaved(f"Error while saving embeddings to {filename}: {e}")

    def load(self, filename: str) -> List[Embedding]:
        if filename is None:
            raise Exceptions.EmbeddingsNotLoaded(f"Error while loading embeddings from {filename}: {e}")

        filepath = os.path.join(self._folder, filename + '.npy')
        embeddings = np.load(filepath, allow_pickle=True)
        return embeddings.tolist()

    def remove(self, filename: str) -> bool:
        try:
            filepath = os.path.join(self._folder, filename)
            os.remove(filepath)
            return True
        except Exception as e:
            raise Exceptions.FileNotRemoved(f"Error while removing embeddings file {filename}: {e}. Check if permissions are correct.")
