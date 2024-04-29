from typing import List
from chatsql.application.port.outcoming.persistance.BaseJSONRepository import BaseJsonRepository

from chatsql.utils.JSONValidator import JSONValidator

import json
from os import listdir, remove
from os.path import isfile, join

from shutil import copy2
from werkzeug.utils import secure_filename

class JSONRepositoryAdapter(BaseJsonRepository):

    def __init__(self, folder: str) -> None:
        
        self._folder = folder

    def save(self, filename: str, stream: List[bytes]) -> bool:

        if self.__is_valid(filename=filename, content=stream):
            raise ValueError(f"`{filename}` non rispetta la struttura")

        filename = secure_filename(filename)

        dst = join(self._folder, filename)
        close_dst = False

        if isinstance(dst, str):
            dst = open(dst, "wb")
            close_dst = True

        try:
            copy2(stream, dst, 1024)
            return True
        finally:
            if close_dst:
                dst.close()
            return False

    def remove(self, filename: str) -> bool:
        
        if filename in self.list_all():
            remove(filename)
            return True

        return False
        
    def list_all(self) -> List[str]:
        return [filename for filename in listdir(self._folder) 
                if isfile(join(self._folder, filename)) and
                    filename.split('.')[-1] == 'json']


    def __is_valid(self, filename: str, content: List[bytes]) -> bool:
        content = json.loads(content)
        return JSONValidator.is_valid_structure(content)
    
    def load(self, filename: str):
        if self.__is_valid(filename=filename, content=stream):
            raise ValueError(f"`{filename}` non rispetta la struttura")
        with open(join(self._folder, filename), "r") as file:
            return json.load(file)
