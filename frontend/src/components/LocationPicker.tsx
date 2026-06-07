"use client";

import { MapPin, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useGeolocation } from "@/lib/hooks/useGeolocation";

export interface LocationValue {
  mode: "city" | "coords";
  city?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export function LocationPicker({
  onChange,
}: {
  onChange: (value: LocationValue) => void;
}) {
  const t = useTranslations("location");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const geo = useGeolocation();

  function submitCity(e: React.FormEvent) {
    e.preventDefault();
    if (city && country) onChange({ mode: "city", city, country });
  }

  // When geolocation resolves, propagate coords up (once).
  useEffect(() => {
    if (geo.lat !== null && geo.lng !== null) {
      onChange({ mode: "coords", lat: geo.lat, lng: geo.lng });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo.lat, geo.lng]);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center">
      <form onSubmit={submitCity} className="flex flex-1 flex-wrap gap-2">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={t("cityPlaceholder")}
          className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
        />
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder={t("countryPlaceholder")}
          className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
        />
        <button
          type="submit"
          className="flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Search size={16} />
          {t("go")}
        </button>
      </form>

      <button
        onClick={() => geo.detect()}
        disabled={geo.loading}
        className="flex items-center justify-center gap-1 rounded-xl border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/10 disabled:opacity-50"
      >
        <MapPin size={16} />
        {geo.loading ? t("detecting") : t("detect")}
      </button>

      {/* Show specific error message based on geo error type */}
      {geo.error && (
        <p className="text-xs text-red-500">{t(geo.error)}</p>
      )}
    </div>
  );
}
