"use client";

/**
 * Locale-level not-found page.
 *
 * Rendered when notFound() is thrown from a PAGE inside a valid locale
 * (e.g. /ar/unknown-route).  The locale layout is intact at this point,
 * so we have full access to next-intl translations and the app's design
 * system (Tailwind, theme, etc.).
 */
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 text-center">
      <span className="text-7xl">🕌</span>

      <div className="space-y-1">
        <h1 className="text-5xl font-extrabold text-primary">404</h1>
        <p className="text-lg text-muted">{t("notFound.message")}</p>
      </div>

      <Link
        href="/"
        className="mt-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-primary/90 active:scale-95"
      >
        {t("notFound.goHome")}
      </Link>
    </div>
  );
}
