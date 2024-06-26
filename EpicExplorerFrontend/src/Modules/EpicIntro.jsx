import image1 from "../images/pexels-rachel-claire-7263334.jpg";
import image2 from "../images/brian-kungu-BVOajLMQtFs-unsplash.jpg";
import { RiMapPin2Fill } from "react-icons/ri";
import { IoIosCash } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
const EpicIntro = () => {
  return (
    <>
      <div className="flex flex-row gap-x-8 justify-center items-center bg-[#255fff] w-full p-6 -mt-24 ">
        <div className="flex gap-x-3 p-3 justify-center items-center">
          <RiMapPin2Fill className="text-white" size={40} />
          <h3 className="text-white text-lg font-radios">50+ Destinations</h3>
        </div>
        <div className="flex gap-x-3 p-3 justify-center items-center">
          <IoIosCash className="text-white" size={40} />
          <h3 className="text-white text-lg font-radios">
            Best Price Guranted
          </h3>
        </div>
        <div className="flex gap-x-3 p-3 justify-center items-center">
          <FaUserFriends className="text-white" size={40} />
          <h3 className="text-white text-lg font-radios">
            User Friendly system
          </h3>
        </div>
        <div className="flex gap-x-3 p-3 justify-center items-center">
          <TbBrandBooking className="text-white" size={40} />
          <h3 className="text-white text-lg font-radios">Fast Bookings</h3>
        </div>
      </div>

      <div
        className="flex flex-col justify-center space-x-2 items-center h-screen md:space-y-8 smd:space-y-28 sssm:space-y-2 bg-cover bg-center bg-no-repeat"
        // style={{
        //   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image2})`,
        // }}
      >
        <h1 className="text-white text-lg smd:text-5xl font-joining bg-[#3654ff] p-6 rounded-lg shadow-lg shadow-fade-black">
          Epic Explorer?
        </h1>
        <div className=" flex flex-col md:flex-row justify-center items-center md:space-y-0 sssm:space-y-4 w-[100%] smd:w-[90%] h-auto smd:h-[70%] md:-mt-8">
          <div className="flex flex-col justify-center md:flex-row gap-x-4 w-full h-auto md:h-[75%] mb-4 smd:mb-0 items-stretch">
            <div className="w-full md:w-[50%] sssm:w-[90%] flex-grow">
              <img
                className="h-full w-full object-cover rounded-lg shadow-lg"
                src={image1}
                alt="Travel expedition"
              />
            </div>

            <div className="bg-[#206eff] shadow-fade-black text-[#bb29ff] w-full lg:w-[60%] md:w-[70%] sssm:w-[90%] flex-grow p-8 shadow-lg rounded-lg flex items-start justify-start min-h-full overflow-hidden">
              <p
                className="text-base lg:text-[20px] sssm:text-[18px] text-white leading-10 overflow-hidden -mt-1 "
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 13,
                  WebkitBoxOrient: "vertical",
                }}
              >
                Epic Explorer is an innovative tour and travel website designed
                to revolutionize the way travelers plan and experience their
                adventures. Our platform offers a comprehensive range of
                services, including detailed tour packages, hotel
                accommodations, and transport options, ensuring a seamless and
                enjoyable travel experience. Users can effortlessly browse and
                book tours, view detailed itineraries, and select the best
                transport and hotel options tailored to their needs. With
                features like online payment, booking history, and user reviews,
                Epic Explorer ensures a smooth and transparent booking process.
                Our website also provides real-time updates on weather and
                travel advisories, keeping travelers informed and safe. Users
                can effortlessly browse and book tours, view detailed
                itineraries, and select the best transport and hotel options
                tailored to their needs. With features like online payment,
                booking history, and user reviews, Epic Explorer ensures a
                smooth and transparent booking process. Our website also
                provides real-time updates on weather and travel advisories,
                keeping travelers informed and safe. Users can effortlessly
                browse and book tours, view detailed itineraries, and select the
                best transport and hotel options tailored to their needs. With
                features like online payment, booking history, and user reviews,
                Epic Explorer ensures a smooth and transparent booking process.
                Our website also provides real-time updates on weather and
                travel advisories, keeping travelers informed and safe. Users
                can effortlessly browse and book tours, view detailed
                itineraries, and select the best transport and hotel options
                tailored to their needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EpicIntro;
