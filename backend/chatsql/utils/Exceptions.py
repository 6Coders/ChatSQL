

class CustomException(Exception):

    def __init__(self, message):
        self._message = message
        

    @property
    def message(self):
        return self._message

class InvalidStructure(CustomException):

    def __init__(self, message="Invalid file structure"):
        super().__init__(message)

class FileAlreadyUploaded(CustomException):

    def __init__(self, message="File Already uploaded"):
        super().__init__(message)

class FileNotSaved(CustomException):

    def __init__(self, message="Error saving file"):
        super().__init__(message)

class EmbeddingsNotLoaded(CustomException):

    def __init__(self, message="Error during embeddings loading from file"):
        super().__init__(message)

class FileNotRemoved(CustomException):

    def __init__(self, message="Error removing file. Check if permissions are correct"):
        super().__init__(message)

class NoFileSelected(CustomException):

    def __init__(self, message="No file has been selected"):
        super().__init__(message)