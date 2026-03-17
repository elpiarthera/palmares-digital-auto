import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SchemaOrg } from "@/components/schema-org";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Building2, Target, User, Users, Mail, HelpCircle } from "lucide-react";
import { getPageAlternates } from "@/lib/urls";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const alternates = getPageAlternates(locale, "/a-propos");
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

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  const locale = useLocale();

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://palmares-digital-auto.vercel.app/#organization",
    name: "ElPi Corp / Perello Consulting",
    url: "https://perello.consulting",
    description: "AI-driven digital transformation consulting",
    logo: "https://palmares-digital-auto.vercel.app/logo.svg",
    founder: {
      "@type": "Person",
      name: "Laurent Perello",
      url: "https://x.com/PerelloLaurent",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@perello.consulting",
      contactType: "sales",
    },
    sameAs: ["https://x.com/PerelloLaurent"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "fr" ? "Accueil" : "Home", item: "https://palmares-digital-auto.vercel.app" + (locale === "en" ? "/en" : "") },
      { "@type": "ListItem", position: 2, name: locale === "fr" ? "\u00c0 propos" : "About" },
    ],
  };

  const faqItems = t.raw("faq.items") as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <>
      <SchemaOrg data={[orgSchema, breadcrumbSchema]} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("description")}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {t("who.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("who.description")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t("founder.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">{t("founder.bio")}</p>
              <p className="text-muted-foreground">{t("founder.expertise")}</p>
              <p className="text-muted-foreground">{t("founder.approach")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {t("why.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">{t("why.description")}</p>
              <p className="text-muted-foreground">{t("why.extended")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t("team.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("team.description")}</p>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                {t("faq.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                {t("contact.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{t("contact.description")}</p>
              <p className="text-muted-foreground">
                {t("contact.email")}
                {" \u2014 "}
                <a
                  href="https://x.com/PerelloLaurent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  {t("contact.twitter")}
                </a>
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/votre-score">
                  <Button>{t("contact.ctaScore")}</Button>
                </Link>
                <a href={`mailto:${t("contact.email")}`}>
                  <Button variant="outline">{t("contact.ctaContact")}</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
