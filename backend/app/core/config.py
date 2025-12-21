"""
Application Configuration
Uses Pydantic Settings for validation
"""

from functools import lru_cache
from typing import List

from pydantic import Field, PostgresDsn, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings with validation"""

    # Project
    PROJECT_NAME: str = "MODELE API"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "FastAPI backend with OpenAPI/Swagger auto-generation"
    API_V1_STR: str = "/api/v1"

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = False

    # CORS
    CORS_ORIGINS: List[str] = Field(
        default=["http://localhost:3000", "http://localhost:3001"],
        description="Allowed CORS origins",
    )

    # Database
    DATABASE_URL: PostgresDsn = Field(
        default="postgresql+asyncpg://user:password@localhost:5432/modele",
        description="Database connection URL",
    )

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def assemble_db_connection(cls, v: str | PostgresDsn) -> str:
        if isinstance(v, str):
            return v
        return str(v)

    # Security
    SECRET_KEY: str = Field(
        default="change-this-secret-key-in-production",
        description="Secret key for JWT tokens",
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # OpenAPI
    OPENAPI_TAGS: List[dict] = Field(
        default_factory=lambda: [
            {"name": "auth", "description": "Authentication"},
            {"name": "users", "description": "User management"},
        ]
    )

    # Redis Cache (optional)
    REDIS_URL: str = Field(
        default="",
        description="Redis connection URL for caching",
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()


settings = get_settings()

