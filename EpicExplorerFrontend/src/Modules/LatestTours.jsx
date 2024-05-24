import image1 from "../images/marc-zimmer-a5QnUtau8lo-unsplash.jpg";
import newIcon from "../images/new-product (2).png";
const LatestTours = () => {
  const BookTour = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <div className="flex flex-col space-y-14 flex-wrap justify-center items-center p-8">
      <h1 className="text-yellows text-5xl font-joining  ">Latest Tours</h1>
      <div className="flex flex-row bg-light-black gap-x-10 md:mt-0 sssm:mt-72 gap-y-4 md:flex-nowrap sssm:flex-wrap">
        <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] ">
          <div className="relative">
            <div className="absolute top-8 right-0 transform translate-y-[-50%]">
              <img src={newIcon} alt="icon" />
            </div>
            <img src={image1} className="w-full" />
          </div>
          <div className="px-4 py-6 border-yellows border-2 border-t-0">
            <div className="flex flex-row justify-between">
              <h3 className="text-yellows text-xl font-radios">Heading</h3>
              <h3 className="text-yellows text-xl font-radios">10,000 pkr</h3>
            </div>

            <p className="mt-4 text-sm text-white font-radios">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at
              fermentum dui. Maecenas.
            </p>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                onSubmit={BookTour}
                className="w-[40%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-yellows px-3 text-black shadow-lg transition-all ease-in-out before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-light-black before:transition-all before:duration-500 hover:text-yellows hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10 text-radios text-lg">
                  Book Tour
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] ">
          <div className="relative">
            <div className="absolute top-8 right-0 transform translate-y-[-50%]">
              <img src={newIcon} alt="icon" />
            </div>
            <img src={image1} className="w-full" />
          </div>
          <div className="px-4 py-6 border-yellows border-2 border-t-0">
            <div className="flex flex-row justify-between">
              <h3 className="text-yellows text-xl font-radios">Heading</h3>
              <h3 className="text-yellows text-xl font-radios">10,000 pkr</h3>
            </div>
            <p className="mt-4 text-sm text-white font-radios">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at
              fermentum dui. Maecenas.
            </p>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                onSubmit={BookTour}
                className="w-[40%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-yellows px-3 text-black shadow-lg transition-all ease-in-out before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-light-black before:transition-all before:duration-500 hover:text-yellows hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10 text-radios text-lg">
                  Book Tour
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] ">
          <div className="relative">
            <div className="absolute top-8 right-0 transform translate-y-[-50%]">
              <img src={newIcon} alt="icon" />
            </div>
            <img src={image1} className="w-full" />
          </div>
          <div className="px-4 py-6 border-yellows border-2 border-t-0">
            <div className="flex flex-row justify-between">
              <h3 className="text-yellows text-xl font-radios">Heading</h3>
              <h3 className="text-yellows text-xl font-radios">10,000 pkr</h3>
            </div>
            <p className="mt-4 text-sm text-white font-radios">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at
              fermentum dui. Maecenas.
            </p>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                onSubmit={BookTour}
                className="w-[40%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-yellows px-3 text-black shadow-lg transition-all ease-in-out before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-light-black before:transition-all before:duration-500 hover:text-yellows hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10 text-radios text-lg">
                  Book Tour
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row bg-light-black gap-x-10 md:mt-0 sssm:mt-72 gap-y-4 md:flex-nowrap sssm:flex-wrap">
        <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] ">
          <div className="relative">
            <div className="absolute top-8 right-0 transform translate-y-[-50%]">
              <img src={newIcon} alt="icon" />
            </div>
            <img src={image1} className="w-full" />
          </div>
          <div className="px-4 py-6 border-yellows border-2 border-t-0">
            <div className="flex flex-row justify-between">
              <h3 className="text-yellows text-xl font-radios">Heading</h3>
              <h3 className="text-yellows text-xl font-radios">10,000 pkr</h3>
            </div>
            <p className="mt-4 text-sm text-white font-radios">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at
              fermentum dui. Maecenas.
            </p>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                onSubmit={BookTour}
                className="w-[40%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-yellows px-3 text-black shadow-lg transition-all ease-in-out before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-light-black before:transition-all before:duration-500 hover:text-yellows hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10 text-radios text-lg">
                  Book Tour
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] ">
          <div className="relative">
            <div className="absolute top-8 right-0 transform translate-y-[-50%]">
              <img src={newIcon} alt="icon" />
            </div>
            <img src={image1} className="w-full" />
          </div>
          <div className="px-4 py-6 border-yellows border-2 border-t-0">
            <div className="flex flex-row justify-between">
              <h3 className="text-yellows text-xl font-radios">Heading</h3>
              <h3 className="text-yellows text-xl font-radios">10,000 pkr</h3>
            </div>
            <p className="mt-4 text-sm text-white font-radios">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at
              fermentum dui. Maecenas.
            </p>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                onSubmit={BookTour}
                className="w-[40%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-yellows px-3 text-black shadow-lg transition-all ease-in-out before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-light-black before:transition-all before:duration-500 hover:text-yellows hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10 text-radios text-lg">
                  Book Tour
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-fade-black shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] ">
          <div className="relative">
            <div className="absolute top-8 right-0 transform translate-y-[-50%]">
              <img src={newIcon} alt="icon" />
            </div>
            <img src={image1} className="w-full" />
          </div>
          <div className="px-4 py-6 border-yellows border-2 border-t-0">
            <div className="flex flex-row justify-between">
              <h3 className="text-yellows text-xl font-radios">Heading</h3>
              <h3 className="text-yellows text-xl font-radios">10,000 pkr</h3>
            </div>
            <p className="mt-4 text-sm text-white font-radios">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor auctor arcu, at fermentum dui. Maecenas Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at
              fermentum dui. Maecenas.
            </p>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                onSubmit={BookTour}
                className="w-[40%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-yellows px-3 text-black shadow-lg transition-all ease-in-out before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-light-black before:transition-all before:duration-500 hover:text-yellows hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10 text-radios text-lg">
                  Book Tour
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        onSubmit={BookTour}
        className="w-[40%] hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-yellows px-3 text-black shadow-lg transition-all ease-in-out before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-light-black before:transition-all before:duration-500 hover:text-yellows hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
      >
        <span className="relative z-10 text-radios text-lg">See More</span>
      </button>
    </div>
  );
};

export default LatestTours;
