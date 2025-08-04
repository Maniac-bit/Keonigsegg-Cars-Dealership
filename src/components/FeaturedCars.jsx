import { useState, useEffect } from "react";
import HomeCarCard from "./HomeCarCard";
import apiService from "../services/api";
import { toast } from "sonner";

const FeaturedCars = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const cars = await apiService.getFeaturedCars();
        setFeaturedCars(cars);
      } catch (error) {
        console.error('Error fetching featured cars:', error);
        toast.error('Failed to load featured cars');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Vehicles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium vehicles, chosen for their exceptional performance, luxury, and value.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Vehicles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium vehicles, chosen for their exceptional performance, luxury, and value.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <div key={car.id} className="animate-fade-in">
              <HomeCarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
