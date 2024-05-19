import Navbar from "./Navbar";
import image from "../images/harrison-fitts-zE2VGbJSYns-unsplash.jpg";
import image1 from "../images/harrison-fitts-zE2VGbJSYns-unsplash.jpg";
import backgroundImage from "../images/harrison-fitts-zE2VGbJSYns-unsplash.jpg";
import Footer from "./Footer";
const FamilyTour = () => {
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
            Family Tours
          </h2>
        </div>
      </div>
      <div className="bg-dark flex-col lg:flex-row gap-x-6 p-8 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center bg-yellows py-4 rounded mb-8">
            <h1 className="text-2xl font-bold">List of All Family Tours</h1>
          </div>

          <div className="flex flex-wrap gap-8 justify-center">
            <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
              <img src={image1} className="w-full" alt="Car" />
              <div className="px-4 py-6 border-yellows border-2 border-t-0">
                <div className="flex flex-row justify-between">
                  <h3 className="text-yellows text-xl font-radios">Heading</h3>
                  <h3 className="text-yellows text-xl font-radios">
                    10,000 PKR
                  </h3>
                </div>
                <p className="mt-4 text-sm text-white font-radios">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
                  arcu, at fermentum dui. Maecenas.
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
              <img src={image1} className="w-full" alt="Car" />
              <div className="px-4 py-6 border-yellows border-2 border-t-0">
                <div className="flex flex-row justify-between">
                  <h3 className="text-yellows text-xl font-radios">Heading</h3>
                  <h3 className="text-yellows text-xl font-radios">
                    10,000 PKR
                  </h3>
                </div>
                <p className="mt-4 text-sm text-white font-radios">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
                  arcu, at fermentum dui. Maecenas.
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
              <img src={image1} className="w-full" alt="Car" />
              <div className="px-4 py-6 border-yellows border-2 border-t-0">
                <div className="flex flex-row justify-between">
                  <h3 className="text-yellows text-xl font-radios">Heading</h3>
                  <h3 className="text-yellows text-xl font-radios">
                    10,000 PKR
                  </h3>
                </div>
                <p className="mt-4 text-sm text-white font-radios">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
                  arcu, at fermentum dui. Maecenas.
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
              <img src={image1} className="w-full" alt="Car" />
              <div className="px-4 py-6 border-yellows border-2 border-t-0">
                <div className="flex flex-row justify-between">
                  <h3 className="text-yellows text-xl font-radios">Heading</h3>
                  <h3 className="text-yellows text-xl font-radios">
                    10,000 PKR
                  </h3>
                </div>
                <p className="mt-4 text-sm text-white font-radios">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
                  arcu, at fermentum dui. Maecenas.
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
              <img src={image1} className="w-full" alt="Car" />
              <div className="px-4 py-6 border-yellows border-2 border-t-0">
                <div className="flex flex-row justify-between">
                  <h3 className="text-yellows text-xl font-radios">Heading</h3>
                  <h3 className="text-yellows text-xl font-radios">
                    10,000 PKR
                  </h3>
                </div>
                <p className="mt-4 text-sm text-white font-radios">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
                  arcu, at fermentum dui. Maecenas.
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
              <img src={image1} className="w-full" alt="Car" />
              <div className="px-4 py-6 border-yellows border-2 border-t-0">
                <div className="flex flex-row justify-between">
                  <h3 className="text-yellows text-xl font-radios">Heading</h3>
                  <h3 className="text-yellows text-xl font-radios">
                    10,000 PKR
                  </h3>
                </div>
                <p className="mt-4 text-sm text-white font-radios">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
                  arcu, at fermentum dui. Maecenas.
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
              <img src={image1} className="w-full" alt="Car" />
              <div className="px-4 py-6 border-yellows border-2 border-t-0">
                <div className="flex flex-row justify-between">
                  <h3 className="text-yellows text-xl font-radios">Heading</h3>
                  <h3 className="text-yellows text-xl font-radios">
                    10,000 PKR
                  </h3>
                </div>
                <p className="mt-4 text-sm text-white font-radios">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
                  arcu, at fermentum dui. Maecenas.
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
              <img src={image1} className="w-full" alt="Car" />
              <div className="px-4 py-6 border-yellows border-2 border-t-0">
                <div className="flex flex-row justify-between">
                  <h3 className="text-yellows text-xl font-radios">Heading</h3>
                  <h3 className="text-yellows text-xl font-radios">
                    10,000 PKR
                  </h3>
                </div>
                <p className="mt-4 text-sm text-white font-radios">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
                  arcu, at fermentum dui. Maecenas.
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif]">
              <img src={image1} className="w-full" alt="Car" />
              <div className="px-4 py-6 border-yellows border-2 border-t-0">
                <div className="flex flex-row justify-between">
                  <h3 className="text-yellows text-xl font-radios">Heading</h3>
                  <h3 className="text-yellows text-xl font-radios">
                    10,000 PKR
                  </h3>
                </div>
                <p className="mt-4 text-sm text-white font-radios">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
                  arcu, at fermentum dui. Maecenas.
                </p>
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-yellows text-black"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" hidden lg:flex flex-col justify-center items-center gap-y-6 w-full sssm:w-[90%] xl:w-[25%] lg:w-[35%] p-4">
          <div className="bg-fade-black p-6 rounded-lg flex flex-col justify-center items-center flex-1 shadow-lg border-2 border-yellows">
            <h2 className="text-yellows text-lg font-bold mb-4 font-radios">
              For Enquiry
            </h2>
            <p className="text-white text-center font-radios">
              Call us on +92-51-5739027 for individual, tailored advice for your
              perfect stay or send us a message with your hotel booking query.
            </p>
            <p className="text-yellows mt-4 font-radios">
              Email: zebhaider123@gmail.com
            </p>
          </div>

          <div className="bg-fade-black p-6 rounded-lg flex flex-col justify-center items-center flex-1 shadow-lg border-2 border-yellows">
            <h2 className="text-yellows text-lg font-bold mb-4 font-radios">
              For Enquiry
            </h2>
            <p className="text-white text-center font-radios">
              Call us on +92-51-5739027 for individual, tailored advice for your
              perfect stay or send us a message with your hotel booking query.
            </p>
            <p className="text-yellows mt-4 font-radios">
              Email: zebhaider123@gmail.com
            </p>
          </div>
          <div className="bg-fade-black p-6 rounded-lg flex flex-col justify-center items-center gap-y-4 flex-1 shadow-lg border-2 border-yellows sssm:w-[100%] lg:w-[100%]">
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
      <Footer />
    </div>
  );
};

export default FamilyTour;
