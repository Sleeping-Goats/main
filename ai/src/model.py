from langchain.chat_models import ChatOpenAI
from langchain.chat_models import ChatOllama
from langchain.embeddings import OllamaEmbeddings
from langchain.embeddings import OpenAIEmbeddings

from config import ML_MODEL_MAIN, SERVER_OLLAMA, SERVER_OPENAI_MODEL, SERVER_OPENAI_TOKEN


def create_embedding():
    if SERVER_OPENAI_TOKEN is not None:
        return OpenAIEmbeddings(
            model=SERVER_OPENAI_MODEL,
            openai_api_key=SERVER_OPENAI_TOKEN
        )

    return OllamaEmbeddings(
        model=ML_MODEL_MAIN
    )


def create_model():
    if SERVER_OPENAI_TOKEN is not None:
        return ChatOpenAI(
            model_name=SERVER_OPENAI_MODEL,
            openai_api_key=SERVER_OPENAI_TOKEN
        )

    return ChatOllama(
        model=ML_MODEL_MAIN,
        base_url=SERVER_OLLAMA,
    )

    # TODO: This function could be used to create the database lazily and store it on the filesystem
    def create_retriever():
        if False:
            # load the document and split it into chunks
            loader = DirectoryLoader(path="data", glob="*.txt", loader_cls=TextLoader)
            documents = loader.load()

            # split it into chunks
            text_splitter = CharacterTextSplitter(chunk_size=40, chunk_overlap=0)
            docs = text_splitter.split_documents(documents)

            print('Splitting...')
            print('- - - - - - - - - - - - -')
            print(docs)

            vectorstore = Chroma.from_documents(
                documents=docs,
                embedding=create_embedding(),
                persist_directory="./chroma_db_oai"
            )
        else:
            vectorstore = Chroma(
                embedding_function=create_embedding(),
                persist_directory="./chroma_db_oai"
            )

        return vectorstore.as_retriever(
            search_type="mmr",  # Also test "similarity"
            search_kwargs={"k": 8},
        )
