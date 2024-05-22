import SideBar from "./SideBar";
import image from "../images/man-user-circle-icon.png";
const UserProfile = () => {
  return (
    <div className="flex flex-row gap-x-6 h-screen bg-light-black w-full overflow-hidden">
      <SideBar image={image} />
      <div className="flex flex-col flex-grow p-6 items-center justify-center">
        <h1 className="text-yellows smd:text-4xl text-xs font-joining">
          User Dashboard
        </h1>
        <div className="container max-w-screen-lg mx-auto">
          <h2 className="font-semibold smd:text-xl text-xs text-yellows">
            Update info
          </h2>
          <p className="text-white mb-6">Update your personal info here.</p>
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
                      htmlFor="state"
                      className="text-yellows text-lg font-radios"
                    >
                      State / Province
                    </label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        name="state"
                        id="state"
                        placeholder="State"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <label
                      htmlFor="zipcode"
                      className="text-yellows text-lg font-radios"
                    >
                      Zipcode
                    </label>
                    <input
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                      defaultValue=""
                    />
                  </div>
                  <div className="md:col-span-5">
                    <div className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="billing_same"
                        id="billing_same"
                        className="form-checkbox"
                      />
                      <label htmlFor="billing_same" className="ml-2 text-white">
                        My billing address is different than above.
                      </label>
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
  );
};

export default UserProfile;
