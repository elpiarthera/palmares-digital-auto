/**
 * URL helpers for generating page-specific canonical, OG, and hreflang URLs.
 * Used by generateMetadata() across all pages.
 */

const BASE_URL = "https://palmares-digital-auto.vercel.app";

/**
 * Maps internal (FR) paths to their EN equivalents.
 */
const EN_PATHS: Record<string, string> = {
  "": "",
  "/classement": "/ranking",
  "/methodologie": "/methodology",
  "/insights": "/insights",
  "/a-propos": "/about",
  "/votre-score": "/get-your-score",
};

/**
 * Get the full canonical URL for a page given locale and path.
 * FR = no prefix (default locale with localePrefix: "as-needed")
 * EN = /en prefix with translated path
 */
export function getPageUrl(locale: string, frPath: string): string {
  if (locale === "fr") {
    return `${BASE_URL}${frPath}`;
  }
  const enPath = EN_PATHS[frPath] ?? frPath;
  return `${BASE_URL}/en${enPath}`;
}

/**
 * Get the alternates object (canonical + languages) for a page.
 */
export function getPageAlternates(locale: string, frPath: string) {
  const canonical = getPageUrl(locale, frPath);
  const frUrl = getPageUrl("fr", frPath);
  const enUrl = getPageUrl("en", frPath);

  return {
    canonical,
    languages: {
      fr: frUrl,
      en: enUrl,
      "x-default": frUrl,
    },
  };
}

/**
 * Get group page URL for a given locale and slug.
 */
export function getGroupPageUrl(locale: string, slug: string): string {
  if (locale === "fr") {
    return `${BASE_URL}/groupes/${slug}`;
  }
  return `${BASE_URL}/en/groups/${slug}`;
}

/**
 * Get alternates for a group detail page.
 */
export function getGroupPageAlternates(locale: string, slug: string) {
  const canonical = getGroupPageUrl(locale, slug);
  const frUrl = getGroupPageUrl("fr", slug);
  const enUrl = getGroupPageUrl("en", slug);

  return {
    canonical,
    languages: {
      fr: frUrl,
      en: enUrl,
      "x-default": frUrl,
    },
  };
}

export { BASE_URL };
