import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import DealershipInfo from "../components/DealershipInfo";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact AutoLux
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to find your dream car? Get in touch with our expert team today.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
      <DealershipInfo />
      
      <Footer />
    </div>
  );
};

export default ContactPage;