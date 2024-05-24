import backgroundImage from "../images/traffic-vehicle-urban-reflections-city.jpg";
import backgroundImage2 from "../images/pexels-pixabay-261102.jpg";

const OtherBookings = () => {
  const BookTransport = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  const BookHotel = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <div className="flex flex-col w-full h-autp mt-16 bg-light-black">
      <h1 className="text-yellows text-5xl font-joining text-center mt-8">
        Other Bookings
      </h1>
      <div className="flex flex-col space-y-6 items-center justify-center h-screen p-8">
        <div className="relative border-2 border-yellows bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden w-[80%] rounded-xl shadow-lg shadow-yellows">
          <div className="absolute inset-0 ">
            <img
              src={backgroundImage}
              className="w-full h-full object-cover bg-center"
            />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
            <h1 className="text-5xl font-bold leading-tight mb-4">
              Welcome to Our Awesome Website
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Discover amazing Transport and services that await you.
            </p>
            <button
              type="submit"
              onClick={BookTransport}
              className=" mt-4 w-[20%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-[#00000065] px-3 text-yellows shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-yellows before:transition-all before:duration-500 hover:text-black hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
            >
              <span className="relative z-10 text-radios text-lg">
                Book Transport
              </span>
            </button>
          </div>
        </div>

        <div className="relative border-2 border-yellows bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden w-[80%] rounded-xl shadow-lg shadow-yellows">
          <div className="absolute inset-0">
            <img
              src={backgroundImage2}
              className="w-full h-full object-cover bg-center"
            />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
            <h1 className="text-5xl font-bold leading-tight mb-4">
              Welcome to Our Awesome Website
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Discover amazing Hotels and services that await you.
            </p>
            <button
              type="submit"
              onClick={BookHotel}
              className=" mt-4 w-[20%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-[#00000065] px-3 text-yellows shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-yellows before:transition-all before:duration-500 hover:text-black hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
            >
              <span className="relative z-10 text-radios text-lg">
                Book Hotels
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherBookings;
