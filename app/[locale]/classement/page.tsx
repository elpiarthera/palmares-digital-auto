import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { RankingTable } from "@/components/palmares/ranking-table";
import { getGroups } from "@/lib/data";
import { SchemaOrg } from "@/components/schema-org";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ranking" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RankingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RankingContent />;
}

function RankingContent() {
  const t = useTranslations("ranking");
  const groups = getGroups();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Palmar\u00e8s Digital Auto France 2026",
    numberOfItems: groups.length,
    itemListElement: groups.map((g) => ({
      "@type": "ListItem",
      position: g.rank,
      name: g.name,
      url: `https://palmares-digital-auto.vercel.app/groupes/${g.slug}`,
    })),
  };

  return (
    <>
      <SchemaOrg data={schemaData} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("description")}</p>
        </div>
        <RankingTable groups={groups} />
      </div>
    </>
  );
}
