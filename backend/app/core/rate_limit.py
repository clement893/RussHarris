"""
Rate Limiting Middleware
Protection contre les abus et attaques par déni de service
"""

from typing import Callable
from fastapi import Request, HTTPException, status
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.core.config import settings

# Initialiser le rate limiter
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["1000/hour"],  # Limite par défaut
    storage_uri="memory://",  # En mémoire (pour production, utiliser Redis)
)

# Rate limits par endpoint
RATE_LIMITS = {
    "auth": {
        "/api/v1/auth/login": "5/minute",
        "/api/v1/auth/register": "3/minute",
        "/api/v1/auth/refresh": "10/minute",
    },
    "api": {
        "/api/v1/users": "100/hour",
        "/api/v1/users/{user_id}": "200/hour",
    },
    "default": "1000/hour",
}


def get_rate_limit(path: str) -> str:
    """Obtenir la limite de rate pour un chemin donné"""
    # Vérifier les limites spécifiques
    for category, limits in RATE_LIMITS.items():
        if category == "default":
            continue
        for pattern, limit in limits.items():
            if pattern in path or path.startswith(pattern.replace("{user_id}", "")):
                return limit
    return RATE_LIMITS["default"]


def setup_rate_limiting(app):
    """Configurer le rate limiting pour l'application"""
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
    return app


def rate_limit_decorator(limit: str):
    """Décorateur pour appliquer rate limiting à un endpoint"""
    return limiter.limit(limit)

