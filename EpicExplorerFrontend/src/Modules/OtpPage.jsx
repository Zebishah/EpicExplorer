import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otpSender, resetOTPState } from "../Redux/Slices/OtpSlices";
import { useLocation } from "react-router-dom";
import { resendOtp } from "../Redux/Slices/ResendOtpSlice";
const OtpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const { otpError, otpData } = useSelector((state) => state.OTP);

  const [otp, setOTP] = useState("");

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };
  const resend = () => {
    dispatch(resendOtp(email));
    toast.success("Otp sended to your mail again!");
  };
  const sendOTP = (event) => {
    event.preventDefault();
    console.log("hey");
    if (otp.length < 6) {
      toast.error("Invalid OTP");
      return;
    }

    dispatch(otpSender(otp, email));
  };

  useEffect(() => {
    if (otpError) {
      toast.error("Invalid credentials");
    }
    if (otpData) {
      toast.success("signed up successfully!");
      setTimeout(() => {
        navigate("/SignIn");
        dispatch(resetOTPState());
      }, 5000);
    }
  }, [otpData, otpError, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetOTPState());
    };
  }, [dispatch]);

  return (
    <div className="h-screen flex justify-center items-center bg-light-black ">
      <ToastContainer />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-light-black py-12 w-[50%]">
        <div className="relative bg-fade-black shadow-lg shadow-yellows px-6 pt-10 pb-9 mx-auto w-[60%] rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl text-yellows">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-white">
                <p>We have sent a code to your email {email}</p>
              </div>
            </div>
            <div>
              <form method="post" onSubmit={sendOTP}>
                <div className="flex flex-col space-y-16">
                  <input
                    className="pl-2 p-4 rounded-lg outline-none border-none"
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOTPChange}
                    required
                  />
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-yellows border-none text-black text-sm shadow-sm"
                        type="submit"
                      >
                        Verify Account
                      </button>
                    </div>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Did not receive the code?</p>
                      <button
                        className="flex flex-row items-center text-yellows"
                        type="button"
                        onClick={resend}
                      >
                        Resend
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
