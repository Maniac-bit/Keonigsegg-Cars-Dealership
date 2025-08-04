
import { Car, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <Car className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Koenigsegg
                </span>
                <p className="text-xs text-gray-400 -mt-1">Premium Dealership</p>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Your premier destination for luxury and performance vehicles. Experience automotive excellence with our curated selection of premium cars from the world's most prestigious brands.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Our Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="font-medium">Koenigsegg Showroom</p>
                  <p>Anamnagart</p>
                  <p> Kathmandu</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="font-medium">(555) 123-4567</p>
                  <p className="text-sm">Mon-Sat: 9AM-8PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="font-medium">info@koenigsegg.com</p>
                  <p className="text-sm">24/7 Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest luxury vehicles and exclusive offers.</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            <p>&copy; 2024 Koenigsegg Premium Dealership. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        size="sm"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </footer>
  );
};

export default Footer;