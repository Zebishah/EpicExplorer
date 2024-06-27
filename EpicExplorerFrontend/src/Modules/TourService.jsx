import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import backgroundImage from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  showRelatedBlogs,
  showTourDetail,
} from "../Redux/Slices/ShowTourDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
const TourService = (id) => {
  const dispatch = useDispatch();
  const [tourDet, setTourDet] = useState({});
  const [TourBlog, setTourBlog] = useState([]);
  const [activities, setActivities] = useState([]);
  const [priceInclude, setPriceInclude] = useState([]);
  const [priceExclude, setPriceExclude] = useState([]);
  const [daysServices, setDaysServices] = useState([]);
  const [ServicesDet, setServicesDet] = useState({});
  const { tourDetail, RelatedBlogs } = useSelector((state) => state.TourDetail);

  useEffect(() => {
    if (id) {
      dispatch(showTourDetail(id));
      dispatch(showRelatedBlogs(id));
    }
  }, []);
  useEffect(() => {
    if (tourDetail) {
      setTourDet(tourDetail?.tour || {});
      setServicesDet(tourDetail?.tourServiceIt || {});
      setActivities(tourDetail?.tourServiceIt?.activities || []);
      setPriceInclude(tourDetail?.tourServiceIt?.priceIncludes || []);
      setPriceExclude(tourDetail?.tourServiceIt?.priceExcludes || []);
      setDaysServices(tourDetail?.tourServiceIt?.daysServices || []);
      console.log(tourDetail?.tourServiceIt?.daysServices || []);
    }
  }, [tourDetail]);

  useEffect(() => {
    if (RelatedBlogs && RelatedBlogs.blogs) {
      setTourBlog(RelatedBlogs.blogs.slice(0, 2));
    }
  }, [RelatedBlogs]);
  return (
    <div className="bg-dark p-8 flex flex-col items-center justify-center overflow-x-hidden">
      <div className="flex flex-col justify-center items-center m-auto ml-0 ">
        <div className="text-center bg-[#206eff] p-4 rounded mb-8">
          <h1 className="text-2xl font-bold text-w">
            Services and Itineraries of Trip
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center w-screen -ml-8 p-8 ">
          <div className="flex flex-col gap-y-6 justify-start items-center w-full">
            {/* Services Section */}
            <div className="flex flex-col ssm:flex-row gap-6 justify-center items-center w-full">
              <div className="bg-[#2571ff] p-6 rounded-lg flex-1 shadow-lg border-2 border-[#3a7fff]">
                <h2 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                  Activities
                </h2>
                {activities && activities.length > 0 && (
                  <ul className="list-disc font-radios list-inside text-white">
                    {activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-4">
                  <h3 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                    Price Includes:
                  </h3>
                  <ul className="list-disc list-inside font-radios text-white">
                    {priceInclude.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-[#206eff] p-6 rounded-lg flex-1 shadow-lg border-2 border-[#206eff]">
                <h2 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                  Tour Info:
                </h2>
                <ul className="list-disc list-inside font-radios text-white">
                  <li>Tour is {tourDet.name}</li>
                  <li>{tourDet.departureTime} is the Departure Time</li>
                  <li>
                    Departure & Return: {tourDet.Departure_ReturnLocation}
                  </li>
                  <li>Availability upto: {tourDet.endDate} </li>
                  <li>
                    Members Limit: Members Limit is {tourDet.membersLimit}{" "}
                    Members
                  </li>
                </ul>
                <div className="mt-4">
                  <h3 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                    Price Excludes:
                  </h3>
                  <ul className="list-disc list-inside font-radios text-white">
                    {priceExclude.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Itinerary Section */}
            <div className="bg-[#206eff] p-6 rounded-lg w-full flex-1 shadow-lg border-2 border-[#206eff]">
              <h2 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                Itinerary:
              </h2>
              <div className="text-white">
                {daysServices.length > 0 &&
                  daysServices.map((dayS, index) => (
                    <div key={index}>
                      <h3 className="font-bold font-radios mb-2">{dayS.day}</h3>
                      <ul className="list-disc font-radios list-inside">
                        {dayS.services.map((service, idx) => (
                          <li key={idx}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Enquiry and Weather Section */}
          <div className="flex flex-col gap-y-6 w-full md:w-[80%] lg:w-[40%] p-4">
            <div className="bg-[#206eff] p-6 rounded-lg flex flex-col justify-center items-center flex-1 shadow-lg border-2 border-[#206eff]">
              <h2 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                For Enquiry
              </h2>
              <p className="text-white text-center font-radios">
                Call us on +92-51-5739027 for individual, tailored advice for
                your perfect stay or send us a message with your hotel booking
                query.
              </p>
              <p className="text-[#206eff] mt-4 font-radios">
                Email: zebhaider123@gmail.com
              </p>
            </div>

            <div className="bg-[#206eff] p-6 rounded-lg flex flex-col space-y-4 justify-center items-center flex-1 shadow-lg border-2 border-[#206eff]">
              <h2 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                Weather updates for Skardu
              </h2>
              <FontAwesomeIcon
                icon={faSun}
                className="text-white text-4xl"
              ></FontAwesomeIcon>
              <div className="text-center">
                <p className="text-white text-2xl font-radios">Sunny Day</p>
                <p className="text-white font-radios">30% temp | 30% percep</p>
                <p className="text-white font-radios">
                  Its a sunny and hot day in Skardu
                </p>
              </div>
            </div>

            <div className="bg-[#206eff] p-6 rounded-lg flex flex-col justify-center items-center gap-y-4 flex-1 shadow-lg border-2 border-[#206eff]">
              <h2 className="text-[#206eff] bg-white p-3 text-lg font-radios w-max rounded-xl font-bold mb-4">
                Related Blogs
              </h2>
              <div className="flex flex-col justify-center items-center gap-y-4">
                {TourBlog.map((blog, index) => (
                  <div className="relative h-[30vh] w-full" key={index}>
                    <img
                      src={backgroundImage}
                      alt="Skardu Blog"
                      className="object-cover h-[70%] w-full rounded-lg"
                    />
                    <button className="bg-white text-[#206eff] font-radios font-bold py-2 rounded w-full mt-2">
                      {blog.name} Blog
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourService;
