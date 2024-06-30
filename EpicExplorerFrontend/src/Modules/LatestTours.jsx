import { useDispatch, useSelector } from "react-redux";
import image1 from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import newIcon from "../images/new-product (2).png";
import { showLatestTours } from "../Redux/Slices/TourPackagesSlice";
const LatestTours = () => {
  const [HoneyTours, setHoneyTours] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { latestTour } = useSelector((state) => state.TourPackage);

  useEffect(() => {
    dispatch(showLatestTours());
  }, [dispatch]);

  useEffect(() => {
    if (latestTour) {
      if (latestTour.tours) {
        setHoneyTours(latestTour.tours.slice(0, 6));
      }
    }
  }, [latestTour]);

  const BookTour = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <div className="flex flex-col space-y-14 flex-wrap justify-center items-center p-8">
      <h1 className="text-white text-lg smd:text-5xl font-joining bg-[#206eff] p-6 rounded-lg shadow-lg shadow-fade-black  ">
        Latest Tours
      </h1>
      <div className="flex flex-row md:mt-0 sssm:mt-72 gap-y-4 flex-wrap w-[100%] md:w-[80%]">
        {HoneyTours.map((tour, index) => (
          <div
            className="bg-[#206eff] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] shadow-lg shadow-fade-black "
            key={index}
          >
            <div className="relative">
              <div className="absolute top-8 right-0 transform translate-y-[-50%] animate-blink">
                <img src={newIcon} alt="icon" />
              </div>
              <img src={image1} className="w-full" />
            </div>
            <div className="px-4 py-6 border-[#3654ff] border-2 border-t-0">
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
        className="w-[40%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-[#3654ff] bg-[#206eff] px-3 text-white shadow-lg transition-all ease-in-out before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-[#3654ff] hover:shadow-fade-black hover:before:left-0 hover:before:w-full"
      >
        <span className="relative z-10 text-radios text-lg">See More</span>
      </button>
    </div>
  );
};

export default LatestTours;
