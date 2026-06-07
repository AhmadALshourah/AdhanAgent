/**
 * Root-level not-found page.
 *
 * Rendered when notFound() is thrown INSIDE the [locale] layout itself —
 * which happens for invalid locale segments like /de or /zh.  At that point
 * the locale layout has already failed, so this file cannot use next-intl
 * hooks.  We render a static bilingual (AR / EN) fallback instead.
 */
import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          fontFamily: "system-ui, sans-serif",
          background: "#0a1628",
          color: "#e2e8f0",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <span style={{ fontSize: "4rem" }}>🕌</span>

        <h1 style={{ fontSize: "3rem", fontWeight: 700, margin: 0 }}>404</h1>

        <p style={{ color: "#94a3b8", margin: 0 }}>
          الصفحة غير موجودة — Page not found
        </p>

        <Link
          href="/ar"
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1.5rem",
            background: "#0d7a6e",
            color: "#fff",
            borderRadius: "0.75rem",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          الرئيسية — Home
        </Link>
      </body>
    </html>
  );
}
