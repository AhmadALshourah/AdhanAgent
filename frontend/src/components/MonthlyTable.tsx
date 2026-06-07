"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  formatGregorianDate,
  formatHijriDate,
  localiseTime,
} from "@/lib/locale-utils";
import { MAIN_PRAYERS, type CalendarDay } from "@/lib/types";

/** Parse Aladhan's "DD-MM-YYYY" format and check if it matches today. */
function isToday(gregorianDate: string): boolean {
  const [day, month, year] = gregorianDate.split("-").map(Number);
  const today = new Date();
  return (
    day === today.getDate() &&
    month === today.getMonth() + 1 &&
    year === today.getFullYear()
  );
}

export function MonthlyTable({ days }: { days: CalendarDay[] }) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="overflow-x-auto rounded-2xl border border-border shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-card text-muted">
          <tr>
            <th className="px-3 py-2.5 text-start font-semibold">
              {t("monthly.date")}
            </th>
            <th className="px-3 py-2.5 text-start font-semibold">
              {t("monthly.hijri")}
            </th>
            {MAIN_PRAYERS.map((p) => (
              <th key={p} className="px-3 py-2.5 text-center font-semibold">
                {t(`prayers.${p}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => {
            const { hijri, gregorian } = day.date;
            const today = isToday(gregorian.date);

            return (
              <tr
                key={gregorian.date}
                className={`border-t border-border transition-colors ${
                  today
                    ? "bg-primary/10 font-semibold text-primary"
                    : "hover:bg-background-2"
                }`}
              >
                <td className="whitespace-nowrap px-3 py-2">
                  {formatGregorianDate(
                    gregorian.day,
                    gregorian.month.en,
                    locale
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-muted">
                  {formatHijriDate(
                    hijri.day,
                    hijri.month.en,
                    hijri.month.ar,
                    locale
                  )}
                </td>
                {MAIN_PRAYERS.map((p) => (
                  <td
                    key={p}
                    className="px-3 py-2 text-center tabular-nums"
                  >
                    {localiseTime(day.timings[p], locale)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
