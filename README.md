# AI Engineer - Trial By Fire (RAG System)

This project implements a local **Retrieval-Augmented Generation (RAG)** system that answers questions based on a PDF document.

The system runs completely locally and does not require external APIs.

---

## Features

- Runs fully locally using **Ollama**
- Uses **Qdrant vector database** for document retrieval
- Answers questions based only on the uploaded document
- Includes **page number citations** in responses
- Simple frontend interface for document upload and chat

---

## Architecture

RAG Pipeline:

PDF Upload → Text Extraction → Chunking → Embeddings → Vector Database → Retrieval → LLM Response

### Backend
- FastAPI  
- LangChain  
- Qdrant  
- HuggingFace Embeddings (BAAI/bge-small-en)  
- Ollama (phi3)

### Frontend
- React (TypeScript)  
- Tailwind CSS

---

## Prerequisites

Make sure the following are installed:

- Python **3.10+**
- Node.js **18+**
- **Ollama**

Install Ollama from:  
https://ollama.com

---

## Installation

### Clone the repository

```bash
git clone https://github.com/saisri267/wyrd-local-rag.git
cd wyrd-local-rag
````

### Install Ollama model

```bash
ollama pull phi3
```

### Run backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

### Run frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Usage

1. Upload the **Wyrd Media Labs Wiki PDF**
2. Ask questions about the document
3. The system retrieves relevant content and generates answers

If the information is not in the document, the system will say it cannot find it.

---

## License

This project was created as part of an **AI engineering assignment demonstrating a local RAG implementation**.

````
