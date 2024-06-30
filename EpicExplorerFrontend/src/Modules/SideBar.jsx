import {
  faBell,
  faCartPlus,
  faDashboard,
  faDollar,
  faDollarSign,
  faDoorOpen,
  faHeart,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image from "../images/man-user-circle-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Favorites from "./Favorites";
import { useNavigate } from "react-router";
import {
  resetUserSearchState,
  userSearchFrToken,
} from "../Redux/Slices/SearchingUserSlice";

const SideBar = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [imageReal, setImage] = useState("");
  const dispatch = useDispatch();
  const { errorSearch, userFrTokenData } = useSelector(
    (state) => state.userSearch
  );
  useEffect(() => {
    dispatch(userSearchFrToken());
  }, [dispatch]);

  useEffect(() => {
    if (userFrTokenData) {
      setUserName(userFrTokenData.userInfo.userName);
      setEmail(userFrTokenData.userInfo.email);
      setImage(userFrTokenData.userInfo.pic);

      // Use a timeout to reset the state after 5 seconds
      const timer = setTimeout(() => {
        dispatch(resetUserSearchState());
      }, 5000);
      // Clear the timer on component unmount or if data/error changes
      return () => clearTimeout(timer);
    }
  }, [userFrTokenData, errorSearch, dispatch]);

  const navigate = useNavigate();
  let Bookings = () => {
    navigate("/Bookings");
  };
  let payment = () => {
    navigate("/PaymentOptions");
  };
  let Logout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/SignIn");
  };
  let Notifications = () => {
    navigate("/Notifications");
  };
  let Password = () => {
    navigate("/changePassword");
  };

  let Favoritess = () => {
    navigate("/Favorites");
  };
  let goDashboard = () => {
    navigate("/dashboard");
  };
  let goUserProfile = () => {
    navigate("/userProfile");
  };

  return (
    <div className=" flex flex-col items-center gap-y-14 bg-[#3654ff] w-[18%] p-6 h-[100vh] opacity-85 transition-all duration-500 ease-in-out">
      <h1 className="text-white lg:text-2xl smd:text-lg text-xs font-joining ">
        User Dashboard
      </h1>
      <div className="flex flex-col gap-y-4 justify-center items-center">
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <img
            src={imageReal !== " " ? imageReal : image}
            alt="profile"
            className="h-8 w-8 md:h-14 md:w-14 rounded-full object-cover"
          />
          <div className=" hidden smd:flex flex-col gap-y-2 justify-center items-center">
            <p className="text-white mt-1 font-radios text-xs lg:text-lg">
              {userName}
            </p>
            <p className="text-white font-radios text-xs lg:text-sm">{email}</p>
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-y-4 justify-start items-stajustify-start">
        <li
          className="flex flex-row gap-x-4 items-center "
          onClick={goDashboard}
        >
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faDashboard} className="text-lg" />
            <p className="hidden smd:block text-lg font-radios ">Dashboard</p>
          </span>
        </li>
        <li
          className="flex flex-row gap-x-4 items-center"
          onClick={goUserProfile}
        >
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faUser} className="text-lg" />
            <p className="hidden smd:block text-lg font-radios ">
              Profile Info
            </p>
          </span>
        </li>
        <li className="flex flex-row gap-x-4 items-center" onClick={Bookings}>
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faCartPlus} className="text-lg" />
            <p className="hidden smd:block text-lg font-radios ">Bookings</p>
          </span>
        </li>
        <li className="flex flex-row gap-x-4 items-center" onClick={Password}>
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faPen} className="text-lg" />
            <p className="hidden smd:block text-lg font-radios ">Password</p>
          </span>
        </li>
        <li className="flex flex-row gap-x-4 items-center" onClick={Favoritess}>
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faHeart} className="text-lg" />
            <p className="hidden smd:block text-lg font-radios ">Favorites</p>
          </span>
        </li>
        <li className="flex flex-row gap-x-4 items-center" onClick={Logout}>
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faDoorOpen} className="text-lg" />
            <p className="hidden smd:block text-lg font-radios ">Logout</p>
          </span>
        </li>
        <li className="flex flex-row gap-x-4 items-center" onClick={payment}>
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faDollarSign} className="text-lg" />
            <p className="hidden smd:block text-lg font-radios ">Payments</p>
          </span>
        </li>
        <li
          className="flex flex-row gap-x-4 items-center"
          onClick={Notifications}
        >
          <span className="flex flex-row gap-x-4 text-white items-center transition-all duration-500 ease-in-out cursor-pointer hover:text-[#3654ff] hover:bg-white p-3 rounded hover:shadow-lg hover:shadow-fade-black">
            <FontAwesomeIcon icon={faBell} className="text-lg" />
            <p className="hidden smd:block text-lg font-radios ">
              Notification
            </p>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
