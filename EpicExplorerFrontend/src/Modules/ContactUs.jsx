import Navbar from "./Navbar";
import image from "../images/drif-riadh-YpkuRn54y4w-unsplash.jpg";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
const ContactUs = () => {
  return (
    <div
      className="bg-center"
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      <Navbar />
      <div className="flex flex-col gap-y-10">
        <div className="relative w-full mt-20 h-[35vh]">
          <img
            src={image}
            alt="image"
            className="w-full h-full object-cover bg-center bg-no-repeat"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-6xl font-radios font-bold p-4 rounded">
              Contact Us
            </h2>
          </div>
        </div>
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
