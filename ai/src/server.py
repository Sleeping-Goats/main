from fastapi import FastAPI
from langserve import add_routes
from langchain.chat_models import ChatOllama
from langchain.prompts.chat import ChatPromptTemplate
from config import SERVER_OLLAMA, SERVER_HOST, SERVER_PORT, ML_MODEL_MAIN

chat_model = ChatOllama(
    model=ML_MODEL_MAIN,
    base_url=SERVER_OLLAMA,
)

chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that translates {input_language} to {output_language}."),
    ("human", "{text}"),
])

app = FastAPI(
    title="LangChain Server",
    version="1.0",
    description="A simple api server using Langchain's Runnable interfaces",
)

add_routes(
    app,
    chat_prompt | chat_model,
    path="/v1/model",
)

add_routes(
    app,
    ChatPromptTemplate.from_messages([
        ("system", "{system}"),
        ("human", "{text}"),
    ]) | chat_model,
    path="/v1/free",
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=SERVER_HOST, port=SERVER_PORT)
