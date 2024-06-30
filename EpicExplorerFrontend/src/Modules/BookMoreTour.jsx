import backgroundImage from "../images/duy-pham-Cecb0_8Hx-o-unsplash.jpg";
import backgroundImage2 from "../images/pexels-pixabay-261102.jpg";
import { useNavigate } from "react-router";
const BookMoreTour = () => {
  const navigate = useNavigate();
  const BookTour = (e) => {
    e.preventDefault();
    navigate("/AllTours");
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-auto mt-16">
      <h1 className="text-white w-max text-center text-lg smd:text-5xl font-joining bg-[#3654ff] p-4 rounded-lg shadow-lg shadow-fade-black">
        Wanna Book More Tours?
      </h1>
      <div className="flex flex-col space-y-6 items-center justify-center h-[50vh] p-8 w-full">
        <div className="relative border-2 border-[#3654ff] bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden w-[100%] rounded-xl shadow-lg shadow-fade-black">
          <div className="absolute inset-0 ">
            <img
              src={backgroundImage}
              className="w-full h-full object-cover bg-center"
            />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
            <h1 className=" text-2xl md:text-5xl font-bold leading-tight mb-4">
              Welcome to Our Awesome Website
            </h1>
            <p className="text-lg text-gray-300 mb-8 w-[90%]">
              Discover amazing Tours and services that await you.
            </p>
            <button
              type="submit"
              onClick={BookTour}
              className=" mt-4 w-[55%] md:w-[25%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-[#3654ff] bg-[#00000065] px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-[#3654ff] before:transition-all before:duration-500 hover:text-white hover:shadow-[#3654ff] hover:before:left-0 hover:before:w-full"
            >
              <span className="relative z-10 text-radios text-lg">
                Book Tours
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMoreTour;
