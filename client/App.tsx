import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TenantDashboard from "./pages/TenantDashboard";
import TenantPropertySearch from "./pages/TenantPropertySearch";
import TenantServices from "./pages/TenantServices";
import PropertyDetail from "./pages/PropertyDetail";
import LandlordDashboard from "./pages/LandlordDashboard";
import RentLedger from "./pages/RentLedger";
import MaintenanceTickets from "./pages/MaintenanceTickets";
import ProviderDashboard from "./pages/ProviderDashboard";
import JobBoard from "./pages/JobBoard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/tenant" element={<TenantDashboard />} />
          <Route
            path="/dashboard/tenant/search"
            element={<TenantPropertySearch />}
          />
          <Route
            path="/dashboard/tenant/services"
            element={<TenantServices />}
          />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/dashboard/landlord" element={<LandlordDashboard />} />
          <Route
            path="/dashboard/landlord/rent-ledger"
            element={<RentLedger />}
          />
          <Route
            path="/dashboard/landlord/maintenance"
            element={<MaintenanceTickets />}
          />
          <Route path="/dashboard/provider" element={<ProviderDashboard />} />
          <Route path="/dashboard/provider/jobs" element={<JobBoard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
