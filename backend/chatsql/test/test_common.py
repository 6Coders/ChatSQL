from chatsql.utils.Common import Settings

def test_settings_default_values():
    # Arrange
    settings = Settings()

    # Assert
    assert settings.folder is None

def test_settings_custom_values():
    # Arrange
    custom_folder = "custom_folder"
    settings = Settings(folder=custom_folder)

    # Assert
    assert settings.folder == custom_folder