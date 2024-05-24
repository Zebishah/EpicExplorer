import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
const RequestBalance = () => {
  let amount = 1000;
  let navigate = useNavigate();
  const ProceedPayment = async () => {
    console.log("hey");
    let amount = 100;
    try {
      const response = await axios.post(
        "http://localhost:5000/User/requestBalance",
        { amount },
        {
          headers: {
            auth_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGQ3MjM0ZDc1OTA4MzI1ZTA3NWZlNCIsImlhdCI6MTcxNjM1NTU5NiwiZXhwIjoxNzE2OTYwMzk2fQ._90KYlRErV9dTJCOR3HR8X3AsHdDz3rzDa5zifcaP5w",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data);
      if (data.success == true) {
        navigate("/paymentConfirmation");
      }
      console.log("Successful");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="bg-light-black">
      <Navbar />
      <div className=" flex flex-col items-center justify-center h-screen bg-light-black">
        <form className=" flex flex-col gap-y-6 justify-center items-center bg-fade-black w-[60%] h-[60%] rounded-lg shadow-lg">
          <p className="text-yellows text-radios text-lg text-center">
            You have booked swaat tour and your total Payment amount in PKR is
            4000 pkr
          </p>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                SenderAccountID
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type tour name"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="startDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                DestinationAccount
              </label>
              <input
                type="text"
                name="startDate"
                id="startDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="startDate"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount to pay
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required
              />
            </div>

            <button
              type="submit"
              onClick={ProceedPayment}
              className="bg-yellows text-black font-radios p-3 rounded-lg shadow-sm"
            >
              Pay ${amount}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RequestBalance;
