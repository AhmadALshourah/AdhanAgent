"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { QiblaCompass } from "@/components/QiblaCompass";
import { MotionPage } from "@/components/ui/MotionPage";
import { Skeleton } from "@/components/ui/Skeleton";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { useQibla } from "@/lib/hooks/usePrayerData";

export default function QiblaPage() {
  const t = useTranslations();
  const geo = useGeolocation();

  useEffect(() => {
    geo.detect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useQibla(geo.lat, geo.lng);

  return (
    <MotionPage>
      <div className="space-y-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold">{t("qibla.title")}</h1>
        </header>

        {(geo.loading || (query.isLoading && geo.lat !== null)) && (
          <div className="flex justify-center">
            <Skeleton className="h-72 w-72 rounded-full" />
          </div>
        )}

        {geo.error && (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-red-500">{t("location.denied")}</p>
            <button
              onClick={() => geo.detect()}
              className="flex items-center gap-1 rounded-xl border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
            >
              <MapPin size={16} />
              {t("location.detect")}
            </button>
          </div>
        )}

        {query.data && (
          <div className="flex justify-center">
            <QiblaCompass direction={query.data.direction} />
          </div>
        )}
      </div>
    </MotionPage>
  );
}
