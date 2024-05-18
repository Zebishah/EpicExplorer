import backgroundImage from "../images/traffic-vehicle-urban-reflections-city.jpg";
import backgroundImage2 from "../images/full-shot-man-carrying-baggage.jpg";
const OtherBookings = () => {
  return (
    <div className="flex flex-col w-full h-screen mt-16 bg-light-black">
      <h1 className="text-yellows text-5xl font-joining text-center mt-8">
        Other Bookings
      </h1>
      <div className="flex md:flex-row flex-wrap flex-col md:space-x-6 items-center justify-center h-screen p-8">
        <div className="flex flex-col items-center justify-center md:h-screen flex-grow md:w-[40%] sssm:w-[70%] ">
          <div className="relative w-full h-[50%]">
            <div className="absolute inset-0 z-0 rounded-2xl">
              <img
                src={backgroundImage}
                alt="Background"
                className="w-full h-full object-cover rounded-2xl border-yellows border-4"
              />
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
              <h1 className="text-white text-2xl ">Book Transport</h1>
              <h1 className="text-white text-lg text-center mb-4 w-[60%]">
                You can book all the hotels from here. We have a variety of
                hotels available. Book now to enjoy your stay!
              </h1>
              <button className="bg-yellows hover:bg-blue-700 text-black font-bold py-2 px-4 rounded cursor-pointer">
                Book Now
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center md:h-screen flex-grow md:w-[40%] sssm:w-[70%] md:-mt-0 sssm:-mt-32">
          <div className="relative w-full h-[50%]">
            <div className="absolute inset-0 z-0 rounded-2xl">
              <img
                src={backgroundImage2}
                alt="Background"
                className="w-full h-full object-cover rounded-2xl border-yellows border-4"
              />
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4 ">
              <h1 className="text-white text-2xl ">Book Hotels</h1>
              <h1 className="text-white text-lg text-center mb-4 w-[60%]">
                You can book all the hotels from here. We have a variety of
                hotels available. Book now to enjoy your stay!
              </h1>
              <button className="bg-yellows hover:bg-blue-700 text-black font-bold py-2 px-4 rounded cursor-pointer">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherBookings;
