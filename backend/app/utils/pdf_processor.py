import os
from typing import List
from pypdf import PdfReader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
import logging
import re

logger = logging.getLogger("rag_app")

class PDFProcessor:
    def __init__(self):
        # Splitting text into chunks of ~1000 characters is best for RAG
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=400,
            chunk_overlap=50,
            separators=["\n\n", "\n", " ", ""]
        )

    def process(self, file_path: str) -> List[Document]:
        """Loads PDF, extracts text by page, and then splits into chunks."""
        filename = os.path.basename(file_path)
        
        # 1. Extract text from pages
        pages = self.extract_text_with_metadata(file_path, filename)
        
        # 2. Split pages into smaller chunks for the Vector DB
        if pages:
            chunks = self.text_splitter.split_documents(pages)
            logger.info(f"Split {filename} into {len(chunks)} chunks.")
            return chunks
        
        return []

    @staticmethod
    def extract_text_with_metadata(file_path: str, filename: str) -> List[Document]:
        """Extrae texto de un PDF y mantiene el número de página como metadata."""
        documents = []
        try:
            reader = PdfReader(file_path)
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                if text:
    # Fix broken characters like "W yrd" → "Wyrd"
                    text = re.sub(r'\b([A-Za-z])\s+(?=[A-Za-z])', r'\1', text)
                if text and text.strip():
                    documents.append(
                        Document(
                            page_content=text,
                            metadata={
                                "source": filename,
                                "page": i + 1  # Store as integer for consistency
                            }
                        )
                    )
            logger.info(f"Successfully extracted {len(documents)} pages from {filename}.")
        except Exception as e:
            logger.error(f"Error processing PDF {filename}: {str(e)}")
            return []
            
        return documents