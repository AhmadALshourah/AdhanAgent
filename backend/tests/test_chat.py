"""Tests for the /chat endpoint.

The agent itself is never actually invoked in these tests — we either mock
the ``agent.chat`` coroutine or test the "no API key" short-circuit path
that returns a plain message without calling OpenAI at all.
"""
from unittest.mock import AsyncMock, patch

import pytest

from tests.conftest import MOCK_ALADHAN  # noqa: F401 (shared fixture data)


@pytest.mark.asyncio
async def test_chat_without_api_key_returns_200(client):
    """POST /chat with no OPENAI_API_KEY set returns HTTP 200 with a
    friendly 'not configured' message instead of a 500 error."""
    from app.settings import settings

    with patch.object(settings, "openai_api_key", ""):
        response = await client.post("/api/v1/chat", json={"message": "hello"})

    assert response.status_code == 200
    body = response.json()
    assert "reply" in body
    assert "not configured" in body["reply"].lower()


@pytest.mark.asyncio
async def test_chat_returns_agent_reply(client):
    """POST /chat proxies the agent's text reply in the response body."""
    mock_reply = "Fajr in Amman today is at 04:10."
    with patch("app.services.agent.chat", new=AsyncMock(return_value=mock_reply)):
        response = await client.post(
            "/api/v1/chat", json={"message": "What is Fajr time in Amman?"}
        )

    assert response.status_code == 200
    assert response.json()["reply"] == mock_reply


@pytest.mark.asyncio
async def test_chat_agent_error_returns_502(client):
    """If the underlying agent raises an exception, /chat returns 502."""
    with patch(
        "app.services.agent.chat",
        new=AsyncMock(side_effect=RuntimeError("OpenAI timeout")),
    ):
        response = await client.post("/api/v1/chat", json={"message": "test"})

    assert response.status_code == 502


@pytest.mark.asyncio
async def test_chat_missing_body_returns_422(client):
    """POST /chat without a JSON body returns 422 Unprocessable Entity."""
    response = await client.post("/api/v1/chat", content=b"")
    assert response.status_code == 422
