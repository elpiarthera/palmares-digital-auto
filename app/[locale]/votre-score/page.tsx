import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LeadCaptureForm } from "@/components/palmares/lead-capture-form";
import { SchemaOrg } from "@/components/schema-org";
import { getPageAlternates } from "@/lib/urls";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "getScore" });
  const alternates = getPageAlternates(locale, "/votre-score");
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: "website",
      url: alternates.canonical,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function GetScorePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "fr" ? "Accueil" : "Home", item: "https://palmares-digital-auto.vercel.app" + (locale === "en" ? "/en" : "") },
      { "@type": "ListItem", position: 2, name: locale === "fr" ? "Votre score" : "Get your score" },
    ],
  };

  return (
    <>
      <SchemaOrg data={breadcrumbSchema} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <LeadCaptureForm variant="full" context="get-your-score" />
      </div>
    </>
  );
}
