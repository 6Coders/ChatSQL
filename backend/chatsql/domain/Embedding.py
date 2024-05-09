from dataclasses import dataclass

import numpy as np

@dataclass
class Embedding:
    text: str
    data: np.ndarray

    def __post_init__(self):

        if not isinstance(self.text, str):
            raise ValueError("'text' must be a string")
        if not isinstance(self.data, np.ndarray):
            raise ValueError("'data' must be a numpy array")
