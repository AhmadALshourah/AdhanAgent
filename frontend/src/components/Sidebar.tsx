"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Compass, Home, MessageSquare, Moon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/",        key: "home",    Icon: Home          },
  { href: "/monthly", key: "monthly", Icon: Calendar      },
  { href: "/qibla",   key: "qibla",   Icon: Compass       },
  { href: "/chat",    key: "chat",    Icon: MessageSquare },
] as const;

function NavLink({
  href,
  icon: Icon,
  label,
  active,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "text-primary"
          : "text-muted hover:bg-background-2 hover:text-foreground"
      }`}
    >
      {active && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-xl bg-primary/10"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative flex-shrink-0">
        <Icon size={18} />
      </span>
      <span className="relative">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const t = useTranslations();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
      <aside className="sticky top-0 hidden h-screen w-56 flex-shrink-0 flex-col border-e border-border bg-card/70 backdrop-blur-xl md:flex">
        {/* Logo */}
        <div className="border-b border-border px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-primary"
          >
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Moon size={18} />
            </span>
            <span className="truncate text-base">{t("app.title")}</span>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {NAV.map(({ href, key, Icon }) => (
            <NavLink
              key={href}
              href={href}
              icon={Icon}
              label={t(`nav.${key}`)}
              active={isActive(href)}
            />
          ))}
        </nav>

        {/* Bottom controls */}
        <div className="flex items-center gap-2 border-t border-border px-4 py-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </aside>

      {/* ── Mobile bottom nav ────────────────────────────────────────────── */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/80 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md">
          {NAV.map(({ href, key, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                  active ? "text-primary" : "text-muted"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="mobile-active"
                    className="absolute inset-x-2 top-0 h-0.5 rounded-full bg-primary"
                  />
                )}
                <Icon size={20} />
                <span>{t(`nav.${key}`)}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
