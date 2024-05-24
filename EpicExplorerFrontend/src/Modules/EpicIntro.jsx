import image1 from "../images/pexels-rachel-claire-7263334.jpg";
const EpicIntro = () => {
  return (
    <div className="flex flex-col justify-center space-x-2 items-center bg-light-black h-auto md:space-y-8 smd:space-y-28 sssm:space-y-2">
      <h1 className="text-yellows rounded-lg p-2 shadow-lg text-lg smd:text-5xl font-joining ">
        Epic Explorer?
      </h1>
      <div className=" flex flex-col md:flex-row justify-center items-center md:space-y-0 sssm:space-y-4 w-[100%] smd:w-[90%] h-auto smd:h-[70%] md:-mt-8">
        <div className="flex flex-col md:flex-row w-full h-auto md:h-[75%] mb-4 smd:mb-0 items-stretch">
          <div className="w-full md:w-[50%] sssm:w-[90%] flex-grow">
            <img
              className="h-full w-full object-cover rounded-lg shadow-lg"
              src={image1}
              alt="Travel expedition"
            />
          </div>

          <div className="bg-fade-black shadow-yellows w-full ml-4 lg:w-[60%] md:w-[70%] sssm:w-[90%] flex-grow p-8 shadow-lg rounded-lg flex items-start justify-start min-h-full overflow-hidden">
            <p
              className="text-base lg:text-[20px] sssm:text-[18px] text-yellows leading-10 overflow-hidden -mt-1 "
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 13,
                WebkitBoxOrient: "vertical",
              }}
            >
              Epic Explorer is an innovative tour and travel website designed to
              revolutionize the way travelers plan and experience their
              adventures. Our platform offers a comprehensive range of services,
              including detailed tour packages, hotel accommodations, and
              transport options, ensuring a seamless and enjoyable travel
              experience. Users can effortlessly browse and book tours, view
              detailed itineraries, and select the best transport and hotel
              options tailored to their needs. With features like online
              payment, booking history, and user reviews, Epic Explorer ensures
              a smooth and transparent booking process. Our website also
              provides real-time updates on weather and travel advisories,
              keeping travelers informed and safe. Users can effortlessly browse
              and book tours, view detailed itineraries, and select the best
              transport and hotel options tailored to their needs. With features
              like online payment, booking history, and user reviews, Epic
              Explorer ensures a smooth and transparent booking process. Our
              website also provides real-time updates on weather and travel
              advisories, keeping travelers informed and safe. Users can
              effortlessly browse and book tours, view detailed itineraries, and
              select the best transport and hotel options tailored to their
              needs. With features like online payment, booking history, and
              user reviews, Epic Explorer ensures a smooth and transparent
              booking process. Our website also provides real-time updates on
              weather and travel advisories, keeping travelers informed and
              safe. Users can effortlessly browse and book tours, view detailed
              itineraries, and select the best transport and hotel options
              tailored to their needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpicIntro;
