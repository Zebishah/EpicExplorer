import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import backgroundImage from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import { faSun } from "@fortawesome/free-solid-svg-icons";

const TourService = () => {
  return (
    <div className="bg-dark p-8 flex flex-col items-center justify-center overflow-x-hidden">
      <div className="flex flex-col justify-center items-center m-auto ml-0 ">
        <div className="text-center bg-yellows py-4 rounded mb-8">
          <h1 className="text-2xl font-bold">
            Services and Itineraries of Trip
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center w-screen -ml-8 p-8 ">
          <div className="flex flex-col gap-y-6 justify-start items-center w-full">
            {/* Services Section */}
            <div className="flex flex-col ssm:flex-row gap-6 justify-center items-center w-full">
              <div className="bg-fade-black p-6 rounded-lg flex-1 shadow-lg border-2 border-yellows">
                <h2 className="text-yellows text-lg font-radios font-bold mb-4">
                  Services:
                </h2>
                <ul className="list-disc font-radios list-inside text-white">
                  <li>
                    5 days | 4 Nights trip to Fairy Meadows and Nanga Parbat
                    Base Camp
                  </li>
                  <li>Departure & Return: Lahore/Islamabad</li>
                  <li>Availability: May 1 - Oct 30</li>
                  <li>Accommodation: Camps on a 2 to 4 person sharing basis</li>
                </ul>
                <div className="mt-4">
                  <h3 className="text-yellows text-lg font-radios font-bold mb-2">
                    Price Includes:
                  </h3>
                  <ul className="list-disc list-inside font-radios text-white">
                    <li>Complete Tour Management with dedicated Guide</li>
                    <li>Travel on dedicated Transport (Hiace)</li>
                    <li>Hygienic Quality Food (Serving 3 Meals per day)</li>
                    <li>Refreshments during Traveling</li>
                    <li>All Toll and Taxes included</li>
                    <li>Pick & Drop</li>
                  </ul>
                </div>
              </div>
              <div className="bg-fade-black p-6 rounded-lg flex-1 shadow-lg border-2 border-yellows">
                <h2 className="text-yellows text-lg font-radios font-bold mb-4">
                  Services:
                </h2>
                <ul className="list-disc list-inside font-radios text-white">
                  <li>
                    5 days | 4 Nights trip to Fairy Meadows and Nanga Parbat
                    Base Camp
                  </li>
                  <li>Departure & Return: Lahore/Islamabad</li>
                  <li>Availability: May 1 - Oct 30</li>
                  <li>Accommodation: Camps on a 2 to 4 person sharing basis</li>
                </ul>
                <div className="mt-4">
                  <h3 className="text-yellows text-lg font-radios font-bold mb-2">
                    Price Includes:
                  </h3>
                  <ul className="list-disc list-inside font-radios text-white">
                    <li>Complete Tour Management with dedicated Guide</li>
                    <li>Travel on dedicated Transport (Hiace)</li>
                    <li>Hygienic Quality Food (Serving 3 Meals per day)</li>
                    <li>Refreshments during Traveling</li>
                    <li>All Toll and Taxes included</li>
                    <li>Pick & Drop</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Itinerary Section */}
            <div className="bg-fade-black p-6 rounded-lg w-full flex-1 shadow-lg border-2 border-yellows">
              <h2 className="text-yellows text-lg font-radios font-bold mb-4">
                Itinerary:
              </h2>
              <div className="text-white">
                <h3 className="font-bold font-radios mb-2">Day 1:</h3>
                <ul className="list-disc font-radios list-inside">
                  <li>Departure from Lahore Sharp 12:00 AM</li>
                  <li>Breakfast at Balakot</li>
                  <li>Reach Naran for Lunch</li>
                  <li>Short Stay at Lulusar</li>
                  <li>Pasu Night Stay in Chilas 09:00 PM Dinner</li>
                </ul>
                <h3 className="font-bold font-radios mt-4 mb-2">Day 2:</h3>
                <ul className="list-disc font-radios list-inside">
                  <li>Breakfast 8:00 AM</li>
                  <li>Departure for Raikot 9:00 AM</li>
                  <li>Arrival at Fairy meadows</li>
                  <li>Dinner and Bonfire 8:00 PM</li>
                </ul>
                <h3 className="font-bold font-radios mt-4 mb-2">Day 3:</h3>
                <ul className="list-disc font-radios list-inside">
                  <li>Breakfast 7:00 AM</li>
                  <li>
                    Start of the hike towards Nanga Parbat Base Camp 8:00 AM
                  </li>
                  <li>Dinner and Bonfire 8:00 PM</li>
                </ul>
                <h3 className="font-bold font-radios mt-4 mb-2">Day 4:</h3>
                <ul className="list-disc font-radios list-inside">
                  <li>Breakfast 7:00 AM</li>
                  <li>Departure for Raikot 9:00 AM</li>
                  <li>Dinner 8:00 PM</li>
                </ul>
                <h3 className="font-bold font-radios mt-4 mb-2">Day 5:</h3>
                <ul className="list-disc font-radios list-inside">
                  <li>Breakfast 6:00 AM</li>
                  <li>Short Stay at Babusar</li>
                  <li>Lunch in Abbottabad 5:00 PM</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Enquiry and Weather Section */}
          <div className="flex flex-col gap-y-6 w-full md:w-[80%] lg:w-[40%] p-4">
            <div className="bg-fade-black p-6 rounded-lg flex flex-col justify-center items-center flex-1 shadow-lg border-2 border-yellows">
              <h2 className="text-yellows text-lg font-bold mb-4 font-radios">
                For Enquiry
              </h2>
              <p className="text-white text-center font-radios">
                Call us on +92-51-5739027 for individual, tailored advice for
                your perfect stay or send us a message with your hotel booking
                query.
              </p>
              <p className="text-yellows mt-4 font-radios">
                Email: zebhaider123@gmail.com
              </p>
            </div>

            <div className="bg-fade-black p-6 rounded-lg flex flex-col space-y-4 justify-center items-center flex-1 shadow-lg border-2 border-yellows">
              <h2 className="text-yellows text-lg font-bold mb-4 font-radios">
                Weather updates for Skardu
              </h2>
              <FontAwesomeIcon
                icon={faSun}
                className="text-yellows text-4xl"
              ></FontAwesomeIcon>
              <div className="text-center">
                <p className="text-yellows text-2xl font-radios">Sunny Day</p>
                <p className="text-white font-radios">30% temp | 30% percep</p>
                <p className="text-white font-radios">
                  Its a sunny and hot day in Skardu
                </p>
              </div>
            </div>

            <div className="bg-fade-black p-6 rounded-lg flex flex-col justify-center items-center gap-y-4 flex-1 shadow-lg border-2 border-yellows">
              <h2 className="text-yellows text-lg font-bold mb-4 font-radios">
                Related Blogs
              </h2>
              <div className="flex flex-col justify-center items-center gap-y-4">
                <div className="relative h-[30vh] w-full">
                  <img
                    src={backgroundImage}
                    alt="Skardu Blog"
                    className="object-cover h-[70%] w-full rounded-lg"
                  />
                  <button className="bg-yellows text-black font-bold py-2 rounded w-full mt-2">
                    Skardu Blogs
                  </button>
                </div>
                <div className="relative h-[30vh] w-full">
                  <img
                    src={backgroundImage}
                    alt="Balochistan Blog"
                    className="object-cover h-[70%] w-full rounded-lg"
                  />
                  <button className="bg-yellows text-black font-bold py-2 rounded w-full mt-2">
                    Balochistan Blogs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourService;
