import { faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WhyEpicExplorer = () => {
  return (
    <div className="landing-page h-screen flex flex-col justify-center items-center w-full bg-light-black md:mt-0 sssm:mt-72">
      <h1 className="text-yellows text-5xl font-joining ">Why Epic Explorer</h1>
      <section className="benefits-container grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-16 w-[80%]">
        <div className="benefit-card bg-fade-black rounded-md shadow-lg p-4 flex flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faMap}
            className="text-yellows text-4xl items-center"
          ></FontAwesomeIcon>
          <div className="flex flex-col gap-y-0 justify-center items-center">
            <h3 className="text-xl font-semibold mb-2 text-yellows ">
              Explore & Discover
            </h3>
            <p className="text-white text-center ">
              Uncover hidden gems and cultural wonders with our curated
              exploration tours.
            </p>
          </div>
        </div>
        <div className="benefit-card bg-fade-black rounded-md shadow-lg p-4 flex flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faMap}
            className="text-yellows text-4xl items-center"
          ></FontAwesomeIcon>
          <div className="flex flex-col gap-y-0 justify-center items-center">
            <h3 className="text-xl font-semibold mb-2 text-yellows text-center">
              Luxury Escapes
            </h3>
            <p className="text-white text-center">
              Indulge in opulence with our exclusive range of luxury travel
              experiences worldwide.
            </p>
          </div>
        </div>
        <div className="benefit-card bg-fade-black rounded-md shadow-lg p-4 flex flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faMap}
            className="text-yellows text-4xl items-center"
          ></FontAwesomeIcon>
          <div className="flex flex-col gap-y-0 justify-center items-center">
            <h3 className="text-xl font-semibold mb-2 text-yellows text-center">
              Adventure Expeditions
            </h3>
            <p className="text-white text-center">
              Thrilling adventures await! Join us for adrenaline-pumping
              journeys.
            </p>
          </div>
        </div>
        <div className="benefit-card bg-fade-black rounded-md shadow-lg p-4 flex flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faMap}
            className="text-yellows text-4xl items-center"
          ></FontAwesomeIcon>
          <div className="flex flex-col gap-y-0 justify-center items-center">
            <h3 className="text-xl font-semibold mb-2 text-yellows text-center">
              Customized Trips
            </h3>
            <p className="text-white text-center">
              Tailor-made travel packages designed to match your unique
              preferences and desires.
            </p>
          </div>
        </div>
        <div className="benefit-card bg-fade-black rounded-md shadow-lg p-4 flex flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faMap}
            className="text-yellows text-4xl items-center"
          ></FontAwesomeIcon>
          <div className="flex flex-col gap-y-0 justify-center items-center">
            <h3 className="text-xl font-semibold mb-2 text-yellows text-center">
              Group Retreats
            </h3>
            <p className="text-white text-center">
              Connect with like-minded travelers on group retreats to exciting
              destinations.
            </p>
          </div>
        </div>
        <div className="benefit-card bg-fade-black rounded-md shadow-lg p-4 flex flex-col items-center gap-y-3">
          <FontAwesomeIcon
            icon={faMap}
            className="text-yellows text-4xl items-center"
          ></FontAwesomeIcon>
          <div className="flex flex-col gap-y-0 justify-center items-center">
            <h3 className="text-xl font-semibold mb-2 text-yellows text-center">
              Wellness Retreats
            </h3>
            <p className="text-white text-center">
              Rejuvenate mind and body with our wellness retreats, combining
              relaxation and culture.
            </p>
          </div>
        </div>
      </section>

      {/* Add other sections here */}
    </div>
  );
};

export default WhyEpicExplorer;
