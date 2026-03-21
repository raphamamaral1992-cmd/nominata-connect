import { AdminLayout } from "@/components/AdminLayout";
import { Link2, Send, Clock, CheckCircle2, XCircle } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const statusLabel: Record<string, { label: string; className: string }> = {
  pendente: { label: "Pendente", className: "bg-status-warning/15 text-status-warning" },
  preenchido: { label: "Preenchido", className: "bg-status-active/15 text-status-active" },
  expirado: { label: "Expirado", className: "bg-status-expired/15 text-status-expired" },
};

const AdminLinks = () => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [phone, setPhone] = useState("");
  const queryClient = useQueryClient();

  const { data: cities = [] } = useQuery({
    queryKey: ["cities-for-links"],
    queryFn: async () => {
      const { data } = await supabase.from("cities").select("id, name").order("name");
      return data ?? [];
    },
  });

  const { data: links = [], isLoading } = useQuery({
    queryKey: ["nomination-links"],
    queryFn: async () => {
      const { data } = await supabase
        .from("nomination_links" as any)
        .select("*, cities!inner(name)")
        .order("created_at", { ascending: false });
      return (data ?? []) as any[];
    },
  });

  const createLink = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("nomination_links" as any)
        .insert({ city_id: selectedCity, phone } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["nomination-links"] });
      setDialogOpen(false);
      setSelectedCity("");
      setPhone("");
      const linkUrl = `${window.location.origin}/nominata/${data.token}`;
      navigator.clipboard.writeText(linkUrl);
      toast.success("Link gerado e copiado para a área de transferência!");
    },
    onError: () => {
      toast.error("Erro ao gerar link. Tente novamente.");
    },
  });

  const filtered = links.filter((l: any) =>
    (l.cities?.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const total = links.length;
  const pendentes = links.filter((l: any) => l.status === "pendente").length;
  const preenchidos = links.filter((l: any) => l.status === "preenchido").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Links Enviados</h2>
            <p className="text-muted-foreground">Rastreamento dos links de preenchimento</p>
          </div>
          <Button className="gap-2 self-start" onClick={() => setDialogOpen(true)}>
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
                  <th className="pb-3 font-medium">Cidade</th>
                  <th className="pb-3 font-medium">Telefone</th>
                  <th className="pb-3 font-medium">Data de Envio</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Link</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">Carregando...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      Nenhum link encontrado.
                    </td>
                  </tr>
                ) : (
                  filtered.map((link: any) => {
                    const st = statusLabel[link.status] ?? statusLabel.pendente;
                    return (
                      <tr key={link.id} className="border-b last:border-0 hover:bg-accent/40 transition-colors">
                        <td className="py-3 font-medium text-card-foreground">{link.cities?.name}</td>
                        <td className="py-3 text-muted-foreground">{link.phone || "—"}</td>
                        <td className="py-3 text-muted-foreground">
                          {new Date(link.created_at).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${st.className}`}>
                            {st.label}
                          </span>
                        </td>
                        <td className="py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/nominata/${link.token}`);
                              toast.success("Link copiado!");
                            }}
                          >
                            Copiar
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerar Novo Link de Preenchimento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Cidade</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a cidade" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Telefone do Presidente</Label>
              <Input
                placeholder="(11) 99999-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button
              onClick={() => createLink.mutate()}
              disabled={!selectedCity || createLink.isPending}
            >
              {createLink.isPending ? "Gerando..." : "Gerar Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminLinks;
