import os

SERVER_OLLAMA = os.getenv('CFG__SERVER_OLLAMA', 'http://localhost:11434')
SERVER_HOST = os.getenv('CFG__SERVER_HOST', 'localhost')
SERVER_PORT = int(os.getenv('CFG__SERVER_PORT', '8000'))
PATCH_SQLITE = os.getenv('CFG__SQLITE_PATCH', None) is not None
ML_MODEL_MAIN=os.getenv('CFG__MODEL', 'llama2')