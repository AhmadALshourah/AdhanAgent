from fastapi import APIRouter, HTTPException, Query

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
        raise HTTPException(status_code=502, detail=str(e)) from e
