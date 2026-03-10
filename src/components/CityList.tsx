import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { SP_CITIES, MOCK_NOMINATAS, type NominataStatus } from "@/data/cities";
import { useNavigate } from "react-router-dom";

interface CityListProps {
  filterStatus?: NominataStatus | "all";
}

export function CityList({ filterStatus = "all" }: CityListProps) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const citiesWithStatus = SP_CITIES.map((city) => {
    const nominata = MOCK_NOMINATAS.find((n) => n.cidade === city);
    return {
      city,
      status: (nominata?.status ?? "empty") as NominataStatus,
      nominataId: nominata?.id,
    };
  });

  const filtered = citiesWithStatus.filter((c) => {
    const matchesSearch = c.city.toLowerCase().includes(search.toLowerCase());
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
      <div className="space-y-1">
        {filtered.map((item) => (
          <button
            key={item.city}
            onClick={() => item.nominataId && navigate(`/admin/nominata/${item.nominataId}`)}
            className="flex w-full items-center justify-between rounded-lg border bg-card px-4 py-3 text-left transition-colors hover:bg-accent"
          >
            <div className="flex items-center gap-3">
              <span className="font-medium text-card-foreground">{item.city}</span>
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
