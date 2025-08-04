import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Star, Shield, Zap } from "lucide-react";
import ageraHundra from "../assests/AGERA S HUNDRA.png";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm scale-105"
        style={{
          backgroundImage: `url(${ageraHundra})`
        }}
      ></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-32 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-8 animate-fade-in">
          <Star className="w-4 h-4 mr-2 text-yellow-400" />
          Premium Luxury Dealership
          <Shield className="w-4 h-4 ml-2 text-blue-400" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up">
          Drive Your
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Dream Car
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-up max-w-3xl mx-auto leading-relaxed">
          Discover premium vehicles with unmatched quality, performance, and luxury. 
          Experience automotive excellence like never before.
        </p>

        {/* Stats */}
        <div className="flex justify-center items-center space-x-8 mb-12 animate-fade-in-up">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">500+</div>
            <div className="text-sm text-gray-300">Premium Cars</div>
          </div>
          <div className="w-px h-8 bg-gray-600"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">15+</div>
            <div className="text-sm text-gray-300">Years Experience</div>
          </div>
          <div className="w-px h-8 bg-gray-600"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">10k+</div>
            <div className="text-sm text-gray-300">Happy Customers</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
          <Link to="/cars">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              Explore Our Collection
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold backdrop-blur-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Book Test Drive
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex justify-center items-center space-x-6 mt-12 animate-fade-in-up">
          <div className="flex items-center text-sm text-gray-300">
            <Zap className="w-4 h-4 mr-2 text-yellow-400" />
            Fast Delivery
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <Shield className="w-4 h-4 mr-2 text-green-400" />
            Secure Payment
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <Star className="w-4 h-4 mr-2 text-blue-400" />
            Premium Quality
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center relative">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping"></div>
          </div>
          <p className="text-white/70 text-xs mt-2 font-medium">Scroll to explore</p>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 right-10 z-15 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 animate-float">
          <div className="text-white text-sm">
            <div className="font-semibold">Latest Arrival</div>
            <div className="text-gray-300">Tesla Model S Plaid</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/4 left-10 z-15 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 animate-float-delayed">
          <div className="text-white text-sm">
            <div className="font-semibold">Featured</div>
            <div className="text-gray-300">Porsche 911 Turbo S</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
