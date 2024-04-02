
from Core.Embedder import Embedder
from Core.Model import Model

######### Questo è temporaneo #########

class ChatSQL():

    def __init__(self) -> None:
        
        self.model = None
        self.embedder = None



if __name__ == '__main__':
    q = ChatSQL()
    q.model = Model('all-MiniLM-L6-v2')
    q.embedder = Embedder(q.model)

    print(q.embedder.generate(['hello', 'world']))

