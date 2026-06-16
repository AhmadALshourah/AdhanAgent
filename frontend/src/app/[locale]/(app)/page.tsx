"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LocationPicker, type LocationValue } from "@/components/LocationPicker";
import { NextPrayerCountdown } from "@/components/NextPrayerCountdown";
import { NotificationBanner } from "@/components/NotificationBanner";
import { PrayerTimeCard } from "@/components/PrayerTimeCard";
import { MotionPage } from "@/components/ui/MotionPage";
import { PrayerGridSkeleton } from "@/components/ui/Skeleton";
import { useStoredLocation } from "@/lib/hooks/useStoredLocation";
import {
  useTimingsByCity,
  useTimingsByCoords,
} from "@/lib/hooks/usePrayerData";
import { useNotifications } from "@/lib/hooks/useNotifications";
import { usePrayerAlert } from "@/lib/hooks/usePrayerAlert";
import { isCacheToday, loadTimings, saveTimings } from "@/lib/offline-cache";
import { MAIN_PRAYERS, type PrayerName, type TimingsResponse } from "@/lib/types";
import { getNextPrayer } from "@/lib/prayer-utils";

const DISPLAY: PrayerName[] = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

export default function HomePage() {
  const t = useTranslations();
  const { location, setLocation } = useStoredLocation();
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [offline, setOffline] = useState(false);
  const [cachedData, setCachedData] = useState<TimingsResponse | null>(null);

  const { notify } = useNotifications();

  function handleLocation(value: LocationValue) {
    if (value.mode === "city" && value.city && value.country) {
      setCoords(null);
      setLocation({ city: value.city, country: value.country });
    } else if (value.mode === "coords" && value.lat != null && value.lng != null) {
      setCoords({ lat: value.lat, lng: value.lng });
    }
  }

  const cityQuery = useTimingsByCity(
    location.city,
    location.country,
    coords === null
  );
  const coordsQuery = useTimingsByCoords(coords?.lat ?? null, coords?.lng ?? null);
  const query = coords ? coordsQuery : cityQuery;

  useEffect(() => {
    if (cityQuery.data && !coords) {
      saveTimings(location.city, location.country, cityQuery.data);
      setOffline(false);
      setCachedData(null);
    }
  }, [cityQuery.data, location.city, location.country, coords]);

  useEffect(() => {
    if (!coords && cityQuery.isError) {
      const cached = loadTimings(location.city, location.country);
      if (cached && isCacheToday(cached.savedAt)) {
        setCachedData(cached.data);
        setOffline(true);
      }
    }
  }, [cityQuery.isError, location.city, location.country, coords]);

  const data = query.data ?? cachedData ?? undefined;
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const next = mounted && data ? getNextPrayer(data.timings) : null;

  usePrayerAlert({
    timings: data?.timings,
    soundEnabled: true,
    notify,
    notifLabel: (name) =>
      t("notifications.prayerTime", { prayer: t(`prayers.${name}`) }),
  });

  return (
    <MotionPage>
      <div className="space-y-5">
        <header className="text-center">
          <h1 className="bg-gradient-to-b from-foreground to-primary bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
            {t("app.title")}
          </h1>
          <p className="mt-1 text-sm text-muted">{t("app.tagline")}</p>
        </header>

        <NotificationBanner />

        <LocationPicker onChange={handleLocation} />

        {offline && (
          <p className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-center text-sm text-accent">
            {t("notifications.offlineData")}
          </p>
        )}

        {query.isLoading && !cachedData && <PrayerGridSkeleton />}
        {query.isError && !cachedData && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-500">
            {t("common.error")}
          </p>
        )}

        {data && (
          <>
            <NextPrayerCountdown timings={data.timings} />

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{t("home.todayTimings")}</h2>
                <span className="text-sm text-muted">{data.date.readable}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {DISPLAY.map((p, i) => (
                  <PrayerTimeCard
                    key={p}
                    name={p}
                    time={data.timings[p]}
                    index={i}
                    active={MAIN_PRAYERS.includes(p) && next?.name === p}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MotionPage>
  );
}
