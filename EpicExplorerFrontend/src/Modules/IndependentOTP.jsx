import { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import OtpPage from "./OtpPage";
import { toast } from "react-toastify";

const IndependentOTP = () => {
  useEffect(() => {
    toast.success("Otp sended successfully");
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-center bg-cover">
      <Navbar />

      <div className="flex flex-col gap-y-10 p-6 items-center w-[80%] "></div>
      <OtpPage />
      <Footer />
    </div>
  );
};

export default IndependentOTP;
