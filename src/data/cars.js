import supraImg from '../assests/pexels_roger_arbisi_166056305_10978972_f2c104f9ff.jpg';

export const cars = [
  {
    id: 1,
    name: "Supra Mk4",
    brand: "Toyota",
    price: 75000,
    image: supraImg,
    images: [
      supraImg
    ],
    category: "Sports",
    year: 1998,
    mileage: 35000,
    fuelType: "Gasoline",
    transmission: "Manual",
    description: "The Toyota Supra Mk4 is a legendary Japanese sports car, renowned for its 2JZ-GTE engine, iconic styling, and immense tuning potential. A true icon of the 1990s performance era.",
    features: [
      "2JZ-GTE Twin-Turbo Engine",
      "Removable Targa Top",
      "Aftermarket Wheels",
      "Upgraded Suspension",
      "Performance Exhaust",
      "Classic JDM Styling"
    ],
    specifications: {
      engine: "3.0L Twin-Turbo Inline-6 (2JZ-GTE)",
      horsepower: "276 hp (stock)",
      torque: "318 lb-ft",
      acceleration: "0-60 mph in 4.6s",
      topSpeed: "155 mph (electronically limited)",
      fuelEconomy: "17/23 mpg",
      drivetrain: "Rear-Wheel Drive",
      seating: "4 passengers"
    },
    isFeatured: true
  },
  {
    id: 2,
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
    id: 3,
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
      fuelEconomy: "15/20 mpg",
      drivetrain: "All-Wheel Drive",
      seating: "4 passengers"
    },
    isFeatured: true
  },
  {
    id: 4,
    name: "X7 M50i",
    brand: "BMW",
    price: 98900,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "SUV",
    year: 2024,
    mileage: 0,
    fuelType: "Gasoline",
    transmission: "Automatic",
    description: "Luxury SUV with commanding presence and M Performance engineering.",
    features: [
      "xDrive All-Wheel Drive",
      "Panoramic Moonroof",
      "Harman Kardon Audio",
      "Gesture Control",
      "Wireless Apple CarPlay",
      "M Sport Package"
    ],
    specifications: {
      engine: "4.4L Twin-Turbo V8",
      horsepower: "523 hp",
      torque: "553 lb-ft",
      acceleration: "0-60 mph in 4.5s",
      topSpeed: "155 mph",
      fuelEconomy: "15/21 mpg", 
      drivetrain: "All-Wheel Drive",
      seating: "7 passengers"
    },
    isFeatured: false
  },
  {
    id: 5,
    name: "Range Rover Sport",
    brand: "Land Rover",
    price: 83900,
    image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "SUV",
    year: 2024,
    mileage: 0,
    fuelType: "Gasoline",
    transmission: "Automatic", 
    description: "Refined luxury SUV with uncompromising off-road capability and elegant design.",
    features: [
      "Terrain Response System",
      "Air Suspension",
      "Meridian Audio System",
      "Panoramic Roof",
      "Wade Sensing",
      "Touch Pro Duo Infotainment"
    ],
    specifications: {
      engine: "3.0L Supercharged V6",
      horsepower: "355 hp",
      torque: "365 lb-ft",
      acceleration: "0-60 mph in 6.3s",
      topSpeed: "130 mph",
      fuelEconomy: "19/25 mpg",
      drivetrain: "All-Wheel Drive", 
      seating: "5 passengers"
    },
    isFeatured: false
  },
  {
    id: 6,
    name: "A8 L",
    brand: "Audi",
    price: 86500,
    image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Sedan",
    year: 2024,
    mileage: 0,
    fuelType: "Gasoline",
    transmission: "Automatic",
    description: "Executive luxury sedan with cutting-edge technology and refined performance.",
    features: [
      "Quattro All-Wheel Drive",
      "Bang & Olufsen Audio",
      "Matrix LED Headlights",
      "Massage Seats",
      "Audi Virtual Cockpit",
      "AI Traffic Jam Pilot"
    ],
    specifications: {
      engine: "3.0L TFSI V6",
      horsepower: "335 hp", 
      torque: "369 lb-ft",
      acceleration: "0-60 mph in 5.6s",
      topSpeed: "130 mph",
      fuelEconomy: "22/29 mpg",
      drivetrain: "All-Wheel Drive",
      seating: "5 passengers"
    },
    isFeatured: false
  },
  {
    id: 7,
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
  }
];