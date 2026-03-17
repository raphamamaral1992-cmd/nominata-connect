import { useState } from "react";
import { Plus, Trash2, FileDown, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CARGOS, type NominataMember } from "@/data/cities";
import { toast } from "sonner";

const emptyMember = (): NominataMember => ({
  id: crypto.randomUUID(),
  nome: "", dataNascimento: "", cpf: "", rg: "",
  tituloEleitoral: "", zonaEleitoral: "", secaoEleitoral: "",
  estadoCivil: "", profissao: "",
  endereco: "", numero: "", bairro: "", cidade: "", cep: "",
  email: "", telefone: "", cargo: "Membro",
});

const NominataForm = () => {
  const [sede, setSede] = useState({
    endereco: "", numero: "", bairro: "", cidade: "", cep: "", telefone: "",
  });
  const [membros, setMembros] = useState<NominataMember[]>([emptyMember()]);
  const [submitted, setSubmitted] = useState(false);

  const updateMember = (idx: number, field: string, value: string) => {
    setMembros((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m))
    );
  };

  const addMember = () => setMembros((prev) => [...prev, emptyMember()]);

  const removeMember = (idx: number) => {
    if (membros.length <= 1) return;
    setMembros((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    if (!sede.endereco || !sede.cidade) {
      toast.error("Preencha os dados da sede.");
      return;
    }
    const missingName = membros.some((m) => !m.nome);
    if (missingName) {
      toast.error("Todos os membros devem ter nome preenchido.");
      return;
    }
    setSubmitted(true);
    toast.success("Nominata enviada para validação!");
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center animate-fade-in">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-status-active/10">
            <Upload className="h-8 w-8 text-status-active" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Nominata Enviada!</h2>
          <p className="text-muted-foreground mb-6">
            Sua nominata foi enviada para validação. Você receberá um link para acompanhar o andamento.
          </p>
          <div className="rounded-lg border bg-card p-4 text-sm">
            <p className="text-muted-foreground">Status:</p>
            <p className="font-semibold text-status-warning">AGUARDANDO VALIDAÇÃO</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Title */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Cadastro de Nominata</h1>
          <p className="text-muted-foreground mt-1">Preencha os dados abaixo para registrar a nominata municipal.</p>
        </div>

        {/* Sede */}
        <div className="rounded-lg border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Dados da Sede</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(["endereco", "numero", "bairro", "cidade", "cep", "telefone"] as const).map((f) => (
              <div key={f}>
                <Label className="capitalize">{f === "cep" ? "CEP" : f}</Label>
                <Input
                  value={sede[f]}
                  onChange={(e) => setSede((s) => ({ ...s, [f]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Members */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Membros ({membros.length})</h2>
          </div>

          {membros.map((member, idx) => (
            <div key={member.id} className="rounded-lg border bg-card p-5 shadow-card animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-card-foreground">Membro {idx + 1}</h3>
                <div className="flex items-center gap-2">
                  <Select
                    value={member.cargo}
                    onValueChange={(v) => updateMember(idx, "cargo", v)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CARGOS.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {membros.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeMember(idx)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { key: "nome", label: "Nome completo" },
                  { key: "dataNascimento", label: "Data de nascimento", type: "date" },
                  { key: "cpf", label: "CPF" },
                  { key: "rg", label: "RG" },
                  { key: "tituloEleitoral", label: "Título eleitoral" },
                  { key: "zonaEleitoral", label: "Zona eleitoral" },
                  { key: "secaoEleitoral", label: "Seção eleitoral" },
                  { key: "estadoCivil", label: "Estado civil" },
                  { key: "profissao", label: "Profissão" },
                  { key: "endereco", label: "Endereço" },
                  { key: "numero", label: "Número" },
                  { key: "bairro", label: "Bairro" },
                  { key: "cidade", label: "Cidade" },
                  { key: "cep", label: "CEP" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "telefone", label: "Telefone" },
                ].map((field) => (
                  <div key={field.key}>
                    <Label className="text-xs">{field.label}</Label>
                    <Input
                      type={field.type ?? "text"}
                      value={(member as any)[field.key]}
                      onChange={(e) => updateMember(idx, field.key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions - Add member + Submit */}
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t py-4 -mx-4 px-4">
          <div className="mx-auto max-w-3xl flex flex-col sm:flex-row gap-3 items-center justify-between">
            <Button variant="outline" size="lg" onClick={addMember} className="gap-2 w-full sm:w-auto">
              <Plus className="h-5 w-5" /> Adicionar Novo Membro
            </Button>
            <Button size="lg" className="gap-2 w-full sm:w-auto" onClick={handleSubmit}>
              <FileDown className="h-5 w-5" />
              Gerar e Enviar Nominata
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NominataForm;
