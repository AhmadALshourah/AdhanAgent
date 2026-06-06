from datetime import date

import httpx

from app.core import cache
from app.settings import settings

_TIMEOUT = httpx.Timeout(10.0)


def _today() -> str:
    return date.today().strftime("%d-%m-%Y")


async def get_timings(city: str, country: str) -> dict:
    key = f"timings:{city}:{country}:{_today()}"
    cached = cache.get(key)
    if cached:
        return cached

    url = f"{settings.aladhan_base_url}/timingsByCity/{_today()}"
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        response = await client.get(url, params={"city": city, "country": country})
        response.raise_for_status()
        data = response.json()["data"]

    cache.set(key, data, settings.cache_ttl_seconds)
    return data


async def get_timings_by_coords(lat: float, lng: float) -> dict:
    key = f"timings:{lat}:{lng}:{_today()}"
    cached = cache.get(key)
    if cached:
        return cached

    url = f"{settings.aladhan_base_url}/timings/{_today()}"
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        response = await client.get(url, params={"latitude": lat, "longitude": lng})
        response.raise_for_status()
        data = response.json()["data"]

    cache.set(key, data, settings.cache_ttl_seconds)
    return data


async def get_calendar(city: str, country: str, month: int, year: int) -> list[dict]:
    key = f"calendar:{city}:{country}:{month}:{year}"
    cached = cache.get(key)
    if cached:
        return cached

    url = f"{settings.aladhan_base_url}/calendarByCity/{year}/{month}"
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        response = await client.get(url, params={"city": city, "country": country})
        response.raise_for_status()
        data = response.json()["data"]

    cache.set(key, data, settings.cache_ttl_seconds)
    return data


async def get_qibla(lat: float, lng: float) -> dict:
    key = f"qibla:{lat}:{lng}"
    cached = cache.get(key)
    if cached:
        return cached

    url = f"{settings.aladhan_base_url}/qibla/{lat}/{lng}"
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        response = await client.get(url)
        response.raise_for_status()
        data = response.json()["data"]

    cache.set(key, data, 86400)  # qibla never changes — cache 24h
    return data
