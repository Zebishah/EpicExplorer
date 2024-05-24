import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetOTPState } from "../Redux/Slices/OTPSlice";

const OTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.login);
  const { otpError, otpData } = useSelector((state) => state.OTP);
  const [OTP, setOTP] = useState("");

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };
  const sendOTP = (event) => {
    event.preventDefault();
    if (OTP < 6) {
      toast.error("invalidOTP");
      return;
    }
    dispatch(OTP(OTP));
  };
  useEffect(() => {
    if (otpError) {
      toast.error("Invalid credentials");
    }
    if (otpData) {
      toast.success("OTP Sended for authentication!");
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
    <div className="h-screen flex ">
      <ToastContainer />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {email} </p>
              </div>
            </div>
            <div>
              <form action method="post">
                <div className="flex flex-col space-y-16">
                  <input
                    className="pl-2 outline-none border-none"
                    type="text"
                    name="userName"
                    placeholder="userName"
                    value={OTP}
                    onChange={handleOTPChange}
                    required
                  />
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        onClick={sendOTP}
                      >
                        Verify Account
                      </button>
                    </div>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didnt recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
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

export default OTP;
