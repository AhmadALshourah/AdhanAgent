from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# Resolve to backend/ regardless of the working directory uvicorn is run from.
_BACKEND_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        # Try backend/.env first, then fall back to the project root .env.
        # Works whether the user places the file in backend/ or at the repo root.
        env_file=[_BACKEND_DIR / ".env", _BACKEND_DIR.parent / ".env"],
        env_file_encoding="utf-8",
    )

    openai_api_key: str = ""
    aladhan_base_url: str = "https://api.aladhan.com/v1"
    cache_ttl_seconds: int = 300
    allowed_origins: str = "http://localhost:3000"

    @property
    def origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",")]


settings = Settings()
