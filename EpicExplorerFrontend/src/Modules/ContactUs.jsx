import Navbar from "./Navbar";
import image from "../images/harrison-fitts-zE2VGbJSYns-unsplash.jpg";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
const ContactUs = () => {
  return (
    <div className="bg-light-black">
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
              All Transport
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
