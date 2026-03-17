import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Server, Scale, Shield, Database } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("title"),
  };
}

export default async function LegalNoticePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalNoticeContent />;
}

function LegalNoticeContent() {
  const t = useTranslations("legal");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {t("publisher.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p className="font-semibold text-foreground">{t("publisher.company")}</p>
            <p>SIRET : {t("publisher.siret")}</p>
            <p>{t("publisher.address")}</p>
            <p>{t("publisher.email")}</p>
            <p>{t("publisher.director")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              {t("hosting.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p className="font-semibold text-foreground">{t("hosting.provider")}</p>
            <p>{t("hosting.address")}</p>
            <p>
              <a
                href={t("hosting.website")}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                {t("hosting.website")}
              </a>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              {t("intellectual.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t("intellectual.description")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              {t("data.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t("data.description")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t("liability.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t("liability.description")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
