from typing import List
import os
import numpy as np
from chatsql.domain.Embedding import Embedding
from chatsql.application.port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository
from chatsql.utils import Exceptions

class EmbeddingRepositoryAdapter(BaseEmbeddingRepository):

    def __init__(self, folder: str) -> None:
        self._folder = folder

    def save(self, filename: str, embeddings: List[Embedding]) -> bool:
        try:
            filepath = os.path.join(self._folder, filename)
            np.save(filepath, embeddings)
            return True
        except Exception as e:
            raise Exceptions.FileNotSaved(f"Error while saving embeddings to {filename}: {e}")

    def load(self, filename: str) -> List[Embedding]:
        try:
            filepath = os.path.join(self._folder, filename)
            embeddings = np.load(filepath, allow_pickle=True)
            return embeddings.tolist()  # Convert to list of Embedding objects
        except Exception as e:
            raise Exceptions.EmbeddingsNotLoaded(f"Error while loading embeddings from {filename}: {e}")

    def remove(self, filename: str) -> bool:
        try:
            filepath = os.path.join(self._folder, filename)
            os.remove(filepath)
            return True
        except Exception as e:
            raise Exceptions.FileNotRemoved(f"Error while removing embeddings file {filename}: {e}. Check if permissions are correct.")
