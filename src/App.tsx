import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/contexts/AppContext";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import DonorOverview from "@/pages/DonorOverview";
import ClientDetail from "@/pages/ClientDetail";
import AIResults from "@/pages/AIResults";
import PortfolioBuilder from "@/pages/PortfolioBuilder";
import Notifications from "@/pages/Notifications";
import ClientApplication from "@/pages/ClientApplication";
import ClientHomePage from "@/pages/ClientHomePage";
import EcosystemContacts from "@/pages/EcosystemContacts";
import ImpactDashboard from "@/pages/ImpactDashboard";
import DisbursementTracker from "@/pages/DisbursementTracker";
import RiskReportPage from "@/pages/RiskReportPage";
import ApplicationsPage from "@/pages/ApplicationsPage";
import ManufacturersPage from "@/pages/ManufacturersPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { role } = useApp();
  return (
    <div className="flex h-screen w-full bg-[#0B1527] overflow-hidden text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        <TopNav />
        <main className="flex-1 overflow-y-auto w-full">
          <Routes>
            <Route path="/" element={role === 'donor' ? <DonorOverview /> : <ClientHomePage />} />
            <Route path="/client/:id" element={<ClientDetail />} />
            <Route path="/ai-results/:id" element={<AIResults />} />
            <Route path="/portfolio" element={<PortfolioBuilder />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/client/apply" element={<ClientApplication />} />
            <Route path="/client/home" element={<ClientHomePage />} />
            {/* New routes will map to soon-to-be-created pages. For now use NotFound or dummy */}
            <Route path="/manufacturers" element={<ManufacturersPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/risk-report" element={<RiskReportPage />} />
            <Route path="/contacts" element={<EcosystemContacts />} />
            <Route path="/impact-dashboard" element={<ImpactDashboard />} />
            <Route path="/disbursements" element={<DisbursementTracker />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
