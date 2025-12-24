# Guide d'ImplÃ©mentation des AmÃ©liorations de SÃ©curitÃ©

Ce guide fournit des exemples de code concrets pour implÃ©menter les amÃ©liorations de sÃ©curitÃ© identifiÃ©es dans l'audit.

## Phase 1: AmÃ©liorations Critiques

### 1. Validation Stricte du SECRET_KEY en Production

**Fichier:** backend/app/core/security.py

`python
def get_secret_key() -> str:
    secret_key = os.getenv("SECRET_KEY")
    env = os.getenv("ENVIRONMENT", "development").lower()
    
    if not secret_key:
        if env == "production":
            raise ValueError("SECRET_KEY must be set in production")
        secret_key = "change-this-secret-key-in-production"
    
    if len(secret_key) < 32:
        raise ValueError("SECRET_KEY must be at least 32 characters long")
    
    if env == "production" and secret_key == "change-this-secret-key-in-production":
        raise ValueError("SECRET_KEY must be changed from default value in production")
    
    return secret_key
`

### 2. Masquer les DÃ©tails d'Erreur en Production

**Fichier:** backend/app/core/error_handler.py

`python
async def app_exception_handler(request: Request, exc: AppException) -> JSONResponse:
    from app.core.config import settings
    
    if settings.ENVIRONMENT == "production":
        error_response = {
            "success": False,
            "error": {
                "code": "APPLICATION_ERROR",
                "message": "An error occurred. Please contact support.",
            },
        }
    else:
        error_response = {
            "success": False,
            "error": {
                "code": exc.__class__.__name__,
                "message": exc.message,
                "details": exc.details,
            },
        }
    
    return JSONResponse(status_code=exc.status_code, content=error_response)
`

## Phase 2: AmÃ©liorations Importantes

### 3. Validation du Contenu RÃ©el des Fichiers

**Fichier:** backend/app/api/upload.py

`python
import magic

def validate_file_content(file: UploadFile) -> None:
    file_content = file.file.read()
    file.file.seek(0)
    
    mime_type = magic.from_buffer(file_content, mime=True)
    if mime_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"File MIME type not allowed: {mime_type}"
        )
`

### 4. Protection CSRF

**Fichier:** backend/app/core/csrf.py

`python
class CSRFProtectionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if self._requires_csrf_protection(request):
            if not self._validate_csrf_token(request):
                raise HTTPException(status_code=403, detail="CSRF token validation failed")
        return await call_next(request)
`

*Guide complet disponible dans le dÃ©pÃ´t*
