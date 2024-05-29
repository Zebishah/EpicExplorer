import {
  faBell,
  faCartPlus,
  faDashboard,
  faHeart,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import image from "../images/man-user-circle-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
// import Favorites from "./Favorites";
import { useNavigate } from "react-router";
import {
  resetUserSearchState,
  userSearchFrToken,
} from "../Redux/Slices/SearchingUserSlice";

const SideBar = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { errorSearch, dataSearch } = useSelector((state) => state.userSearch);
  useEffect(() => {
    dispatch(userSearchFrToken());
  }, [dispatch]);

  useEffect(() => {
    if (errorSearch) {
      toast.error("Token not found");
    }
    if (dataSearch) {
      setUserName(dataSearch.userInfo.userName);
      setEmail(dataSearch.userInfo.email);
      // Use a timeout to reset the state after 5 seconds
      const timer = setTimeout(() => {
        dispatch(resetUserSearchState());
      }, 5000);
      // Clear the timer on component unmount or if data/error changes
      return () => clearTimeout(timer);
    }
  }, [dataSearch, errorSearch, dispatch]);

  const navigate = useNavigate();
  let Bookings = () => {
    navigate("/Bookings");
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
  return (
    <div className="flex flex-col items-center gap-y-14 bg-fade-black w-[18%] p-6 h-[100vh] opacity-85">
      <ToastContainer />
      <h1 className="text-yellows lg:text-2xl smd:text-lg text-xs font-joining ">
        User Dashboard
      </h1>
      <div className="flex flex-col gap-y-4 justify-center items-center">
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <img
            src={image}
            alt="profile"
            className="h-8 w-8 md:h-14 md:w-14 rounded-full object-cover"
          />
          <div className=" hidden smd:flex flex-col gap-y-2 justify-center items-center">
            <p className="text-yellows mt-1 font-radios text-xs lg:text-lg">
              {userName}
            </p>
            <p className="text-yellows font-radios text-xs lg:text-sm">
              {email}
            </p>
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-y-10 justify-center items-center">
        <Link to={"/dashboard"}>
          {" "}
          <li className="flex flex-row gap-x-4 items-center">
            <FontAwesomeIcon
              icon={faDashboard}
              className="text-yellows text-lg"
            />
            <span className="hidden smd:block  text-yellows text-lg font-radios">
              Dashboard
            </span>
          </li>
        </Link>
        <Link to={"/userProfile"}>
          <li className="flex flex-row gap-x-4 items-center">
            <FontAwesomeIcon icon={faUser} className="text-yellows text-lg" />
            <span className="hidden smd:block text-yellows text-lg font-radios">
              Profile Info
            </span>
          </li>
        </Link>
        <li className="flex flex-row gap-x-4 items-center" onClick={Bookings}>
          <FontAwesomeIcon icon={faCartPlus} className="text-yellows text-lg" />
          <span className="hidden smd:block text-yellows text-lg font-radios">
            Bookings
          </span>
        </li>
        <li className="flex flex-row gap-x-4 items-center" onClick={Password}>
          <FontAwesomeIcon icon={faPen} className="text-yellows text-lg" />
          <span className="hidden smd:block text-yellows text-lg font-radios">
            Password
          </span>
        </li>
        <li className="flex flex-row gap-x-4 items-center" onClick={Favoritess}>
          <FontAwesomeIcon icon={faHeart} className="text-yellows text-lg" />
          <span className="hidden smd:block text-yellows text-lg font-radios">
            Favorites
          </span>
        </li>
        <li
          className="flex flex-row gap-x-4 items-center"
          onClick={Notifications}
        >
          <FontAwesomeIcon icon={faBell} className="text-yellows text-lg" />
          <span className="hidden smd:block text-yellows text-lg font-radios">
            Notification
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
