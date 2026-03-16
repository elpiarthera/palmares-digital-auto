import { Badge } from "@/components/ui/badge";
import { TIER_COLORS, type Tier } from "@/lib/data";
import { cn } from "@/lib/utils";

interface TierBadgeProps {
  tier: Tier;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TierBadge({ tier, size = "md", className }: TierBadgeProps) {
  const colors = TIER_COLORS[tier];
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-0.5",
    lg: "text-base px-3 py-1",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        colors.bg,
        colors.text,
        colors.border,
        sizeClasses[size],
        "font-semibold",
        className
      )}
    >
      {tier}
    </Badge>
  );
}
