import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otpSender, resetOTPState } from "../Redux/Slices/OtpSlices";
import { useLocation } from "react-router-dom";
import { resendOtp } from "../Redux/Slices/ResendOtpSlice";
import { getErrorMessage } from "../utils/validation";
const OtpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = (queryParams.get("email") || sessionStorage.getItem("pendingVerificationEmail") || "").trim().toLowerCase();

  const { otpError, otpData } = useSelector((state) => state.OTP);
  const { otpError: resendError, resendOtpData } = useSelector((state) => state.ResendOtp);

  const [otp, setOTP] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleOTPChange = (e) => {
    setOTP(e.target.value.replace(/\D/g, "").slice(0, 6));
  };
  const resend = () => {
    if (resendCooldown > 0) return;
    dispatch(resendOtp(email));
    setResendCooldown(60);
  };
  const sendOTP = (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Verification email is missing. Please sign up again.");
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      toast.error("OTP must be exactly 6 digits.");
      return;
    }

    dispatch(otpSender(otp, email));
  };

  useEffect(() => {
    if (otpError) {
      toast.error(getErrorMessage(otpError, "The OTP is invalid or expired."));
    }
    if (otpData) {
      sessionStorage.setItem("verificationSuccessMessage", "Email verified successfully. You can now sign in.");
      sessionStorage.removeItem("pendingVerificationEmail");
      navigate("/SignIn", { replace: true });
      dispatch(resetOTPState());
    }
  }, [otpData, otpError, navigate, dispatch]);

  useEffect(() => {
    if (resendError) {
      setResendCooldown(0);
      toast.error(getErrorMessage(resendError, "The verification email could not be sent."));
    } else if (resendOtpData) {
      toast.success("A new verification code was sent.");
    }
  }, [resendError, resendOtpData]);

  useEffect(() => {
    if (!resendCooldown) return undefined;
    const timer = setInterval(() => setResendCooldown((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    return () => {
      dispatch(resetOTPState());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4">
      <ToastContainer />
      <div className="relative flex w-full max-w-xl flex-col justify-center py-12">
        <div className="relative rounded-2xl border-2 border-[#3654ff]/20 bg-white px-6 pt-10 pb-9 shadow-xl shadow-blue-200 sm:px-10">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#3654ff]">Epic Explorer</p>
              <div className="font-semibold text-3xl text-[#3654ff]">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-slate-600">
                <p>We have sent a code to your email {email}</p>
              </div>
            </div>
            <div>
              <form method="post" onSubmit={sendOTP}>
                <div className="flex flex-col space-y-16">
                  <input
                    className="w-full rounded-xl border-2 border-[#3654ff]/30 bg-white p-4 text-[#3654ff] outline-none transition focus:border-[#3654ff] focus:ring-2 focus:ring-[#3654ff]/20"
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOTPChange}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    minLength={6}
                    maxLength={6}
                    pattern="[0-9]{6}"
                    title="Enter exactly 6 digits."
                    aria-describedby="otp-format"
                    onInvalid={(event) =>
                      event.currentTarget.setCustomValidity("OTP must contain exactly 6 digits.")
                    }
                    onInput={(event) => event.currentTarget.setCustomValidity("")}
                    required
                  />
                  <p id="otp-format" className="mt-2 text-sm text-[#3654ff]" aria-live="polite">
                    Format: exactly 6 digits from the verification email.
                  </p>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        className="flex flex-row items-center justify-center text-center w-full rounded-xl bg-[#3654ff] py-4 text-sm text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#3654ff]/30"
                        type="submit"
                      >
                        Verify Account
                      </button>
                    </div>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-slate-500">
                      <p>Did not receive the code?</p>
                      <button
                        className="flex flex-row items-center text-[#3654ff] hover:underline disabled:cursor-not-allowed disabled:text-slate-400"
                        type="button"
                        onClick={resend}
                        disabled={!email || resendCooldown > 0}
                      >
                        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend"}
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
