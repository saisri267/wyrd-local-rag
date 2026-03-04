import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API Settings
    PROJECT_NAME: str = "Local RAG Assistant"
    API_V1_STR: str = "/api/v1"
    
    # File Settings
    UPLOAD_DIR: str = "uploads"
    
    # RAG / AI Settings
    MODEL_NAME: str = "phi3"  
    EMBEDDING_MODEL: str = "BAAI/bge-small-en"
    
    # Ollama Configuration
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    
    
    # CORS Settings
    BACKEND_CORS_ORIGINS: List[str] = ["*"]

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()

# Create required directories on startup
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
