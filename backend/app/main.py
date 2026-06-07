import asyncio
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import calendar, chat, health, qibla, timings
from app.core import cache
from app.core.errors import generic_exception_handler, http_exception_handler
from app.settings import settings

logger = logging.getLogger(__name__)


async def _cache_cleanup_loop() -> None:
    """Background task: purge expired cache entries every 10 minutes."""
    while True:
        await asyncio.sleep(600)
        removed = cache.cleanup()
        if removed:
            logger.debug("Cache cleanup removed %d expired entries", removed)


@asynccontextmanager
async def lifespan(app: FastAPI):  # noqa: ARG001
    task = asyncio.create_task(_cache_cleanup_loop())
    yield
    task.cancel()


app = FastAPI(
    title="AdhanAgent API",
    description="Prayer times, Qibla direction, and AI prayer assistant.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

app.include_router(health.router, prefix="/api/v1", tags=["Health"])
app.include_router(timings.router, prefix="/api/v1", tags=["Timings"])
app.include_router(calendar.router, prefix="/api/v1", tags=["Calendar"])
app.include_router(qibla.router, prefix="/api/v1", tags=["Qibla"])
app.include_router(chat.router, prefix="/api/v1", tags=["Chat"])
