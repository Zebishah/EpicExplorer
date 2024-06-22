import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import image1 from "../images/6437523_3313427.jpg";
import sub from "../images/man-user-circle-icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserSearchState,
  userBookedHotels,
  userBookedTours,
  userBookedTransport,
  userTransactions,
} from "../Redux/Slices/userInfoSlice";
import { userSearchFrToken } from "../Redux/Slices/SearchingUserSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";
import { resendOtp } from "../Redux/Slices/ResendOtpSlice";
import isTokenExpired from "../../util/tokenExpiry";
const Dashboard = () => {
  const [tourBooked, setToursBooked] = useState(0);
  const [transportBooked, setTransportBooked] = useState(0);
  const [hotelBooked, setHotelBooked] = useState(0);
  const [transaction, setTransactions] = useState(0);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userAccountId, setUserAccId] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [userVerified, setUserVerified] = useState("");
  const [imageReal, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); // Retrieve your token from localStorage or any other storage

    if (isTokenExpired(token)) {
      // Token is expired, log out the user
      toast.error("Your Login is expired");
      localStorage.removeItem("jwtToken"); // Remove the token from storage
      navigate("/SignIn"); // Redirect to login page
    }
  }, [navigate]);
  const {
    toursBooked,
    transportsBooked,
    hotelsBooked,
    transactions,
    errorSearch,
  } = useSelector((state) => state.userInfoSearch);
  const { userFrTokenData } = useSelector((state) => state.userSearch);

  const verifyAccount = () => {
    dispatch(resendOtp(userEmail));
    toast.success("Otp sended to your mail!");
    navigate(`/indOtp?email=${encodeURIComponent(userEmail)}`);
  };

  useEffect(() => {
    dispatch(userBookedTours());
    dispatch(userBookedTransport());
    dispatch(userBookedHotels());
    dispatch(userTransactions());
    dispatch(userSearchFrToken());
  }, [dispatch]);

  useEffect(() => {
    if (toursBooked !== null) {
      setToursBooked(toursBooked.toursCount);
    }

    if (transportsBooked !== null) {
      setTransportBooked(transportsBooked.transportCount);
    }
    if (hotelsBooked !== null) {
      setHotelBooked(hotelsBooked.hotelsCount);
    }
    if (transactions !== null) {
      setTransactions(transactions.totalTransactions);
    }
    if (userFrTokenData !== null) {
      setUserName(userFrTokenData.userInfo.userName);
      setUserEmail(userFrTokenData.userInfo.email);
      setUserPhone(userFrTokenData.userInfo.phone);
      setUserAddress(userFrTokenData.userInfo.address);
      setUserAccId(userFrTokenData.userInfo.AccountId);
      setUserBalance(userFrTokenData.userInfo.Balance);
      setUserCity(userFrTokenData.userInfo.city);
      setUserVerified(userFrTokenData.userInfo.verifiedStatus);
      setImage(userFrTokenData.userInfo.pic);
    }
    // Use a timeout to reset the state after 5 seconds
    const timer = setTimeout(() => {
      dispatch(resetUserSearchState());
    }, 5000);
    // Clear the timer on component unmount or if data/error changes
    return () => clearTimeout(timer);
  }, [
    toursBooked,
    transportsBooked,
    hotelsBooked,
    transactions,
    errorSearch,
    userFrTokenData,
    dispatch,
  ]);

  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <Navbar />

      <div className="flex flex-row gap-x-6 h-full w-full overflow-hidden bg-opacity-0 bg-light-black smd:mt-40 mt-20">
        <SideBar />

        <div className="flex flex-col gap-y-10 p-6 items-center w-[80%] ">
          {userFrTokenData &&
            userFrTokenData.userInfo.verifiedStatus === "false" && (
              <div className="flex flex-row justify-between items-center -mt-4 p-4 bg-fade-black shadow-lg shadow-yellows w-full rounded-lg ">
                <p className="text-yellows font-radios text-sm ">
                  Your account is not verified. please verify your account
                </p>
                <button
                  type="button"
                  onClick={verifyAccount}
                  className="text-light-black hover:bg-light-black hover:text-yellows transition-all ease-in-out duration-300 bg-yellows p-3 rounded-lg shadow-lg shadow-yellows"
                >
                  Verify Account
                </button>
              </div>
            )}
          <h1 className="text-yellows text-lg lg:text-4xl font-joining bg-light-black bg-opacity-60 p-4 rounded-lg ">
            User Booking Count
          </h1>
          <div className="flex flex-col smd:flex-row justify-center items-center flex-wrap gap-y-2 gap-x-4 lg:gap-x-14 w-full">
            <div className="flex flex-col gap-y-4 justify-center items-center bg-fade-black p-6 shadow-lg rounded-lg w-full sm:w-auto">
              <h1 className="text-yellows text-2xl font-radios font-bold">
                {tourBooked}
              </h1>
              <h3 className="text-yellows text-lg font-radios font-bold">
                Booked Tours
              </h3>
            </div>
            <div className="flex flex-col gap-y-4 justify-center items-center bg-fade-black p-6 shadow-lg rounded-lg w-full sm:w-auto">
              <h1 className="text-yellows text-2xl font-radios font-bold">
                {transportBooked}
              </h1>
              <h3 className="text-yellows text-lg font-radios font-bold">
                Booked Transport
              </h3>
            </div>
            <div className="flex flex-col gap-y-4 justify-center items-center bg-fade-black p-6 shadow-lg rounded-lg w-full sm:w-auto">
              <h1 className="text-yellows text-2xl font-radios font-bold">
                {hotelBooked}
              </h1>
              <h3 className="text-yellows text-lg font-radios font-bold">
                Booked Hotels
              </h3>
            </div>
            <div className="flex flex-col gap-y-4 justify-center items-center bg-fade-black p-6 shadow-lg rounded-lg w-full sm:w-auto">
              <h1 className="text-yellows text-2xl font-radios font-bold">
                {transaction}
              </h1>
              <h3 className="text-yellows text-lg font-radios font-bold">
                Total Transactions
              </h3>
            </div>
          </div>
          <h1 className="text-yellows text-lg font-joining lg:text-4xl bg-light-black bg-opacity-60 p-4 rounded-lg ">
            User Personal Information
          </h1>
          <div className="bg-fade-black shadow-yellows rounded-lg shadow overflow-hidden sm:rounded-lg w-[80%]">
            <div className="px-4 py-5 sm:px-6 w-full">
              <h3 className="text-lg leading-6 font-medium text-yellows">
                User database
              </h3>
              <p className="mt-1 text-sm text-white">
                Details and informations about user.
              </p>
            </div>
            <div className="border-t border-gray-200 w-full flex justify-center items-center">
              <dl className="flex flex-col">
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm mt-4 font-medium text-yellows font-radios">
                    Image
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    <img
                      src={imageReal !== " " ? imageReal : sub}
                      alt="User Profile"
                      className="h-8 w-8 md:h-14 md:w-14 rounded-full object-cover"
                    />
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    User-Name
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userName ? userName : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    User-Email
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userEmail !== " " ? userEmail : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    User-Phone
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userPhone !== " " ? userPhone : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    User-Address
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userAddress !== " " ? userAddress : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    User-City
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userCity !== " " ? userCity : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    User-Balance
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userBalance ? userBalance : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    User-Verified
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userVerified ? userVerified : "Not Provided"}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-yellows font-radios">
                    userAccountId
                  </dt>
                  <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 font-radios">
                    {userAccountId ? userAccountId : "Not Verified"}
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

export default Dashboard;
