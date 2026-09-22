import image from "../images/full-shot-man-carrying-baggage.jpg";
import backgroundImage from "../images/full-shot-man-carrying-baggage.jpg";
import Footer from "./Footer";
import HotelServices from "./HotelServices";
import Navbar from "./Navbar";
import RelatedHotels from "./RelatedHotels";
const HotelBooking = () => {
  const handleSubmit = (event) => event.preventDefault();
  return (
    <div className="bg-light-black">
      <Navbar />
      <div className="relative w-full mt-20 h-[35vh]">
        <img
          src={image}
          alt="image"
          className="w-full h-full object-cover bg-center bg-no-repeat"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-6xl font-radios font-bold p-4 rounded">
            Skardu Tour
          </h2>
        </div>
      </div>
      <div className="flex flex-col md:flex-row bg-light-black min-h-screen p-6 space-y-6 md:space-y-0 md:space-x-6 pl-20 pr-20 mt-16">
        {/* Image Section */}
        <div className="flex flex-col space-y-6 w-full md:w-2/3">
          <div className="relative h-[40vh] md:h-[70vh] w-full">
            <img
              src={backgroundImage}
              alt="Scenery"
              className="object-cover h-full w-full rounded-lg"
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold bg-black bg-opacity-50 p-4 rounded">
                Your Overlay Text Here
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative h-[30vh] w-full">
              <img
                src={backgroundImage}
                alt="Scenery"
                className="object-cover h-full w-full rounded-lg"
              />
            </div>
            <div className="relative h-[30vh] w-full">
              <img
                src={backgroundImage}
                alt="Scenery"
                className="object-cover h-full w-full rounded-lg"
              />
            </div>
            <div className="relative h-[30vh] w-full">
              <img
                src={backgroundImage}
                alt="Scenery"
                className="object-cover h-full w-full rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/3 border-2 border-yellow-300 bg-dark p-6 rounded-lg mt-6 md:mt-0">
          <h1 className="text-yellows text-4xl mb-4 font-joining font-bold mt-3">
            Book Form
          </h1>
          <form
            className="flex flex-col space-y-6 w-full mt-8"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              minLength={2}
              maxLength={100}
              required
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              required
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              inputMode="tel"
              pattern="[+0-9()\s.-]{7,20}"
              title="Enter a valid phone number."
              aria-describedby="hotel-phone-format"
              onInvalid={(event) =>
                event.currentTarget.setCustomValidity(
                  "Phone must contain 7–20 digits. Spaces, +, parentheses, hyphens, and periods are allowed."
                )
              }
              onInput={(event) => event.currentTarget.setCustomValidity("")}
              required
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <p id="hotel-phone-format" className="-mt-4 text-xs text-yellows">
              Format: 7–20 digits; spaces, +, parentheses, hyphens, and periods are allowed.
            </p>
            <input
              type="number"
              name="guests"
              placeholder="Total guests"
              min={1}
              max={100}
              required
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="date"
              name="checkIn"
              placeholder="Check-in date"
              required
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="text"
              name="dropOff"
              placeholder="Drop Off Location"
              minLength={2}
              maxLength={150}
              required
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="text"
              name="pickup"
              placeholder="Pickup Location"
              minLength={2}
              maxLength={150}
              required
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <button className="bg-yellows text-black font-radios font-bold py-4 rounded-xl hover:bg-yellow-600">
              Submit
            </button>
          </form>
        </div>
      </div>
      <HotelServices />
      <RelatedHotels />
      <Footer />
    </div>
  );
};

export default HotelBooking;
