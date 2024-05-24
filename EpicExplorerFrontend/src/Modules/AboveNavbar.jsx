import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image2 from "../images/Epic_Explorer__1_-removebg-preview.png";
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
import { Link } from "react-router-dom";
const AboveNavbar = () => {
  return (
    <div className="flex flex-col z-20">
      <nav className="flex flex-col smd:flex-row gap-y-4 justify-center lg:gap-x-44 smd:gap-x-10  py-4 px-4 bg-light-black backdrop-blur-md shadow-sm shadow-black w-full fixed top-0 left-0 right-0 z-10">
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
    </div>
  );
};

export default AboveNavbar;
