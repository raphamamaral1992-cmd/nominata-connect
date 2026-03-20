import { AdminLayout } from "@/components/AdminLayout";
import { CityList } from "@/components/CityList";
import { useCities, useStats } from "@/hooks/useCities";
import { StatsCard } from "@/components/StatsCard";
import { MapPin, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import type { NominataStatus } from "@/hooks/useCities";

const AdminCidades = () => {
  const { data: cities, isLoading } = useCities();
  const stats = useStats(cities);
  const [tab, setTab] = useState<string>("all");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Cidades</h2>
          <p className="text-muted-foreground">Todas as cidades do estado de São Paulo</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard title="Total de Cidades" value={cities?.length ?? 0} icon={MapPin} color="primary" />
          <StatsCard title="Com Nominata" value={stats.withNominata} icon={FileText} color="active" />
          <StatsCard title="Sem Nominata" value={stats.withoutNominata} icon={MapPin} color="empty" />
        </div>

        <div className="rounded-lg border bg-card p-5 shadow-card">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="active">Ativas</TabsTrigger>
              <TabsTrigger value="warning">Alerta</TabsTrigger>
              <TabsTrigger value="expired">Inativas</TabsTrigger>
              <TabsTrigger value="empty">Sem Nominata</TabsTrigger>
            </TabsList>
            <TabsContent value={tab} className="mt-4">
              <CityList cities={cities} isLoading={isLoading} filterStatus={tab as NominataStatus | "all"} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCidades;
