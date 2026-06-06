import { MAIN_PRAYERS, type PrayerName, type PrayerTimings } from "./types";

export interface NextPrayerInfo {
  name: PrayerName;
  time: string; // HH:mm
  date: Date; // absolute next occurrence
}

/** Parse "HH:mm" (possibly with trailing tz like "04:10 (EEST)") into hours/minutes. */
export function parseTime(value: string): { h: number; m: number } {
  const match = value.match(/(\d{1,2}):(\d{2})/);
  if (!match) return { h: 0, m: 0 };
  return { h: Number(match[1]), m: Number(match[2]) };
}

/** Find the next upcoming obligatory prayer relative to `now`. */
export function getNextPrayer(
  timings: PrayerTimings,
  now: Date = new Date()
): NextPrayerInfo {
  for (const name of MAIN_PRAYERS) {
    const { h, m } = parseTime(timings[name]);
    const candidate = new Date(now);
    candidate.setHours(h, m, 0, 0);
    if (candidate > now) {
      return { name, time: timings[name], date: candidate };
    }
  }
  // All passed → tomorrow's Fajr.
  const { h, m } = parseTime(timings.Fajr);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(h, m, 0, 0);
  return { name: "Fajr", time: timings.Fajr, date: tomorrow };
}

/** Returns { hours, minutes, seconds } until target. */
export function countdownTo(target: Date, now: Date = new Date()) {
  const diff = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
