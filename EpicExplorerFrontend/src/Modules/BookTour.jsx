import { useLocation, useNavigate } from "react-router";
import backgroundImage from "../images/benjamin-davies-EsH2Haii2jw-unsplash.jpg";
import image from "../images/andreas-wagner-eI-nOb1K5gE-unsplash.jpg";
import Footer from "./Footer";
import Navbar from "./Navbar";
import RelatedTour from "./RelatedTour";
import TourService from "./TourService";
import { useEffect, useState } from "react";
import { showTourDetail } from "../Redux/Slices/ShowTourDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
import ReviewForm from "./ReviewForm";
import Review from "../../../Backend/Models/Review";
import ReviewShowingTour from "./ReviewShowingTour";
const BookTour = () => {
  const dispatch = useDispatch();
  const [tourDet, setTourDet] = useState({});
  const { tourDetail } = useSelector((state) => state.TourDetail);
  const location = useLocation();
  let Navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  useEffect(() => {
    if (id) {
      dispatch(showTourDetail(id));
    }
  }, [id]);
  useEffect(() => {
    if (tourDetail) {
      setTourDet(tourDetail.tour);
      console.log(tourDet);
    }
  }, [tourDetail]);
  let ProceedPayment = () => {
    Navigate("/requestBalance");
  };
  return (
    <div
      className="bg-center"
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      <Navbar />
      <div className="relative w-full mt-20 h-[35vh]">
        <img
          src={image}
          alt="image"
          className="w-full h-full object-cover bg-center bg-no-repeat"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-6xl font-radios font-bold p-4 rounded">
            {tourDet.name}
          </h2>
        </div>
      </div>
      <div className="flex flex-col md:flex-row min-h-screen p-6 space-y-6 md:space-y-0 md:space-x-6 pl-20 pr-20 mt-16">
        {/* Image Section */}
        <div className="flex flex-col space-y-6 w-full md:w-2/3">
          <div className="relative h-[40vh] md:h-[70vh] w-full">
            <img
              src={backgroundImage}
              alt="Scenery"
              className="object-cover h-full w-full rounded-lg"
            />
            {/* Overlay Text */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative h-[30vh] w-full">
              <img
                src={backgroundImage}
                alt="Scenery"
                className="object-cover h-full w-full rounded-lg"
              />
            </div>
            <div className="relative h-[30vh] w-full">
              <img
                src={backgroundImage}
                alt="Scenery"
                className="object-cover h-full w-full rounded-lg"
              />
            </div>
            <div className="relative h-[30vh] w-full">
              <img
                src={backgroundImage}
                alt="Scenery"
                className="object-cover h-full w-full rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/3 border-2 border-[#206eff] bg-dark p-6 rounded-lg mt-6 md:mt-0 bg-white">
          <h1 className="text-[#206eff] text-4xl mb-4 font-joining font-bold mt-3">
            Book Form
          </h1>
          <form className="flex flex-col space-y-6 w-full mt-8">
            <input
              type="text"
              placeholder="Name"
              className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
            />
            <input
              type="email"
              placeholder="E-mail"
              className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
            />
            <input
              type="text"
              placeholder="Phone number"
              className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
            />
            <input
              type="number"
              placeholder="Total guests"
              className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
            />
            <input
              type="date"
              placeholder="Check-in date"
              className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
            />
            <input
              type="text"
              placeholder="Drop Off Location"
              className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
            />
            <input
              type="text"
              placeholder="Pickup Location"
              className="p-4 bg-[#206eff] shadow-lg text-white placeholder-white rounded-xl shadow-fade-black"
            />
            <button
              className="bg-[#206eff] text-white font-radios font-bold py-4 rounded-xl hover:bg-[#3e41ff] "
              onClick={ProceedPayment}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <TourService id={id} />
      <RelatedTour id={id} />
      <ReviewShowingTour id={id} />
      <ReviewForm id={id} />

      <Footer />
    </div>
  );
};

export default BookTour;
