import backgroundImage from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import image from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import Navbar from "./Navbar";
const BookTour = () => {
  return (
    <div className="bg-light-black">
      <Navbar />
      <div className="w-full mt-20 h-[35vh]">
        {" "}
        {/* Change h-[40%] to h-[30vh] */}
        <img
          src={image}
          alt="image"
          className="w-full h-full object-cover bg-center bg-no-repeat"
        />
      </div>

      <div className="flex flex-col md:flex-row bg-light-black min-h-screen p-6 space-y-6 md:space-y-0 md:space-x-6 pl-20 pr-20">
        {/* Image Section */}
        <div className="flex flex-col space-y-6 md:w-2/3">
          <div className="relative h-[40vh] md:h-[70vh] w-full">
            <img
              src={backgroundImage}
              alt="Scenery"
              className="object-cover h-full w-full rounded-lg"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div className="flex flex-col justify-center items-center md:w-1/3 border-2 border-yellow-300 bg-dark p-6 rounded-lg mt-6">
          <h1 className="text-yellows text-4xl mb-4 font-joining font-bold mt-3">
            Book Form
          </h1>
          <form className="flex flex-col space-y-6 w-full h-full mt-8">
            <input
              type="text"
              placeholder="Name"
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="email"
              placeholder="E-mail"
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="text"
              placeholder="Name"
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="text"
              placeholder="E-mail"
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="text"
              placeholder="Phone number"
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="number"
              placeholder="Total guests"
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="date"
              placeholder="Check-in date"
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="text"
              placeholder="Drop Off Location"
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <input
              type="text"
              placeholder="Pickup Location"
              className="p-4 bg-fade-black shadow-lg text-yellows placeholder-yellows rounded-xl"
            />
            <button className="bg-yellows text-black font-radios font-bold py-4 rounded-xl hover:bg-yellow-600 ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTour;
