import unittest
from chatsql.utils.JSONValidator import JSONValidator

# Test di unità per JSONValidator
class TestJSONValidator(unittest.TestCase):
    def test_is_valid_structure_valid(self):
        json_data = {
            "tables_info": {
                "table1": {"table_description": "Description", "columns": [], "attribute_types": []}
            },
            "primary_key": {"table1": ["column1"]},
            "foreign_keys": []
        }
        assert JSONValidator.is_valid_structure(json_data) == True

    def test_is_valid_structure_invalid(self):
        # Test caso in cui mancano chiavi
        json_data_missing_keys = {"tables_info": {}, "primary_key": {}, "foreign_keys": {}}
        assert JSONValidator.is_valid_structure(json_data_missing_keys) == False

        # Test caso in cui le tabelle non hanno tutte le informazioni necessarie
        json_data_invalid_tables_info = {
            "tables_info": {"table1": {"columns": [], "attribute_types": []}},
            "primary_key": {"table1": ["column1"]},
            "foreign_keys": []
        }
        assert JSONValidator.is_valid_structure(json_data_invalid_tables_info) == False

        # Test caso in cui le chiavi primarie non sono correttamente strutturate
        json_data_invalid_primary_key = {
            "tables_info": {"table1": {"table_description": "Description", "columns": [], "attribute_types": []}},
            "primary_key": {"table1": "column1"},
            "foreign_keys": []
        }
        assert JSONValidator.is_valid_structure(json_data_invalid_primary_key) == False

        # Test caso in cui le chiavi esterne non sono correttamente strutturate
        json_data_invalid_foreign_keys = {
            "tables_info": {"table1": {"table_description": "Description", "columns": [], "attribute_types": []}},
            "primary_key": {"table1": ["column1"]},
            "foreign_keys": [{"table": "table1"}]
        }
        assert JSONValidator.is_valid_structure(json_data_invalid_foreign_keys) == False

    # Aggiungi altri test per i metodi di validazione delle tabelle, delle chiavi primarie e delle chiavi esterne se necessario
if __name__ == '__main__':
    unittest.main()
