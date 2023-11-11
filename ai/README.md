# AI

This Project implements a simple API to access a model chain.
In particular, it currently runs llama2 using ollama.

Deployments are managed through [compose](./docker-compose.yml).
Building the API Server can be achieved through the following command:

```shell
  podman build -t junction2023/langchain .
```

## Installing models

Downloading models is as easy as running:

```shell
  #                                       v----- Model Name
  docker-compose exec ollama ollama run llama2
  #               ^----- Executing a command
  #                     ^----- Service name (Compose file)
  #                           ^----- Command in container
  #                                 ^----- Installation subcommand
```

## API Documentation

After starting the Server (assuming defaults) the following routes are of interest:

[General Documentation](https://localhost:8000/docs)
[Model Version 1 - API](https://localhost:8000/v1/model)
[Model Version 1 - Playground](https://localhost:8000/v1/model/playground)

## Installation on a Server

The installation here assumes an ubuntu server.
Most modern Distributions should work similarly.

1. Installing System Dependencies (e.g. python python3.10-venv)
2. Create a virtual Environment & install dependencies

```shell
mkdir /opt/langchain
python3 -m venv .         # Create necessary files
chmod 777 ./bin/activate  # Allows to execute the necessary shell script  
source ./bin/activate     # Switches the current terminal to use the virtual Environment  
# Install python dependencies
python3 -m pip install aiohttp==3.9.0b0
python3 -m pip install langchain "langserve[all]" uvicorn fastapi chromadb pysqlite3-binary
```

3. Install ollama.ai

```shell
curl https://ollama.ai/install.sh | sh  # Runs the installation script
systemctl start ollama                  # Starts the Service using systemd
ollama run llama2                       # Installs the model to use (here llama2)
```

4. Sync src to /opt/langchain (See sync_server.sh)
5. Sync /lib/systemd/system/langchain.service (See sync_server.sh)
5. Activate and start the Service

```shell
systemctl enable langchain
systemctl start langchain
```