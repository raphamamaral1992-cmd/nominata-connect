import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { type CityWithStatus, type NominataStatus } from "@/hooks/useCities";
import { useNavigate } from "react-router-dom";

interface CityListProps {
  cities?: CityWithStatus[];
  isLoading?: boolean;
  filterStatus?: NominataStatus | "all";
}

export function CityList({ cities, isLoading, filterStatus = "all" }: CityListProps) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const filtered = (cities ?? []).filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar cidade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="space-y-1 max-h-[500px] overflow-y-auto">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => item.nominataId && navigate(`/admin/nominata/${item.nominataId}`)}
            className="flex w-full items-center justify-between rounded-lg border bg-card px-4 py-3 text-left transition-colors hover:bg-accent"
          >
            <div className="flex items-center gap-3">
              <span className="font-medium text-card-foreground">{item.name}</span>
              <StatusBadge status={item.status} />
            </div>
            {item.nominataId && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">Nenhuma cidade encontrada.</p>
        )}
      </div>
    </div>
  );
}
