import os
import shutil
import logging

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, AliasChoices

from app.core.config import settings
from app.core.rag_engine import rag_engine


# ----------------------------
# Logging
# ----------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("rag_app")


# ----------------------------
# App Initialization
# ----------------------------
app = FastAPI(
    title=settings.PROJECT_NAME,
    # Allow FastAPI to auto-handle trailing slashes
    redirect_slashes=True
)


# ----------------------------
# CORS Middleware
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # OK for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------------
# Request Models
# ----------------------------
class QueryRequest(BaseModel):
    # Accept "question", "query", or "text"
    question: str = Field(
        validation_alias=AliasChoices("question", "query", "text")
    )


# ----------------------------
# Health Check
# ----------------------------
@app.get("/")
def read_root():
    return {"status": "ok"}


# ----------------------------
# Upload Endpoint
# ----------------------------
@app.post("/api/v1/upload")
@app.post("/api/v1/upload/")  # Allow both versions safely
async def upload_document(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

    file_path = os.path.join(settings.UPLOAD_DIR, file.filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        success = rag_engine.add_documents(file_path)

        if not success:
            raise HTTPException(status_code=500, detail="Indexing failed.")

        return {
            "filename": file.filename,
            "message": "Successfully indexed"
        }

    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ----------------------------
# Chat Endpoint
# ----------------------------
@app.post("/api/v1/chat")
@app.post("/api/v1/chat/")  # Allow both versions
async def chat(request: QueryRequest):
    try:
        response = rag_engine.query(request.question)
        return response

    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ----------------------------
# Run Server
# ----------------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",   # Avoid Windows localhost issues
        port=8000,
        reload=True
    )