import { AdminLayout } from "@/components/AdminLayout";
import { CityList } from "@/components/CityList";
import { useCities, useStats } from "@/hooks/useCities";
import { StatsCard } from "@/components/StatsCard";
import { FileText, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import type { NominataStatus } from "@/hooks/useCities";

const AdminNominatas = () => {
  const { data: cities, isLoading } = useCities();
  const stats = useStats(cities);
  const [tab, setTab] = useState<string>("all");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Nominatas</h2>
          <p className="text-muted-foreground">Gerencie todas as nominatas cadastradas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total" value={stats.total} icon={FileText} color="primary" />
          <StatsCard title="Ativas" value={stats.active} icon={CheckCircle2} color="active" />
          <StatsCard title="Alerta" value={stats.warning} icon={AlertTriangle} color="warning" />
          <StatsCard title="Inativas" value={stats.expired} icon={XCircle} color="expired" />
        </div>

        <div className="rounded-lg border bg-card p-5 shadow-card">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="active">Ativas</TabsTrigger>
              <TabsTrigger value="warning">Alerta</TabsTrigger>
              <TabsTrigger value="expired">Inativas</TabsTrigger>
            </TabsList>
            <TabsContent value={tab} className="mt-4">
              <CityList
                cities={cities?.filter((c) => c.status !== "empty")}
                isLoading={isLoading}
                filterStatus={tab as NominataStatus | "all"}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNominatas;
