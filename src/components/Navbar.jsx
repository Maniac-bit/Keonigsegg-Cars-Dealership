import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Car, Settings, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import keonigseggLogo from "../assests/keonigsegg.bmp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img src={keonigseggLogo} alt="Logo" className="h-10 w-10 object-contain rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Koenigsegg
              </span>
              <p className="text-xs text-gray-500 -mt-1">Premium Dealership</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                  isActive(item.path)
                    ? "text-blue-600 bg-blue-50 shadow-sm"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>
            ))}
            
            {/* Admin Dropdown */}
            <div className="relative ml-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                className="flex items-center space-x-1 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-gray-200"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Admin</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showAdminDropdown ? 'rotate-180' : ''}`} />
              </Button>
              
              {showAdminDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setShowAdminDropdown(false)}
                  >
                    Payment Dashboard
                  </Link>
                  <Link
                    to="/admin?tab=cars"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setShowAdminDropdown(false)}
                  >
                    Manage Cars
                  </Link>
                  <Link
                    to="/admin?tab=orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setShowAdminDropdown(false)}
                  >
                    View Orders
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Click outside to close admin dropdown */}
      {showAdminDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowAdminDropdown(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;