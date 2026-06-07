from fastapi import APIRouter, HTTPException

from app.schemas.timings import ChatRequest, ChatResponse
from app.services import agent

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    try:
        reply = await agent.chat(request.message)
        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=502, detail="AI assistant unavailable") from e
