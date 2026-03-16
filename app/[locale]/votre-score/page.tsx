import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LeadCaptureForm } from "@/components/palmares/lead-capture-form";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "getScore" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function GetScorePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <LeadCaptureForm variant="full" context="get-your-score" />
    </div>
  );
}
