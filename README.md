# AI Engineer - Trial By Fire (RAG System)

A local Retrieval-Augmented Generation (RAG) application designed to analyze documents and answer questions using only the information contained in those documents.

The system runs completely locally and does not depend on external APIs.

---

## 🚀 Features

- **Local-first architecture** – All processing runs locally using Ollama and a local vector database.
- **Grounded responses** – The model answers questions only using the uploaded document context.
- **Page-aware citations** – Responses include page numbers showing where the answer came from.
- **Document-based Q&A** – Users can upload PDFs and ask questions directly from the interface.

---

## 🏗 Architecture

The system follows a standard RAG pipeline:

PDF Upload → Text Extraction → Document Chunking → Embeddings → Vector Database → Retrieval → LLM Response

### Backend
- FastAPI
- LangChain
- Qdrant Vector Database
- HuggingFace Embeddings (BAAI/bge-small-en)
- Ollama (phi3)

### Frontend
- React (TypeScript)
- Tailwind CSS

---

## 🛠 Prerequisites

Make sure the following tools are installed:

- Python **3.10+**
- Node.js **18+**
- **Ollama**

Install Ollama from:  
https://ollama.com

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
2. Install the Ollama model
ollama pull phi3

Make sure Ollama is running.

3. Start the backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend will run at:

http://localhost:8000
4. Start the frontend
cd frontend
npm install
npm run dev

Frontend will run at:

http://localhost:5173
📄 Usage

Upload the Wyrd Media Labs Wiki PDF.

Ask questions related to the document.

The system retrieves relevant sections and generates grounded answers with citations.

If the answer is not present in the document, the system will indicate that the information could not be found.

📁 Project Structure
project-root
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── models
│   │   └── utils
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── docker-compose.yml
├── setup.sh
└── README.md
⚠ Limitations

Retrieval accuracy depends on the quality of the PDF text extraction.

Very short or vague questions may retrieve less relevant chunks.

The system currently works best with small document collections.

🔮 Future Improvements

Possible improvements include:

Hybrid search (vector + keyword)

Cross-encoder reranking

Multi-document support

Streaming responses

Improved UI for document management

📜 License

This project was created as part of an AI engineering assignment demonstrating a local RAG implementation.

