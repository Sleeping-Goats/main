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