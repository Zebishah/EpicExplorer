import { useDispatch, useSelector } from "react-redux";
import image1 from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import { useEffect, useState } from "react";
import { showTourPackages } from "../Redux/Slices/TourPackagesSlice";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
import image from "../images/felix-rostig-UmV2wr-Vbq8-unsplash.jpg";
import Footer from "./Footer";
import BookMoreTour from "./BookMoreTour";
const HoneyMoonPackages = () => {
  const [honeymoonTours, setHoneymoonTours] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tourPackage } = useSelector((state) => state.TourPackage);

  useEffect(() => {
    dispatch(showTourPackages());
  }, [dispatch]);

  useEffect(() => {
    if (tourPackage) {
      if (tourPackage.honeymoonTours) {
        setHoneymoonTours(tourPackage.honeymoonTours.slice(0, 3));
      } else {
        console.warn("honeymoonTours not found in tourPackage");
      }
    }
  }, [tourPackage]);
  const BookTour = (id) => {
    navigate(`/BookTour?id=${encodeURIComponent(id)}`);
  };
  return (
    <div
      className="bg-center w-full h-full"
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      {" "}
      <Navbar />
      <div className="relative w-full mt-36 h-[35vh]">
        <img
          src={image}
          alt="image"
          className="w-full h-full object-cover bg-center bg-no-repeat"
        />
        <div className="absolute inset-0 flex items-center justify-center w-full">
          <h2 className="text-white text-6xl font-radios font-bold p-4 rounded">
            All Packages
          </h2>
        </div>
      </div>
      <div className="flex flex-col space-y-14 flex-wrap px-14 ml-16 justify-center items-center w-full mt-44 lg:w-[90%] pb-6 ">
        <h1 className="text-white text-lg smd:text-5xl font-joining bg-[#206eff] p-6 rounded-lg shadow-lg shadow-fade-black">
          HoneyMoon Packages
        </h1>

        <div className="flex flex-row gap-y-4 w-full flex-wrap">
          {honeymoonTours.map((tour, index) => (
            <div
              className="bg-[#206eff] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] shadow-lg shadow-fade-black "
              key={index}
            >
              <div className="relative">
                <div className="absolute top-8 right-0 transform translate-y-[-50%]">
                  <div className="tag absolute -top-4 right-2 bg-blue-600 text-white w-max px-5 py-2 rounded-xl font-radios shadow-lg shadow-fade-black">
                    Package
                  </div>
                </div>
                <img src={image1} className="w-full" />
              </div>
              <div className="px-4 py-6 border-[#3654ff] border-2 border-t-0 ">
                <div className="flex flex-row justify-between">
                  <h3 className="text-white text-xl font-radios">
                    {tour.name}
                  </h3>
                  <h3 className="text-white text-xl font-radios">
                    {tour.price}
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
        <BookMoreTour />
      </div>
      <Footer />
    </div>
  );
};

export default HoneyMoonPackages;
