import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle, XCircle, FileText, StickyNote } from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { MemberCard } from "@/components/MemberCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_NOMINATAS } from "@/data/cities";
import { useState } from "react";

const NominataDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const nominata = MOCK_NOMINATAS.find((n) => n.id === id);
  const [notas, setNotas] = useState(nominata?.notas ?? "");

  if (!nominata) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground">Nominata não encontrada.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/admin")}>
            Voltar ao Dashboard
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{nominata.cidade}</h2>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={nominata.status} />
                <span className="text-sm text-muted-foreground">
                  Criada em {new Date(nominata.dataCriacao).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm" className="gap-1.5">
              <CheckCircle className="h-4 w-4" /> Aprovar
            </Button>
            <Button variant="destructive" size="sm" className="gap-1.5">
              <XCircle className="h-4 w-4" /> Recusar
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" /> Download
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <FileText className="h-4 w-4" /> Novo Link
            </Button>
          </div>
        </div>

        {/* Sede */}
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <h3 className="font-semibold text-card-foreground mb-3">Dados da Sede</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div><span className="text-muted-foreground">Endereço:</span> {nominata.sede.endereco}, {nominata.sede.numero}</div>
            <div><span className="text-muted-foreground">Bairro:</span> {nominata.sede.bairro}</div>
            <div><span className="text-muted-foreground">Cidade:</span> {nominata.sede.cidade}</div>
            <div><span className="text-muted-foreground">CEP:</span> {nominata.sede.cep}</div>
            <div><span className="text-muted-foreground">Telefone:</span> {nominata.sede.telefone}</div>
          </div>
        </div>

        {/* Members */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">
            Membros ({nominata.membros.length})
          </h3>
          {nominata.membros.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nenhum membro cadastrado.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {nominata.membros.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="rounded-lg border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <StickyNote className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-card-foreground">Bloco de Notas</h3>
          </div>
          <Textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows={4}
            placeholder="Anotações administrativas..."
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default NominataDetail;
