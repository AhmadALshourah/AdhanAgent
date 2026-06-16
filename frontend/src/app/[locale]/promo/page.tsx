import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionPage } from "@/components/ui/MotionPage";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

// ── SVG Icons ────────────────────────────────────────────────────────────────

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 8V4" />
      <rect x="2" y="8" width="20" height="12" rx="3" />
      <circle cx="8.5" cy="14" r="1.5" fill="currentColor" />
      <circle cx="15.5" cy="14" r="1.5" fill="currentColor" />
      <path d="M6 19v2M18 19v2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <rect x="7" y="14" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.5" />
      <rect x="13" y="14" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function CloudOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function SmartphoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2.5} />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function CrescentIcon({ large }: { large?: boolean }) {
  const size = large ? "h-10 w-10" : "h-8 w-8";
  return (
    <svg viewBox="0 0 24 24" className={size} fill="currentColor" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ArrowIcon({ flip }: { flip: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform ${flip ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ── Static mock prayer rows (decorative preview) ──────────────────────────────

const MOCK_PRAYERS = [
  { en: "Fajr",    ar: "الفجر",   time: "04:32", timeAr: "٤:٣٢",  next: false },
  { en: "Dhuhr",  ar: "الظهر",   time: "12:15", timeAr: "١٢:١٥", next: false },
  { en: "Asr",    ar: "العصر",   time: "15:45", timeAr: "١٥:٤٥", next: true  },
  { en: "Maghrib",ar: "المغرب",  time: "18:22", timeAr: "١٨:٢٢", next: false },
  { en: "Isha",   ar: "العشاء",  time: "19:52", timeAr: "١٩:٥٢", next: false },
] as const;

const TECH = [
  "Next.js 15",
  "FastAPI",
  "TanStack Query",
  "Framer Motion",
  "Tailwind CSS",
  "LangChain",
  "PWA",
  "next-intl",
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function PromoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("promo");
  const tApp = await getTranslations("app");
  const isAr = locale === "ar";

  const features = [
    { Icon: ClockIcon,      accent: false, title: t("features.timings.title"), desc: t("features.timings.desc") },
    { Icon: CompassIcon,    accent: true,  title: t("features.qibla.title"),   desc: t("features.qibla.desc") },
    { Icon: BotIcon,        accent: false, title: t("features.ai.title"),      desc: t("features.ai.desc") },
    { Icon: CalendarIcon,   accent: true,  title: t("features.monthly.title"), desc: t("features.monthly.desc") },
    { Icon: CloudOffIcon,   accent: false, title: t("features.offline.title"), desc: t("features.offline.desc") },
    { Icon: SmartphoneIcon, accent: true,  title: t("features.pwa.title"),     desc: t("features.pwa.desc") },
  ];

  return (
    <>
      {/* Minimal promo header — no nav links, just logo + controls */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-primary"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
              <CrescentIcon />
            </span>
            <span className="hidden sm:inline">{tApp("title")}</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

    <MotionPage>
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-24 pb-16">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="pt-8 text-center">
          {/* Live badge */}
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {t("hero.badge")}
            </span>
          </div>

          {/* App icon */}
          <div className="mb-6 flex justify-center">
            <div
              className="grid h-20 w-20 place-items-center rounded-[1.5rem] bg-primary/10 text-primary shadow-soft"
              style={{ boxShadow: "0 0 0 1px color-mix(in srgb, var(--primary) 20%, transparent), 0 8px 32px color-mix(in srgb, var(--primary) 15%, transparent)" }}
            >
              <CrescentIcon large />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            {tApp("title")}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-muted">
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("hero.cta")}
              <ArrowIcon flip={isAr} />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <GitHubIcon />
              {t("hero.github")}
            </a>
          </div>

          {/* Decorative divider */}
          <div className="mt-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xl text-muted/60">☽</span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────────────── */}
        <section>
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              {t("features.title")}
            </h2>
            <p className="text-muted">{t("features.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ Icon, accent, title, desc }, i) => (
              <div
                key={i}
                className="card-surface group rounded-3xl p-6 transition-transform hover:-translate-y-0.5"
              >
                <div
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
                    accent
                      ? "bg-accent/10 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <div className="h-5 w-5">
                    <Icon />
                  </div>
                </div>
                <h3 className="mb-1.5 font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Prayer Times Preview ───────────────────────────────────────────── */}
        <section>
          <div className="card-surface overflow-hidden rounded-3xl">
            {/* Card header */}
            <div className="flex items-start justify-between border-b border-border px-6 py-5 sm:px-8">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  {t("preview.title")}
                </h2>
                <p className="mt-0.5 text-sm text-muted">{t("preview.city")}</p>
              </div>
              <div className={isAr ? "text-start" : "text-end"}>
                <p className="text-xs text-muted">{t("preview.next")}</p>
                <p className="mt-0.5 font-mono text-xl font-bold text-primary">
                  {isAr ? "١:٤٥:٢٢" : "1:45:22"}
                </p>
              </div>
            </div>

            {/* Prayer rows */}
            <div className="divide-y divide-border">
              {MOCK_PRAYERS.map((p) => (
                <div
                  key={p.en}
                  className={`flex items-center justify-between px-6 py-4 sm:px-8 ${
                    p.next ? "bg-primary" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {p.next && (
                      <span className="flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary-foreground opacity-50" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground" />
                      </span>
                    )}
                    <span
                      className={`font-medium ${
                        p.next ? "text-primary-foreground" : "text-foreground"
                      }`}
                    >
                      {isAr ? p.ar : p.en}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-sm ${
                      p.next
                        ? "text-primary-foreground/80"
                        : "text-muted"
                    }`}
                  >
                    {isAr ? p.timeAr : p.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tech Stack ─────────────────────────────────────────────────────── */}
        <section className="text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted">
            {t("stack.title")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted shadow-soft"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────────────────────── */}
        <section>
          <div className="card-surface overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-14">
            {/* Ambient glow strip */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
            />

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-primary/10 text-primary">
              <CrescentIcon large />
            </div>

            <h2 className="mb-3 text-3xl font-bold text-foreground">
              {t("cta.title")}
            </h2>
            <p className="mb-8 text-muted">{t("cta.subtitle")}</p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("cta.open")}
              <ArrowIcon flip={isAr} />
            </Link>
          </div>
        </section>

      </div>
    </MotionPage>
    </>
  );
}
