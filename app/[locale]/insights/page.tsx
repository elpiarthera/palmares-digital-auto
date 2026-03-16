import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DimensionComparisonChart } from "@/components/charts/comparison-chart";
import { getIndustryData } from "@/lib/data";
import { AlertTriangle, TrendingUp } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insights" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <InsightsContent />;
}

function InsightsContent() {
  const t = useTranslations("insights");
  const industry = getIndustryData();

  const patterns = t.raw("patterns.items") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("description")}</p>
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
      <section>
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
    </div>
  );
}
