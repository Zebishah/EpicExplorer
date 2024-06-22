import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { transportPaymentDetail } from "../Redux/Slices/UserBookingSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import image1 from "../images/6437523_3313427.jpg";
const TransportPaymentDet = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { transportPaymentDet } = useSelector((state) => state.userBookings);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    if (id) {
      dispatch(transportPaymentDetail(id));
    }
  }, [location.search, dispatch]);

  const [transportName, setTransportName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [SenderAccId, setSenderAccId] = useState("");
  const [ReceiverAccId, setReceiverAccId] = useState("");
  const [BookerName, setBookerName] = useState("");
  const [DeliveryCharges, setDeliveryCharges] = useState("");

  const resetState = () => {
    setTransportName("");
    setTotalPrice(0);
    setSenderAccId("");
    setReceiverAccId("");
    setBookerName("");
    setDeliveryCharges("");
  };
  useEffect(() => {
    if (
      transportPaymentDet &&
      transportPaymentDet.Transport &&
      transportPaymentDet.Transport.length > 0
    ) {
      const hotel = transportPaymentDet.Transport[0];
      resetState();
      setTransportName(hotel.transportName);
      setTotalPrice(hotel.totalPrice);
      setSenderAccId(hotel.senderAccountId);
      setReceiverAccId(hotel.ReceiverAccountId);
      setBookerName(hotel.booker);
      setDeliveryCharges(hotel.deliveryCharges);
    }
  }, [transportPaymentDet]);

  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <Navbar />
      <div className="flex flex-row gap-x-6 h-full w-full overflow-hidden bg-opacity-0 bg-light-black smd:mt-40 mt-20">
        <SideBar />
        <div className="flex flex-col justify-center gap-y-10 p-6 items-center w-[80%]">
          <h1 className="text-yellows text-4xl font-bold my-10 bg-fade-black p-4 rounded-xl">
            Transport Bookings
          </h1>
          <div className="bg-fade-black shadow-yellows rounded-lg shadow overflow-hidden sm:rounded-lg w-[80%]">
            <div className="px-4 py-5 sm:px-6 w-full">
              <h3 className="text-lg leading-6 font-medium text-yellows">
                User Database
              </h3>
              <p className="mt-1 text-sm text-white">
                Details and information about user.
              </p>
            </div>
            <div className="border-t border-gray-200 w-full flex justify-center items-center">
              <dl className="flex flex-col">
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Transport Name
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {transportName || "Not Provided"}
                  </dd>
                </div>

                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Sender Account-Id
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {SenderAccId || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Transport Price
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {totalPrice || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Receiver Account-Id
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {ReceiverAccId || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Booker Name
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {BookerName || "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    Extra Charges
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {DeliveryCharges || "Not Provided"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TransportPaymentDet;
