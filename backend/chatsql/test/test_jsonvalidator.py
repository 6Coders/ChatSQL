import pytest
from chatsql.utils.JSONValidator import JSONValidator

class TestJSONValidator:
    def test_valid_structure(self):
        json_data = {
            "tables_info": {
                "table1": {
                    "table_description": "Description",
                    "columns": [{"column_name": "Name", "column_description": "Description", "attribute_type": "Type"}],
                    "attribute_types": ["Type"]
                }
            },
            "primary_key": {"table1": ["column1"]},
            "foreign_keys": []
        }
        assert JSONValidator.is_valid_structure(json_data) == True

    def test_invalid_structure_missing_keys(self):
        json_data = {
            "tables_info": {},
            "primary_key": {},
            # missing foreign_keys
        }
        assert JSONValidator.is_valid_structure(json_data) == False

    def test_invalid_structure_invalid_table_info(self):
        json_data = {
            "tables_info": {
                "table1": {
                    "table_description": "Description",
                    "columns": [{"column_name": "Name", "column_description": "Description"}],  # Missing attribute_type
                    "attribute_types": ["Type"]
                }
            },
            "primary_key": {"table1": ["column1"]},
            "foreign_keys": []
        }
        assert JSONValidator.is_valid_structure(json_data) == False


if __name__ == "__main__":
    pytest.main()