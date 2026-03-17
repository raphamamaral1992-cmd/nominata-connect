import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import NominataDetail from "./pages/NominataDetail.tsx";
import NominataForm from "./pages/NominataForm.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/nominatas" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/cidades" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/links" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/relatorios" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/administradores" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/nominata/:id" element={<ProtectedRoute><NominataDetail /></ProtectedRoute>} />
            <Route path="/nominata/:token" element={<NominataForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
