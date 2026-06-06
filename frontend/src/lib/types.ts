export type PrayerName =
  | "Fajr"
  | "Sunrise"
  | "Dhuhr"
  | "Asr"
  | "Sunset"
  | "Maghrib"
  | "Isha"
  | "Imsak"
  | "Midnight";

export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface HijriDate {
  date: string;
  day: string;
  month: { number: number; en: string; ar: string };
  year: string;
}

export interface GregorianDate {
  date: string;
  day: string;
  month: { number: number; en: string };
  year: string;
}

export interface DateInfo {
  readable: string;
  timestamp: string;
  hijri: HijriDate;
  gregorian: GregorianDate;
}

export interface TimingsResponse {
  timings: PrayerTimings;
  date: DateInfo;
  meta: Record<string, unknown>;
}

export interface CalendarDay {
  timings: PrayerTimings;
  date: DateInfo;
}

export interface QiblaResponse {
  latitude: number;
  longitude: number;
  direction: number;
}

export interface ChatResponse {
  reply: string;
}

// The 5 obligatory prayers used for countdown / highlighting.
export const MAIN_PRAYERS: PrayerName[] = [
  "Fajr",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
];
