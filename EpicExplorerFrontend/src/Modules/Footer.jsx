import {
  faEnvelope,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../images/Epic_Explorer__1_-removebg-preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-center items-center w-full bg-fade-black p-4 md:p-8">
      <div className="flex flex-col flex-grow lg:flex-row gap-8 justify-start items-start lg:justify-center lg:items-center w-full border-purple-400 p-4 md:p-8">
        <div className="flex flex-col gap-y-14 ssm:flex-row ssm:gap-x-32 lg:gap-x-7 xl:gap-x-16 w-[100%] lg:w-[30%] justify-center items-center">
          <div className="flex flex-col gap-4 lg:-ml-20 lg:justify-start h-auto lg:items-start w-min p-3 border-purple-400 justify-center items-center">
            <img
              src={logo}
              alt="logo"
              className="h-24 w-24 md:h-36 md:w-40 object-cover"
            />
            <p className="text-white font-radios text-xs xl:text-[11px] -mt-2 md:-mt-10">
              Epic Explorer is an innovative tour and travel website designed to
              offer seamless travel experiences.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-2 md:gap-4">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-yellows text-lg"
                />
                <p className="text-xs xl:text-[11px] text-white font-radios">
                  zebihaider123@gmail.com
                </p>
              </div>
              <div className="flex flex-row gap-2 md:gap-4">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-yellows text-lg"
                />
                <p className="text-xs xl:text-[11px] text-white font-radios">
                  +92-3105904269
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-2 w-full p-2 rounded-full justify-start items-start -ml-7">
              <FontAwesomeIcon
                className="w-6 h-6 text-xs xl:text-[11px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer"
                icon={faFacebook}
              />
              <FontAwesomeIcon
                className="w-6 h-6 text-xs xl:text-[11px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer"
                icon={faInstagram}
              />
              <FontAwesomeIcon
                className="w-6 h-6 text-xs xl:text-[11px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer"
                icon={faGithub}
              />
              <FontAwesomeIcon
                className="w-6 h-6 text-xs xl:text-[11px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer"
                icon={faGlobe}
              />
              <FontAwesomeIcon
                className="w-6 h-6 text-xs xl:text-[11px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer"
                icon={faYoutube}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 w-[30%] justify-start items-start p-3">
            <h1 className="text-yellows font-radios text-lg">Links</h1>
            <ul className="flex flex-col gap-2 md:gap-3 justify-start items-start">
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Home Page
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                About us
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Tour Blogs
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Contact-Us
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Tour Reviews
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                FAQS
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-y-14 ssm:flex-row ssm:gap-x-32 lg:gap-x-7 xl:gap-x-16 w-[100%] lg:w-[30%] justify-center items-center">
          <div className="flex flex-col gap-3 w-[40%] lg:justify-start lg:items-start justify-center items-center p-3">
            <h1 className="text-yellows font-radios text-lg">Bookings</h1>
            <ul className="flex flex-col gap-2 md:gap-3 justify-start items-start">
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Tour Booking
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Hotel Booking
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Rooms Booking
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Transport Booking
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                View Bookings
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                View Payments
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 w-[40%] mt-0 lg:mt-8 xl:mt-0 justify-start items-start p-3">
            <h1 className="text-yellows font-radios text-lg">Packages</h1>
            <ul className="flex flex-col gap-2 md:gap-3 justify-start items-start">
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Tour Packages
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Hotel Packages
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Personal Packages
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Transport Packages
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Honeymoon Packages
              </li>
              <li className="text-white font-radios text-xs xl:text-[11px]">
                Family Packages
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 justify-center items-center lg:justify-start lg:items-start w-[100%] lg:w-[30%] p-3 mt-8 lg:-ml-14">
          <h1 className="text-yellows font-radios text-lg">Other Links</h1>
          <div className="flex flex-col gap-3 lg:justify-start lg:items-start justify-center items-center">
            <p className="text-xs xl:text-[11px] font-radios text-white">
              Epic Explorer is an innovative tour and travel website designed to
              offer seamless travel experiences.
            </p>
            <h1 className="text-yellows font-radios text-lg">
              Subscribe to news letter
            </h1>
            <div className="flex flex-row gap-2">
              <input
                type="text"
                className="p-2 rounded-lg md:p-3 placeholder:text-black w-full md:w-min"
                placeholder="Type here....."
              />
              <button className="text-black rounded-lg bg-yellows p-2 md:p-3">
                Submit
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-2 w-full p-2 rounded-full justify-center items-center lg:justify-start lg:items-start">
            <FontAwesomeIcon
              className="w-6 h-6 text-xs xl:text-[11px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer"
              icon={faFacebook}
            />
            <FontAwesomeIcon
              className="w-6 h-6 text-xs xl:text-[11px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer"
              icon={faInstagram}
            />
            <FontAwesomeIcon
              className="w-6 h-6 text-xs xl:text-[11px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer"
              icon={faGithub}
            />
            <FontAwesomeIcon
              className="w-6 h-6 text-xs xl:text-[11px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer"
              icon={faGlobe}
            />
            <FontAwesomeIcon
              className="w-6 h-6 text-xs xl:text-[11px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer"
              icon={faYoutube}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
