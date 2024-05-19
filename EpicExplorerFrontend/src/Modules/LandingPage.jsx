import image1 from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import ContactForm from "./ContactForm";
import EpicIntro from "./EpicIntro";
import Footer from "./Footer";
import LatestTours from "./LatestTours";
import OtherBookings from "./OtherBookings";
import Reviews from "./Reviews";
import TourPackages from "./TourPackages";
import { Link } from "react-router-dom";
import WhyEpicExplorer from "./WhyEpicExplorer";
const LandingPage = () => {
  return (
    <div className="flex flex-col bg-light-black">
      <div
        className="flex justify-center items-center h-screen bg-purple-700 text-white bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <header className="hero text-center">
          <div className="hero-content">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              WELCOME TO EPIC EXPLORER
            </h1>
            <p className="hero-text text-lg md:text-xl lg:text-2xl mb-6">
              Lets create travel memories together
            </p>
            <div className="hero-buttons">
              <Link to={"/AllTours"}>
                <button className="book-tours-btn bg-yellows text-black px-6 py-3 rounded-full mr-4 font-semibold text-lg md:text-xl">
                  Book Tours
                </button>
              </Link>
              <button className="find-more-btn bg-yellows text-black px-6 py-3 rounded-full font-semibold text-lg md:text-xl">
                Find More
              </button>
            </div>
          </div>
        </header>
      </div>
      <EpicIntro />
      <WhyEpicExplorer />
      <TourPackages />
      <LatestTours />
      <OtherBookings />
      <Reviews />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default LandingPage;
