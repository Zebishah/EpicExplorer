import { useDispatch, useSelector } from "react-redux";
import image1 from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import { useEffect, useState } from "react";
import { showTourPackages } from "../Redux/Slices/TourPackagesSlice";
import { useNavigate } from "react-router";

const TourPackages = () => {
  const [HoneyTours, setHoneyTours] = useState([]);
  const [FamilyTours, setFamilyTours] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tourPackage } = useSelector((state) => state.TourPackage);

  useEffect(() => {
    dispatch(showTourPackages());
  }, [dispatch]);

  useEffect(() => {
    if (tourPackage) {
      if (tourPackage.honeymoonTours) {
        setHoneyTours(tourPackage.honeymoonTours.slice(0, 3));
      } else {
        console.warn("honeymoonTours not found in tourPackage");
      }
      if (tourPackage.familyTours) {
        setFamilyTours(tourPackage.familyTours.slice(0, 3));
      } else {
        console.warn("familyTours not found in tourPackage");
      }
    }
  }, [tourPackage]);

  const BookTour = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <div className="flex flex-col space-y-14 flex-wrap justify-center items-center p-8 w-full">
      <h1 className="text-white text-lg smd:text-5xl font-joining bg-[#206eff] p-6 rounded-lg shadow-lg shadow-fade-black">
        Honey-Moon Tour Packages
      </h1>

      <div className="flex flex-row gap-x-10 md:mt-0 sssm:mt-72 gap-y-4 md:flex-nowrap sssm:flex-wrap">
        {HoneyTours.map((tour, index) => (
          <div
            className="bg-[#206eff] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] shadow-lg shadow-fade-black "
            key={index}
          >
            <img
              src={image1}
              className="w-full border-2 border-[#3654ff] border-b-0"
            />
            <div className="px-4 py-6 border-[#3654ff] border-2 border-t-0 ">
              <div className="flex flex-row justify-between">
                <h3 className="text-white text-xl font-radios">{tour.name}</h3>
                <h3 className="text-white text-xl font-radios">{tour.price}</h3>
              </div>

              <p className="mt-4 text-sm text-white font-radios">
                {tour.description}
              </p>
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={BookTour}
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
      <button
        type="button"
        onClick={BookTour}
        className="w-[20%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-[#3654ff] bg-[#206eff] px-3 text-white shadow-lg transition-all duration-300 ease-in-out before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-[#3654ff] hover:shadow-[#3654ff] hover:before:left-0 hover:before:w-full"
      >
        <span className="relative z-10 text-radios text-lg">See More</span>
      </button>

      <h1 className="text-white text-lg smd:text-5xl font-joining bg-[#206eff] p-6 rounded-lg shadow-lg shadow-fade-black">
        Family Tour Packages
      </h1>
      <div className="flex flex-row gap-x-10 md:mt-0 sssm:mt-72 gap-y-4 md:flex-nowrap sssm:flex-wrap">
        {FamilyTours.map((tour, index) => (
          <div
            className="bg-[#206eff] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] shadow-lg shadow-fade-black "
            key={index}
          >
            <img
              src={image1}
              className="w-full border-2 border-[#3654ff] border-b-0"
            />
            <div className="px-4 py-6 border-[#3654ff] border-2 border-t-0 ">
              <div className="flex flex-row justify-between">
                <h3 className="text-white text-xl font-radios">{tour.name}</h3>
                <h3 className="text-white text-xl font-radios">{tour.price}</h3>
              </div>

              <p className="mt-4 text-sm text-white font-radios">
                {tour.description}
              </p>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  onSubmit={BookTour}
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
      <button
        type="submit"
        onSubmit={BookTour}
        className="w-[20%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-[#3654ff] bg-[#206eff] px-3 text-white shadow-lg transition-all duration-300 ease-in-out before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-[#3654ff] hover:shadow-[#3654ff] hover:before:left-0 hover:before:w-full"
      >
        <span className="relative z-10 text-radios text-lg">See More</span>
      </button>
    </div>
  );
};

export default TourPackages;
