import SideBar from "./SideBar";

const Dashboard = () => {
  return (
    <div className="flex flex-row gap-x-6 h-full bg-light-black w-full overflow-hidden">
      <SideBar />
      <div className="flex flex-col gap-y-10 flex-grow lg:p-6 items-center ">
        <h1 className="text-yellows text-lg lg:text-4xl font-joining font-bold ">
          User Booking Count
        </h1>
        <div className=" flex flex-col smd:flex-row justify-center items-center flex-wrap gap-y-2 gap-x-4 lg:gap-x-14">
          <div
            className="flex flex-col gap-y-4 justify-center items-center bg-fade-black p-6 shadow-lg rounded-lg w-full sm:w-auto
          "
          >
            <h1 className="text-yellows text-2xl font-radios font-bold">40</h1>
            <h3 className="text-yellows text-lg font-radios font-bold">
              BookedTours
            </h3>
          </div>
          <div
            className="flex flex-col gap-y-4 justify-center items-center bg-fade-black p-6 shadow-lg rounded-lg w-full sm:w-auto
          "
          >
            <h1 className="text-yellows text-2xl font-radios font-bold">40</h1>
            <h3 className="text-yellows text-lg font-radios font-bold">
              BookedTours
            </h3>
          </div>
          <div
            className="flex flex-col gap-y-4 justify-center items-center bg-fade-black p-6 shadow-lg rounded-lg w-full sm:w-auto
          "
          >
            <h1 className="text-yellows text-2xl font-radios font-bold">40</h1>
            <h3 className="text-yellows text-lg font-radios font-bold">
              BookedTours
            </h3>
          </div>
          <div
            className="flex flex-col gap-y-4 justify-center items-center bg-fade-black p-6 shadow-lg rounded-lg w-full sm:w-auto
          "
          >
            <h1 className="text-yellows text-2xl font-radios font-bold">40</h1>
            <h3 className="text-yellows text-lg font-radios font-bold">
              BookedTours
            </h3>
          </div>
        </div>
        <h1 className="text-yellows text-lg font-joining font-bold lg:text-4xl">
          User Personal Information
        </h1>
        <div className="bg-fade-black flex flex-row flex-wrap justify-center items-center lg:space-x-24 space-x-10 shadow-lg rounded-lg w-[100%] lg:w-[80%] smd:p-8 sssm:p-4">
          <ul className="flex flex-col gap-y-2 smd:gap-y-6 sssm:gap-y-5  ">
            <li className="text-yellows ssm:text-xs text-[9px] lg:text-xl font-radios bg-light-black lg:p-4 sssm:p-2 rounded-lg shadow-lg ">
              User-Name
            </li>
            <li className="text-yellows ssm:text-xs text-[9px] lg:text-xl font-radios bg-light-black lg:p-4 sssm:p-2 rounded-lg shadow-lg">
              User-Email
            </li>
            <li className="text-yellows ssm:text-xs text-[9px] lg:text-xl font-radios bg-light-black lg:p-4 sssm:p-2 rounded-lg shadow-lg">
              User-Phone
            </li>
            <li className="text-yellows ssm:text-xs text-[9px] lg:text-xl font-radios bg-light-black lg:p-4 sssm:p-2 rounded-lg shadow-lg">
              User-Address
            </li>
            <li className="text-yellows ssm:text-xs text-[9px] lg:text-xl font-radios bg-light-black lg:p-4 sssm:p-2 rounded-lg shadow-lg">
              User-AccountId
            </li>
            <li className="text-yellows ssm:text-xs text-[9px] lg:text-xl font-radios bg-light-black lg:p-4 sssm:p-2 rounded-lg shadow-lg">
              User-Balance
            </li>
          </ul>
          <ul className="flex flex-col gap-y-2 smd:gap-y-6 sssm:gap-y-5 ">
            <li className="text-yellows ssm:text-xs text-[9px] lg:text-xl font-radios bg-light-black lg:p-4 sssm:p-2 rounded-lg shadow-lg">
              Zohaib Haider
            </li>
            <li className="text-yellows ssm:text-xs text-[9px] lg:text-xl font-radios bg-light-black lg:p-4 sssm:p-2 rounded-lg shadow-lg">
              Zebihaider123@gmail.com
            </li>
            <li className="text-yellows ssm:text-xs text-[9px] lg:text-xl font-radios bg-light-black lg:p-4 sssm:p-2 rounded-lg shadow-lg">
              0310-5904269
            </li>
            <li className="text-yellows ssm:text-xs text-[9px] lg:text-xl font-radios bg-light-black lg:p-4 sssm:p-2 rounded-lg shadow-lg">
              Pakistan
            </li>
            <li className="text-yellows ssm:text-xs text-[9px] lg:text-xl font-radios bg-light-black lg:p-4 sssm:p-2 rounded-lg shadow-lg">
              qweqewq13132
            </li>
            <li className="text-yellows ssm:text-xs text-[9px] lg:text-xl font-radios bg-light-black lg:p-4 sssm:p-2 rounded-lg shadow-lg">
              2330.99888
            </li>
          </ul>
        </div>

      
      </div>
    </div>
  );
};

export default Dashboard;
