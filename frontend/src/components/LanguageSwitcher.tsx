"use client";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: "ar" | "en") {
    if (next === locale) return;
    // Persist preference in cookie so the middleware picks it up on next visit.
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;SameSite=Lax`;
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      onClick={() => switchTo(locale === "ar" ? "en" : "ar")}
      aria-label="Switch language"
      className="flex h-9 items-center gap-1 rounded-lg border border-border px-2.5 text-sm transition hover:bg-background-2"
    >
      <Languages size={18} />
      <span className="font-semibold">{locale === "ar" ? "EN" : "ع"}</span>
    </button>
  );
}
