import SideBar from "./SideBar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect } from "react";
import image1 from "../images/6437523_3313427.jpg";
const UserProfile = () => {
  useEffect(() => {
    console.log("userProfile");
  }, []);
  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <Navbar />
      <div className="flex flex-row gap-x-6 h-full w-full overflow-hidden bg-opacity-0 bg-light-black smd:mt-40 mt-20">
        <SideBar />
        <div className="flex flex-col flex-grow p-6 items-center justify-center">
          <h1 className="text-yellows smd:text-4xl text-xs font-joining bg-light-black bg-opacity-60 p-4 rounded-lg ">
            User Dashboard
          </h1>
          <div className="container max-w-screen-lg mx-auto ">
            <h2 className=" font-radios font-semibold smd:text-xl text-xs text-yellows bg-light-black bg-opacity-60 p-3 rounded-lg w-max">
              Update info
            </h2>
            <p className="font-radios text-white mb-6 bg-light-black bg-opacity-60 p-3 rounded-lg w-max mt-1">
              Update your personal info here.
            </p>

            <div className="bg-fade-black rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-yellows">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p className="text-white">Please fill out all the fields.</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-8 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label
                        htmlFor="full_name"
                        className="text-yellows text-lg font-radios"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label
                        htmlFor="email"
                        className="text-yellows text-lg font-radios"
                      >
                        Email Address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder="email@domain.com"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label
                        htmlFor="address"
                        className="text-yellows text-lg font-radios"
                      >
                        Address / Street
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="city"
                        className="text-yellows text-lg font-radios"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="phone_no"
                        className="text-yellows text-lg font-radios"
                      >
                        Phone-No
                      </label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          name="phone_no"
                          id="phone_no"
                          placeholder="Phone-No"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="image"
                        className="text-yellows text-lg font-radios"
                      >
                        image
                      </label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          type="image"
                          name="image"
                          id="image"
                          placeholder="image"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          defaultValue=""
                        />
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button className="bg-yellows hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
