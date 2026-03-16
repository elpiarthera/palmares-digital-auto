import { cn } from "@/lib/utils";
import { getScoreBarColor, getScoreColor } from "@/lib/data";

interface ScoreBarProps {
  score: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  average?: number;
  className?: string;
}

export function ScoreBar({
  score,
  max = 100,
  label,
  showValue = true,
  average,
  className,
}: ScoreBarProps) {
  const pct = (score / max) * 100;
  const avgPct = average ? (average / max) * 100 : null;

  return (
    <div className={cn("space-y-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showValue && (
            <span className={cn("font-semibold tabular-nums", getScoreColor(score))}>
              {score}/{max}
            </span>
          )}
        </div>
      )}
      <div className="relative h-2.5 w-full rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-500", getScoreBarColor(score))}
          style={{ width: `${pct}%` }}
        />
        {avgPct !== null && (
          <div
            className="absolute top-0 h-full w-0.5 bg-foreground/30"
            style={{ left: `${avgPct}%` }}
            title={`Average: ${average}`}
          />
        )}
      </div>
    </div>
  );
}
