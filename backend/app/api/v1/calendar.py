from datetime import date

from fastapi import APIRouter, Query

from app.core.errors import handle_upstream_error
from app.services import aladhan_client

router = APIRouter()


@router.get("/calendar")
async def get_calendar(
    city: str = Query(..., description="City name"),
    country: str = Query(..., description="Country name"),
    month: int = Query(default=None, ge=1, le=12),
    year: int = Query(default=None, ge=2000),
) -> list[dict]:
    today = date.today()
    month = month or today.month
    year = year or today.year
    try:
        return await aladhan_client.get_calendar(city, country, month, year)
    except Exception as e:
        raise handle_upstream_error(e) from e
