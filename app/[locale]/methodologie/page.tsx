import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TierBadge } from "@/components/palmares/tier-badge";
import { SchemaOrg } from "@/components/schema-org";
import { Search, FileText, Mail, Bot, Shield, CheckCircle2 } from "lucide-react";
import type { Tier } from "@/lib/data";
import { getPageAlternates } from "@/lib/urls";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "methodology" });
  const alternates = getPageAlternates(locale, "/methodologie");
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

export default async function MethodologyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MethodologyContent />;
}

function MethodologyContent() {
  const t = useTranslations("methodology");
  const locale = useLocale();

  const dimensions = [
    { key: "seoTechnical", icon: Search, color: "text-chart-1" },
    { key: "seoContent", icon: FileText, color: "text-chart-2" },
    { key: "email", icon: Mail, color: "text-chart-3" },
    { key: "aiCitation", icon: Bot, color: "text-chart-4" },
  ] as const;

  const tiers: Tier[] = ["A", "B", "C", "D"];

  const faqItems = t.raw("faq.items") as Array<{
    question: string;
    answer: string;
  }>;

  const transparencyItems = t.raw("transparency.items") as string[];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "fr" ? "Accueil" : "Home", item: "https://palmares-digital-auto.vercel.app" + (locale === "en" ? "/en" : "") },
      { "@type": "ListItem", position: 2, name: locale === "fr" ? "Méthodologie" : "Methodology" },
    ],
  };

  return (
    <>
      <SchemaOrg data={breadcrumbSchema} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("description")}</p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">{t("overview.title")}</h2>
          <p className="text-muted-foreground">{t("overview.description")}</p>
        </section>

        {/* Dimensions */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">{t("dimensions.title")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {dimensions.map((dim) => (
              <Card key={dim.key}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <dim.icon className={`h-5 w-5 ${dim.color}`} />
                    {t(`dimensions.${dim.key}.title`)}
                  </CardTitle>
                  <p className="text-xs font-medium text-muted-foreground">
                    {t(`dimensions.${dim.key}.checks`)}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t(`dimensions.${dim.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tiers */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">{t("tiers.title")}</h2>
          <div className="space-y-3">
            {tiers.map((tier) => (
              <div
                key={tier}
                className="flex items-start gap-4 rounded-lg border border-border/50 p-4"
              >
                <TierBadge tier={tier} size="lg" />
                <div>
                  <p className="text-sm font-semibold">
                    {t(`tiers.${tier}.range`)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t(`tiers.${tier}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">{t("tools.title")}</h2>
          <p className="text-muted-foreground">{t("tools.description")}</p>
        </section>

        {/* Transparency */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">
            <Shield className="mr-2 inline-block h-5 w-5" />
            {t("transparency.title")}
          </h2>
          <ul className="space-y-2">
            {transparencyItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">{t("faq.title")}</h2>
          <Accordion className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </>
  );
}
