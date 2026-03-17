"use client";

import { useTranslations } from "next-intl";
import { NotFoundLeadForm } from "@/components/palmares/not-found-lead-form";
import { SchemaOrg } from "@/components/schema-org";
import { BarChart3, BookOpen, LinkIcon } from "lucide-react";

export function PreviewNotFound() {
  const t = useTranslations("previewNotFound");

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Preview expired",
    isAccessibleForFree: true,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SchemaOrg data={schema} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-500">
              <LinkIcon className="h-3.5 w-3.5" />
              Lien expiré
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section className="mx-auto max-w-7xl flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-xl">
          <NotFoundLeadForm namespace="previewNotFound" />
        </div>
      </section>

      {/* Links */}
      <section className="border-t border-border/50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/classement"
              className="inline-flex items-center gap-2 rounded-md border border-border/50 bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <BarChart3 className="h-4 w-4" />
              {t("links.ranking")}
            </a>
            <a
              href="/methodologie"
              className="inline-flex items-center gap-2 rounded-md border border-border/50 bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <BookOpen className="h-4 w-4" />
              {t("links.methodology")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
