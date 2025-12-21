"""
FastAPI Main Application
Configured with OpenAPI/Swagger auto-generation
"""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi

from app.core.config import settings
from app.core.database import init_db, close_db
from app.api.v1.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Lifespan context manager for startup and shutdown events"""
    # Startup
    await init_db()
    yield
    # Shutdown
    await close_db()


def create_app() -> FastAPI:
    """Create and configure FastAPI application"""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description=settings.DESCRIPTION,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    # CORS Middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include API router
    app.include_router(api_router, prefix=settings.API_V1_STR)

    # Custom OpenAPI schema
    def custom_openapi() -> dict:
        if app.openapi_schema:
            return app.openapi_schema

        openapi_schema = get_openapi(
            title=settings.PROJECT_NAME,
            version=settings.VERSION,
            description=settings.DESCRIPTION,
            routes=app.routes,
        )

        # Add custom tags
        openapi_schema["tags"] = [
            {
                "name": "auth",
                "description": "Authentication endpoints",
            },
            {
                "name": "users",
                "description": "User management endpoints",
            },
            {
                "name": "health",
                "description": "Health check endpoints",
            },
        ]

        app.openapi_schema = openapi_schema
        return app.openapi_schema

    app.openapi = custom_openapi

    return app


app = create_app()
