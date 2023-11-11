FROM python:3-slim

RUN apt-get update && \
    apt-get install -y build-essential

WORKDIR "/opt/langchain"

# Creates a virtual environment, apparently aiohttp needs to be manually downgraded
# TODO: Fix permissions (777 is not great)
# TODO: Fix hardcoded version
RUN \
  python3 -m venv . && \
  chmod 777 ./bin/activate && \
  ./bin/activate && \
  python3 -m pip install aiohttp==3.9.0b0

# Seperated from main RUN command, so that we do not have to download aiohttp again (building it might be fragile)
RUN \
  ./bin/activate && \
  python3 -m pip install langchain "langserve[all]" uvicorn fastapi langserve[all]

COPY src .
CMD ["python3", "/opt/langchain/server.py"]

# python -m pip install --upgrade pip
# TODO: Cannot install litellm now, due to bug https://github.com/BerriAI/litellm/issues/774
# TODO: litellm openai google-generativeai