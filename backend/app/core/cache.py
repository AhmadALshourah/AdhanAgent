"""Simple in-memory TTL cache.

Keys expire on read *and* are periodically purged by ``cleanup()`` to prevent
unbounded memory growth on long-running servers.
"""

import time
from typing import Any

_store: dict[str, tuple[Any, float]] = {}


def get(key: str) -> Any | None:
    entry = _store.get(key)
    if entry is None:
        return None
    value, expires_at = entry
    if time.time() > expires_at:
        del _store[key]
        return None
    return value


def set(key: str, value: Any, ttl: int) -> None:  # noqa: A001
    _store[key] = (value, time.time() + ttl)


def cleanup() -> int:
    """Delete all expired entries. Returns the number of entries removed."""
    now = time.time()
    expired = [k for k, (_, exp) in list(_store.items()) if now > exp]
    for k in expired:
        _store.pop(k, None)
    return len(expired)


def size() -> int:
    """Current number of entries (including potentially expired ones)."""
    return len(_store)
