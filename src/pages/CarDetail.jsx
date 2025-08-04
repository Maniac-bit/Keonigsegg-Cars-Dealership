import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import SimplePayment from "../components/SimplePayment";
import TestDriveModal from "../components/TestDriveModal";
import apiService from "../services/api";
import { toast } from "sonner";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [relatedCars, setRelatedCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showTestDrive, setShowTestDrive] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setIsLoading(true);
        const carData = await apiService.getCarById(id);
        setCar(carData);
        
        // Fetch related cars
        const allCars = await apiService.getCars();
        const related = allCars
          .filter(c => c.id !== carData.id && c.category === carData.category)
          .slice(0, 3);
        setRelatedCars(related);
      } catch (error) {
        console.error('Error fetching car:', error);
        toast.error('Failed to load car details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  const handleImageError = () => {
    setImageError(true);
    toast.error('Failed to load car image');
  };

  const handleTestDrive = () => {
    setShowTestDrive(true);
  };

  const handleTestDriveSuccess = (requestId) => {
    toast.success(`Test drive request submitted! Request ID: ${requestId}`);
    setShowTestDrive(false);
  };

  const handlePaymentSuccess = (orderId) => {
    toast.success(`Payment completed successfully! Order ID: ${orderId}`);
    setShowPayment(false);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading car details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20 flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Car Not Found</h1>
            <p className="text-gray-600 mb-6">The car you're looking for doesn't exist or has been removed.</p>
            <Link to="/cars">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Back to Cars
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden bg-gray-100">
                  {!imageError && car.images && car.images[selectedImageIndex] ? (
                    <img
                      src={car.images[selectedImageIndex]}
                      alt={car.name}
                      className="w-full h-96 object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                      <div className="text-center">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-500">Image not available</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {car.images && car.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {car.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index 
                            ? "border-blue-500" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${car.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center hidden">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Car Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      {car.category}
                    </span>
                    {car.isFeatured && (
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium px-2.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {car.brand} {car.name}
                  </h1>
                  <p className="text-2xl font-bold text-blue-600">
                    ${car.price.toLocaleString()}
                  </p>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {car.description}
                </p>

                <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-gray-200">
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Year</span>
                    <span className="text-lg font-semibold">{car.year}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Mileage</span>
                    <span className="text-lg font-semibold">{car.mileage.toLocaleString()} mi</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Fuel Type</span>
                    <span className="text-lg font-semibold">{car.fuelType}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Transmission</span>
                    <span className="text-lg font-semibold">{car.transmission}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button 
                    onClick={handleTestDrive}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Schedule Test Drive
                  </Button>
                  <Button 
                    onClick={() => setShowPayment(true)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Buy Now with Khalti
                  </Button>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-blue-600 font-semibold">Engine</div>
                    <div className="text-sm text-gray-600">{car.specifications?.engine || 'N/A'}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-purple-600 font-semibold">Horsepower</div>
                    <div className="text-sm text-gray-600">{car.specifications?.horsepower || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {car.specifications && Object.entries(car.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-gray-900 font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {car.features && car.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Cars */}
        {relatedCars.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Vehicles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedCars.map((relatedCar) => (
                    <div key={relatedCar.id} className="group">
                      <Link to={`/car/${relatedCar.id}`}>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                          <img
                            src={relatedCar.image}
                            alt={relatedCar.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center hidden">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {relatedCar.brand} {relatedCar.name}
                            </h3>
                            <p className="text-2xl font-bold text-blue-600">
                              ${relatedCar.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Complete Purchase</h3>
                <button
                  onClick={() => setShowPayment(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <SimplePayment
                car={car}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentCancel={handlePaymentCancel}
              />
            </div>
          </div>
        </div>
      )}

      {/* Test Drive Modal */}
      {showTestDrive && (
        <TestDriveModal
          car={car}
          onClose={() => setShowTestDrive(false)}
          onSuccess={handleTestDriveSuccess}
        />
      )}

      <Footer />
    </div>
  );
};

export default CarDetail;