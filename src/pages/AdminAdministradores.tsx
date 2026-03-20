import { AdminLayout } from "@/components/AdminLayout";
import { Users, UserPlus, Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const AdminAdministradores = () => {
  const { user } = useAuth();

  const handleAddAdmin = () => {
    toast.info("Funcionalidade de cadastro de administradores em desenvolvimento.");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Administradores</h2>
            <p className="text-muted-foreground">Gerencie os administradores estaduais</p>
          </div>
          <Button className="gap-2 self-start" onClick={handleAddAdmin}>
            <UserPlus className="h-4 w-4" /> Novo Administrador
          </Button>
        </div>

        <div className="rounded-lg border bg-card p-5 shadow-card">
          <div className="space-y-1">
            {/* Current user */}
            <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  {user?.email?.charAt(0).toUpperCase() ?? "A"}
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  <Shield className="h-3 w-3" /> Admin
                </span>
                <span className="text-xs text-muted-foreground">Você</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-6 text-center">
          <Users className="mx-auto h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground">
            O sistema de gerenciamento de administradores está em desenvolvimento.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Em breve será possível adicionar, editar e remover administradores.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAdministradores;
