import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

interface ScoreBadgeProps {
  score: number;
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreBadge({ score, className, showIcon = true, size = 'md' }: ScoreBadgeProps) {
  let status: 'verified' | 'likely' | 'suspicious' = 'verified';
  let colorClass = "";
  let bgClass = "";
  let text = "";
  let Icon = CheckCircle2;

  if (score >= 80) {
    status = 'verified';
    colorClass = "text-emerald-400";
    bgClass = "bg-emerald-500/10 border-emerald-500/20";
    text = "Verified Human";
    Icon = CheckCircle2;
  } else if (score >= 60) {
    status = 'likely';
    colorClass = "text-amber-400";
    bgClass = "bg-amber-500/10 border-amber-500/20";
    text = "Likely Human";
    Icon = AlertTriangle;
  } else {
    status = 'suspicious';
    colorClass = "text-destructive";
    bgClass = "bg-destructive/10 border-destructive/20";
    text = "Suspicious / AI";
    Icon = ShieldAlert;
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1.5",
    md: "px-3 py-1 text-sm gap-2",
    lg: "px-4 py-1.5 text-base gap-2.5"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div className={cn(
      "inline-flex items-center rounded-full border font-medium",
      bgClass,
      colorClass,
      sizeClasses[size],
      className
    )}>
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{text}</span>
      <span className="opacity-70 ml-1">({score})</span>
    </div>
  );
}
