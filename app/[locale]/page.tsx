import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { IndustryStats } from "@/components/palmares/industry-stats";
import { RankingTable } from "@/components/palmares/ranking-table";
import { getTopGroups } from "@/lib/data";
import { ArrowRight, BarChart3 } from "lucide-react";
import { SchemaOrg } from "@/components/schema-org";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  const topGroups = getTopGroups(5);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://palmares-digital-auto.vercel.app/#website",
    name: "Palmar\u00e8s Digital Auto France 2026",
    url: "https://palmares-digital-auto.vercel.app",
    description:
      "Le classement de la maturit\u00e9 digitale des groupes de distribution automobile en France",
    inLanguage: ["fr", "en"],
    publisher: {
      "@type": "Organization",
      "@id": "https://palmares-digital-auto.vercel.app/#organization",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil" },
    ],
  };

  return (
    <>
      <SchemaOrg data={[websiteSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5" />
              Q1 2026 &mdash; 87 checks &middot; 16 groups &middot; 4 dimensions
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("hero.description")}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/classement">
                <Button size="lg" className="gap-2">
                  {t("hero.ctaRanking")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/votre-score">
                <Button variant="outline" size="lg">
                  {t("hero.ctaScore")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold">{t("editorial.title")}</h2>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          {t("editorial.intro")}
        </p>
        <h3 className="mb-3 text-xl font-semibold">{t("editorial.whatTitle")}</h3>
        <p className="mb-3 text-muted-foreground">{t("editorial.whatDescription")}</p>
        <ul className="mb-6 list-disc space-y-1 pl-5 text-muted-foreground">
          {(t.raw("editorial.dimensions") as string[]).map((dim, i) => (
            <li key={i}>{dim}</li>
          ))}
        </ul>
        <h3 className="mb-3 text-xl font-semibold">{t("editorial.transparencyTitle")}</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          {t("editorial.transparencyDescription")}
        </p>
        <p className="text-sm text-muted-foreground italic">
          {t("editorial.producedBy")}
        </p>
      </section>

      {/* Industry Stats */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold">{t("stats.title")}</h2>
        <IndustryStats />
      </section>

      {/* Top 5 */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t("topFive.title")}</h2>
          <Link href="/classement">
            <Button variant="ghost" className="gap-1 text-sm">
              {t("topFive.seeAll")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
        <RankingTable groups={topGroups} compact />
      </section>
    </>
  );
}
