import { useState } from "react";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MapPin,
  ClipboardList,
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { StatsCard } from "@/components/StatsCard";
import { CityList } from "@/components/CityList";
import { useCities, useStats, type NominataStatus } from "@/hooks/useCities";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const { data: cities, isLoading } = useCities();
  const stats = useStats(cities);
  const [tab, setTab] = useState<string>("all");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">Visão geral das nominatas municipais</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatsCard title="Total" value={stats.total} icon={ClipboardList} color="primary" />
          <StatsCard title="Ativas" value={stats.active} icon={CheckCircle2} color="active" />
          <StatsCard title="Alerta" value={stats.warning} icon={AlertTriangle} color="warning" />
          <StatsCard title="Inativas" value={stats.expired} icon={XCircle} color="expired" />
          <StatsCard title="Com Nominata" value={stats.withNominata} icon={FileText} color="primary" />
          <StatsCard title="Sem Nominata" value={stats.withoutNominata} icon={MapPin} color="empty" />
        </div>

        {/* City List */}
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Cidades do Estado de São Paulo</h3>
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

export default AdminDashboard;
