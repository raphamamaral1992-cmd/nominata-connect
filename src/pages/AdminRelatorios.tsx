import { AdminLayout } from "@/components/AdminLayout";
import { BarChart3, Download, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCities, useStats } from "@/hooks/useCities";
import { toast } from "sonner";

const AdminRelatorios = () => {
  const { data: cities } = useCities();
  const stats = useStats(cities);

  const handleExport = () => {
    toast.info("Funcionalidade de exportação em desenvolvimento.");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Relatórios</h2>
          <p className="text-muted-foreground">Visualize dados e exporte relatórios</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="rounded-lg border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">Nominatas Ativas</p>
            <p className="text-3xl font-bold text-status-active mt-1">{stats.active}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {cities?.length ? ((stats.active / cities.length) * 100).toFixed(1) : 0}% do total de cidades
            </p>
          </div>
          <div className="rounded-lg border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">Em Alerta</p>
            <p className="text-3xl font-bold text-status-warning mt-1">{stats.warning}</p>
            <p className="text-xs text-muted-foreground mt-2">Próximas do vencimento</p>
          </div>
          <div className="rounded-lg border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">Inativas</p>
            <p className="text-3xl font-bold text-status-expired mt-1">{stats.expired}</p>
            <p className="text-xs text-muted-foreground mt-2">Nominatas vencidas</p>
          </div>
          <div className="rounded-lg border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">Sem Nominata</p>
            <p className="text-3xl font-bold text-muted-foreground mt-1">{stats.withoutNominata}</p>
            <p className="text-xs text-muted-foreground mt-2">Cidades sem cadastro</p>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <h3 className="font-semibold text-card-foreground mb-4">Distribuição por Status</h3>
          <div className="space-y-3">
            {[
              { label: "Ativas", value: stats.active, total: cities?.length ?? 1, color: "bg-status-active" },
              { label: "Alerta", value: stats.warning, total: cities?.length ?? 1, color: "bg-status-warning" },
              { label: "Inativas", value: stats.expired, total: cities?.length ?? 1, color: "bg-status-expired" },
              { label: "Sem Nominata", value: stats.withoutNominata, total: cities?.length ?? 1, color: "bg-muted-foreground/30" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-card-foreground">{item.label}</span>
                  <span className="text-muted-foreground font-medium">{item.value}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted">
                  <div
                    className={`h-2.5 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${(item.value / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Actions */}
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <h3 className="font-semibold text-card-foreground mb-4">Exportar Dados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start gap-2 h-auto py-4" onClick={handleExport}>
              <FileSpreadsheet className="h-5 w-5 text-status-active" />
              <div className="text-left">
                <p className="font-medium">Nominatas em Excel</p>
                <p className="text-xs text-muted-foreground">Lista completa com status</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start gap-2 h-auto py-4" onClick={handleExport}>
              <FileText className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-medium">Relatório em PDF</p>
                <p className="text-xs text-muted-foreground">Resumo geral formatado</p>
              </div>
            </Button>
            <Button variant="outline" className="justify-start gap-2 h-auto py-4" onClick={handleExport}>
              <Download className="h-5 w-5 text-status-warning" />
              <div className="text-left">
                <p className="font-medium">Cidades sem Nominata</p>
                <p className="text-xs text-muted-foreground">Lista para acompanhamento</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRelatorios;
