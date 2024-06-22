import {
  faCartShopping,
  faDoorOpen,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import image2 from "../images/Epic_Explorer__1_-removebg-preview.png";
import image from "../images/man-user-circle-icon.png";
import {
  faCaretDown,
  faHeart,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  resetUserSearchState,
  userSearchFrToken,
} from "../Redux/Slices/SearchingUserSlice";

// const queryParams = new URLSearchParams(location.search);
// const userName = queryParams.get("userName") || "";
// import AboveNavbar from "./AboveNavbar";
const Navbar = () => {
  const navigate = useNavigate();
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [imageReal, setImage] = useState("");
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const { userFrTokenData } = useSelector((state) => state.userSearch);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    dispatch(userSearchFrToken());
  }, [dispatch]);
  let Logout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/SignIn");
  };
  useEffect(() => {
    if (userFrTokenData) {
      setUserName(userFrTokenData.userInfo.userName);
      setImage(userFrTokenData.userInfo.pic);
      // Use a timeout to reset the state after 5 seconds
      const timer = setTimeout(() => {
        dispatch(resetUserSearchState());
      }, 5000);
      // Clear the timer on component unmount or if data/error changes
      return () => clearTimeout(timer);
    }
  }, [userFrTokenData, dispatch]);

  return (
    <div className="flex flex-col gap-y-1 z-20 w-screen">
      <ToastContainer />
      <nav className="hidden smd:flex flex-col smd:flex-row gap-y-4 justify-center lg:gap-x-44 smd:gap-x-10  py-4 px-4 bg-light-black opacity-100 backdrop-blur-md shadow-sm shadow-black w-full fixed top-0 left-0 right-0 z-10">
        <Link to={"/"}>
          <div className="flex justify-center items-center">
            <img
              className="h-10 w-28 smd:h-12 smd:w-32 object-cover" // Adjust these values as needed
              src={image2}
              alt="Store Logo"
            />
          </div>
        </Link>
        <div className="flex flex-row justify-center items-center gap-x-6">
          <div className="flex flex-row justify-center items-center gap-x-2">
            <FontAwesomeIcon
              className=" text-yellows smd:text-sm text-[10px] rounded-full hover:bg-fade-black hover:text-yellows transition-all 0.5s ease-in-out "
              icon={faEnvelope}
            ></FontAwesomeIcon>
            <p className="text-yellows font-radios smd:text-sm text-[10px]">
              zebihaider123@gmail.com
            </p>
          </div>

          <div className="flex flex-row justify-center items-center gap-x-2">
            <FontAwesomeIcon
              className="text-yellows smd:text-sm text-[10px] p-2 rounded-full hover:bg-fade-black hover:text-yellows transition-all 0.5s ease-in-out "
              icon={faPhone}
            ></FontAwesomeIcon>
            <p className="text-yellows font-radios smd:text-sm text-[10px]">
              0310-5904269
            </p>
          </div>
        </div>

        <div className=" flex flex-row justify-center items-center lg:space-x-6 sm:space-x-4">
          <FontAwesomeIcon
            className=" text-yellows cursor-pointer p-2 smd:text-2xl text-sm rounded-full transition-all ease-in-out hover:bg-yellows hover:text-black  "
            icon={faInstagram}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className=" text-yellows cursor-pointer p-2 smd:text-2xl text-sm rounded-full transition-all ease-in-out hover:bg-yellows hover:text-black  "
            icon={faWhatsapp}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className=" text-yellows cursor-pointer p-2 smd:text-2xl text-sm rounded-full transition-all ease-in-out hover:bg-yellows hover:text-black  "
            icon={faLinkedin}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className=" text-yellows cursor-pointer p-2 smd:text-2xl text-sm rounded-full transition-all ease-in-out hover:bg-yellows hover:text-black  "
            icon={faGlobe}
          ></FontAwesomeIcon>
        </div>
      </nav>
      <nav className="flex justify-between py-4 px-4 bg-light-black opacity-100 backdrop-blur-md shadow-sm shadow-black fixed w-full smd:mt-[4.69rem] left-0 right-0 z-10">
        <div className="flex items-center">
          <img
            className="h-12 w-28 smd:h-12 smd:w-32 object-cover" // Adjust these values as needed
            src={image2}
            alt="Store Logo"
          />
        </div>
        <div className="hidden md:flex items-center lg:space-x-12 sm:space-x-4">
          <Link
            to={"/"}
            className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex lg:text-[14px] md:text-[12px] text-yellows cursor-pointer duration-300 hover:bg-yellows hover:text-black transition-all ease-in-out  "
          >
            Home
          </Link>
          <div className="relative ">
            <Link
              className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex items-center cursor-pointer duration-300 text-yellows lg:text-[14px] md:text-[12px] hover:bg-yellows hover:text-black transition-all ease-in-out"
              onClick={() => setIsPackagesOpen(!isPackagesOpen)}
            >
              Packages
              <FontAwesomeIcon icon={faCaretDown} className="ml-1 mt-1" />
            </Link>
            {isPackagesOpen && (
              <div className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex flex-col items-center absolute mt-2 w-40 bg-fade-black shadow-lg shadow-black z-10 -ml-14 ">
                <Link
                  to={"/FamilyTour"}
                  href="#"
                  className="font-radios block px-2 py-2 text-sm text-yellows hover:text-black hover:bg-yellows rounded-md lg:text-[14px] md:text-[12px] "
                >
                  Family Packages{" "}
                </Link>
                <Link
                  to={"/FamilyTour"}
                  href="#"
                  className="font-radios block px-2 py-2 text-sm text-yellows hover:text-black hover:bg-yellows rounded-md lg:text-[14px] md:text-[12px]"
                >
                  Honeymoon Packages{" "}
                </Link>
                <Link
                  to={"/FamilyTour"}
                  href="#"
                  className="font-radios block px-2 py-2 text-sm text-yellows hover:text-black hover:bg-yellows rounded-md lg:text-[14px] md:text-[12px]"
                >
                  Personal Packages{" "}
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <Link
              className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex items-center text-yellows cursor-pointer duration-300 lg:text-[14px] md:text-[12px] hover:bg-yellows hover:text-black transition-all ease-in-out"
              onClick={() => setIsBookingsOpen(!isBookingsOpen)}
            >
              Bookings
              <FontAwesomeIcon icon={faCaretDown} className="ml-1 mt-1" />
            </Link>
            {isBookingsOpen && (
              <div className="flex flex-col items-center absolute mt-2 w-40 bg-fade-black rounded-md shadow-lg shadow-black z-10 -ml-6">
                <Link
                  to={"/AllTours"}
                  href="#"
                  className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-yellows block px-2 py-2 text-sm text-yellows hover:text-black hover:bg-yellows lg:text-[14px] md:text-[12px]"
                >
                  Tour Booking{" "}
                </Link>
                <Link
                  to={"/AllHotels"}
                  href="#"
                  className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-yellows block px-2 py-2 text-sm text-yellows hover:text-black hover:bg-yellows lg:text-[14px] md:text-[12px]"
                >
                  Hotel booking{" "}
                </Link>
                <Link
                  to={"/AllTransport"}
                  href="#"
                  className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-yellows block px-2 py-2 text-sm text-yellows hover:text-black hover:bg-yellows lg:text-[14px] md:text-[12px]"
                >
                  Transport booking{" "}
                </Link>
              </div>
            )}
          </div>
          <Link
            to={"/DiscountedTour"}
            className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex text-yellows cursor-pointer duration-300 hover:bg-yellows hover:text-black transition-all ease-in-out lg:text-[14px] md:text-[12px]"
          >
            Discounts{" "}
          </Link>
          <Link
            to={"/Blogs"}
            className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex text-yellows cursor-pointer duration-300 hover:bg-yellows hover:text-black transition-all ease-in-out lg:text-[14px] md:text-[12px]"
          >
            Blog{" "}
          </Link>
          <Link
            to={"/ContactUs"}
            className=" font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex text-yellows cursor-pointer duration-300 hover:bg-yellows hover:text-black transition-all ease-in-out lg:text-[14px] md:text-[12px]"
          >
            Contact Us{" "}
          </Link>
        </div>
        <div className=" flex items-center smd:space-x-5 sssm:space-x-2">
          {localStorage.getItem("jwtToken") ? (
            <Link
              to={"/Dashboard"}
              className="font-radios p-2 rounded-xl flex cursor-pointer hover:shadow-lg hover:bg-fade-black hover:shadow-yellows duration-300 font-semibold text-yellows sssm:text-sm lg:text-[14px] md:text-[12px] transition-all ease-in-out"
            >
              {" "}
              <div className="flex flex-row gap-x-1 justify-center items-center ">
                <div className="rounded-full overflow-hidden mr-4 ">
                  <img
                    src={imageReal !== " " ? imageReal : image}
                    alt="image"
                    className="w-10 h-10"
                  />
                </div>
                <p className="text-yellows text-lg font-radios">{userName}</p>
              </div>
            </Link>
          ) : (
            <Link
              to={"/signUp"}
              className="font-radios p-2 rounded-xl hover:shadow-lg flex hover:shadow-yellows text-yellows cursor-pointer duration-300 hover:bg-yellows hover:text-black transition-all ease-in-out sssm:text-sm lg:text-[14px] md:text-[12px]"
            >
              <svg
                className="fill-current h-5 w-5 mr-2 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path d="M12 0L11.34 .03L15.15 3.84L16.5 2.5C19.75 4.07 22.09 7.24 22.45 11H23.95C23.44 4.84 18.29 0 12 0M12 4C10.07 4 8.5 5.57 8.5 7.5C8.5 9.43 10.07 11 12 11C13.93 11 15.5 9.43 15.5 7.5C15.5 5.57 13.93 4 12 4M12 6C12.83 6 13.5 6.67 13.5 7.5C13.5 8.33 12.83 9 12 9C11.17 9 10.5 8.33 10.5 7.5C10.5 6.67 11.17 6 12 6M.05 13C.56 19.16 5.71 24 12 24L12.66 23.97L8.85 20.16L7.5 21.5C4.25 19.94 1.91 16.76 1.55 13H.05M12 13C8.13 13 5 14.57 5 16.5V18H19V16.5C19 14.57 15.87 13 12 13M12 15C14.11 15 15.61 15.53 16.39 16H7.61C8.39 15.53 9.89 15 12 15Z" />
              </svg>
              Register
            </Link>
          )}
          <div>
            {localStorage.getItem("jwtToken") ? (
              <Link
                to={"/Dashboard"}
                className="font-radios p-3 rounded-xl flex cursor-pointer hover:shadow-lg hover:bg-fade-black hover:shadow-yellows duration-300 font-semibold text-yellows sssm:text-sm lg:text-[14px] md:text-[12px] transition-all ease-in-out"
              >
                {" "}
                <li
                  className="flex flex-row gap-x-4 items-center"
                  onClick={Logout}
                >
                  <span className="flex flex-row gap-x-4 text-yellows items-center transition-all duration-300 ease-in-out cursor-pointer ">
                    <FontAwesomeIcon icon={faSignOut} className="text-lg" />
                    <p className="hidden smd:block text-lg font-radios ">
                      Logout
                    </p>
                  </span>
                </li>
              </Link>
            ) : (
              <Link
                className="font-radios p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex cursor-pointer duration-300 font-semibold text-yellows sssm:text-sm md:text-[12px] hover:bg-yellows hover:text-black transition-all ease-in-out"
                to={"/SignIn"}
              >
                <svg
                  className="fill-current h-5 w-5 mr-2 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
                </svg>
                Login
              </Link>
            )}
          </div>

          <button
            className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows lg:hidden text-yellows focus:outline-none ssm:text-base md:text-lg hover:bg-yellows hover:text-black transition-all ease-in-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center mt-20 smd:mt-40 space-y-2 bg-light-black shadow-md rounded-md fixed w-full ">
          <Link className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex sm:text-sm md:text-[12px] text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out cursor-pointer duration-300 ">
            Home
          </Link>
          <div className="relative">
            <Link
              className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex items-center cursor-pointer duration-300 text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out lg:text-[16px] md:text-[12px]"
              onClick={() => setIsPackagesOpen(!isPackagesOpen)}
            >
              Packages
              <FontAwesomeIcon icon={faCaretDown} className="ml-1 mt-1" />
            </Link>
            {isPackagesOpen && (
              <div className="flex flex-col items-center absolute mt-2 w-28 bg-fade-black rounded-md shadow-lg shadow-black z-10 -ml-6">
                <Link
                  href="#"
                  className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows block px-2 py-2 text-sm text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out sm:text-sm lg:text-[16px] md:text-[12px] "
                >
                  Package 1{" "}
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows block px-2 py-2 text-sm text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  Package 2{" "}
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows block px-2 py-2 text-sm text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  Package 3{" "}
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <Link
              className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex items-center text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out cursor-pointer duration-300 lg:text-[16px] md:text-[12px]"
              onClick={() => setIsBookingsOpen(!isBookingsOpen)}
            >
              Bookings
              <FontAwesomeIcon icon={faCaretDown} className="ml-1 mt-1" />
            </Link>
            {isBookingsOpen && (
              <div className="flex flex-col items-center absolute mt-2 w-28 bg-light-black rounded-md shadow-lg shadow-black z-10 -ml-6">
                <Link
                  href="#"
                  className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows block px-2 py-2 text-sm text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  booking 1{" "}
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows block px-2 py-2 text-sm text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  booking 2{" "}
                </Link>
                <Link
                  href="#"
                  className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows block px-2 py-2 text-sm text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  booking 3{" "}
                </Link>
              </div>
            )}
          </div>
          <Link className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out cursor-pointer duration-300 sm:text-sm lg:text-[16px] md:text-[12px]">
            Discounts{" "}
          </Link>
          <Link className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out cursor-pointer duration-300 sm:text-sm lg:text-[16px] md:text-[12px]">
            Blog{" "}
          </Link>
          <Link className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out cursor-pointer duration-300 sm:text-sm lg:text-[16px] md:text-[12px]">
            Contact Us{" "}
          </Link>
          <Link className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out cursor-pointer duration-300">
            Favorites
          </Link>
          <Link className="p-2 rounded-xl hover:shadow-lg hover:shadow-yellows flex text-yellows hover:bg-yellows hover:text-black transition-all ease-in-out cursor-pointer duration-300">
            Discounts
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
