from pydantic import BaseModel, ConfigDict

# ---------------------------------------------------------------------------
# Shared sub-models
# ---------------------------------------------------------------------------

class PrayerTimings(BaseModel):
    """Prayer times returned by Aladhan.  Extra fields (Firstthird, Lastthird)
    from some calculation methods are silently ignored."""

    model_config = ConfigDict(extra="ignore")

    Fajr: str
    Sunrise: str
    Dhuhr: str
    Asr: str
    Sunset: str
    Maghrib: str
    Isha: str
    Imsak: str
    Midnight: str


class HijriMonth(BaseModel):
    model_config = ConfigDict(extra="ignore")
    number: int
    en: str
    ar: str


class HijriDate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    date: str
    day: str
    month: HijriMonth
    year: str


class GregorianMonth(BaseModel):
    model_config = ConfigDict(extra="ignore")
    number: int
    en: str


class GregorianDate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    date: str
    day: str
    month: GregorianMonth
    year: str


class DateInfo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    readable: str
    timestamp: str
    hijri: HijriDate
    gregorian: GregorianDate


# ---------------------------------------------------------------------------
# API response models
# ---------------------------------------------------------------------------

class TimingsResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    timings: PrayerTimings
    date: DateInfo
    meta: dict


class CalendarDayResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    timings: PrayerTimings
    date: DateInfo


class QiblaResponse(BaseModel):
    latitude: float
    longitude: float
    direction: float


# ---------------------------------------------------------------------------
# Chat models
# ---------------------------------------------------------------------------

class ChatRequest(BaseModel):
    """Request body for POST /chat.  Only `message` is required; the AI agent
    fetches location-specific data via its own tool calls."""

    message: str


class ChatResponse(BaseModel):
    reply: str
