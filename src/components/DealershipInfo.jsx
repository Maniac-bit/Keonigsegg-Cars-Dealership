import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const DealershipInfo = () => {
  const locations = [
    {
      name: "Koenigsegg Showroom",
      address: "Jalma Road, Downtown",
      city: "Chitwan, NY 10001",
      phone: "(555) 123-4567",
      hours: {
        weekdays: "9:00 AM - 8:00 PM",
        saturday: "9:00 AM - 6:00 PM", 
        sunday: "12:00 PM - 5:00 PM"
      }
    },
    {
      name: "West Side Location",
      address: "456 Auto Boulevard",
      city: "Los Angeles, CA 90210",
      phone: "(555) 987-6543",
      hours: {
        weekdays: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 6:00 PM",
        sunday: "11:00 AM - 4:00 PM"
      }
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Locations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit our state-of-the-art showrooms to experience luxury automotive excellence firsthand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">{location.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                  <p className="text-gray-600">
                    {location.address}<br />
                    {location.city}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
                  <p className="text-gray-600">{location.phone}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Hours</h4>
                  <div className="text-gray-600 space-y-1">
                    <p><span className="font-medium">Mon-Fri:</span> {location.hours.weekdays}</p>
                    <p><span className="font-medium">Saturday:</span> {location.hours.saturday}</p>
                    <p><span className="font-medium">Sunday:</span> {location.hours.sunday}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose AutoLux?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <p className="text-gray-600">Years of Excellence</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <p className="text-gray-600">Premium Vehicles</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">10k+</div>
                <p className="text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealershipInfo;