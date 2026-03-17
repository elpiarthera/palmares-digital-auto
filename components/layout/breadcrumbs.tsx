"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname as useRawPathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import type { Pathnames } from "@/i18n/routing";

interface BreadcrumbsProps {
  groupName?: string;
}

type StaticPathname = Exclude<Pathnames, "/groupes/[slug]">;

interface BreadcrumbItem {
  label: string;
  href?: StaticPathname;
}

const FR_PATH_LABELS: Record<string, string> = {
  classement: "Classement",
  methodologie: "M\u00e9thodologie",
  insights: "Insights",
  "a-propos": "\u00c0 propos",
  "votre-score": "Votre score",
  groupes: "Classement",
  "mentions-legales": "Mentions l\u00e9gales",
  confidentialite: "Confidentialit\u00e9",
};

const EN_PATH_LABELS: Record<string, string> = {
  // Internal route names (next-intl internal pathnames)
  classement: "Ranking",
  methodologie: "Methodology",
  insights: "Insights",
  "a-propos": "About",
  "votre-score": "Get your score",
  groupes: "Ranking",
  "mentions-legales": "Legal notice",
  confidentialite: "Privacy policy",
  // Localized English route names (actual URL segments)
  ranking: "Ranking",
  methodology: "Methodology",
  about: "About",
  "get-your-score": "Get your score",
  groups: "Ranking",
  "legal-notice": "Legal notice",
  "privacy-policy": "Privacy policy",
};

// Map URL segments to internal pathnames for Link
const SEGMENT_TO_PATHNAME: Record<string, StaticPathname> = {
  classement: "/classement",
  ranking: "/classement",
  methodologie: "/methodologie",
  methodology: "/methodologie",
  insights: "/insights",
  "a-propos": "/a-propos",
  about: "/a-propos",
  "votre-score": "/votre-score",
  "get-your-score": "/votre-score",
  "mentions-legales": "/mentions-legales",
  "legal-notice": "/mentions-legales",
  confidentialite: "/confidentialite",
  "privacy-policy": "/confidentialite",
};

function slugToName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Breadcrumbs({ groupName }: BreadcrumbsProps) {
  const rawPathname = useRawPathname();
  const locale = useLocale();
  const t = useTranslations("nav");

  // Strip locale prefix from raw pathname
  const pathname = rawPathname.replace(/^\/(fr|en)/, "") || "/";

  // Don't show on homepage
  if (pathname === "/") {
    return null;
  }

  const labels = locale === "fr" ? FR_PATH_LABELS : EN_PATH_LABELS;
  const homeLabel = locale === "fr" ? "Accueil" : "Home";
  const segments = pathname.split("/").filter(Boolean);

  const items: BreadcrumbItem[] = [{ label: homeLabel, href: "/" }];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const isLast = i === segments.length - 1;

    // For group detail pages, show "Classement"/"Ranking" as parent link
    if ((segment === "groupes" || segment === "groups") && segments[i + 1]) {
      items.push({
        label: labels[segment] || (locale === "fr" ? "Classement" : "Ranking"),
        href: "/classement",
      });
      continue;
    }

    // If this is a slug under groupes/groups, resolve name from prop or fallback
    if (i > 0 && (segments[i - 1] === "groupes" || segments[i - 1] === "groups")) {
      items.push({ label: groupName ?? slugToName(segment) });
      continue;
    }

    const label = labels[segment] || slugToName(segment);
    const segmentPathname = SEGMENT_TO_PATHNAME[segment];
    items.push(isLast ? { label } : { label, href: segmentPathname });
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {i === 0 ? (
                  <span className="flex items-center gap-1">
                    <Home className="h-3 w-3" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                ) : (
                  item.label
                )}
              </Link>
            ) : (
              <span className="font-medium text-foreground/80">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
