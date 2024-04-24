from abc import ABC, abstractmethod

class RepositoryPort(ABC):

    @abstractmethod
    def load(self, file_path: str):
        pass

    @abstractmethod
    def get_file_paths(self):
        pass
    
    @abstractmethod
    def find_file(self, file_name: str):
        pass
    
    @abstractmethod
    def add_json(self, file_path: str):
        pass
    
    @abstractmethod
    def remove_json(self, file_path: str):
        pass
