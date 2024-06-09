import Footer from "./Footer";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";

import {
  resetFPasswordState,
  updatePasswordUser,
} from "../Redux/Slices/ForgetPasswordSlice";
const UpdatePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (password !== confirmPassword) {
      return toast.error("Passwords are not matching");
    }
    dispatch(updatePasswordUser(email, hash, password));
  };

  useEffect(() => {
    if (error) {
      toast.error("Invalid credentials");
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
    <div className="flex flex-col min-h-screen bg-center bg-cover bg-light-black">
      <Navbar />

      <div className="flex flex-col p-6 justify-center items-center w-[100%] ">
        <ToastContainer />
        <section className=" w-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[100%]">
            <h1 className="flex font-radios items-center mb-6 text-4xl font-semibold text-yellows dark:text-yellows p-4 rounded-lg">
              Update Password
            </h1>
            <div className="w-full p-6 bg-light-black rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md dark:bg-fade-black dark:border-fade-black sm:p-8">
              <h2 className="mb-1 text-xl font-radios font-bold leading-tight tracking-tight text-yellows md:text-2xl dark:text-yellows">
                Change Password
              </h2>
              <form className="mt-4 space-y-8 lg:mt-5 md:space-y-8" action="#">
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-radios font-medium text-yellows dark:text-yellows"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-fade-black border border-gray-300 text-yellows sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-fade-black dark:border-white dark:placeholder-gray-400 dark:text-yellows dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-radios font-medium text-yellows dark:text-yellows"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-fade-black border border-gray-300 text-yellows sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-fade-black dark:border-white dark:placeholder-gray-400 dark:text-yellows dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>

                <button
                  type="button"
                  onClick={updatePassword}
                  className=" mt-4 w-full hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-light-black px-3 text-yellows shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-yellows before:transition-all before:duration-500 hover:text-black hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
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
