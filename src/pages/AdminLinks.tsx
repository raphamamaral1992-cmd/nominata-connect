import { AdminLayout } from "@/components/AdminLayout";
import { Link2, Send, Clock, CheckCircle2 } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface LinkEnviado {
  id: string;
  cidade: string;
  telefone: string;
  dataEnvio: string;
  status: "pendente" | "preenchido" | "expirado";
}

const mockLinks: LinkEnviado[] = [
  { id: "lnk-001", cidade: "Campinas", telefone: "(19) 99999-0001", dataEnvio: "2026-03-15", status: "preenchido" },
  { id: "lnk-002", cidade: "Sorocaba", telefone: "(15) 99888-0001", dataEnvio: "2026-03-10", status: "pendente" },
  { id: "lnk-003", cidade: "Ribeirão Preto", telefone: "(16) 99777-0001", dataEnvio: "2026-02-20", status: "expirado" },
  { id: "lnk-004", cidade: "Santos", telefone: "(13) 99666-0001", dataEnvio: "2026-03-18", status: "pendente" },
  { id: "lnk-005", cidade: "São José dos Campos", telefone: "(12) 99555-0001", dataEnvio: "2026-03-01", status: "preenchido" },
];

const statusLabel: Record<string, { label: string; className: string }> = {
  pendente: { label: "Pendente", className: "bg-status-warning/15 text-status-warning" },
  preenchido: { label: "Preenchido", className: "bg-status-active/15 text-status-active" },
  expirado: { label: "Expirado", className: "bg-status-expired/15 text-status-expired" },
};

const AdminLinks = () => {
  const [search, setSearch] = useState("");

  const filtered = mockLinks.filter((l) =>
    l.cidade.toLowerCase().includes(search.toLowerCase())
  );

  const total = mockLinks.length;
  const pendentes = mockLinks.filter((l) => l.status === "pendente").length;
  const preenchidos = mockLinks.filter((l) => l.status === "preenchido").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Links Enviados</h2>
            <p className="text-muted-foreground">Rastreamento dos links de preenchimento</p>
          </div>
          <Button className="gap-2 self-start">
            <Send className="h-4 w-4" /> Gerar Novo Link
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard title="Total Enviados" value={total} icon={Link2} color="primary" />
          <StatsCard title="Pendentes" value={pendentes} icon={Clock} color="warning" />
          <StatsCard title="Preenchidos" value={preenchidos} icon={CheckCircle2} color="active" />
        </div>

        <div className="rounded-lg border bg-card p-5 shadow-card">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por cidade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Cidade</th>
                  <th className="pb-3 font-medium">Telefone</th>
                  <th className="pb-3 font-medium">Data de Envio</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((link) => {
                  const st = statusLabel[link.status];
                  return (
                    <tr key={link.id} className="border-b last:border-0 hover:bg-accent/40 transition-colors">
                      <td className="py-3 font-mono text-xs text-muted-foreground">{link.id}</td>
                      <td className="py-3 font-medium text-card-foreground">{link.cidade}</td>
                      <td className="py-3 text-muted-foreground">{link.telefone}</td>
                      <td className="py-3 text-muted-foreground">
                        {new Date(link.dataEnvio).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${st.className}`}>
                          {st.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      Nenhum link encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLinks;
