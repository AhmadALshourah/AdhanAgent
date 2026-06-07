"""Tests for the improved upstream error handling (B-08).

Verifies that the correct HTTP status code is returned for each class of
Aladhan API error after the B-08 fix (400 / 502 / 504 distinction).
"""
import pytest
import respx
from httpx import Response


@pytest.mark.asyncio
@respx.mock
async def test_aladhan_400_returns_our_400(client):
    """If Aladhan returns 400 (e.g. invalid city), our API returns 400 Bad Request."""
    respx.get(url__regex=r"api\.aladhan\.com/v1/timingsByCity").mock(
        return_value=Response(
            400,
            json={"code": 400, "status": "Bad Request", "data": "Invalid city."},
        )
    )
    response = await client.get("/api/v1/timings?city=!!invalid!!&country=XX")
    assert response.status_code == 400


@pytest.mark.asyncio
@respx.mock
async def test_aladhan_500_returns_our_502(client):
    """If Aladhan returns 500, our API returns 502 Bad Gateway."""
    respx.get(url__regex=r"api\.aladhan\.com/v1/timingsByCity").mock(
        return_value=Response(500, json={"message": "server error"})
    )
    response = await client.get("/api/v1/timings?city=Amman&country=Jordan")
    assert response.status_code == 502


@pytest.mark.asyncio
@respx.mock
async def test_qibla_aladhan_400_returns_our_400(client):
    """Same mapping applies to the /qibla endpoint."""
    respx.get(url__regex=r"api\.aladhan\.com/v1/qibla").mock(
        return_value=Response(400, json={"code": 400, "data": "Invalid coordinates."})
    )
    response = await client.get("/api/v1/qibla?lat=999&lng=999")
    assert response.status_code == 400


@pytest.mark.asyncio
@respx.mock
async def test_calendar_aladhan_500_returns_our_502(client):
    """Same mapping applies to the /calendar endpoint."""
    respx.get(url__regex=r"api\.aladhan\.com/v1/calendarByCity").mock(
        return_value=Response(500, json={"message": "internal error"})
    )
    response = await client.get("/api/v1/calendar?city=Amman&country=Jordan")
    assert response.status_code == 502
