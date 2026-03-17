import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getGroupBySlug, getGroups, getIndustryData, DIMENSION_KEYS } from "@/lib/data";
import { GroupDetailContent } from "./content";
import { getGroupPageAlternates } from "@/lib/urls";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getGroups().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const group = getGroupBySlug(slug);
  if (!group) return {};
  const t = await getTranslations({ locale, namespace: "group" });
  const title = `${group.name} \u2014 ${group.total}/400 (Tier ${group.tier})`;
  const description = `${group.name}: ${t("rank")} #${group.rank} ${t("of")}. SEO Tech ${group.scores.seoTechnical}/100, SEO Content ${group.scores.seoContent}/100, Email ${group.scores.email}/100, AI Citation ${group.scores.aiCitation}/100.`;
  const alternates = getGroupPageAlternates(locale, slug);
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

export default async function GroupPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const group = getGroupBySlug(slug);
  if (!group) notFound();
  const industry = getIndustryData();
  return <GroupDetailContent group={group} industry={industry} />;
}
