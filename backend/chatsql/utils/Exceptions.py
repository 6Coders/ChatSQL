

class CustomException(BaseException):

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