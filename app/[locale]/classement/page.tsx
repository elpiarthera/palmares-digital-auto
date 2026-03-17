import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { RankingTable } from "@/components/palmares/ranking-table";
import { getGroups } from "@/lib/data";
import { SchemaOrg } from "@/components/schema-org";
import { Link } from "@/i18n/navigation";
import { getPageAlternates } from "@/lib/urls";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ranking" });
  const alternates = getPageAlternates(locale, "/classement");
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

export default async function RankingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RankingContent />;
}

function RankingContent() {
  const t = useTranslations("ranking");
  const locale = useLocale();
  const groups = getGroups();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Palmar\u00e8s Digital Auto France 2026",
    description: "Le classement de la maturit\u00e9 digitale des 16 plus grands groupes de distribution automobile en France.",
    numberOfItems: groups.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: groups.map((g) => ({
      "@type": "ListItem",
      position: g.rank,
      item: {
        "@type": "Organization",
        "@id": `https://palmares-digital-auto.vercel.app/groupes/${g.slug}`,
        name: g.name,
        url: `https://${g.website}`,
      },
    })),
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Palmar\u00e8s Digital Auto France Q1 2026",
    description: "Digital maturity scores for 16 French car dealer groups across 87 criteria in 4 dimensions.",
    temporalCoverage: "2026-Q1",
    creator: {
      "@type": "Organization",
      "@id": "https://palmares-digital-auto.vercel.app/#organization",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "fr" ? "Accueil" : "Home", item: "https://palmares-digital-auto.vercel.app" + (locale === "en" ? "/en" : "") },
      { "@type": "ListItem", position: 2, name: locale === "fr" ? "Classement" : "Ranking" },
    ],
  };

  return (
    <>
      <SchemaOrg data={[itemListSchema, datasetSchema, breadcrumbSchema]} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("description")}</p>
        </div>

        <div className="mb-10 max-w-3xl space-y-3">
          <h2 className="text-lg font-semibold">{t("editorial.howToRead")}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("editorial.howToReadDescription")}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("editorial.tiersExplained")}
          </p>
          <p className="text-sm text-muted-foreground">
            <Link href="/methodologie" className="underline hover:text-foreground">
              {t("editorial.methodologyLink")}
            </Link>
          </p>
        </div>

        <RankingTable groups={groups} />
      </div>
    </>
  );
}
