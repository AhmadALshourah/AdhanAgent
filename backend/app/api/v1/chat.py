from fastapi import APIRouter

from app.schemas.timings import ChatRequest, ChatResponse
from app.services import agent

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    reply = await agent.chat(request.message)
    return ChatResponse(reply=reply)
