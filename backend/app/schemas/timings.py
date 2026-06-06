from pydantic import BaseModel


class PrayerTimings(BaseModel):
    Fajr: str
    Sunrise: str
    Dhuhr: str
    Asr: str
    Sunset: str
    Maghrib: str
    Isha: str
    Imsak: str
    Midnight: str


class DateInfo(BaseModel):
    readable: str
    timestamp: str
    hijri: dict
    gregorian: dict


class TimingsResponse(BaseModel):
    timings: PrayerTimings
    date: DateInfo
    meta: dict


class CalendarDayResponse(BaseModel):
    timings: PrayerTimings
    date: DateInfo


class QiblaResponse(BaseModel):
    latitude: float
    longitude: float
    direction: float


class ChatRequest(BaseModel):
    message: str
    city: str | None = None
    country: str | None = None


class ChatResponse(BaseModel):
    reply: str
