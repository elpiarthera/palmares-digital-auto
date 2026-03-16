import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|preview|opengraph-image|icon|favicon|sitemap|robots|apple-touch-icon|.*\\..*).*)",
  ],
};
