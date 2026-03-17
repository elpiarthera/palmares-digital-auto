import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getGroupBySlug, getGroups } from "@/lib/data";
import { getGroupPageAlternates } from "@/lib/urls";
import { Lock, ArrowRight } from "lucide-react";

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
  const title = `${group.name} — Palmarès Digital Auto France 2026`;
  const description = `${group.name}: #${group.rank}/16, Tier ${group.tier}. Audit complet disponible sur demande.`;
  const alternates = getGroupPageAlternates(locale, slug);
  return {
    title,
    description,
    alternates,
    openGraph: { title, description, url: alternates.canonical },
  };
}

export default async function GroupPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const group = getGroupBySlug(slug);
  if (!group) notFound();
  const t = await getTranslations({ locale, namespace: "group" });

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
        <Lock className="h-4 w-4" />
        {locale === "fr"
          ? "Accès restreint — publication en cours"
          : "Restricted access — publication in progress"}
      </div>

      <h1 className="mb-4 text-4xl font-bold">{group.name}</h1>

      <div className="mb-2 text-lg text-muted-foreground">
        #{group.rank} / 16 — Tier {group.tier}
      </div>

      <p className="mx-auto mb-10 max-w-xl text-muted-foreground">
        {locale === "fr"
          ? "L'audit complet de ce groupe est actuellement en phase de rectification. Les résultats détaillés seront publiés après validation par les groupes audités."
          : "The full audit of this group is currently in the rectification phase. Detailed results will be published after validation by the audited groups."}
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href={locale === "fr" ? "/classement" : "/en/ranking"}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {locale === "fr" ? "Voir le classement" : "See the ranking"}
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href={locale === "fr" ? "/votre-score" : "/en/get-your-score"}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
        >
          {locale === "fr" ? "Obtenir votre score" : "Get your score"}
        </a>
      </div>

      <p className="mt-12 text-xs text-muted-foreground">
        {locale === "fr"
          ? "Vous êtes un dirigeant de ce groupe ? Contactez-nous à contact@perello.consulting pour accéder à votre audit complet."
          : "Are you an executive of this group? Contact us at contact@perello.consulting to access your full audit."}
      </p>
    </div>
  );
}
