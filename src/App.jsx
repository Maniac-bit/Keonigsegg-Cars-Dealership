import { Toaster } from "./components/ui/toaster";
import Sonner from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import CarsPage from "./pages/CarsPage";
import CarDetail from "./pages/CarDetail";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedAdminDashboard from "./components/ProtectedAdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import apiService from "./services/api";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Test API connection on app load
    const testConnection = async () => {
      console.log('Testing API connection...');
      const isConnected = await apiService.testConnection();
      if (isConnected) {
        console.log('✅ API connection successful');
      } else {
        console.error('❌ API connection failed - check if backend is running on port 3001');
      }
    };
    
    testConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/simple" element={
              <ProtectedRoute>
                <ProtectedAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={<ProtectedAdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;