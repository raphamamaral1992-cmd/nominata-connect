import { useNavigate } from "react-router-dom";
import { FileText, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-4" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-2xl text-center animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-primary-foreground/10 p-4">
              <Shield className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary-foreground mb-4">
            Gestão de Nominatas Partidárias
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Plataforma completa para preenchimento, validação e acompanhamento de nominatas municipais do estado de São Paulo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2"
              onClick={() => navigate("/admin")}
            >
              <FileText className="h-5 w-5" />
              Painel Administrativo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => navigate("/nominata/demo")}
            >
              Preencher Nominata
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
