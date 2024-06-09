import image1 from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import ContactForm from "./ContactForm";
import EpicIntro from "./EpicIntro";
import Footer from "./Footer";
import LatestTours from "./LatestTours";
import OtherBookings from "./OtherBookings";
import Reviews from "./Reviews";
import TourPackages from "./TourPackages";
import { useNavigate } from "react-router-dom";

import WhyEpicExplorer from "./WhyEpicExplorer";
import { useEffect } from "react";
import isTokenExpired from "../../util/tokenExpiry";
const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // Retrieve your token from localStorage or any other storage

    if (isTokenExpired(token)) {
      // Token is expired, log out the user
      localStorage.removeItem("jwtToken"); // Remove the token from storage
      navigate("/SignIn"); // Redirect to login page
    }
  }, [navigate]);
  const BookTour = (e) => {
    e.preventDefault();
    console.log("Book Tour");
  };
  const CustomizeTour = (e) => {
    e.preventDefault();
    console.log("Customize Tour");
  };
  return (
    <div className="flex flex-col bg-light-black gap-y-24">
      <div
        className="flex justify-center items-center h-screen bg-purple-700 text-white bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <header className="hero text-center p-2">
          <div className="hero-content">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              WELCOME TO EPIC EXPLORER
            </h1>
            <p className="hero-text text-lg md:text-xl lg:text-2xl mb-6">
              Lets create travel memories together
            </p>
            <div className="hero-buttons flex flex-row gap-x-6 justify-center items-center">
              <button
                type="submit"
                onClick={BookTour}
                className=" mt-4 w-[40%] smd:w-[20%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-[#00000065] px-3 text-yellows shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-yellows before:transition-all before:duration-500 hover:text-black hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10 text-radios text-lg">
                  Book Tour
                </span>
              </button>
              <button
                type="submit"
                onSubmit={CustomizeTour}
                className=" mt-4 w-[40%] smd:w-[20%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-[#00000065] px-3 text-yellows shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-yellows before:transition-all before:duration-500 hover:text-black hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10 text-radios text-lg">
                  Customize Tour
                </span>
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
