import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DimensionComparisonChart } from "@/components/charts/comparison-chart";
import { getIndustryData } from "@/lib/data";
import { SchemaOrg } from "@/components/schema-org";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { getPageAlternates } from "@/lib/urls";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insights" });
  const alternates = getPageAlternates(locale, "/insights");
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
    },
  };
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <InsightsContent />;
}

function InsightsContent() {
  const t = useTranslations("insights");
  const locale = useLocale();
  const industry = getIndustryData();

  const patterns = t.raw("patterns.items") as Array<{
    title: string;
    description: string;
  }>;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: locale === "fr" ? "Insights industrie" : "Industry Insights",
    url: `https://palmares-digital-auto.vercel.app${locale === "en" ? "/en" : ""}/insights`,
    isPartOf: { "@type": "WebSite", "@id": "https://palmares-digital-auto.vercel.app/#website" },
    about: {
      "@type": "Dataset",
      name: "Palmar\u00e8s Digital Auto France Q1 2026",
      description: "Digital maturity scores for 16 French car dealer groups across 87 criteria",
      creator: { "@type": "Organization", "@id": "https://palmares-digital-auto.vercel.app/#organization" },
      temporalCoverage: "2026-Q1",
      variableMeasured: ["Technical SEO", "SEO Content", "Email Deliverability", "AI Citation Readiness"],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "fr" ? "Accueil" : "Home", item: "https://palmares-digital-auto.vercel.app" + (locale === "en" ? "/en" : "") },
      { "@type": "ListItem", position: 2, name: "Insights" },
    ],
  };

  return (
    <>
    <SchemaOrg data={[webPageSchema, breadcrumbSchema]} />
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("description")}</p>
      </div>

      {/* Editorial intro */}
      <div className="mb-12 max-w-4xl">
        <p className="mb-8 text-muted-foreground leading-relaxed">
          {t("editorial.intro")}
        </p>

        <h2 className="mb-3 text-xl font-bold">{t("editorial.seoTechTitle")}</h2>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          {t("editorial.seoTechBody")}
        </p>

        <h2 className="mb-3 text-xl font-bold">{t("editorial.seoContentTitle")}</h2>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          {t("editorial.seoContentBody")}
        </p>

        <h2 className="mb-3 text-xl font-bold">{t("editorial.emailTitle")}</h2>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          {t("editorial.emailBody")}
        </p>
      </div>

      {/* Blind Spot Hero */}
      <Card className="mb-12 border-red-500/30 bg-red-500/5">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:text-left">
          <AlertTriangle className="h-12 w-12 shrink-0 text-red-500" />
          <div>
            <h2 className="text-xl font-bold">{t("blindSpot.title")}</h2>
            <p className="mt-1 text-muted-foreground">{t("blindSpot.description")}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-6 md:justify-start">
              <div>
                <p className="text-3xl font-bold text-red-500">28/100</p>
                <p className="text-xs text-muted-foreground">
                  {t("dimensionComparison.average")}
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-500">71/100</p>
                <p className="text-xs text-muted-foreground">
                  {t("dimensionComparison.best")}
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-400">8/100</p>
                <p className="text-xs text-muted-foreground">
                  {t("dimensionComparison.worst")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dimension Comparison Chart */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">{t("dimensionComparison.title")}</h2>
        <Card>
          <CardContent className="pt-6">
            <DimensionComparisonChart />
          </CardContent>
        </Card>
      </section>

      {/* Key Patterns */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">{t("patterns.title")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {patterns.map((pattern, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-start gap-2 text-base">
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-chart-2" />
                  {pattern.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{pattern.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Deep dive: AI Citation */}
      <section className="mb-12 max-w-4xl">
        <h2 className="mb-3 text-xl font-bold">{t("editorial.aiCitationTitle")}</h2>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          {t("editorial.aiCitationBody")}
        </p>
      </section>

      {/* Best practices */}
      <section className="mb-12 max-w-4xl">
        <h2 className="mb-3 text-xl font-bold">{t("editorial.bestPracticesTitle")}</h2>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          {t("editorial.bestPracticesBody")}
        </p>
      </section>

      {/* Common failures */}
      <section className="mb-12 max-w-4xl">
        <h2 className="mb-3 text-xl font-bold">{t("editorial.commonFailuresTitle")}</h2>
        <ul className="mb-6 list-disc space-y-1 pl-5 text-muted-foreground">
          {(t.raw("editorial.commonFailuresItems") as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Cross-industry comparison */}
      <section className="max-w-4xl">
        <h2 className="mb-3 text-xl font-bold">{t("editorial.comparisonTitle")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("editorial.comparisonBody")}
        </p>
      </section>
    </div>
    </>
  );
}
