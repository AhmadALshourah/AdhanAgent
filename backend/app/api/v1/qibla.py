from fastapi import APIRouter, Query

from app.core.errors import handle_upstream_error
from app.schemas.timings import QiblaResponse
from app.services import aladhan_client

router = APIRouter()


@router.get("/qibla", response_model=QiblaResponse)
async def get_qibla(
    lat: float = Query(..., description="Latitude"),
    lng: float = Query(..., description="Longitude"),
) -> QiblaResponse:
    try:
        data = await aladhan_client.get_qibla(lat, lng)
        return QiblaResponse(**data)
    except Exception as e:
        raise handle_upstream_error(e) from e
