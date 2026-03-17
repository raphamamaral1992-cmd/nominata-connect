import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const { user, signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!loading && user) {
    navigate("/admin");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha email e senha.");
      return;
    }
    setIsSubmitting(true);
    const { error } = await signIn(email, password);
    setIsSubmitting(false);
    if (error) {
      toast.error("Credenciais inválidas. Verifique email e senha.");
    } else {
      toast.success("Login realizado com sucesso!");
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left: Hero */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:py-0"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="max-w-md text-center animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-primary-foreground/10 p-4">
              <Shield className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary-foreground mb-3">
            Gestão de Nominatas Partidárias
          </h1>
          <p className="text-primary-foreground/80 mb-6">
            Plataforma completa para preenchimento, validação e acompanhamento de nominatas municipais do estado de São Paulo.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-xs text-primary-foreground/60">
            <span className="rounded-full border border-primary-foreground/20 px-3 py-1">Painel Administrativo</span>
            <span className="rounded-full border border-primary-foreground/20 px-3 py-1">Validação em tempo real</span>
            <span className="rounded-full border border-primary-foreground/20 px-3 py-1">Geração de PDF</span>
          </div>
        </div>
      </div>

      {/* Right: Admin Login */}
      <div className="flex items-center justify-center px-6 py-12 lg:w-[480px] lg:min-w-[480px]">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-foreground">Acesso Administrativo</h2>
            <p className="text-sm text-muted-foreground mt-1">Área restrita para administradores estaduais</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="login-email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="admin@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="login-password">Senha</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 rounded-lg border bg-muted/50 p-4 text-center">
            <p className="text-xs text-muted-foreground">
              Presidentes municipais acessam através do <strong>link exclusivo</strong> enviado por email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
