from chatsql.utils.Exceptions import InvalidStructure, FileAlreadyUploaded, FileNotSaved, EmbeddingsNotLoaded, FileNotRemoved

def test_invalid_structure_exception():
    # Arrange
    expected_message = "Invalid file structure"
    
    # Act
    exception = InvalidStructure()
    
    # Assert
    assert exception.message == expected_message

def test_file_already_uploaded_exception():
    # Arrange
    expected_message = "File Already uploaded"
    
    # Act
    exception = FileAlreadyUploaded()
    
    # Assert
    assert exception.message == expected_message

def test_file_not_saved_exception():
    # Arrange
    expected_message = "Error saving file"
    
    # Act
    exception = FileNotSaved()
    
    # Assert
    assert exception.message == expected_message

def test_embeddings_not_loaded_exception():
    # Arrange
    expected_message = "Error during embeddings loading from file"
    
    # Act
    exception = EmbeddingsNotLoaded()
    
    # Assert
    assert exception.message == expected_message

def test_file_not_removed_exception():
    # Arrange
    expected_message = "Error removing file. Check if permissions are correct"
    
    # Act
    exception = FileNotRemoved()
    
    # Assert
    assert exception.message == expected_message
