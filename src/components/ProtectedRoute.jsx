import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const adminAuth = localStorage.getItem("adminAuthenticated");
        const loginTime = localStorage.getItem("adminLoginTime");
        
        if (!adminAuth || adminAuth !== "true") {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Check if login session is still valid (24 hours)
        if (loginTime) {
          const loginDate = new Date(loginTime);
          const now = new Date();
          const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
          
          if (hoursDiff > 24) {
            // Session expired
            localStorage.removeItem("adminAuthenticated");
            localStorage.removeItem("adminLoginTime");
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
          }
        }

        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 