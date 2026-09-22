import Footer from "./Footer";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
import {
  resetFPasswordState,
  updatePasswordUser,
} from "../Redux/Slices/ForgetPasswordSlice";
import {
  getErrorMessage,
  validateConfirmPassword,
  validatePassword,
} from "../utils/validation";
const UpdatePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const hash = searchParams.get("hash");
  const { error, updatePasswordData } = useSelector(
    (state) => state.forgotPassword
  );
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const updatePassword = (e) => {
    e.preventDefault();
    const passwordError = validatePassword(password);
    const confirmationError = validateConfirmPassword(password, confirmPassword);
    if (passwordError || confirmationError) {
      return toast.error(passwordError || confirmationError);
    }
    dispatch(updatePasswordUser(email, hash, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error, "Unable to update the password."));
    }

    if (updatePasswordData) {
      toast.success("password changed successfully");
      setTimeout(() => {
        navigate(`/SignIn`);
        dispatch(resetFPasswordState());
      }, 5000);
    }
  }, [email, hash, updatePasswordData, error, navigate, dispatch]);
  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover bg-white"
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      <Navbar />

      <div className="flex flex-col p-6 justify-center items-center w-[100%] ">
        <ToastContainer />
        <section className=" w-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[100%]">
            <h1 className="flex font-radios items-center mb-6 text-4xl font-semibold text-[#3654ff] p-4 rounded-lg">
              Update Password
            </h1>
            <div className="w-full p-6 bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md shadow-fade-black sm:p-8">
              <h2 className="mb-1 text-xl font-radios font-bold leading-tight tracking-tight text-[#3654ff] md:text-2xl">
                Change Password
              </h2>
              <form
                className="mt-4 space-y-8 lg:mt-5 md:space-y-8"
                onSubmit={updatePassword}
              >
                  <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-radios font-medium text-[#3654ff]"
                  >
                    New Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-[#3654ff] border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-white dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    minLength={10}
                    maxLength={128}
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3 bottom-3 text-sm font-medium text-white hover:underline"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="relative">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-radios font-medium text-[#3654ff]"
                  >
                    Confirm password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-[#3654ff] border border-gray-300 text-yellows sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-white dark:placeholder-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    minLength={10}
                    maxLength={128}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((visible) => !visible)}
                    className="absolute right-3 bottom-3 text-sm font-medium text-white hover:underline"
                    aria-label={
                      showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <button
                  type="submit"
                  className=" mt-4 w-full hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-white bg-[#3654ff] px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-[#3654ff] hover:shadow-[#3654ff] hover:before:left-0 hover:before:w-full"
                >
                  <span className="relative z-10 text-radios text-lg">
                    Reset Password
                  </span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default UpdatePassword;
