import scoresData from "@/data/scores.json";

export type Group = (typeof scoresData.groups)[number];
export type Tier = "A" | "B" | "C" | "D";
export type DimensionKey = keyof Group["scores"];

export const TIER_COLORS: Record<Tier, { bg: string; text: string; border: string }> = {
  A: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/30" },
  B: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/30" },
  C: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/30" },
  D: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/30" },
};

export const DIMENSION_COLORS: Record<DimensionKey, string> = {
  seoTechnical: "oklch(0.809 0.105 251.813)",
  seoContent: "oklch(0.623 0.214 259.815)",
  email: "oklch(0.546 0.245 262.881)",
  aiCitation: "oklch(0.488 0.243 264.376)",
};

export const DIMENSION_KEYS: DimensionKey[] = [
  "seoTechnical",
  "seoContent",
  "email",
  "aiCitation",
];

export function getGroups() {
  return scoresData.groups;
}

export function getGroupBySlug(slug: string) {
  return scoresData.groups.find((g) => g.slug === slug) ?? null;
}

export function getGroupByToken(token: string) {
  const entry = Object.entries(scoresData.previewTokens).find(
    ([, t]) => t === token
  );
  if (!entry) return null;
  return getGroupBySlug(entry[0]);
}

export function getIndustryData() {
  return scoresData.industry;
}

export function getMetadata() {
  return scoresData.metadata;
}

export function getTopGroups(n: number) {
  return scoresData.groups.slice(0, n);
}

export function getDimensionLabel(key: DimensionKey, locale: string) {
  const labels: Record<DimensionKey, Record<string, string>> = {
    seoTechnical: { fr: "SEO Technique", en: "Technical SEO" },
    seoContent: { fr: "SEO Contenu", en: "SEO Content" },
    email: { fr: "Email & Delivrabilite", en: "Email & Deliverability" },
    aiCitation: { fr: "Citation IA", en: "AI Citation" },
  };
  return labels[key]?.[locale] ?? labels[key]?.en ?? key;
}

export function getScoreColor(score: number): string {
  if (score >= 75) return "text-emerald-500";
  if (score >= 50) return "text-blue-500";
  if (score >= 30) return "text-amber-500";
  return "text-red-500";
}

export function getScoreBarColor(score: number): string {
  if (score >= 75) return "bg-emerald-500";
  if (score >= 50) return "bg-blue-500";
  if (score >= 30) return "bg-amber-500";
  return "bg-red-500";
}
