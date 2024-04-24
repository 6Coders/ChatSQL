
class JSONRepositoryAdapter(JSONRepositoryPort):

    def __init__(self, file_path: str):
        self.file_path = file_path

    def load(self, file_path: str):
        if file_path not in self.file_paths:
            raise ValueError(f"File '{file_path}' has not been added")

        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
        
        return data

    def get_file_paths(self):
        return self.file_paths

    def find_file(self, file_name: str):
        for file_path in self.file_paths:
            if file_name in file_path:
                return file_path
        return None

    def add_json(self, file_path: str):
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Error adding file: '{file_path}'. File does not exist.")
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
        if not JSONValidator.is_valid_structure(data):
            raise ValueError(f"Error adding file: '{file_path}'. Invalid JSON structure.")
        
        if file_path in self.file_paths:
            return False
        self.file_paths.append(file_path)
        return True

    def remove_json(self, file_path: str):
        if file_path in self.file_paths:
            self.file_paths.remove(file_path)
            return True
        return False