"""Shared fixtures for all tests."""
import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app

# Reusable mock Aladhan timings payload
MOCK_TIMINGS = {
    "Fajr": "04:11",
    "Sunrise": "05:38",
    "Dhuhr": "12:20",
    "Asr": "15:38",
    "Sunset": "19:01",
    "Maghrib": "19:01",
    "Isha": "20:31",
    "Imsak": "04:01",
    "Midnight": "00:36",
}

MOCK_DATE = {
    "readable": "07 Jun 2026",
    "timestamp": "1749254400",
    "hijri": {
        "date": "11-12-1447",
        "day": "11",
        "month": {"number": 12, "en": "Dhul Hijja", "ar": "ذوالحجة"},
        "year": "1447",
    },
    "gregorian": {
        "date": "07-06-2026",
        "day": "07",
        "month": {"number": 6, "en": "June"},
        "year": "2026",
    },
}

MOCK_ALADHAN = {"code": 200, "data": {"timings": MOCK_TIMINGS, "date": MOCK_DATE, "meta": {}}}


@pytest.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as c:
        yield c
