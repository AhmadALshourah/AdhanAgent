"""Unit tests for the in-memory TTL cache."""
import time

from app.core import cache


def test_set_and_get():
    cache.set("key1", {"value": 42}, ttl=60)
    assert cache.get("key1") == {"value": 42}


def test_get_missing_key_returns_none():
    assert cache.get("nonexistent_key_xyz") is None


def test_expired_entry_returns_none():
    cache.set("short_ttl", "data", ttl=0)
    # TTL=0 means it expires immediately
    time.sleep(0.01)
    assert cache.get("short_ttl") is None


def test_overwrite_key():
    cache.set("ow_key", "first", ttl=60)
    cache.set("ow_key", "second", ttl=60)
    assert cache.get("ow_key") == "second"


def test_different_types():
    cache.set("str_key", "hello", ttl=60)
    cache.set("list_key", [1, 2, 3], ttl=60)
    cache.set("dict_key", {"a": 1}, ttl=60)
    assert cache.get("str_key") == "hello"
    assert cache.get("list_key") == [1, 2, 3]
    assert cache.get("dict_key") == {"a": 1}
