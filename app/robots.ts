import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/preview/", "/api/"],
      },
    ],
    sitemap: "https://palmares-digital-auto.vercel.app/sitemap.xml",
  };
}
