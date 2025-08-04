import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import { Filter, Grid, List, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import apiService from "../services/api";
import { toast } from "sonner";

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 300000]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await apiService.getCars();
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error);
        toast.error('Failed to load cars');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  const categories = ["All", ...Array.from(new Set(cars.map(car => car.category)))];

  const filteredCars = cars.filter(car => {
    const matchesCategory = selectedCategory === "All" || car.category === selectedCategory;
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "year":
        return b.year - a.year;
      case "brand":
        return a.brand.localeCompare(b.brand);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const totalValue = cars.reduce((sum, car) => sum + car.price, 0);
  const averagePrice = cars.length > 0 ? totalValue / cars.length : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Enhanced Header */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 border border-white/20 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
              Our Vehicle Collection
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-up">
              Discover your perfect luxury vehicle from our premium selection
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl font-bold">{cars.length}</div>
                <div className="text-sm text-blue-100">Total Vehicles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl font-bold">{categories.length - 1}</div>
                <div className="text-sm text-blue-100">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl font-bold">${averagePrice.toLocaleString()}</div>
                <div className="text-sm text-blue-100">Avg. Price</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                <div className="text-sm text-blue-100">Total Value</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filters */}
      <section className="py-8 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="brand">Sort by Brand</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year">Newest First</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 mr-2">View:</span>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center space-x-1"
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center space-x-1"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </Button>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Price Range:</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">${priceRange[0].toLocaleString()}</span>
                <input
                  type="range"
                  min="0"
                  max="300000"
                  step="10000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-32"
                />
                <span className="text-sm text-gray-600">${priceRange[1].toLocaleString()}</span>
                <input
                  type="range"
                  min="0"
                  max="300000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-32"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-4 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{sortedCars.length}</span> of <span className="font-semibold">{cars.length}</span> vehicles
            </p>
            {searchTerm && (
              <p className="text-gray-600">
                Results for: <span className="font-semibold text-blue-600">"{searchTerm}"</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Cars Grid/List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading vehicles...</p>
              </div>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedCars.map((car) => (
                    <div key={car.id} className="animate-scale-in">
                      <CarCard car={car} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedCars.map((car) => (
                    <div key={car.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-300 animate-scale-in">
                      <div className="flex items-center space-x-6">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">{car.brand} {car.name}</h3>
                          <p className="text-gray-600 mt-1">{car.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>{car.year}</span>
                            <span>•</span>
                            <span>{car.mileage.toLocaleString()} mi</span>
                            <span>•</span>
                            <span>{car.fuelType}</span>
                            <span>•</span>
                            <span>{car.transmission}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">${car.price.toLocaleString()}</div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {car.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {sortedCars.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters.</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                      setPriceRange([0, 300000]);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CarsPage;