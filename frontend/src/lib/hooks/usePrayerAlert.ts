"use client";

import { useEffect, useRef } from "react";
import { playAdhanBell } from "@/lib/audio";
import { countdownTo, getNextPrayer } from "@/lib/prayer-utils";
import type { PrayerTimings } from "@/lib/types";

interface Options {
  timings: PrayerTimings | undefined;
  soundEnabled: boolean;
  notify: (title: string, body?: string) => void;
  prayerLabel: (name: string) => string;
  notifLabel: (name: string) => string; // e.g. "حان وقت الفجر"
}

/**
 * Fires a browser notification + bell sound exactly once
 * when the countdown to the next prayer reaches zero.
 */
export function usePrayerAlert({
  timings,
  soundEnabled,
  notify,
  prayerLabel,
  notifLabel,
}: Options) {
  // Track which prayer-time key we already fired to avoid repeats.
  const firedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!timings) return;

    const id = setInterval(() => {
      const now = new Date();
      const next = getNextPrayer(timings, now);
      const { hours, minutes, seconds } = countdownTo(next.date, now);

      // Fire in the last second
      if (hours === 0 && minutes === 0 && seconds <= 1) {
        const key = `${next.name}-${next.date.toISOString().slice(0, 16)}`;
        if (firedRef.current !== key) {
          firedRef.current = key;
          notify(notifLabel(next.name), next.time.replace(/\s*\(.*\)/, ""));
          if (soundEnabled) playAdhanBell();
        }
      }
    }, 500);

    return () => clearInterval(id);
  }, [timings, soundEnabled, notify, notifLabel]);
}
