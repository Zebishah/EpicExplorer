import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router";

const PaymentSuccess = () => {
  let navigate = useNavigate();
  const ProceedPayment = async (event) => {
    event.preventDefault();
    const id = new URLSearchParams(window.location.search).get("id");
    let amount = 100;
    if (!id) return;
    try {
      const response = await axios.post(
        `/User/stellarPayment/${id}`,
        { amount }
      );

      const data = response.data;
      if (data.success === true) {
        navigate("/Ticket");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        // Handle specific error response
      } else {
        console.error("Error:", error.message);
        // Handle other errors
      }
    }
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
            Are You Sure You wanna proceed with Your payment Please Click on
            confirm to Complete the tour payment
          </p>

          <button
            type="submit"
            className="bg-yellows text-black font-radios p-3 rounded-lg shadow-sm"
          >
            Confirm Payment
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
