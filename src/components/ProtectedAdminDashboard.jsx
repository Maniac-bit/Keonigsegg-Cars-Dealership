import { useState, useEffect } from "react";
import SimpleAdminLogin from "./SimpleAdminLogin";
import SimpleAdminDashboard from "./SimpleAdminDashboard";
import { Button } from "./ui/button";
import { toast } from "sonner";

const ProtectedAdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (adminLoggedIn && loginTime) {
      // Check if login is still valid (24 hours)
      const loginDate = new Date(loginTime);
      const now = new Date();
      const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        setIsLoggedIn(true);
      } else {
        // Session expired
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminLoginTime');
        toast.error("Session expired. Please login again.");
      }
    }
    
    setIsLoading(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <SimpleAdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Admin Dashboard</h2>
            <p className="text-sm text-gray-600">Payment Management System</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, Admin! 
              <span className="text-xs text-gray-400 ml-2">
                (Logged in at {new Date(localStorage.getItem('adminLoginTime')).toLocaleTimeString()})
              </span>
            </span>
            <Button 
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <SimpleAdminDashboard />
    </div>
  );
};

export default ProtectedAdminDashboard; 