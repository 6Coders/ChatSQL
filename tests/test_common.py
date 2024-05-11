import unittest
from unittest import TestCase
from backend.chatsql.utils.Common import Settings

class TestSettings(TestCase):
    def test_settings_default_values(self):
        # Arrange
        settings = Settings()

        # Assert
        self.assertIsNone(settings.folder)

    def test_settings_custom_values(self):
        # Arrange
        custom_folder = "custom_folder"
        settings = Settings(folder=custom_folder)

        # Assert
        self.assertEquals(settings.folder, custom_folder)


if __name__ == '__main__':
    unittest.main()