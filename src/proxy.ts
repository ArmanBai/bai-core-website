import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable i18n for all paths except Next.js internals, static assets,
    // API routes, and asset routes that handle themselves.
    "/((?!api|_next|_vercel|.*\\..*|icon|opengraph-image|robots\\.txt|sitemap\\.xml|feed\\.xml).*)",
  ],
};
