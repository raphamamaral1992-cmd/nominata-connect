import { cn } from "@/lib/utils";
import type { NominataStatus } from "@/data/cities";

const statusConfig: Record<NominataStatus, { label: string; className: string }> = {
  active: { label: "Ativa", className: "bg-status-active text-status-active-foreground" },
  warning: { label: "Vencimento Próximo", className: "bg-status-warning text-status-warning-foreground" },
  expired: { label: "Inativa", className: "bg-status-expired text-status-expired-foreground" },
  empty: { label: "Sem Nominata", className: "bg-status-empty text-status-empty-foreground" },
};

export function StatusBadge({ status }: { status: NominataStatus }) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", config.className)}>
      {config.label}
    </span>
  );
}
