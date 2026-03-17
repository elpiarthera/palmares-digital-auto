import type { MetadataRoute } from "next";
import { getGroups } from "@/lib/data";

const BASE_URL = "https://palmares-digital-auto.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const groups = getGroups();

  const staticPages = [
    { path: "" },
    { path: "/classement" },
    { path: "/methodologie" },
    { path: "/insights" },
    { path: "/a-propos" },
    { path: "/votre-score" },
    { path: "/mentions-legales" },
    { path: "/confidentialite" },
  ];

  const locales = ["fr", "en"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const prefix = locale === "fr" ? "" : "/en";
    const enPaths: Record<string, string> = {
      "/classement": "/ranking",
      "/methodologie": "/methodology",
      "/a-propos": "/about",
      "/votre-score": "/get-your-score",
      "/mentions-legales": "/legal-notice",
      "/confidentialite": "/privacy-policy",
    };

    for (const page of staticPages) {
      const localizedPath =
        locale === "en" ? enPaths[page.path] ?? page.path : page.path;
      entries.push({
        url: `${BASE_URL}${prefix}${localizedPath}`,
        lastModified: new Date("2026-03-15"),
      });
    }

    for (const group of groups) {
      const groupPath =
        locale === "en"
          ? `/en/groups/${group.slug}`
          : `/groupes/${group.slug}`;
      entries.push({
        url: `${BASE_URL}${groupPath}`,
        lastModified: new Date("2026-03-15"),
      });
    }
  }

  return entries;
}
