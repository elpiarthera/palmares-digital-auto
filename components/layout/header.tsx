"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname as useNextPathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const rawPathname = useNextPathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === "fr" ? "en" : "fr";

  // Build locale switcher URL using raw pathname
  const localePrefix = locale === "fr" ? "" : "/en";
  const pathWithoutLocale = rawPathname.replace(/^\/(fr|en)/, "") || "/";
  const localeSwitchHref =
    otherLocale === "fr" ? pathWithoutLocale : `/en${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

  // For nav active detection
  const currentPath = pathWithoutLocale;

  const navItems = [
    { href: "/classement" as const, label: t("ranking"), match: "/classement" },
    { href: "/methodologie" as const, label: t("methodology"), match: "/methodologie" },
    { href: "/insights" as const, label: t("insights"), match: "/insights" },
    { href: "/a-propos" as const, label: t("about"), match: "/a-propos" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BarChart3 className="h-5 w-5 text-primary" />
          <span className="hidden sm:inline">
            {locale === "fr" ? "Palmar\u00e8s Digital Auto" : "Digital Auto Rankings"}
          </span>
          <span className="sm:hidden">PDA 2026</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
                currentPath === item.match || currentPath.startsWith(item.match + "/")
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={localeSwitchHref}>
            <Button variant="ghost" size="sm" className="text-xs">
              {t("language")}
            </Button>
          </a>
          <Link href="/votre-score" className="hidden sm:block">
            <Button size="sm">{t("getScore")}</Button>
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border/50 bg-background px-4 pb-4 pt-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/votre-score"
            className="mt-2 block"
            onClick={() => setMobileOpen(false)}
          >
            <Button size="sm" className="w-full">
              {t("getScore")}
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
