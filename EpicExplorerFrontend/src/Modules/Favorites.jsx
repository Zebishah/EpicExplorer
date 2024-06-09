import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import image1 from "../images/6437523_3313427.jpg";
import image2 from "../images/full-shot-man-carrying-baggage.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserFavorite } from "../Redux/Slices/ManageUserSlice";

const Favorites = () => {
  const [favrt, setFavrt] = useState([]);
  const dispatch = useDispatch();
  const { userFavorite } = useSelector((state) => state.manageUser);

  useEffect(() => {
    dispatch(getUserFavorite());
  }, [dispatch]);

  useEffect(() => {
    if (userFavorite && userFavorite.Favorites) {
      setFavrt(userFavorite.Favorites);
    }
  }, [userFavorite]);

  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <Navbar />
      <div className="flex flex-row gap-x-6 h-full w-full overflow-hidden bg-opacity-0 bg-light-black smd:mt-40 mt-20">
        <SideBar />
        <div className=" flex flex-col justify-center gap-y-10 p-6 items-center w-[80%]">
          <h1 className="text-yellows text-4xl font-bold my-10 bg-fade-black p-4 rounded-xl">
            User Favorites
          </h1>
          <div className="flex flex-wrap gap-8 justify-center">
            {favrt.map((tour, index) => (
              <div
                key={index}
                className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm overflow-hidden font-[sans-serif] flex flex-col"
              >
                <div className="flex-shrink-0">
                  <img src={image2} className="w-full" alt="Tour" />
                </div>
                <div className="px-4 py-6 border-yellows border-2 border-t-0 flex-grow">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-yellows text-xl font-radios">
                      {tour.name}
                    </h3>
                    <h3 className="text-yellows text-xl font-radios">
                      {tour.prices}$
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-white font-radios">
                    {tour.description}
                  </p>
                  <div className="flex justify-center mt-6">
                    <Link to={"/BookTour"}>
                      <button
                        type="button"
                        className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                      >
                        Book Now
                      </button>
                    </Link>
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

export default Favorites;
