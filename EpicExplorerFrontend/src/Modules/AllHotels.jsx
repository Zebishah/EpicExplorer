import Navbar from "./Navbar";
import image from "../images/gregory-dalleau-wAOKtzvZ350-unsplash.jpg";
import image1 from "../images/jed-villejo-8y0VL09lDXM-unsplash.jpg";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { showHotels } from "../Redux/Slices/showAccommodationsSlice";
import { useNavigate } from "react-router";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";

const AllHotels = () => {
  const [Hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hotels } = useSelector((state) => state.showAccommodations);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(showHotels());
  }, [dispatch]);

  useEffect(() => {
    if (hotels && hotels.Hotel) {
      setHotels(hotels.Hotel);
    }
  }, [hotels]);
  let BookHotel = (id) => {
    navigate(`/AllRoom?id=${encodeURIComponent(id)}`);
  };
  const totalPages = Math.ceil(Hotels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentHotels = Hotels.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div
      className="w-[100%]"
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
        <div className="absolute inset-0 flex items-center justify-center w-full">
          <h2 className="text-white text-6xl font-radios font-bold p-4 rounded">
            All Hotels
          </h2>
        </div>
      </div>
      <div className="bg-dark flex-col lg:flex-row gap-x-6 p-8 min-h-screen flex items-center justify-center overflow-hidden w-full">
        <div className=" mx-auto w-full">
          <div className="text-center bg-[#3654ff] py-4 rounded mb-8 text-white">
            <h1 className="text-2xl font-bold">List of All Hotels</h1>
          </div>

          <div className="flex flex-wrap gap-8 justify-center">
            {currentHotels.length > 0 &&
              currentHotels.map((tour, index) => (
                <div
                  className="bg-[#3654ff] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif] shadow-lg shadow-black"
                  key={index}
                >
                  <img src={image1} className="w-full" alt="Car" />
                  <div className="px-4 py-6 border-[#3654ff] border-2 border-t-0">
                    <div className="flex flex-row justify-between">
                      <h3 className="text-white text-xl font-radios">
                        {tour.name}
                      </h3>
                      <h3 className="text-white text-lg font-radios">
                        {tour.prices} pkr
                      </h3>
                    </div>
                    <p className="mt-4 text-sm text-white font-radios">
                      {tour.description}
                    </p>
                    <div className="flex justify-center mt-6">
                      <button
                        type="button"
                        className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-white text-[#3654ff] "
                        onClick={() => BookHotel(tour._id)}
                      >
                        Search Rooms
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-8">
            <ul className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className="mx-1">
                  <button
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllHotels;
