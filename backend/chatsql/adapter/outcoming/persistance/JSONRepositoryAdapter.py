import os
from datetime import datetime
from typing import List, IO

from chatsql.application.port.outcoming.persistance.BaseJSONRepository import BaseJsonRepository

from chatsql.application.port.outcoming.EmbeddingGeneratorPort import EmbeddingGeneratorPort

from chatsql.utils.JSONValidator import JSONValidator

from chatsql.utils.Common import Settings
from chatsql.utils import Exceptions

import json
from os import listdir, remove
from os.path import isfile, join

from shutil import copyfileobj
from werkzeug.utils import secure_filename

class JSONRepositoryAdapter(BaseJsonRepository):

    def save(self, filename: str, stream: IO[bytes]) -> bool:

        if self._already_present(filename=filename):
            raise Exceptions.FileAlreadyUploaded(f"`{filename}` è già stato caricato precedentemente")

        content = ''.join([chunk.decode() for chunk in stream])
        if not self._is_valid(content=content):
            raise Exceptions.InvalidStructure(f"`{filename}` non rispetta la struttura")

        secured_filename = secure_filename(filename=filename)
        stream.seek(0)

        dst = os.path.join(Settings.folder, secured_filename)
        close_dst = False

        if isinstance(dst, str):
            dst = open(dst, "w+b")
            close_dst = True

        try:

            copyfileobj(stream, dst, 1024)

        except Exception as e:
            return False
        finally:
            if close_dst:
                dst.close()
            return True

    def remove(self, filename: str) -> bool:
        files = self._filenames()
        if filename in files:
            os.remove(os.path.join(Settings.folder, filename))
            return True

        return False

    def list_all(self) -> List[dict]:
        return [{
            'name': '.'.join(filename.split('.')[:-1]),
            'extension': filename.split('.')[-1],
            'date': datetime.fromtimestamp(os.stat(os.path.join(Settings.folder, filename)).st_ctime),
            'size': f"{os.stat(os.path.join(Settings.folder, filename)).st_size / 1024.0:.2f} Kb",
        } for filename in self._filenames()]


    @staticmethod
    def open(filename: str):
        secured_filename = secure_filename(filename)
        with open(join(Settings.folder, secured_filename), "r") as file:
            return json.load(file)

    def _filenames(self):
        return [filename for filename in os.listdir(Settings.folder)
                if os.path.isfile(filename) and filename.split('.')[-1] == 'json']

    def _is_valid(self, content: str) -> bool:
        content = json.loads(content)
        return JSONValidator.is_valid_structure(content)

    def _already_present(self, filename: str) -> bool:
        secured_filename = secure_filename(filename)
        return secured_filename in self._filenames()
