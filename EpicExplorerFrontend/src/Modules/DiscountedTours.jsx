import { useDispatch, useSelector } from "react-redux";
import image1 from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import { useEffect, useState } from "react";
import image from "../images/drif-riadh-YpkuRn54y4w-unsplash.jpg";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { showDiscountedTours } from "../Redux/Slices/showAccommodationsSlice";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
const DiscountedTours = () => {
  const [DiscountedTours, setDiscountedTours] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { discountedTour } = useSelector((state) => state.showAccommodations);

  useEffect(() => {
    dispatch(showDiscountedTours());
  }, [dispatch]);

  useEffect(() => {
    if (discountedTour) {
      console.log(discountedTour);
      if (discountedTour.tours) {
        setDiscountedTours(discountedTour.tours);
      } else {
        console.warn("Tours not found in discountedTour");
      }
    }
  }, [discountedTour]);
  const BookTour = (id) => {
    navigate(`/BookTour?id=${encodeURIComponent(id)}`);
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
            All Discounted Tours
          </h2>
        </div>
      </div>
      <div className="bg-dark flex-col lg:flex-row gap-x-6 p-8 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center bg-[#206eff] text-white py-4 rounded mb-8">
            <h1 className="text-2xl font-bold">List of All Tours</h1>
          </div>

          <div className="flex flex-row gap-x-10 md:mt-0 sssm:mt-72 gap-y-4 flex-wrap">
            {DiscountedTours.map((tour, index) => (
              <div
                className="bg-[#206eff] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] shadow-lg shadow-fade-black "
                key={index}
              >
                <div className="relative ">
                  <div className="absolute top-8 right-0 transform translate-y-[-50%]">
                    <div className="tag absolute -top-4 right-2 bg-blue-600 text-white w-max px-5 py-2 rounded-xl font-radios shadow-lg shadow-fade-black animate-blink">
                      5% Discount
                    </div>
                  </div>
                  <img src={image1} className="w-full" />
                </div>
                <div className="px-4 py-6 ">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-white text-xl font-radios">
                      {tour.name}
                    </h3>
                    <h3 className="text-white text-xl font-radios">
                      {tour.price} pkr
                    </h3>
                  </div>

                  <p className="mt-4 text-sm text-white font-radios">
                    {tour.description}
                  </p>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      onClick={() => BookTour(tour._id)}
                      className="w-[40%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-[#3654ff] bg-white px-3 text-[#3654ff] shadow-lg transition-all ease-in-out before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#206eff] hover:shadow-lg hover:shadow-white before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
                    >
                      <span className="relative z-10 text-radios text-lg">
                        Book Tour
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiscountedTours;
