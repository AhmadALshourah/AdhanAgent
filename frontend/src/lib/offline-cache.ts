import type { TimingsResponse } from "./types";

const KEY_PREFIX = "adhan.cache.timings.";

function key(city: string, country: string): string {
  return `${KEY_PREFIX}${city.toLowerCase()}.${country.toLowerCase()}`;
}

export function saveTimings(
  city: string,
  country: string,
  data: TimingsResponse
): void {
  try {
    localStorage.setItem(
      key(city, country),
      JSON.stringify({ data, savedAt: Date.now() })
    );
  } catch {
    /* quota exceeded */
  }
}

export function loadTimings(
  city: string,
  country: string
): { data: TimingsResponse; savedAt: number } | null {
  try {
    const raw = localStorage.getItem(key(city, country));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** True if the cached value is from today (same calendar day). */
export function isCacheToday(savedAt: number): boolean {
  const cacheDate = new Date(savedAt).toDateString();
  return cacheDate === new Date().toDateString();
}
