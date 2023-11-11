import os

SERVER_OLLAMA = os.getenv('CFG__SERVER_OLLAMA', 'http://localhost:11434')
SERVER_HOST = os.getenv('CFG__SERVER_HOST', 'localhost')
SERVER_PORT = int(os.getenv('CFG__SERVER_PORT', '8000'))
