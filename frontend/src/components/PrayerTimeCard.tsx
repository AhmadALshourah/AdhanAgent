"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { localiseTime } from "@/lib/locale-utils";
import type { PrayerName } from "@/lib/types";

const ICONS: Record<string, string> = {
  Fajr: "🌅",
  Sunrise: "☀️",
  Dhuhr: "🌞",
  Asr: "🌤️",
  Maghrib: "🌇",
  Isha: "🌙",
};

export function PrayerTimeCard({
  name,
  time,
  active = false,
  index = 0,
}: {
  name: PrayerName;
  time: string;
  active?: boolean;
  index?: number;
}) {
  const t = useTranslations("prayers");
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`group relative flex flex-col items-center rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft ${
        active
          ? "border-primary bg-primary/10 shadow-soft ring-1 ring-primary/30"
          : "border-border bg-card"
      }`}
    >
      {active && (
        <span className="absolute end-3 top-3 h-2 w-2 animate-pulse rounded-full bg-primary" />
      )}
      <span className="text-2xl transition-transform group-hover:scale-110">
        {ICONS[name] ?? "🕌"}
      </span>
      <span className="mt-2 text-sm text-muted">{t(name)}</span>
      <span className="mt-1 text-xl font-bold tabular-nums">
        {localiseTime(time, locale)}
      </span>
    </motion.div>
  );
}
