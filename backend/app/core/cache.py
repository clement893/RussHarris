"""
Redis Cache Configuration
Cache backend pour améliorer les performances
"""

from typing import Optional, Any
import json
from functools import wraps
import hashlib

try:
    import redis.asyncio as redis
    REDIS_AVAILABLE = True
except ImportError:
    REDIS_AVAILABLE = False
    redis = None

from app.core.config import settings
from app.core.logging import logger


class CacheBackend:
    """Backend de cache abstrait"""
    
    def __init__(self):
        self.redis_client: Optional[redis.Redis] = None
        self.use_redis = REDIS_AVAILABLE and hasattr(settings, 'REDIS_URL')
        
        if self.use_redis and settings.REDIS_URL:
            try:
                self.redis_client = redis.from_url(
                    settings.REDIS_URL,
                    encoding="utf-8",
                    decode_responses=True
                )
                logger.info("Redis cache initialized")
            except Exception as e:
                logger.warning(f"Failed to initialize Redis: {e}")
                self.use_redis = False
    
    async def get(self, key: str) -> Optional[Any]:
        """Récupérer une valeur du cache"""
        if not self.use_redis or not self.redis_client:
            return None
        
        try:
            value = await self.redis_client.get(key)
            if value:
                return json.loads(value)
        except Exception as e:
            logger.error(f"Cache get error: {e}")
        return None
    
    async def set(self, key: str, value: Any, expire: int = 300) -> bool:
        """Stocker une valeur dans le cache"""
        if not self.use_redis or not self.redis_client:
            return False
        
        try:
            await self.redis_client.setex(
                key,
                expire,
                json.dumps(value, default=str)
            )
            return True
        except Exception as e:
            logger.error(f"Cache set error: {e}")
            return False
    
    async def delete(self, key: str) -> bool:
        """Supprimer une clé du cache"""
        if not self.use_redis or not self.redis_client:
            return False
        
        try:
            await self.redis_client.delete(key)
            return True
        except Exception as e:
            logger.error(f"Cache delete error: {e}")
            return False
    
    async def clear_pattern(self, pattern: str) -> int:
        """Supprimer toutes les clés correspondant à un pattern"""
        if not self.use_redis or not self.redis_client:
            return 0
        
        try:
            keys = await self.redis_client.keys(pattern)
            if keys:
                return await self.redis_client.delete(*keys)
        except Exception as e:
            logger.error(f"Cache clear_pattern error: {e}")
        return 0


# Instance globale
cache_backend = CacheBackend()


def cache_key(*args, **kwargs) -> str:
    """Générer une clé de cache à partir d'arguments"""
    key_data = f"{args}:{sorted(kwargs.items())}"
    return hashlib.md5(key_data.encode()).hexdigest()


def cached(expire: int = 300, key_prefix: str = ""):
    """
    Décorateur pour mettre en cache le résultat d'une fonction
    
    Usage:
        @cached(expire=600, key_prefix="users")
        async def get_users():
            ...
    """
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Générer la clé de cache
            cache_key_str = f"{key_prefix}:{func.__name__}:{cache_key(*args, **kwargs)}"
            
            # Vérifier le cache
            cached_value = await cache_backend.get(cache_key_str)
            if cached_value is not None:
                logger.debug(f"Cache hit: {cache_key_str}")
                return cached_value
            
            # Exécuter la fonction
            logger.debug(f"Cache miss: {cache_key_str}")
            result = await func(*args, **kwargs)
            
            # Mettre en cache
            await cache_backend.set(cache_key_str, result, expire)
            
            return result
        return wrapper
    return decorator


async def init_cache():
    """Initialiser le cache"""
    if cache_backend.use_redis:
        logger.info("Cache backend ready")
    else:
        logger.warning("Cache backend not available (Redis not configured)")


async def close_cache():
    """Fermer les connexions cache"""
    if cache_backend.redis_client:
        await cache_backend.redis_client.close()
        logger.info("Cache connections closed")

