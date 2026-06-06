"use client";

import { useTranslations } from "next-intl";
import { LocationPicker, type LocationValue } from "@/components/LocationPicker";
import { MonthlyTable } from "@/components/MonthlyTable";
import { MotionPage } from "@/components/ui/MotionPage";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { useStoredLocation } from "@/lib/hooks/useStoredLocation";
import { useCalendar } from "@/lib/hooks/usePrayerData";

export default function MonthlyPage() {
  const t = useTranslations();
  const { location, setLocation } = useStoredLocation();
  const now = new Date();

  const query = useCalendar(
    location.city,
    location.country,
    now.getMonth() + 1,
    now.getFullYear(),
    true
  );

  function handleLocation(value: LocationValue) {
    if (value.mode === "city" && value.city && value.country) {
      setLocation({ city: value.city, country: value.country });
    }
  }

  return (
    <MotionPage>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold">{t("monthly.title")}</h1>
          <p className="text-sm text-muted">
            {location.city}, {location.country}
          </p>
        </header>

        <LocationPicker onChange={handleLocation} />

        {query.isLoading && <TableSkeleton />}
        {query.isError && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-500">
            {t("common.error")}
          </p>
        )}
        {query.data && <MonthlyTable days={query.data} />}
      </div>
    </MotionPage>
  );
}
