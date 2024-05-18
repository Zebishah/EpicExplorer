import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import image2 from "../images/Epic_Explorer__1_-removebg-preview.png";
import {
  faCaretDown,
  faHeart,
  faTimes,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col z-10">
      <nav className="flex justify-between py-4 px-4 bg-light-black backdrop-blur-md shadow-sm shadow-black w-full fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center">
          <img
            className="h-12 w-32 object-cover" // Adjust these values as needed
            src={image2}
            alt="Store Logo"
          />
        </div>
        <div className="hidden md:flex items-center lg:space-x-8 sm:space-x-4">
          <Link className="flex lg:text-[14px] md:text-[12px] text-yellows hover:text-yellows cursor-pointer transition-colors duration-300 ">
            Home
          </Link>
          <div className="relative">
            <Link
              className="flex items-center cursor-pointer transition-colors duration-300 text-yellows hover:text-yellows lg:text-[14px] md:text-[12px]"
              onClick={() => setIsPackagesOpen(!isPackagesOpen)}
            >
              Packages
              <FontAwesomeIcon icon={faCaretDown} className="ml-1 mt-1" />
            </Link>
            {isPackagesOpen && (
              <div className="flex flex-col items-center absolute mt-2 w-28 bg-fade-black rounded-md shadow-lg shadow-black z-10 -ml-6">
                <Link
                  href="#"
                  className="block px-2 py-2 text-sm text-yellows hover:text-black hover:bg-yellows rounded-md lg:text-[14px] md:text-[12px] "
                >
                  Package 1{" "}
                </Link>
                <Link
                  href="#"
                  className="block px-2 py-2 text-sm text-yellows hover:text-black hover:bg-yellows rounded-md lg:text-[14px] md:text-[12px]"
                >
                  Package 2{" "}
                </Link>
                <Link
                  href="#"
                  className="block px-2 py-2 text-sm text-yellows hover:text-black hover:bg-yellows rounded-md lg:text-[14px] md:text-[12px]"
                >
                  Package 3{" "}
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <Link
              className="flex items-center text-yellows hover:text-yellows cursor-pointer transition-colors duration-300 lg:text-[14px] md:text-[12px]"
              onClick={() => setIsBookingsOpen(!isBookingsOpen)}
            >
              Bookings
              <FontAwesomeIcon icon={faCaretDown} className="ml-1 mt-1" />
            </Link>
            {isBookingsOpen && (
              <div className="flex flex-col items-center absolute mt-2 w-28 bg-fade-black rounded-md shadow-lg shadow-black z-10 -ml-6">
                <Link
                  href="#"
                  className="block px-2 py-2 text-sm text-yellows hover:text-black hover:bg-yellows rounded-md lg:text-[14px] md:text-[12px]"
                >
                  booking 1{" "}
                </Link>
                <Link
                  href="#"
                  className="block px-2 py-2 text-sm text-yellows hover:text-black hover:bg-yellows rounded-md lg:text-[14px] md:text-[12px]"
                >
                  booking 2{" "}
                </Link>
                <Link
                  href="#"
                  className="block px-2 py-2 text-sm text-yellows hover:text-black hover:bg-yellows rounded-md lg:text-[14px] md:text-[12px]"
                >
                  booking 3{" "}
                </Link>
              </div>
            )}
          </div>
          <Link className="flex text-yellows hover:text-yellows cursor-pointer transition-colors duration-300 lg:text-[14px] md:text-[12px]">
            Discounts{" "}
          </Link>
          <Link className="flex text-yellows hover:text-yellows cursor-pointer transition-colors duration-300 lg:text-[14px] md:text-[12px]">
            Blog{" "}
          </Link>
          <Link className="flex text-yellows hover:text-yellows cursor-pointer transition-colors duration-300 lg:text-[14px] md:text-[12px]">
            Contact Us{" "}
          </Link>
        </div>
        <div className="flex items-center smd:space-x-5 sssm:space-x-2">
          <Link
            to={"/signUp"}
            className="flex text-yellows hover:text-yellows cursor-pointer transition-colors duration-300 sssm:text-sm lg:text-[14px] md:text-[12px]"
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
          <div>
            {localStorage.getItem("token") ? (
              <Link className="flex cursor-pointer transition-colors duration-300 font-semibold text-yellows sssm:text-sm lg:text-[14px] md:text-[12px]">
                {" "}
                <FontAwesomeIcon icon={faUser} />
              </Link>
            ) : (
              <Link
                className="flex cursor-pointer transition-colors duration-300 font-semibold text-yellows sssm:text-sm md:text-[12px]"
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
          <Link className="hidden smd:flex text-yellows text-sm ssm:text-base md:text-lg">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>

          <Link className="hidden smd:flex text-yellows text-lg ssm:text-base md:text-lg">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
          <button
            className="lg:hidden text-yellows focus:outline-none ssm:text-base md:text-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center mt-16 space-y-2 bg-white shadow-md rounded-md p-4">
          <Link className="flex sm:text-sm md:text-[12px] text-yellows hover:text-yellows cursor-pointer transition-colors duration-300 ">
            Home
          </Link>
          <div className="relative">
            <Link
              className="flex items-center cursor-pointer transition-colors duration-300 text-yellows hover:text-yellows lg:text-[16px] md:text-[12px]"
              onClick={() => setIsPackagesOpen(!isPackagesOpen)}
            >
              Packages
              <FontAwesomeIcon icon={faCaretDown} className="ml-1 mt-1" />
            </Link>
            {isPackagesOpen && (
              <div className="flex flex-col items-center absolute mt-2 w-28 bg-white rounded-md shadow-lg shadow-black z-10 -ml-6">
                <Link
                  href="#"
                  className="block px-2 py-2 text-sm text-yellows hover:text-yellows hover:bg-yellows rounded-md sm:text-sm lg:text-[16px] md:text-[12px] "
                >
                  Package 1{" "}
                </Link>
                <Link
                  href="#"
                  className="block px-2 py-2 text-sm text-yellows hover:text-yellows hover:bg-yellows rounded-md sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  Package 2{" "}
                </Link>
                <Link
                  href="#"
                  className="block px-2 py-2 text-sm text-yellows hover:text-yellows hover:bg-yellows rounded-md sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  Package 3{" "}
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <Link
              className="flex items-center text-yellows hover:text-yellows cursor-pointer transition-colors duration-300 lg:text-[16px] md:text-[12px]"
              onClick={() => setIsBookingsOpen(!isBookingsOpen)}
            >
              Bookings
              <FontAwesomeIcon icon={faCaretDown} className="ml-1 mt-1" />
            </Link>
            {isBookingsOpen && (
              <div className="flex flex-col items-center absolute mt-2 w-28 bg-white rounded-md shadow-lg shadow-black z-10 -ml-6">
                <Link
                  href="#"
                  className="block px-2 py-2 text-sm text-yellows hover:text-yellows hover:bg-yellows rounded-md sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  booking 1{" "}
                </Link>
                <Link
                  href="#"
                  className="block px-2 py-2 text-sm text-yellows hover:text-yellows hover:bg-yellows rounded-md sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  booking 2{" "}
                </Link>
                <Link
                  href="#"
                  className="block px-2 py-2 text-sm text-yellows hover:text-yellows hover:bg-yellows rounded-md sm:text-sm lg:text-[16px] md:text-[12px]"
                >
                  booking 3{" "}
                </Link>
              </div>
            )}
          </div>
          <Link className="flex text-yellows hover:text-yellows cursor-pointer transition-colors duration-300 sm:text-sm lg:text-[16px] md:text-[12px]">
            Discounts{" "}
          </Link>
          <Link className="flex text-yellows hover:text-yellows cursor-pointer transition-colors duration-300 sm:text-sm lg:text-[16px] md:text-[12px]">
            Blog{" "}
          </Link>
          <Link className="flex text-yellows hover:text-yellows cursor-pointer transition-colors duration-300 sm:text-sm lg:text-[16px] md:text-[12px]">
            Contact Us{" "}
          </Link>
          <Link className="flex text-yellows hover:text-yellows cursor-pointer transition-colors duration-300">
            Favorites
          </Link>
          <Link className="flex text-yellows hover:text-yellows cursor-pointer transition-colors duration-300">
            Discounts
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
