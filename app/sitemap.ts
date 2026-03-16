import type { MetadataRoute } from "next";
import { getGroups } from "@/lib/data";

const BASE_URL = "https://palmares-digital-auto.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const groups = getGroups();

  const staticPages = [
    { path: "", priority: 1.0 },
    { path: "/classement", priority: 0.9 },
    { path: "/methodologie", priority: 0.8 },
    { path: "/insights", priority: 0.8 },
    { path: "/a-propos", priority: 0.5 },
    { path: "/votre-score", priority: 0.7 },
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
    };

    for (const page of staticPages) {
      const localizedPath =
        locale === "en" ? enPaths[page.path] ?? page.path : page.path;
      entries.push({
        url: `${BASE_URL}${prefix}${localizedPath}`,
        lastModified: new Date("2026-03-15"),
        changeFrequency: "monthly",
        priority: page.priority,
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
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
