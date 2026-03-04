from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, ChatResponse
from app.core.rag_engine import rag_engine
from app.utils.logger import logger

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")
    
    try:
        result = rag_engine.query(request.message)
        return ChatResponse(
            answer=result["answer"],
            citations=result["citations"]
        )
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Engine error: {str(e)}")
