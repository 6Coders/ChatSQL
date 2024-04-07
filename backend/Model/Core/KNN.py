#Cosine similarity come metrica per KNN

class KNN(SearchAlgorithm):
    def search(self, embeddings, request_embedding):
        similarities = torch.nn.functional.cosine_similarity(
            request_embedding,
            torch.stack(embeddings),
            dim=-1
        )
        return similarities