import Navbar from "./Navbar";
import SideBar from "./SideBar";

const Ticket = () => {
  const tour = [
    {
      id: 1,
      name: "Amazing Tour",
      image: "https://example.com/tour1.jpg",
      duration: 5,
      description: "Explore the wonders of nature!",
      price: 500,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="flex flex-row gap-x-6 h-full bg-light-black w-full overflow-hidden ">
        <SideBar />
        <div className="landing-page h-screen flex flex-col space-y-6 justify-center items-center w-full bg-light-black mt-36">
          <h1 className="text-yellows text-5xl font-joining ">Add Tour Form</h1>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={tour.image}
              alt={tour.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {tour.name}
              </h3>
              <p className="text-sm text-gray-600">{tour.duration} Days</p>
              <p className="text-sm text-gray-600">{tour.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg text-gray-800">${tour.price}</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
