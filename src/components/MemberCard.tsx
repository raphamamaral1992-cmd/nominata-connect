import { User, Mail, Phone, MapPin, Briefcase } from "lucide-react";
import type { NominataMember } from "@/data/cities";

export function MemberCard({ member }: { member: NominataMember }) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-card animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-card-foreground">{member.nome}</h4>
            <span className="inline-block rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
              {member.cargo}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5" />
          <span>{member.email}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5" />
          <span>{member.telefone}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          <span>{member.endereco}, {member.numero} - {member.bairro}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5" />
          <span>{member.profissao}</span>
        </div>
        <div>CPF: {member.cpf}</div>
        <div>RG: {member.rg}</div>
        <div>Título: {member.tituloEleitoral}</div>
        <div>Zona: {member.zonaEleitoral} / Seção: {member.secaoEleitoral}</div>
      </div>
    </div>
  );
}
