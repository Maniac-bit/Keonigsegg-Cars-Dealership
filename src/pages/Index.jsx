import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedCars from "../components/FeaturedCars";
import ContactForm from "../components/ContactForm";
import DealershipInfo from "../components/DealershipInfo";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <ContactForm />
      <DealershipInfo />
      <Footer />
    </div>
  );
};

export default Index;
