class JSONValidator:
    @staticmethod
    def is_valid_structure(json_data):
        expected_keys = ["tables_info", "primary_key", "foreign_keys"]
        if all(key in json_data for key in expected_keys):
            if JSONValidator.validate_tables_info(json_data["tables_info"]) and \
               JSONValidator.validate_primary_key(json_data["primary_key"]) and \
               JSONValidator.validate_foreign_keys(json_data["foreign_keys"]):
                return True
        return False

    @staticmethod
    def validate_tables_info(tables_info):
        for table_name, table_info in tables_info.items():
            if "table_description" not in table_info or "columns" not in table_info or "attribute_types" not in table_info:
                return False
            if not isinstance(table_info["columns"], list) or not isinstance(table_info["attribute_types"], list):
                return False
            if len(table_info["columns"]) != len(table_info["attribute_types"]):
                return False
            for column in table_info["columns"]:
                if not all(key in column for key in ["column_name", "column_description", "attribute_type"]):
                    return False
        return True

    @staticmethod
    def validate_primary_key(primary_key):
        if not all(isinstance(value, list) for value in primary_key.values()):
            return False
        return True

    @staticmethod
    def validate_foreign_keys(foreign_keys):
        for fk in foreign_keys:
            if not all(key in fk for key in ["table", "foreign_key", "attribute", "reference_table", "reference_attribute"]):
                return False
        return True
