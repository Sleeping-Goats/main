from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain.prompts.chat import ChatPromptTemplate
from langserve import add_routes

from config import SERVER_HOST, SERVER_PORT
from model import create_model

chat_model = create_model()

chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that translates {input_language} to {output_language}."),
    ("human", "{text}"),
])

app = FastAPI(
    title="LangChain Server",
    version="1.0",
    description="A simple api server using Langchain's Runnable interfaces",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

add_routes(
    app,
    chat_prompt | chat_model,
    path="/v1/model",
)

add_routes(
    app,
    ChatPromptTemplate.from_messages([
        ("human", "Chat History: {chat_history}\nFollow Up Input: {text}"),
        ("system", """
            Respond to the Follow Up Input if the Chat History is none.
            Otherwise respond to the Follow Up Input and consider the Chat History.
            
            In any case, If you do not know the answer reply with 'I am sorry'.
            {system}
        """)
    ]) | chat_model,
    path="/v1/free",
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=SERVER_HOST, port=SERVER_PORT)
