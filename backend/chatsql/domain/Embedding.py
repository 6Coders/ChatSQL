from dataclasses import dataclass

import numpy as np

@dataclass
class Embedding:
    text: str
    table_name: str
    data: np.ndarray

    def __post_init__(self):

        if not isinstance(self.text, str):
            raise ValueError("'text' must be a string")
        if not isinstance(self.table_name, str):
            raise ValueError("'table_name' must be a string")
        if not isinstance(self.data, np.ndarray):
            raise ValueError("'data' must be a numpy array")

        if self.data.size == 0:
            raise ValueError("'data' cannot be empty")