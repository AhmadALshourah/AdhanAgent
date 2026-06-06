"""Integration tests for the /timings and /qibla endpoints.

External HTTP calls are intercepted with respx so tests run offline.
"""
import pytest
import respx
from httpx import Response

from tests.conftest import MOCK_ALADHAN

MOCK_QIBLA = {"code": 200, "data": {"latitude": 24.7, "longitude": 39.67, "direction": 261.5}}


@pytest.mark.asyncio
@respx.mock
async def test_timings_by_city(client):
    """GET /timings returns structured prayer times for a valid city/country."""
    # Intercept any request to the Aladhan timingsByCity endpoint
    respx.get(url__regex=r"api\.aladhan\.com/v1/timingsByCity").mock(
        return_value=Response(200, json=MOCK_ALADHAN)
    )

    response = await client.get("/api/v1/timings?city=Amman&country=Jordan")

    assert response.status_code == 200
    body = response.json()
    assert body["timings"]["Fajr"] == "04:11"
    assert body["timings"]["Isha"] == "20:31"
    assert body["date"]["readable"] == "07 Jun 2026"


@pytest.mark.asyncio
@respx.mock
async def test_timings_missing_params(client):
    """GET /timings without city or country returns 422 Unprocessable Entity."""
    response = await client.get("/api/v1/timings")
    assert response.status_code == 422


@pytest.mark.asyncio
@respx.mock
async def test_qibla_returns_direction(client):
    """GET /qibla returns Qibla direction for given coordinates."""
    respx.get(url__regex=r"api\.aladhan\.com/v1/qibla").mock(
        return_value=Response(200, json=MOCK_QIBLA)
    )

    response = await client.get("/api/v1/qibla?lat=24.7&lng=46.7")

    assert response.status_code == 200
    body = response.json()
    assert "direction" in body
    assert isinstance(body["direction"], float)


@pytest.mark.asyncio
async def test_qibla_missing_params(client):
    """GET /qibla without lat/lng returns 422."""
    response = await client.get("/api/v1/qibla")
    assert response.status_code == 422


@pytest.mark.asyncio
@respx.mock
async def test_timings_aladhan_error_returns_502(client):
    """If Aladhan API returns 500, our endpoint returns 502."""
    respx.get(url__regex=r"api\.aladhan\.com/v1/timingsByCity").mock(
        return_value=Response(500, json={"message": "server error"})
    )

    response = await client.get("/api/v1/timings?city=Bad&country=City")
    assert response.status_code == 502
