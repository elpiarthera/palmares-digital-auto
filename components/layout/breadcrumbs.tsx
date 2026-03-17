"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const FR_PATH_LABELS: Record<string, string> = {
  classement: "Classement",
  methodologie: "Méthodologie",
  insights: "Insights",
  "a-propos": "À propos",
  "votre-score": "Votre score",
  groupes: "Classement",
  "mentions-legales": "Mentions légales",
  confidentialite: "Confidentialité",
};

const EN_PATH_LABELS: Record<string, string> = {
  classement: "Ranking",
  methodologie: "Methodology",
  insights: "Insights",
  "a-propos": "About",
  "votre-score": "Get your score",
  groupes: "Ranking",
  "mentions-legales": "Legal notice",
  confidentialite: "Privacy policy",
};

function slugToName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");

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

    // For group detail pages, show "Classement" as parent link
    if (segment === "groupes" && segments[i + 1]) {
      items.push({
        label: labels["groupes"] || "Classement",
        href: "/classement" as any,
      });
      continue;
    }

    // If this is a slug under groupes, format the name nicely
    if (i > 0 && segments[i - 1] === "groupes") {
      items.push({ label: slugToName(segment) });
      continue;
    }

    const label = labels[segment] || slugToName(segment);
    items.push(isLast ? { label } : { label, href: `/${segments.slice(0, i + 1).join("/")}` as any });
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
                href={item.href as any}
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
