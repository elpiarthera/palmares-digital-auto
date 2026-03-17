import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SchemaOrg } from "@/components/schema-org";
import { NotFoundLeadForm } from "@/components/palmares/not-found-lead-form";
import { BarChart3, Home, BookOpen, Shield, Eye } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("notFound");

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "404",
    isAccessibleForFree: true,
  };

  return (
    <>
      <SchemaOrg data={schema} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
              404
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-xl">
          {/* Trust signals */}
          <div className="mb-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-emerald-500" />
              {t("trustSignals.criteria")}
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-emerald-500" />
              {t("trustSignals.free")}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-emerald-500" />
              {t("trustSignals.methodology")}
            </span>
          </div>

          <NotFoundLeadForm namespace="notFound" />
        </div>
      </section>

      {/* Alternative paths */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/classement">
            <Button variant="outline" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              {t("links.ranking")}
            </Button>
          </Link>
          <Link href="/methodologie">
            <Button variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" />
              {t("links.methodology")}
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <Home className="h-4 w-4" />
              {t("links.home")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
