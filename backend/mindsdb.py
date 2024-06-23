import mindsdb

mdb = mindsdb.connect()

create_engine_sql = """
CREATE ML_ENGINE rag_engine
FROM rag
USING
    openai_api_key = OPEN_AI_KEY;
"""

create_model_sql = """
CREATE MODEL mindsdb_rag_model
predict answer
USING
   engine = 'rag_engine',
   llm_type = 'openai',
   url='https://docs.mindsdb.com/what-is-mindsdb',
   vector_store_folder_name = 'db_connection',
   input_column = 'question';
"""

describe_model_sql = "DESCRIBE mindsdb_rag_model;"

# Execute the SQL commands
mdb.sql(create_engine_sql)
mdb.sql(create_model_sql)
description = mdb.sql(describe_model_sql)

# Print the description of the model
print(description)
