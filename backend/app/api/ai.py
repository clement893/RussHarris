"""AI endpoints using OpenAI."""

from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from app.dependencies import get_current_user
from app.models import User
from app.services.openai_service import OpenAIService

router = APIRouter(prefix="/api/ai", tags=["ai"])


class ChatMessage(BaseModel):
    """Chat message schema."""
    role: str = Field(..., pattern="^(system|user|assistant)$")
    content: str = Field(..., min_length=1)


class ChatRequest(BaseModel):
    """Chat completion request schema."""
    messages: List[ChatMessage] = Field(..., min_items=1)
    model: Optional[str] = None
    temperature: Optional[float] = Field(None, ge=0.0, le=2.0)
    max_tokens: Optional[int] = Field(None, ge=1, le=4000)


class SimpleChatRequest(BaseModel):
    """Simple chat request schema."""
    message: str = Field(..., min_length=1)
    system_prompt: Optional[str] = None
    model: Optional[str] = None


class ChatResponse(BaseModel):
    """Chat completion response schema."""
    content: str
    model: str
    usage: dict
    finish_reason: str


@router.post("/chat", response_model=ChatResponse)
async def chat_completion(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
):
    """Create a chat completion."""
    if not OpenAIService.is_configured():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="OpenAI is not configured. Please contact the administrator.",
        )
    
    try:
        service = OpenAIService()
        
        # Convert Pydantic models to dicts
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        response = await service.chat_completion(
            messages=messages,
            model=request.model,
            temperature=request.temperature,
            max_tokens=request.max_tokens,
        )
        
        return ChatResponse(**response)
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"OpenAI error: {str(e)}",
        )


@router.post("/chat/simple", response_model=dict)
async def simple_chat(
    request: SimpleChatRequest,
    current_user: User = Depends(get_current_user),
):
    """Simple chat completion."""
    if not OpenAIService.is_configured():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="OpenAI is not configured. Please contact the administrator.",
        )
    
    try:
        service = OpenAIService()
        response = await service.simple_chat(
            user_message=request.message,
            system_prompt=request.system_prompt,
            model=request.model,
        )
        
        return {"response": response}
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"OpenAI error: {str(e)}",
        )


@router.get("/health")
async def ai_health_check(
    current_user: User = Depends(get_current_user),
):
    """Check OpenAI configuration and connectivity."""
    result = {
        "configured": False,
        "model": None,
        "available": False,
    }
    
    if not OpenAIService.is_configured():
        result["error"] = "OpenAI is not configured. Missing OPENAI_API_KEY."
        return result
    
    result["configured"] = True
    result["model"] = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    
    try:
        service = OpenAIService()
        # Test with a simple request
        test_response = await service.simple_chat(
            user_message="Say 'OK' if you can hear me.",
            model="gpt-4o-mini",
        )
        result["available"] = True
        result["test_response"] = test_response[:50]  # First 50 chars
    except Exception as e:
        result["error"] = str(e)
    
    return result

