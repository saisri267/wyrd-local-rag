from pydantic import BaseModel
from typing import List, Optional

class ChatRequest(BaseModel):
    message: str

class Citation(BaseModel):
    page: str
    content: str
    source: Optional[str] = "Document"

class ChatResponse(BaseModel):
    answer: str
    citations: List[Citation]

class UploadResponse(BaseModel):
    filename: str
    status: str
    message: str
