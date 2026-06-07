import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Pass the routing object directly — do NOT spread it.
// next-intl may attach non-enumerable properties to the routing config that
// are required for correct locale resolution and would be silently lost by
// `{ ...routing }`. localeDetection defaults to true, so no override needed.
export default createMiddleware(routing);

export const config = {
  // Exclude: Next.js internals, Vercel internals, and any static file (has a dot).
  // Everything else (/, /ar, /en, /ar/monthly, …) goes through locale middleware.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
