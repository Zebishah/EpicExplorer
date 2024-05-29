import image from "../images/man-user-circle-icon.png";
const Reviews = () => {
  return (
    <div className="flex flex-col gap-y-20 w-full h-auto mt-16 bg-light-black items-center justify-center">
      <h1 className="text-yellows text-5xl font-joining text-center ">
        Reviews
      </h1>
      <div className="flex flex-col justify-center items-center space-y-10 h-screen p-12 w-[100%] smd:w-[80%]">
        <div className="bg-fade-black border-2 border-yellows p-4 rounded-xl shadow-lg shadow-yellows">
          <div className="flex flex-col gap-y-4 items-center mb-4">
            <div className="rounded-full overflow-hidden mr-4">
              <img src={image} alt="image" className="w-12 h-12" />
            </div>
            <div className="flex flex-col gap-y-2 justify-center items-center">
              <h2 className="text-sm smd:text-xl text-yellows font-radios">
                Eren Yeager
              </h2>
              <h2 className="text-sm smd:text-xl text-yellows font-radios ">
                Amazing thoughts on Swaat TourS
              </h2>
            </div>
          </div>
          <p className="text-white font-radios text-center smd:text-lg text-sm">
            “Trips were amazing and i enjoyed too much in ur amazing trip i was
            so beautiful journey i really enjoyed it.Trips were amazing and i
            enjoyed too much in ur amazing trip i was so beautiful journey i
            really enjoyed it ”
          </p>
        </div>

        <div className="bg-fade-black border-2 border-yellows p-4 rounded-xl shadow-lg shadow-yellows">
          <div className="flex flex-col gap-y-4 items-center mb-4">
            <div className="rounded-full overflow-hidden mr-4">
              <img src={image} alt="image" className="w-12 h-12" />
            </div>
            <div className="flex flex-col gap-y-2 justify-center items-center">
              <h2 className="text-sm smd:text-xl text-yellows font-radios">
                Eren Yeager
              </h2>
              <h2 className="text-sm smd:text-xl text-yellows font-radios ">
                Amazing thoughts on Swaat Tour
              </h2>
            </div>
          </div>
          <p className="text-white font-radios text-center smd:text-lg text-sm">
            “Trips were amazing and i enjoyed too much in ur amazing trip i was
            so beautiful journey i really enjoyed it.Trips were amazing and i
            enjoyed too much in ur amazing trip i was so beautiful journey i
            really enjoyed it ”
          </p>
        </div>

        <div className="bg-fade-black border-2 border-yellows p-4 rounded-xl shadow-lg shadow-yellows">
          <div className="flex flex-col gap-y-4 items-center mb-4">
            <div className="rounded-full overflow-hidden mr-4">
              <img src={image} alt="image" className="w-12 h-12" />
            </div>
            <div className="flex flex-col gap-y-2 justify-center items-center">
              <h2 className="text-sm smd:text-xl text-yellows font-radios">
                Eren Yeager
              </h2>
              <h2 className="text-sm smd:text-xl text-yellows font-radios ">
                Amazing thoughts on Swaat Tour
              </h2>
            </div>
          </div>
          <p className="text-white font-radios text-center smd:text-lg text-sm">
            “Trips were amazing and i enjoyed too much in ur amazing trip i was
            so beautiful journey i really enjoyed it.Trips were amazing and i
            enjoyed too much in ur amazing trip i was so beautiful journey i
            really enjoyed it ”
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
