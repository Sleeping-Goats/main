from config import PATCH_SQLITE, ML_MODEL_MAIN, SERVER_OLLAMA

# Workaround: sqlite might be too old. Install pysqlite3-binary and set PATCH_SQLITE
if PATCH_SQLITE:
    __import__('pysqlite3')
    import sys

    sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')

from langchain.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains.question_answering import load_qa_chain
from langchain.document_loaders import UnstructuredURLLoader
from model import create_model, create_embedding
import shutil


def create_retriever(recreate=False):
    persitence_dir = './chroma_db_oai'
    if recreate:
        shutil.rmtree(persitence_dir)
        # TODO: Download all types from here
        root = 'http://' + '94.237.38.133:8080' + '/data-sources'

        sources = [
            'financial',
            'news',
            'patents',
        ]

        urls = [root + '/' + x for x in sources]

        loader = UnstructuredURLLoader(urls=urls)
        documents = loader.load()

        text_splitter = CharacterTextSplitter(chunk_size=40, chunk_overlap=0)
        docs = text_splitter.split_documents(documents)
        vectorstore = Chroma.from_documents(
            documents=docs,
            persist_directory=persitence_dir,
            embedding=create_embedding(),
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


# retriever = create_retriever(True)
retriever = create_retriever()

question = "What is stainless steel?"
docs = retriever.get_relevant_documents(question)
print('- - - - - - - - - - - - -')
print(docs)
print('- - - - - - - - - - - - -')

chat_model = create_model()

chain = load_qa_chain(chat_model, chain_type="stuff")
answer = chain.run(input_documents=docs, question=question)
print(answer)
