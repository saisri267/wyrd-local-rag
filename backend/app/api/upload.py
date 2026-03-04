import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.schemas import UploadResponse
from app.core.config import settings
from app.utils.pdf_processor import PDFProcessor
from app.core.rag_engine import rag_engine
from app.utils.logger import logger

router = APIRouter()

@router.post("/", response_model=UploadResponse)
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    file_path = os.path.join(settings.UPLOAD_DIR, file.filename)
    
    try:
        # Save file to disk
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process and Extract Text
        processor = PDFProcessor()
        documents = processor.extract_text_with_metadata(file_path, file.filename)
        
        # Index in Vector DB
        rag_engine.add_documents(documents)
        
        return UploadResponse(
            filename=file.filename,
            status="success",
            message=f"File '{file.filename}' processed and indexed successfully."
        )
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
