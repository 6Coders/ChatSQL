
from .Model import Model
from .Embed import Embed

from sentence_transformers import SentenceTransformer

class Embedder():

    def __init__(self, model: Model) -> None:
        self._model_ref = model
        self._model = SentenceTransformer(self._model_ref.name)

    def generate(self, text: str) -> Embed:
        embeddings = self._model.encode(text, convert_to_tensor=True)
        return Embed(text, embeddings)
    
    def __str__(self) -> str:
        return f"Using '{self._model_ref.name}'"