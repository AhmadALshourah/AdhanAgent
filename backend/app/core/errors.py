"""Centralised error handling for FastAPI.

* ``http_exception_handler`` — formats HTTPException responses consistently.
* ``generic_exception_handler`` — catches unexpected exceptions without leaking
  internal details to the client; logs the full traceback server-side.
* ``handle_upstream_error`` — converts httpx / Aladhan errors to correct HTTP
  status codes (400/502/504) instead of always returning 502.
"""

import logging

import httpx
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse

logger = logging.getLogger(__name__)


async def http_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=getattr(exc, "status_code", 500),
        content={"error": str(getattr(exc, "detail", exc))},
    )


async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception(
        "Unhandled exception on %s %s", request.method, request.url.path
    )
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error"},
    )


def handle_upstream_error(e: Exception) -> HTTPException:
    """Map an upstream (Aladhan API) error to the appropriate HTTP status.

    - Aladhan 4xx  → 400  (bad request — invalid city / country)
    - Aladhan 5xx  → 502  (bad gateway)
    - Timeout      → 504  (gateway timeout)
    - Other        → 502
    """
    if isinstance(e, httpx.HTTPStatusError):
        if e.response.status_code < 500:
            return HTTPException(
                status_code=400,
                detail=f"Invalid upstream request: {e.response.text[:200]}",
            )
        return HTTPException(status_code=502, detail="Upstream API returned an error")
    if isinstance(e, httpx.TimeoutException):
        return HTTPException(status_code=504, detail="Upstream API timed out")
    return HTTPException(status_code=502, detail=str(e))
