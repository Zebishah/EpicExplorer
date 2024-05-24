
const FooterExample = () => {
  return (
        <footer className="bg-light-black shadow-lg w-full">
      <div className=" flex flex-wrap w-[80%] px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-row gap-x-10 justify-center items-center">
          <div className=" border-2 border-purple-500 w-min h-min">
            <img src={logo} className="h-44 w-40 -mt-14" alt="logo" />
            <div className="-mt-10">
              <p className="max-w-xs text-sm text-white font-radios">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas, accusantium.
              </p>
              <div className=" mt-4 flex flex-col gap-y-4">
                <div className="flex flex-row gap-x-4 ">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-yellows text-lg"
                  ></FontAwesomeIcon>
                  <p className=" text-sm text-white font-radios">
                    zebihaider123@gmail.com
                  </p>
                </div>
                <div className="flex flex-row gap-x-4 ">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-yellows text-lg"
                  ></FontAwesomeIcon>
                  <p className=" text-sm text-white font-radios">
                    +92-3105904269{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex mt-8 space-x-4 border-2 border-orange-500 w-min h-min">
              <FontAwesomeIcon
                className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer  "
                icon={faFacebook}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                icon={faInstagram}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                icon={faGithub}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                icon={faGlobe}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                icon={faYoutube}
              ></FontAwesomeIcon>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-2 border-purple-500">
              <p className="font-medium text-yellows font-radios">
                Important Links
              </p>
              <nav className="flex flex-col mt-4 space-y-4 text-sm ">
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Home Page{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  About{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Blogs{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Contact-Us{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Reviews{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  FAQS{" "}
                </a>
              </nav>
            </div>
            <div className="border-2 border-purple-500">
              <p className="font-medium text-yellows font-radios">Services</p>
              <nav className="flex flex-col mt-4 space-y-4 text-sm text-gray-500">
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Tour Booking{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Hotel Booking{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Room Booking{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Transport Booking{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  View Bookings{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  View Payment{" "}
                </a>
              </nav>
            </div>
            <div className="border-2 border-purple-500">
              <p className="font-medium text-yellows font-radios">
                Helpful Links
              </p>
              <nav className="flex flex-col mt-4 space-y-4 text-sm text-gray-500">
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Tour Packages{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Hotel packages{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Transport Packages{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Family Packages{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  Personal Packages{" "}
                </a>
                <a className="hover:opacity-75 text-white font-radios" href>
                  {" "}
                  HoneyMoon Packages{" "}
                </a>
              </nav>
            </div>
            <div className="smd:w-[19vw] border-2 border-purple-500">
              <p className="font-medium text-yellows font-radios">
                Follow us on
              </p>
              <nav className="flex flex-col mt-4 space-y-10 text-sm w-full">
                <p className="text-white font-radios text-sm">
                  Epic Explorer is an innovative tour and travel website
                  designed to offer seamless travel experiences.
                </p>
                <div className="flex flex-row">
                  <input
                    type="text"
                    className="p-3 placeholder:text-white w-40"
                    placeholder="Type here....."
                  />
                  <button className="text-black bg-yellows p-3">Submit</button>
                </div>
                <div className="flex flex-row gap-x-4">
                  <FontAwesomeIcon
                    className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer  "
                    icon={faFacebook}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                    icon={faInstagram}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                    icon={faGithub}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                    icon={faGlobe}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="w-6 h-6 smd:text-sm text-[10px] p-2 rounded-full text-yellows hover:bg-yellows hover:text-black transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-yellows cursor-pointer "
                    icon={faYoutube}
                  ></FontAwesomeIcon>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterExample