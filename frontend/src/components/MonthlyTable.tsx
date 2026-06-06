"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  formatGregorianDate,
  formatHijriDate,
  localiseTime,
} from "@/lib/locale-utils";
import { MAIN_PRAYERS, type CalendarDay } from "@/lib/types";

export function MonthlyTable({ days }: { days: CalendarDay[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const todayNum = new Date().getDate();

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
            const isToday =
              Number(day.date.gregorian.day) === todayNum;
            const { hijri, gregorian } = day.date;

            return (
              <tr
                key={gregorian.date}
                className={`border-t border-border transition-colors ${
                  isToday
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
