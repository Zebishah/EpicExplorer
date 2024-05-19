const TransportService = () => {
  return (
    <div className="flex flex-col justify-between items-center xl:flex-row bg-light-black min-h-screen p-6 space-y-6 md:space-y-0 md:space-x-6 pl-20 pr-20 mt-16">
      {/* Form Section */}

      <div className="bg-dark p-8 min-h-screen flex flex-col gap-y-4 items-center justify-center overflow-hidden w-[100%]">
        <div className="text-center bg-yellows py-4 px-4 rounded mb-8">
          <h1 className="text-2xl font-radios font-bold">
            Services and Itineraries of Transport
          </h1>
        </div>
        <div className="flex flex-col items-center bg-fade-black p-8 rounded-lg shadow-lg border-2 border-yellows xl:w-[50%] sssm:w-[90%] h-[80%]">
          <h2 className="text-yellows text-lg font-bold mb-4">Car details:</h2>
          <div className="flex flex-row gap-6 w-full justify-between ">
            <ul className="list-disc font-radios list-inside text-yellows flex flex-col gap-y-8">
              <li>Car Type:</li>
              <li>Max People:</li>
              <li>Door Count:</li>
              <li>Transmission:</li>
              <li>Air-conditioned:</li>
              <li>Seats:</li>
              <li>Hybrid:</li>
              <li>Condition:</li>
              <li>Available:</li>
              <li>Fault:</li>
            </ul>
            <ul className="list-none font-radios text-white  flex flex-col gap-y-8">
              <li>Honda civic reborn</li>
              <li>Max People will be 6</li>
              <li>Door Count are 4</li>
              <li>Transmission is manual</li>
              <li>Yes it is Air-conditioned</li>
              <li>Seats are 6</li>
              <li>Yes it is Hybrid</li>
              <li>Condition is fully new</li>
              <li>Yes it is Available</li>
              <li>No there is no Fault</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6 w-full md:w-[80%] lg:w-[30%] p-4">
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

        <div className="bg-fade-black p-6 rounded-lg flex flex-col space-y-4 justify-center items-center flex-1 shadow-lg border-2 border-yellows">
          <h2 className="text-yellows text-lg font-bold mb-4 font-radios">
            Weather updates for Skardu
          </h2>

          <div className="text-center">
            <p className="text-yellows text-2xl font-radios">Sunny Day</p>
            <p className="text-white font-radios">30% temp | 30% percep</p>
            <p className="text-white font-radios">
              Its a sunny and hot day in Skardu
            </p>
          </div>
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
      </div>
    </div>
  );
};

export default TransportService;
