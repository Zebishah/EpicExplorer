import image1 from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showRelatedTours } from "../Redux/Slices/ShowTourDetailsSlice";
import { useNavigate } from "react-router";
const RelatedTour = (id) => {
  const dispatch = useDispatch();
  const [tourDet, setTourDet] = useState([]);
  const navigate = useNavigate();
  const { relatedTour } = useSelector((state) => state.TourDetail);

  useEffect(() => {
    if (id) {
      dispatch(showRelatedTours(id));
    }
  }, []);
  useEffect(() => {
    if (relatedTour && relatedTour.tours) {
      setTourDet(relatedTour.tours.slice(0, 3));
    }
  }, [relatedTour]);
  const BookTour = (id) => {
    navigate(`/BookTour?id=${encodeURIComponent(id)}`);
  };
  return (
    <div className="flex flex-col space-y-14 flex-wrap justify-center items-center p-8">
      <h1 className="bg-[#206eff] text-white p-4 w-max rounded-xl text-5xl font-joining ">
        Related Transport
      </h1>
      <div className="flex flex-row md:mt-0 sssm:mt-72 gap-y-4 flex-wrap w-[85%]">
        {tourDet.map((tour, index) => (
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
  );
};

export default RelatedTour;
