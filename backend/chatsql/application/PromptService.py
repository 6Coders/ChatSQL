
from port.incoming.RichiestaPromptUseCase import RichiestaPromptUseCase

from port.outcoming.persistance.BaseEmbeddingRepository import BaseEmbeddingRepository
from port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort
from port.outcoming.SearchAlgorithmPort import SearchAlgorithmPort

from .domain.Embedding import Embedding


class PromptService(RichiestaPromptUseCase):

    def __init__(self,
                 embeddingRepository: BaseEmbeddingRepository, 
                 embeddingGeneratorPort: EmbeddingGeneratorPort, 
                 searchAlgorithm: SearchAlgorithmPort) -> None:
        
        self._embeddingRepository = embeddingRepository
        self._embeddingGeneratorPort = embeddingGeneratorPort
        self._searchAlgorithm = searchAlgorithmPort


    def query(self, query: str, filename: str) -> str:
        embeddings = self._embeddingGeneratorPort.generate([query])
        query_embedding = embeddings[0]
        context = self._embeddingRepository.load(filename)
        match = KNN(top_k=3)
        match = match.search(query_embedding, context)
        result = []
        for emb in match:
            result.append(emb.text)
        
        return result
        


