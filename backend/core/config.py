from pydantic_settings import BaseSettings
from pydantic import Field
from functools import lru_cache
from typing import Optional


class Settings(BaseSettings):
    """Application configuration settings"""
    # API Settings
    API_TITLE: str = "Expense Tracker API"
    API_VERSION: str = "1.0.0"
    API_DESCRIPTION: str = "A comprehensive expense tracking API with budgeting and analytics"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str = Field(..., description="PostgreSQL connection String")
    
    # JWT/Security
    SECRET_KEY: str = Field(..., description="Secret key for signing jwt token")

    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1

    # CORS
    CORS_ORIGINS: list = [
        "http://localhost:5173",   # Vite local dev
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "https://expense-tracker-kcs85nq4r-tp794444-6796s-projects.vercel.app"
    ]
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: list = ["*"]
    CORS_ALLOW_HEADERS: list = ["*"]
    
    # Pagination
    DEFAULT_PAGE_SIZE: int = 10
    MAX_PAGE_SIZE: int = 100
    
    # File Upload
    MAX_UPLOAD_SIZE: int = 5 * 1024 * 1024  # 5MB
    ALLOWED_UPLOAD_FORMATS: list = ["pdf", "png", "jpg", "jpeg"]
    
    # Email (if needed for notifications)
    SMTP_SERVER: Optional[str] = None
    SMTP_PORT: Optional[int] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAIL_FROM: Optional[str] = None
    
    # # AI/ML Settings
    # AI_MODEL_ENABLED: bool = False
    # AI_MODEL_NAME: Optional[str] = None
    # AI_API_KEY: Optional[str] = None
    AI_MODEL_NAME: str = "rule_base"
    ENABLE_AT_LOGGING: bool = False
    
    # # Logging
    # LOG_LEVEL: str = "INFO"
    # LOG_FILE: str = "logs/app.log"
    
    # Rate Limiting
    # RATE_LIMIT_ENABLED: bool = True
    # RATE_LIMIT_REQUESTS: int = 100
    # RATE_LIMIT_PERIOD: int = 3600  # per hour
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()