import logging
from typing import List, Dict, Any, Union

from langchain_ollama import OllamaLLM as Ollama
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

from langchain_core.prompts import PromptTemplate
from langchain_core.documents import Document

from app.core.config import settings
from app.utils.pdf_processor import PDFProcessor


logger = logging.getLogger("rag_app")


class RAGEngine:
    _instance = None

    # ----------------------------
    # Singleton Pattern
    # ----------------------------
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(RAGEngine, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance

    # ----------------------------
    # Initialization
    # ----------------------------
    def _initialize(self):
        logger.info("Initializing RAG Engine...")
        

        # Embeddings
        self.embeddings = HuggingFaceEmbeddings(
            model_name=settings.EMBEDDING_MODEL,
            encode_kwargs={"normalize_embeddings": False}
        )

        # ----------------------------
        # Qdrant Client (Local)
        # ----------------------------
        self.qdrant_client = QdrantClient(
            path="./qdrant_db"
        )

        collection_name = "local_rag_collection"

        # Check if collection exists
        existing_collections = [
            c.name for c in self.qdrant_client.get_collections().collections
        ]

        # Create collection if missing
        if collection_name not in existing_collections:
            logger.info("Creating Qdrant collection...")

            self.qdrant_client.create_collection(
                collection_name=collection_name,
                vectors_config=VectorParams(
                    size=384,  # MiniLM / BGE-small embedding dimension
                    distance=Distance.COSINE
                )
            )

        # Vector Store
        self.vector_db = QdrantVectorStore(
            client=self.qdrant_client,
            collection_name=collection_name,
            embedding=self.embeddings
        )

        # ----------------------------
        # Local LLM
        # ----------------------------
        self.llm = Ollama(
            model=settings.MODEL_NAME,
            base_url=settings.OLLAMA_BASE_URL,
            temperature=0.1,
            num_predict=150,
            num_ctx=1024
        )

        # ----------------------------
        # Prompt Template
        # ----------------------------
        self.prompt_template = PromptTemplate(
            input_variables=["context", "question"],
            template="""
You are a document assistant that answers questions using ONLY the provided context.

Rules:
1. Use ONLY the information present in the context.
2. Do NOT add any external knowledge.
3. Do NOT invent information.
4. Do NOT include document titles or headers.
5. Keep the answer concise and factual.
6. Always include the page citation like [Page X].
7. If the answer is not present, say:
"I cannot find this information in the provided documents."

Context:
{context}

Question:
{question}

Answer:
"""
        )

    # ----------------------------
    # Add Documents
    # ----------------------------
    def add_documents(self, input_data: Union[str, List[Document]]) -> bool:
        try:
            if isinstance(input_data, str):
                processor = PDFProcessor()
                documents = processor.process(input_data)
            else:
                documents = input_data

            if not documents:
                logger.warning("No documents to index.")
                return False

            self.vector_db.add_documents(documents)

            logger.info(f"Indexed {len(documents)} document chunks.")
            return True

        except Exception as e:
            logger.error(f"Error indexing documents: {str(e)}")
            return False

    # ----------------------------
    # Query Method
    # ----------------------------
    def query(self, question: str) -> Dict[str, Any]:
        try:
            # Retrieve relevant chunks
            docs = self.vector_db.similarity_search(question, k=3)

            if not docs:
                return {
                    "answer": "I cannot find this information in the provided documents.",
                    "sources": []
                }

            # Build context
            context = "\n\n".join(
                [f"[Page {doc.metadata.get('page')}]\n{doc.page_content}" for doc in docs]
            )

            prompt = self.prompt_template.format(
                context=context,
                question=question
            )

            response = self.llm.invoke(prompt)

            # Deduplicate sources
            unique_sources = {}
            for doc in docs:
                page = doc.metadata.get("page")
                source = doc.metadata.get("source")
                key = (page, source)

                if key not in unique_sources:
                    unique_sources[key] = {
                        "page": page,
                        "source": source
                    }

            return {
                "answer": response.strip(),
                "sources": list(unique_sources.values())
            }

        except Exception as e:
            logger.error(f"Query error: {str(e)}")
            return {
                "answer": "An internal error occurred while processing the request.",
                "sources": []
            }


# Singleton instance
rag_engine = RAGEngine()