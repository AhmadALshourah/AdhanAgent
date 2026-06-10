"use client";

import { MapPin, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { COUNTRIES } from "@/lib/cityData";

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
  const locale = useLocale();
  const isAr = locale === "ar";

  const [countryEn, setCountryEn] = useState("");
  const [cityEn, setCityEn] = useState("");
  const geo = useGeolocation();

  const selectedCountry = COUNTRIES.find((c) => c.en === countryEn) ?? null;

  function handleCountryChange(value: string) {
    setCountryEn(value);
    setCityEn("");
  }

  function submitCity(e: React.FormEvent) {
    e.preventDefault();
    if (cityEn && countryEn) onChange({ mode: "city", city: cityEn, country: countryEn });
  }

  useEffect(() => {
    if (geo.lat !== null && geo.lng !== null) {
      onChange({ mode: "coords", lat: geo.lat, lng: geo.lng });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo.lat, geo.lng]);

  const selectClass =
    "min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary cursor-pointer";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center">
      <form onSubmit={submitCity} className="flex flex-1 flex-wrap gap-2">
        {/* Country select */}
        <select
          value={countryEn}
          onChange={(e) => handleCountryChange(e.target.value)}
          className={selectClass}
        >
          <option value="">{t("selectCountry")}</option>
          {COUNTRIES.map((c) => (
            <option key={c.en} value={c.en}>
              {isAr ? c.ar : c.en}
            </option>
          ))}
        </select>

        {/* City select — only enabled after country is picked */}
        <select
          value={cityEn}
          onChange={(e) => setCityEn(e.target.value)}
          disabled={!selectedCountry}
          className={`${selectClass} disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <option value="">{t("selectCity")}</option>
          {selectedCountry?.cities.map((city) => (
            <option key={city.en} value={city.en}>
              {isAr ? city.ar : city.en}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={!cityEn || !countryEn}
          className="flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
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

      {geo.error && (
        <p className="text-xs text-red-500">{t(geo.error)}</p>
      )}
    </div>
  );
}
