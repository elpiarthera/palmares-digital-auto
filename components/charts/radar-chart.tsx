"use client";

import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useLocale } from "next-intl";
import { getDimensionLabel, getIndustryData, type Group, type DimensionKey, DIMENSION_KEYS } from "@/lib/data";

interface RadarChartProps {
  group: Group;
  showAverage?: boolean;
}

export function RadarChart({ group, showAverage = true }: RadarChartProps) {
  const locale = useLocale();
  const industry = getIndustryData();

  const data = DIMENSION_KEYS.map((key) => ({
    dimension: getDimensionLabel(key, locale),
    score: group.scores[key],
    average: industry.averages[key as keyof typeof industry.averages],
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsRadar cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="oklch(0.556 0 0 / 0.2)" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: "oklch(0.556 0 0)", fontSize: 10 }}
          tickCount={5}
        />
        {showAverage && (
          <Radar
            name={locale === "fr" ? "Moyenne secteur" : "Industry average"}
            dataKey="average"
            stroke="oklch(0.556 0 0)"
            fill="oklch(0.556 0 0)"
            fillOpacity={0.1}
            strokeDasharray="4 4"
          />
        )}
        <Radar
          name={group.name}
          dataKey="score"
          stroke="oklch(0.623 0.214 259.815)"
          fill="oklch(0.623 0.214 259.815)"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, color: "oklch(0.708 0 0)" }}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
