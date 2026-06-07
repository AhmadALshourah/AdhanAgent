"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { padLocale } from "@/lib/locale-utils";
import { countdownTo, getNextPrayer } from "@/lib/prayer-utils";
import type { PrayerTimings } from "@/lib/types";

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-[2.5ch] rounded-xl bg-foreground/5 px-2 py-1 text-3xl font-bold tabular-nums sm:text-4xl">
        {value}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-wider text-muted">
        {label}
      </span>
    </div>
  );
}

export function NextPrayerCountdown({ timings }: { timings: PrayerTimings }) {
  const t = useTranslations();
  const locale = useLocale();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const next = getNextPrayer(timings, now);
  const { hours, minutes, seconds } = countdownTo(next.date, now);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/20 via-card to-card p-6 text-center shadow-soft"
    >
      {/*
        Ambient glow: use physical left-1/2 + -translate-x-1/2 so the
        centering is correct in both LTR and RTL (it's a visual element,
        not a textual one, so logical properties would break RTL centering).
      */}
      <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />

      <div className="relative">
        <p className="text-sm text-muted">{t("home.nextPrayer")}</p>
        <p className="mt-1 text-2xl font-bold text-primary">
          {t(`prayers.${next.name}`)}
        </p>
        <p className="text-sm text-muted">
          {next.time.replace(/\s*\(.*\)/, "")}
        </p>

        {/* Always LTR so HH:MM:SS layout is always left-to-right */}
        <div
          className="mt-4 flex items-center justify-center gap-2"
          dir="ltr"
        >
          <Unit
            value={padLocale(hours, locale)}
            label={t("home.hours")}
          />
          <span className="pb-5 text-2xl font-bold text-muted">:</span>
          <Unit
            value={padLocale(minutes, locale)}
            label={t("home.minutes")}
          />
          <span className="pb-5 text-2xl font-bold text-muted">:</span>
          <Unit
            value={padLocale(seconds, locale)}
            label={t("home.seconds")}
          />
        </div>
      </div>
    </motion.div>
  );
}
