import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router";

const PaymentSuccess = () => {
  let navigate = useNavigate();
  const ProceedPayment = async (event) => {
    event.preventDefault();
    console.log("hey");
    let id = "660e773f4d374ddb730f11bf";
    let amount = 100;
    try {
      const response = await axios.post(
        `http://localhost:5000/User/stellarPayment/${id}`,
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
      console.log("Successful payment");
      if (data.success == true) {
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
