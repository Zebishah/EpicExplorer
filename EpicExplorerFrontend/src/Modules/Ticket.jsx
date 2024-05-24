import Navbar from "./Navbar";
import image from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";

const Ticket = () => {
  const tours = [
    {
      id: 1,
      name: "Amazing Tour",
      image: image,
      duration: 5,
      description: "Explore the wonders of nature!",
      price: 500,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="flex flex-row gap-x-6 h-full bg-light-black w-full overflow-hidden">
        <SideBar />
        <div className="landing-page h-screen flex flex-col space-y-6 justify-center items-center w-full bg-light-black mt-36">
          <h1 className="text-yellows text-5xl font-joining">Ticket </h1>
          <div className="bg-fade-black shadow-lg rounded-lg overflow-hidden w-[80%] flex flex-col justify-center items-center">
            <img
              src={tours[0].image}
              alt={tours[0].name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4 w-[80%] flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold text-yellows">
                {tours[0].name}
              </h3>
              <p className="text-sm text-yellows">{tours[0].duration} Days</p>
              <p className="text-sm text-yellows">{tours[0].description}</p>
              <div className="mt-4 flex flex-col items-center justify-between">
                <p className="text-lg text-yellows">${tours[0].price}</p>
                <Link>
                  {" "}
                  <button className="px-4 py-2 bg-yellows text-black rounded-lg">
                    Go To Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
