import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type NominataStatus = "active" | "warning" | "expired" | "empty";

export interface CityWithStatus {
  id: string;
  name: string;
  status: NominataStatus;
  nominataId: string | null;
}

export interface DashboardStats {
  total: number;
  active: number;
  warning: number;
  expired: number;
  withNominata: number;
  withoutNominata: number;
}

async function fetchCitiesWithNominatas(): Promise<CityWithStatus[]> {
  const { data: cities, error: citiesErr } = await supabase
    .from("cities")
    .select("id, name")
    .order("name");

  if (citiesErr) throw citiesErr;

  const { data: nominatas, error: nomErr } = await supabase
    .from("nominatas")
    .select("id, city_id, status");

  if (nomErr) throw nomErr;

  const nominataMap = new Map(
    nominatas?.map((n: any) => [n.city_id, { id: n.id, status: n.status }]) ?? []
  );

  return (cities ?? []).map((city: any) => {
    const nom = nominataMap.get(city.id);
    return {
      id: city.id,
      name: city.name,
      status: (nom?.status ?? "empty") as NominataStatus,
      nominataId: nom?.id ?? null,
    };
  });
}

export function useCities() {
  return useQuery({
    queryKey: ["cities-with-nominatas"],
    queryFn: fetchCitiesWithNominatas,
  });
}

export function useStats(cities: CityWithStatus[] | undefined): DashboardStats {
  if (!cities) return { total: 0, active: 0, warning: 0, expired: 0, withNominata: 0, withoutNominata: 0 };
  
  const active = cities.filter((c) => c.status === "active").length;
  const warning = cities.filter((c) => c.status === "warning").length;
  const expired = cities.filter((c) => c.status === "expired").length;
  
  return {
    total: active + warning + expired,
    active,
    warning,
    expired,
    withNominata: active + warning + expired,
    withoutNominata: cities.filter((c) => c.status === "empty").length,
  };
}
