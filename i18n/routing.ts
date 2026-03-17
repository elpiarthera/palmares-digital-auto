import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/classement": {
      fr: "/classement",
      en: "/ranking",
    },
    "/groupes/[slug]": {
      fr: "/groupes/[slug]",
      en: "/groups/[slug]",
    },
    "/methodologie": {
      fr: "/methodologie",
      en: "/methodology",
    },
    "/insights": "/insights",
    "/a-propos": {
      fr: "/a-propos",
      en: "/about",
    },
    "/votre-score": {
      fr: "/votre-score",
      en: "/get-your-score",
    },
    "/mentions-legales": {
      fr: "/mentions-legales",
      en: "/legal-notice",
    },
    "/confidentialite": {
      fr: "/confidentialite",
      en: "/privacy-policy",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
