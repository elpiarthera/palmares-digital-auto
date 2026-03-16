"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TierBadge } from "./tier-badge";
import { getScoreColor, type Group, type Tier, type DimensionKey, DIMENSION_KEYS } from "@/lib/data";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface RankingTableProps {
  groups: Group[];
  compact?: boolean;
}

type SortKey = "rank" | "total" | DimensionKey;

export function RankingTable({ groups, compact = false }: RankingTableProps) {
  const t = useTranslations("ranking.columns");
  const locale = useLocale();
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortAsc, setSortAsc] = useState(true);
  const [tierFilter, setTierFilter] = useState<Tier | "all">("all");

  const filtered = useMemo(() => {
    let result = [...groups];
    if (tierFilter !== "all") {
      result = result.filter((g) => g.tier === tierFilter);
    }
    result.sort((a, b) => {
      let av: number, bv: number;
      if (sortKey === "rank") {
        av = a.rank;
        bv = b.rank;
      } else if (sortKey === "total") {
        av = a.total;
        bv = b.total;
      } else {
        av = a.scores[sortKey];
        bv = b.scores[sortKey];
      }
      return sortAsc ? av - bv : bv - av;
    });
    return result;
  }, [groups, sortKey, sortAsc, tierFilter]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === "rank");
    }
  }

  const SortHeader = ({ k, label }: { k: SortKey; label: string }) => (
    <TableHead className="cursor-pointer select-none whitespace-nowrap" onClick={() => toggleSort(k)}>
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className={cn("h-3 w-3", sortKey === k ? "text-foreground" : "text-muted-foreground/50")} />
      </div>
    </TableHead>
  );

  const dimensionLabels: Record<DimensionKey, string> = {
    seoTechnical: t("seoTech"),
    seoContent: t("seoContent"),
    email: t("email"),
    aiCitation: t("aiCitation"),
  };

  return (
    <div className="space-y-4">
      {!compact && (
        <div className="flex flex-wrap gap-2">
          {(["all", "A", "B", "C", "D"] as const).map((tier) => (
            <Button
              key={tier}
              variant={tierFilter === tier ? "default" : "outline"}
              size="sm"
              onClick={() => setTierFilter(tier)}
              className="text-xs"
            >
              {tier === "all"
                ? locale === "fr"
                  ? "Tous"
                  : "All"
                : `Tier ${tier}`}
            </Button>
          ))}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-border/50">
        <Table>
          <TableHeader>
            <TableRow>
              <SortHeader k="rank" label={t("rank")} />
              <TableHead>{t("group")}</TableHead>
              {!compact &&
                DIMENSION_KEYS.map((dk) => (
                  <SortHeader key={dk} k={dk} label={dimensionLabels[dk]} />
                ))}
              <SortHeader k="total" label={t("total")} />
              <TableHead>{t("tier")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((group) => (
              <TableRow key={group.slug} className="group/row hover:bg-accent/50 cursor-pointer">
                <TableCell className="font-mono text-muted-foreground tabular-nums">
                  {group.rank}
                </TableCell>
                <TableCell>
                  <Link
                    href={{ pathname: "/groupes/[slug]", params: { slug: group.slug } }}
                    className="flex items-center gap-2 font-medium hover:underline"
                  >
                    {group.name}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover/row:opacity-50 transition-opacity" />
                  </Link>
                </TableCell>
                {!compact &&
                  DIMENSION_KEYS.map((dk) => (
                    <TableCell key={dk} className={cn("tabular-nums", getScoreColor(group.scores[dk]))}>
                      {group.scores[dk]}
                    </TableCell>
                  ))}
                <TableCell className="font-bold tabular-nums">{group.total}</TableCell>
                <TableCell>
                  <TierBadge tier={group.tier as Tier} size="sm" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
