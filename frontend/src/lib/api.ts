import type {
  CalendarDay,
  ChatResponse,
  QiblaResponse,
  TimingsResponse,
} from "./types";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";

const REQUEST_TIMEOUT_MS = 12_000;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE_URL}/api/v1${path}`, {
      headers: { "Content-Type": "application/json" },
      ...init,
      signal: controller.signal,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.error ?? body?.detail ?? `Request failed: ${res.status}`);
    }
    return res.json() as Promise<T>;
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  timingsByCity: (city: string, country: string) =>
    request<TimingsResponse>(
      `/timings?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`
    ),

  timingsByCoords: (lat: number, lng: number) =>
    request<TimingsResponse>(`/timings/coords?lat=${lat}&lng=${lng}`),

  calendar: (city: string, country: string, month: number, year: number) =>
    request<CalendarDay[]>(
      `/calendar?city=${encodeURIComponent(city)}&country=${encodeURIComponent(
        country
      )}&month=${month}&year=${year}`
    ),

  qibla: (lat: number, lng: number) =>
    request<QiblaResponse>(`/qibla?lat=${lat}&lng=${lng}`),

  chat: (message: string) =>
    request<ChatResponse>(`/chat`, {
      method: "POST",
      body: JSON.stringify({ message }),
    }),
};
