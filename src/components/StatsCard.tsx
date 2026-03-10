import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: "active" | "warning" | "expired" | "empty" | "primary";
}

const colorMap = {
  active: "bg-status-active/10 text-status-active",
  warning: "bg-status-warning/10 text-status-warning",
  expired: "bg-status-expired/10 text-status-expired",
  empty: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
};

export function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-card animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold text-card-foreground">{value}</p>
        </div>
        <div className={cn("rounded-xl p-3", colorMap[color])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
