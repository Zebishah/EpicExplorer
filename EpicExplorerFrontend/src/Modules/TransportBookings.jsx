import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import image1 from "../images/6437523_3313427.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userTransportBooking } from "../Redux/Slices/UserBookingSlice";

const TransportBookings = () => {
  const [transport, setTransport] = useState([]);
  const dispatch = useDispatch();
  const { transportBooking } = useSelector((state) => state.userBookings);

  useEffect(() => {
    dispatch(userTransportBooking());
  }, [dispatch]);

  useEffect(() => {
    if (transportBooking && transportBooking.TransportBookings) {
      setTransport(transportBooking.TransportBookings);
    }
  }, [transportBooking]);
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };
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
            Transport Bookings
          </h1>
          <div className="w-full space-y-4 flex flex-col justify-center items-center">
            {transport.map((transport, index) => (
              <div
                key={index}
                className="bg-fade-black shadow-lg text-white p-4 rounded-lg flex justify-between items-center space-x-4 w-[70%]"
              >
                <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:space-x-4">
                  <span className="font-bold text-yellows">
                    # {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-radios ">{transport.carName}</span>
                  <span className="font-radios ">{transport.bookersName}</span>
                  <span className="font-radios ">{transport.bookerEmail}</span>
                  <span className="font-radios ">
                    {formatDate(transport.bookingDate)}
                  </span>
                </div>
                <button className="bg-yellows text-gray-900 px-4 py-2 rounded-lg">
                  Details
                </button>
              </div>
            ))}
          </div>
          <button className="mt-10 bg-fade-black text-yellows px-6 py-2 rounded-lg">
            See More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TransportBookings;
