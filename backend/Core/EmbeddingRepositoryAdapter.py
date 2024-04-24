from .Embed import Embed

class EmbeddingRepositoryAdapter(EmbeddingRepositoryPort):

    def __init__(self, file_path: str):
        self.file_path = file_path

    def save(self, embedding: Embed):
        with open(self.file_path, 'a') as file:
            file.write(embedding.text()+ '\n' )
            file.close()
        

    def get(self) -> List[Embed]:
        embeddings = []
        with open(self.file_path, 'r') as file:
            for line in file:
                embeddings.append(Embed(line))
            file.close()
        return embeddings
        

    def delete(self):
        if file_path in self.file_paths:
            self.file_paths.remove(file_path)
            return True
        return False
        