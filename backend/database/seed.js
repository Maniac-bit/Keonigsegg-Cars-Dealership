require('dotenv').config();
const path = require('path');
const db = require('./connection');

// Sample car data - you can replace this with your actual cars data
const cars = [
  {
    name: "Model S Plaid",
    brand: "Tesla",
    price: 89999,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Electric",
    year: 2024,
    mileage: 0,
    fuelType: "Electric",
    transmission: "Automatic",
    description: "The pinnacle of electric performance with tri-motor all-wheel drive and ludicrous acceleration.",
    features: [
      "Autopilot",
      "Premium Audio System", 
      "Glass Roof",
      "Heated Seats",
      "Wireless Charging",
      "Over-the-air Updates"
    ],
    specifications: {
      engine: "Tri-Motor Electric",
      horsepower: "1,020 hp",
      torque: "1,050 lb-ft",
      acceleration: "0-60 mph in 1.99s",
      topSpeed: "200 mph",
      fuelEconomy: "348 miles range",
      drivetrain: "All-Wheel Drive",
      seating: "5 passengers"
    },
    isFeatured: true
  },
  {
    name: "AMG GT",
    brand: "Mercedes-Benz",
    price: 118600,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Sports",
    year: 2024,
    mileage: 0,
    fuelType: "Gasoline",
    transmission: "Automatic",
    description: "Pure driving dynamics with handcrafted AMG performance and luxury refinement.",
    features: [
      "AMG Performance Seats",
      "Carbon Fiber Trim",
      "Performance Exhaust",
      "AMG Track Pace",
      "Burmester Sound System",
      "AMG Dynamic Select"
    ],
    specifications: {
      engine: "4.0L V8 Biturbo",
      horsepower: "469 hp",
      torque: "465 lb-ft", 
      acceleration: "0-60 mph in 3.9s",
      topSpeed: "189 mph",
      fuelEconomy: "15/20 mpg",
      drivetrain: "Rear-Wheel Drive",
      seating: "2 passengers"
    },
    isFeatured: true
  },
  {
    name: "911 Turbo S",
    brand: "Porsche",
    price: 207000,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Sports",
    year: 2024,
    mileage: 0,
    fuelType: "Gasoline",
    transmission: "Automatic",
    description: "The ultimate expression of Porsche engineering with turbocharged performance.",
    features: [
      "Sport Chrono Package",
      "Porsche Active Suspension",
      "Ceramic Composite Brakes",
      "Sport Exhaust System",
      "Porsche Communication Management",
      "Adaptive Cruise Control"
    ],
    specifications: {
      engine: "3.8L Twin-Turbo Flat-6",
      horsepower: "640 hp",
      torque: "590 lb-ft",
      acceleration: "0-60 mph in 2.6s",
      topSpeed: "205 mph",
      fuelEconomy: "14/20 mpg",
      drivetrain: "All-Wheel Drive",
      seating: "4 passengers"
    },
    isFeatured: true
  }
];

async function seedCars() {
  try {
    await db.connect();
    
    // Clear existing cars data
    await db.execute('DELETE FROM cars');
    console.log('Cleared existing cars data');
    
    for (const car of cars) {
      await db.execute(
        `INSERT INTO cars (name, brand, price, image, images, category, year, mileage, fuelType, transmission, description, features, specifications, isFeatured, available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)`,
        [
          car.name,
          car.brand,
          car.price,
          car.image,
          JSON.stringify(car.images),
          car.category,
          car.year,
          car.mileage,
          car.fuelType,
          car.transmission,
          car.description,
          JSON.stringify(car.features),
          JSON.stringify(car.specifications),
          car.isFeatured ? 1 : 0
        ]
      );
    }
    console.log('Cars seeded successfully!');
    await db.disconnect();
  } catch (err) {
    console.error('Error seeding cars:', err);
    process.exit(1);
  }
}

// Export the function for use in other scripts
module.exports = seedCars;

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedCars();
} 