from config import PATCH_SQLITE, ML_MODEL_MAIN, SERVER_OLLAMA

# Workaround: sqlite might be too old. Install pysqlite3-binary and set PATCH_SQLITE
if PATCH_SQLITE:
    __import__('pysqlite3')
    import sys

    sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')

from langchain.vectorstores import Chroma
from langchain.embeddings import OllamaEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.chat_models import ChatOllama
from langchain.document_loaders import DirectoryLoader
from langchain.document_loaders import TextLoader
from langchain.chains.question_answering import load_qa_chain


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
            embedding=OllamaEmbeddings(
                model=ML_MODEL_MAIN
            ),
            persist_directory="./chroma_db_oai"
        )
    else:
        vectorstore = Chroma(
            embedding_function=OllamaEmbeddings(
                model=ML_MODEL_MAIN
            ),
            persist_directory="./chroma_db_oai"
        )

    return vectorstore.as_retriever(
        search_type="mmr",  # Also test "similarity"
        search_kwargs={"k": 8},
    )


retriever = create_retriever()

question = "What are pancakes made from and what related conflicts arise?"
docs = retriever.get_relevant_documents(question)
print('- - - - - - - - - - - - -')
print(docs)
print('- - - - - - - - - - - - -')

chat_model = ChatOllama(
    model=ML_MODEL_MAIN,
    base_url=SERVER_OLLAMA,
)

chain = load_qa_chain(chat_model, chain_type="stuff")
answer = chain.run(input_documents=docs, question=question)
print(answer)
