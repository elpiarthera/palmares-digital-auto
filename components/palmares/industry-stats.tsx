import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Users, ClipboardCheck, AlertTriangle } from "lucide-react";
import { getIndustryData, getMetadata } from "@/lib/data";

export function IndustryStats() {
  const t = useTranslations("home.stats");
  const industry = getIndustryData();
  const meta = getMetadata();

  const stats = [
    {
      icon: BarChart3,
      label: t("averageScore"),
      value: `${industry.averageTotal}`,
      sub: t("outOf"),
      color: "text-amber-500",
    },
    {
      icon: Users,
      label: t("groupsAudited"),
      value: `${meta.totalGroups}`,
      sub: t("groups"),
      color: "text-blue-500",
    },
    {
      icon: ClipboardCheck,
      label: t("checksPerformed"),
      value: `${meta.totalChecks}`,
      sub: t("checks"),
      color: "text-emerald-500",
    },
    {
      icon: AlertTriangle,
      label: t("blindSpot"),
      value: t("blindSpotLabel"),
      sub: t("blindSpotScore"),
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/50">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <stat.icon className={`mb-3 h-6 w-6 ${stat.color}`} />
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
