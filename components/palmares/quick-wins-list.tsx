import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, Minus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Group } from "@/lib/data";

interface QuickWinsListProps {
  wins: Group["quickWins"];
}

const impactConfig = {
  high: { icon: Zap, className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" },
  medium: { icon: TrendingUp, className: "bg-blue-500/10 text-blue-500 border-blue-500/30" },
  low: { icon: Minus, className: "bg-muted text-muted-foreground border-border" },
};

export function QuickWinsList({ wins }: QuickWinsListProps) {
  const locale = useLocale();
  const t = useTranslations("group.impact");

  return (
    <ol className="space-y-4">
      {wins.map((win, i) => {
        const config = impactConfig[win.impact as keyof typeof impactConfig] ?? impactConfig.medium;
        const Icon = config.icon;
        return (
          <li key={i} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
              {i + 1}
            </span>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-snug">
                {locale === "fr" ? win.action : win.actionEn}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={config.className}>
                  <Icon className="mr-1 h-3 w-3" />
                  {t(win.impact as "high" | "medium" | "low")}
                </Badge>
                <span className="text-xs text-muted-foreground">{win.dimension}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
