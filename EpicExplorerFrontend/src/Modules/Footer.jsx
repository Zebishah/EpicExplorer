// import {
//   faEnvelope,
//   faGlobe,
//   faPhone,
// } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/Epic_Explorer__1_-removebg-preview.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebook,
//   faGithub,
//   faInstagram,
//   faYoutube,
// } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer className="w-full py-14 bg-[#206eff]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-14 flex justify-between items-center flex-col gap-8 lg:gap-0 lg:flex-row">
          <div className="block">
            <h3 className="font-manrope text-3xl text-white font-bold mb-2 text-center lg:text-left">
              Sign up to our webpage
            </h3>
            <p className="text-white text-center lg:text-left">
              Stay up to date with the latest update and announcement.
            </p>
          </div>
          <div className="flex items-center flex-col gap-4 lg:flex-row">
            <input
              type="text"
              name="email"
              className="py-3 px-6 h-14 border border-gray-300 shadow-sm rounded-full focus:outline-none"
              placeholder="Enter your mail.."
            />
            <button className="h-14 py-3.5 px-7 bg-white shadow-sm rounded-full transition-all duration-500 ease-in-out text-blue-600 font-bold hover:bg-white hover:text-[#3654ff] hover:shadow-lg hover:shadow-white">
              Subscribe
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 min-[690px]:grid-cols-4 lg:grid-cols-6 gap-4 xl:gap-8 pt-14 pb-10 max-w-xs mx-auto min-[690px]:max-w-2xl lg:max-w-full">
          <div className="flex flex-col lg:justify-start lg:items-start justify-center items-center col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <img src={logo} className="h-44 -mt-14 block w-fit" alt="logo" />
            <p className="py-8 text-white lg:max-w-xs text-center lg:text-left -mt-10">
              Trusted in more than 100 countries &amp; 5 million customers. Have
              any query ?
            </p>
            <a
              href="javascript:;"
              className="py-2.5 px-5 h-9 block w-fit bg-white rounded-full text-xs text-blue-600 mx-auto transition-all duration-500 hover:bg-white hover:text-[#3654ff] hover:shadow-lg hover:shadow-white lg:mx-0"
            >
              Contact us
            </a>
          </div>
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-white font-medium mb-7 ml-2">
              Pagedone
            </h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className="text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Home
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  About
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Pricing
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Features
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Pro Version
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-white font-medium mb-7 ml-2">
              Products
            </h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className="text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Figma UI System
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Icons Assets
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Responsive Blocks
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Components Library
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Plugin Guide
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-white font-medium mb-7 ml-2">
              Resources
            </h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className="text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  FAQs
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Quick Start
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Documentation
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  User Guide
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Plugin Guide
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-white font-medium mb-7 ml-2">
              Support
            </h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className="text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Customer Support
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Cookies
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  License
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li className="mb-6">
                <a
                  href="javascript:;"
                  className=" text-white p-2 hover:bg-[#206eff] hover:text-white rounded-lg hover:shadow-lg hover:shadow-white whitespace-nowrap"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-7 border-t border-gray-200">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-white ">
              ©<a href="https://pagedone.io/">pagedone</a>2024, All rights
              reserved.
            </span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
              <a
                href="javascript:;"
                className="w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#33CCFF] hover:bg-gray-900"
              >
                <svg
                  width={21}
                  height={21}
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Social Media">
                    <path
                      id="Vector"
                      d="M11.8214 9.81691L16.9919 3.93591H15.7667L11.2772 9.0423L7.6914 3.93591H3.55566L8.97803 11.6577L3.55566 17.8248H4.78097L9.522 12.4323L13.3088 17.8248H17.4446L11.8211 9.81691H11.8214ZM10.1432 11.7257L9.59382 10.9568L5.22246 4.83846H7.10445L10.6322 9.77615L11.1816 10.5451L15.7672 16.9633H13.8852L10.1432 11.726V11.7257Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </a>
              <a
                href="javascript:;"
                className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[linear-gradient(45deg,#FEE411_6.9%,#FEDB16_10.98%,#FEC125_17.77%,#FE983D_26.42%,#FE5F5E_36.5%,#FE2181_46.24%,#9000DC_85.57%)]  hover:bg-gradient-to-b from-gray-900 to-gray-900  
                  "
              >
                <svg
                  className="w-[1.25rem] h-[1.125rem] text-white"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.63434 7.99747C5.63434 6.69062 6.6941 5.63093 8.00173 5.63093C9.30936 5.63093 10.3697 6.69062 10.3697 7.99747C10.3697 9.30431 9.30936 10.364 8.00173 10.364C6.6941 10.364 5.63434 9.30431 5.63434 7.99747ZM4.35427 7.99747C4.35427 10.0108 5.98723 11.6427 8.00173 11.6427C10.0162 11.6427 11.6492 10.0108 11.6492 7.99747C11.6492 5.98418 10.0162 4.3522 8.00173 4.3522C5.98723 4.3522 4.35427 5.98418 4.35427 7.99747ZM10.9412 4.20766C10.9411 4.37615 10.991 4.54087 11.0846 4.681C11.1783 4.82113 11.3113 4.93037 11.4671 4.99491C11.6228 5.05945 11.7942 5.07639 11.9595 5.04359C12.1249 5.01078 12.2768 4.92971 12.3961 4.81062C12.5153 4.69153 12.5966 4.53977 12.6295 4.37453C12.6625 4.2093 12.6457 4.03801 12.5812 3.88232C12.5168 3.72663 12.4076 3.59354 12.2674 3.49988C12.1273 3.40622 11.9625 3.35619 11.7939 3.35612H11.7936C11.5676 3.35623 11.3509 3.44597 11.1911 3.60563C11.0313 3.76529 10.9414 3.98182 10.9412 4.20766ZM5.132 13.7759C4.43946 13.7444 4.06304 13.6291 3.81289 13.5317C3.48125 13.4027 3.24463 13.249 2.99584 13.0007C2.74705 12.7524 2.59305 12.5161 2.46451 12.1847C2.367 11.9348 2.25164 11.5585 2.22016 10.8664C2.18572 10.1181 2.17885 9.89331 2.17885 7.99752C2.17885 6.10174 2.18629 5.87758 2.22016 5.12866C2.2517 4.43654 2.36791 4.06097 2.46451 3.81035C2.59362 3.47891 2.7474 3.24242 2.99584 2.99379C3.24428 2.74515 3.48068 2.59124 3.81289 2.46278C4.06292 2.36532 4.43946 2.25004 5.132 2.21857C5.88074 2.18416 6.10566 2.17729 8.00173 2.17729C9.89779 2.17729 10.1229 2.18472 10.8723 2.21857C11.5648 2.25009 11.9406 2.36623 12.1914 2.46278C12.5231 2.59124 12.7597 2.74549 13.0085 2.99379C13.2573 3.24208 13.4107 3.47891 13.5398 3.81035C13.6373 4.06023 13.7527 4.43654 13.7841 5.12866C13.8186 5.87758 13.8255 6.10174 13.8255 7.99752C13.8255 9.89331 13.8186 10.1175 13.7841 10.8664C13.7526 11.5585 13.6367 11.9347 13.5398 12.1847C13.4107 12.5161 13.2569 12.7526 13.0085 13.0007C12.76 13.2488 12.5231 13.4027 12.1914 13.5317C11.9414 13.6292 11.5648 13.7444 10.8723 13.7759C10.1236 13.8103 9.89865 13.8172 8.00173 13.8172C6.10481 13.8172 5.88051 13.8103 5.132 13.7759ZM5.07318 0.941429C4.31699 0.975845 3.80027 1.09568 3.34902 1.27116C2.88168 1.45239 2.48605 1.69552 2.09071 2.09C1.69537 2.48447 1.45272 2.88049 1.27139 3.34755C1.0958 3.79882 0.975892 4.31494 0.941455 5.07068C0.90645 5.82761 0.898438 6.0696 0.898438 7.99747C0.898438 9.92534 0.90645 10.1673 0.941455 10.9243C0.975892 11.68 1.0958 12.1961 1.27139 12.6474C1.45272 13.1142 1.69543 13.5106 2.09071 13.9049C2.48599 14.2992 2.88168 14.542 3.34902 14.7238C3.80113 14.8993 4.31699 15.0191 5.07318 15.0535C5.83096 15.0879 6.0727 15.0965 8.00173 15.0965C9.93075 15.0965 10.1729 15.0885 10.9303 15.0535C11.6865 15.0191 12.2029 14.8993 12.6544 14.7238C13.1215 14.542 13.5174 14.2994 13.9127 13.9049C14.3081 13.5105 14.5502 13.1142 14.7321 12.6474C14.9077 12.1961 15.0281 11.68 15.062 10.9243C15.0964 10.1668 15.1044 9.92534 15.1044 7.99747C15.1044 6.0696 15.0964 5.82761 15.062 5.07068C15.0276 4.31489 14.9077 3.79853 14.7321 3.34755C14.5502 2.88077 14.3075 2.4851 13.9127 2.09C13.518 1.69489 13.1215 1.45239 12.655 1.27116C12.2029 1.09568 11.6865 0.975277 10.9308 0.941429C10.1735 0.907013 9.93132 0.898438 8.00229 0.898438C6.07327 0.898438 5.83096 0.906445 5.07318 0.941429Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="javascript:;"
                className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#337FFF]  hover:bg-gray-900 "
              >
                <svg
                  className="w-[1rem] h-[1rem] text-white"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.04111 7.81204L7.41156 5.46043H5.1296V3.93188C5.1296 3.28886 5.44818 2.66054 6.46692 2.66054H7.51899V0.657999C6.90631 0.560385 6.28723 0.507577 5.66675 0.5C3.78857 0.5 2.56239 1.62804 2.56239 3.66733V5.46043H0.480469V7.81204H2.56239V13.5H5.1296V7.81204H7.04111Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="javascript:;"
                className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#FF0000]  hover:bg-gray-900 "
              >
                <svg
                  className="w-[1.25rem] h-[0.875rem] text-white"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.9191 1.10651C14.558 1.27906 15.0602 1.78251 15.2299 2.42069C15.5388 3.57887 15.5388 5.99687 15.5388 5.99687C15.5388 5.99687 15.5388 8.41487 15.2299 9.57306C15.0578 10.2136 14.5556 10.7171 13.9191 10.8872C12.7638 11.1969 8.12875 11.1969 8.12875 11.1969C8.12875 11.1969 3.49603 11.1969 2.33844 10.8872C1.69952 10.7147 1.19735 10.2112 1.0276 9.57306C0.71875 8.41487 0.71875 5.99687 0.71875 5.99687C0.71875 5.99687 0.71875 3.57887 1.0276 2.42069C1.1997 1.78015 1.70188 1.27669 2.33844 1.10651C3.49603 0.796875 8.12875 0.796875 8.12875 0.796875C8.12875 0.796875 12.7638 0.796875 13.9191 1.10651ZM10.4981 5.99687L6.6481 8.22578V3.76796L10.4981 5.99687Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
