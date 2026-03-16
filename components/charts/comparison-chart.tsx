"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useLocale } from "next-intl";
import { getDimensionLabel, getIndustryData, DIMENSION_KEYS, DIMENSION_COLORS, type DimensionKey } from "@/lib/data";

export function DimensionComparisonChart() {
  const locale = useLocale();
  const industry = getIndustryData();

  const data = DIMENSION_KEYS.map((key) => ({
    dimension: getDimensionLabel(key, locale),
    average: industry.averages[key as keyof typeof industry.averages],
    key,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.556 0 0 / 0.1)" />
        <XAxis type="number" domain={[0, 100]} tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }} />
        <YAxis
          dataKey="dimension"
          type="category"
          width={120}
          tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "oklch(0.205 0 0)",
            border: "1px solid oklch(1 0 0 / 0.1)",
            borderRadius: "8px",
            color: "oklch(0.985 0 0)",
          }}
        />
        <Bar dataKey="average" radius={[0, 4, 4, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.key}
              fill={DIMENSION_COLORS[entry.key as DimensionKey]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
