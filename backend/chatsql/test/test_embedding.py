from chatsql.domain.Embedding import Embedding
import numpy as np

def test_embedding_creation():
    # Arrange
    text = "example text"
    data = np.array([1, 2, 3])
    
    # Act
    embedding = Embedding(text=text, data=data)
    
    # Assert
    assert embedding.text == text
    assert np.array_equal(embedding.data, data)
