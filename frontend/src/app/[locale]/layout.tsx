import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { routing } from "@/i18n/routing";
import { Providers } from "../providers";
import { Navbar } from "@/components/Navbar";
import { PwaRegister } from "@/components/PwaRegister";
import "../globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AdhanAgent — مواقيت الصلاة والقبلة",
  description: "Prayer times, Qibla direction, and an AI prayer assistant.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "وكيل الأذان",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d7a6e",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  // Read the theme cookie the client sets (via ThemeToggle or the anti-flash
  // script).  This lets the server include `dark` in the initial className so
  // React's RSC reconciliation never strips it during locale navigation.
  const cookieStore = await cookies();
  const isDark = cookieStore.get("theme")?.value === "dark";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${inter.variable}${isDark ? " dark" : ""}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
      </head>
      <body className="min-h-screen antialiased">
        {/*
          Anti-flash script: runs before React hydration to apply the saved
          theme.  Also writes the `theme` cookie so the server component above
          reads the correct value on every RSC navigation (locale switch).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.theme||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');document.cookie='theme='+t+';path=/;max-age=31536000;SameSite=Lax';}catch(e){}`,
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Suspense fallback={null}>
              <PwaRegister />
            </Suspense>
            <Navbar />
            <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
