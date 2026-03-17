"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TierBadge } from "@/components/palmares/tier-badge";
import { ScoreBar } from "@/components/palmares/score-bar";
import { QuickWinsList } from "@/components/palmares/quick-wins-list";
import { LeadCaptureForm } from "@/components/palmares/lead-capture-form";
import { RadarChart } from "@/components/charts/radar-chart";
import { SchemaOrg } from "@/components/schema-org";
import {
  type Group,
  type Tier,
  type DimensionKey,
  DIMENSION_KEYS,
  getDimensionLabel,
} from "@/lib/data";
import {
  ArrowLeft,
  Globe,
  Building2,
  MapPin,
  TrendingUp,
} from "lucide-react";

interface GroupDetailContentProps {
  group: Group;
  industry: {
    averages: Record<string, number>;
  };
  isPreview?: boolean;
}

const SITE_LIVE = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

export function GroupDetailContent({ group, industry, isPreview }: GroupDetailContentProps) {
  const t = useTranslations("group");
  const tTeaser = useTranslations("groupTeaser");
  const locale = useLocale();

  // Pre-launch: show teaser unless preview mode
  if (!SITE_LIVE && !isPreview) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/classement">
          <Button variant="ghost" size="sm" className="mb-6 gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("backToRanking")}
          </Button>
        </Link>

        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <TierBadge tier={group.tier as Tier} size="lg" />
              <span className="text-sm text-muted-foreground">
                #{group.rank} {t("of")}
              </span>
            </div>
            <CardTitle className="text-3xl">{group.name}</CardTitle>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                {group.website}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                {group.dealerships} {locale === "fr" ? "concessions" : "dealerships"}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Separator />

            <div className="rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 p-6 text-center">
              <p className="text-lg font-semibold">
                {tTeaser("locked")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {tTeaser("description")}
              </p>
            </div>

            <div className="text-center">
              <Link href="/votre-score">
                <Button size="lg" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  {tTeaser("cta")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const dimensionLabels: Record<DimensionKey, string> = {
    seoTechnical: t("seoTechnical"),
    seoContent: t("seoContent"),
    email: t("email"),
    aiCitation: t("aiCitation"),
  };

  const findingKeys: Record<DimensionKey, keyof typeof group.keyFindings> = {
    seoTechnical: "seoTechnical",
    seoContent: "seoContent",
    email: "email",
    aiCitation: "aiCitation",
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      "@id": `https://palmares-digital-auto.vercel.app/groupes/${group.slug}`,
      name: group.name,
      url: `https://${group.website}`,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: group.total,
      bestRating: 400,
      worstRating: 0,
    },
    author: {
      "@type": "Organization",
      "@id": "https://palmares-digital-auto.vercel.app/#organization",
    },
    datePublished: "2026-03-15",
    reviewBody: `${group.name} scores ${group.total}/400 (Tier ${group.tier}), ranking #${group.rank} of 16 French car dealer groups. Technical SEO: ${group.scores.seoTechnical}/100, SEO Content: ${group.scores.seoContent}/100, Email: ${group.scores.email}/100, AI Citation: ${group.scores.aiCitation}/100.`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable-summary"],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "fr" ? "Accueil" : "Home", item: "https://palmares-digital-auto.vercel.app" + (locale === "en" ? "/en" : "") },
      { "@type": "ListItem", position: 2, name: locale === "fr" ? "Classement" : "Ranking", item: "https://palmares-digital-auto.vercel.app" + (locale === "en" ? "/en/ranking" : "/classement") },
      { "@type": "ListItem", position: 3, name: group.name },
    ],
  };

  return (
    <>
      <SchemaOrg data={[reviewSchema, breadcrumbSchema]} />

      {isPreview && (
        <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-4 text-center text-sm text-amber-200">
          <p className="font-semibold text-amber-400">
            {locale === "fr"
              ? "Aperçu confidentiel"
              : "Confidential preview"}
          </p>
          <p className="mt-1">
            {locale === "fr"
              ? "Ceci est un aperçu confidentiel. Vous disposez d\u2019un droit de rectification avant publication. Contactez-nous à contact@perello.consulting avant le 31 mars 2026."
              : "This is a confidential preview. You have a right of rectification before publication. Contact us at contact@perello.consulting before March 31, 2026."}
          </p>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        {!isPreview && (
          <Link href="/classement">
            <Button variant="ghost" size="sm" className="mb-6 gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" />
              {t("backToRanking")}
            </Button>
          </Link>
        )}

        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <TierBadge tier={group.tier as Tier} size="lg" />
              <span className="text-sm text-muted-foreground">
                #{group.rank} {t("of")}
              </span>
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl speakable-summary">{group.name}</h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                {group.website}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                {group.dealerships} {locale === "fr" ? "concessions" : "dealerships"}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {group.hq}
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" />
                {group.revenue}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-center rounded-xl border border-border/50 bg-card p-6 text-center speakable-summary">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("total")}
            </p>
            <p className="text-5xl font-bold tabular-nums">{group.total}</p>
            <p className="text-sm text-muted-foreground">{t("outOf400")}</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column: Radar + Dimensions */}
          <div className="space-y-8 lg:col-span-2">
            {/* Scores par dimension */}
            <h2 className="text-2xl font-bold">{locale === "fr" ? "Scores par dimension" : "Scores by dimension"}</h2>
            <Card>
              <CardHeader>
                <CardTitle>{t("dimensions")}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadarChart group={group} />
              </CardContent>
            </Card>

            {/* Score Bars */}
            <Card>
              <CardContent className="space-y-5 pt-6">
                {DIMENSION_KEYS.map((key) => (
                  <ScoreBar
                    key={key}
                    score={group.scores[key]}
                    label={dimensionLabels[key]}
                    average={industry.averages[key]}
                  />
                ))}
                <p className="text-xs text-muted-foreground">
                  {locale === "fr"
                    ? "La ligne verticale indique la moyenne du secteur."
                    : "The vertical line indicates the industry average."}
                </p>
              </CardContent>
            </Card>

            {/* Key Findings */}
            <h2 className="text-2xl font-bold">{locale === "fr" ? "Constats cl\u00e9s" : "Key findings"}</h2>
            <Card>
              <CardHeader>
                <CardTitle>{t("keyFindings")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {DIMENSION_KEYS.map((key) => (
                  <div key={key}>
                    <p className="text-sm font-semibold">{dimensionLabels[key]}</p>
                    <p className="mt-1 text-xs text-muted-foreground/70 italic">
                      {t(`dimensionContext.${key}`)}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {locale === "en" && group.keyFindingsEn
                        ? group.keyFindingsEn[findingKeys[key]]
                        : group.keyFindings[findingKeys[key]]}
                    </p>
                    {key !== "aiCitation" && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right column: Quick Wins + Download */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{locale === "fr" ? "Actions prioritaires" : "Priority actions"}</h2>
            <Card>
              <CardHeader>
                <CardTitle>{t("quickWins")}</CardTitle>
              </CardHeader>
              <CardContent>
                <QuickWinsList wins={group.quickWins} />
              </CardContent>
            </Card>

            <LeadCaptureForm context={`audit-${group.slug}`} />
          </div>
        </div>
      </div>
    </>
  );
}
