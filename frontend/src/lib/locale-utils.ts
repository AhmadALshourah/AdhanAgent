/**
 * Locale-aware formatting utilities.
 * All functions accept a `locale` string ("ar" | "en").
 */

/** Convert Western digits to Eastern Arabic-Indic (٠١٢٣...) for Arabic locale. */
export function toLocaleDigits(value: string | number, locale: string): string {
  const str = String(value);
  if (locale !== "ar") return str;
  return str.replace(/\d/g, (d) =>
    String.fromCharCode(d.charCodeAt(0) + 0x0660 - 48)
  );
}

/** Pad a number to 2 digits then localise. */
export function padLocale(n: number, locale: string): string {
  return toLocaleDigits(String(n).padStart(2, "0"), locale);
}

/** Format a direction float as locale-aware degree string. */
export function formatDegrees(deg: number, locale: string): string {
  const fixed = deg.toFixed(1);
  return toLocaleDigits(fixed, locale) + "°";
}

/** Format a Gregorian date (day + month name) respecting locale. */
export function formatGregorianDate(
  day: string | number,
  monthEn: string,
  locale: string
): string {
  if (locale === "ar") {
    const arabicMonths: Record<string, string> = {
      January: "يناير", February: "فبراير", March: "مارس",
      April: "أبريل", May: "مايو", June: "يونيو",
      July: "يوليو", August: "أغسطس", September: "سبتمبر",
      October: "أكتوبر", November: "نوفمبر", December: "ديسمبر",
    };
    return `${toLocaleDigits(day, "ar")} ${arabicMonths[monthEn] ?? monthEn}`;
  }
  return `${day} ${monthEn}`;
}

/** Format a Hijri date (day + month name + optional year). */
export function formatHijriDate(
  day: string | number,
  monthEn: string,
  monthAr: string,
  locale: string
): string {
  const month = locale === "ar" ? monthAr : monthEn;
  const d = toLocaleDigits(day, locale);
  return `${d} ${month}`;
}

/** Clean trailing timezone from "HH:mm (TZ)" strings. */
export function cleanTime(value: string): string {
  return value.replace(/\s*\(.*\)/, "");
}

/** Localise a clean time string digits. */
export function localiseTime(value: string, locale: string): string {
  return toLocaleDigits(cleanTime(value), locale);
}
