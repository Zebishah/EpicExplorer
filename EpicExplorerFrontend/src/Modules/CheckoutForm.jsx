import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router";

const CheckoutForm = (amount) => {
  amount = 4000;
  let Navigate = useNavigate();
  let ProceedPayment = () => {
    Navigate("/Confirmation");
  };

  return (
    <div className="bg-light-black">
      <Navbar />
      <div className=" flex flex-col items-center justify-center h-screen bg-light-black">
        <form
          onSubmit={ProceedPayment}
          className=" flex flex-col gap-y-6 justify-center items-center bg-fade-black w-[60%] h-[60%] rounded-lg shadow-lg"
        >
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
CheckoutForm.propTypes = {
  // sessionId is a required string
  amount: PropTypes.number.isRequired, // amount is a required number
};
export default CheckoutForm;
