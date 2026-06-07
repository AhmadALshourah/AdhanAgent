from fastapi import APIRouter, Query

from app.core.errors import handle_upstream_error
from app.schemas.timings import TimingsResponse
from app.services import aladhan_client

router = APIRouter()


@router.get("/timings", response_model=TimingsResponse)
async def get_timings(
    city: str = Query(..., description="City name"),
    country: str = Query(..., description="Country name"),
) -> TimingsResponse:
    try:
        data = await aladhan_client.get_timings(city, country)
        return TimingsResponse(**data)
    except Exception as e:
        raise handle_upstream_error(e) from e


@router.get("/timings/coords", response_model=TimingsResponse)
async def get_timings_by_coords(
    lat: float = Query(..., description="Latitude"),
    lng: float = Query(..., description="Longitude"),
) -> TimingsResponse:
    try:
        data = await aladhan_client.get_timings_by_coords(lat, lng)
        return TimingsResponse(**data)
    except Exception as e:
        raise handle_upstream_error(e) from e
