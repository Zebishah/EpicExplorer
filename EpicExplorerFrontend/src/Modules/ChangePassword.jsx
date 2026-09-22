import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserPassword,
  resetFPasswordState,
} from "../Redux/Slices/ForgetPasswordSlice";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { getErrorMessage, validateConfirmPassword, validatePassword } from "../utils/validation";
import { useEffect, useState } from "react";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const dispatch = useDispatch();
  const { error, changePasswordData } = useSelector(
    (state) => state.forgotPassword
  );
  let changePassword = (event) => {
    event.preventDefault();
    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    if (!oldPassword) {
      toast.error("Current password is required.");
      return;
    }
    const passwordError = validatePassword(newPassword);
    const confirmationError = validateConfirmPassword(newPassword, confirmPassword);
    if (passwordError || confirmationError) {
      toast.error(passwordError || confirmationError);
      return;
    }
    dispatch(changeUserPassword(oldPassword, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error, "Unable to change the password."));
    }

    if (changePasswordData?.success === true) {
      console.log(changePasswordData);
      toast.success("Password changed successfully.");
      setTimeout(() => {
        localStorage.removeItem("jwtToken");
        navigate("/SignIn");
        dispatch(resetFPasswordState());
      }, 2000);
      // Redirect to login page
    }
  }, [changePasswordData, error, navigate, dispatch]);

  return (
    <>
      <ToastContainer />

      <div
        className="flex flex-col min-h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${image2})` }}
      >
        <Navbar />

        <div className="flex flex-row gap-x-6 h-full w-full overflow-hidden bg-opacity-0 smd:mt-40 mt-20">
          <SideBar />
          <div className="flex flex-col gap-y-10 p-6 items-center w-[80%] ">
            <section className=" w-full">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[100%]">
                <h1 className="flex font-radios items-center mb-6 text-4xl font-semibold text-white bg-[#3654ff] opacity-80 p-4 rounded-lg">
                  Update Password
                </h1>
                <div className="w-full p-6 bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md dark:border-[#3654ff] sm:p-8">
                  <h2 className="mb-1 text-xl font-radios font-bold leading-tight tracking-tight text-[#3654ff] md:text-2xl">
                    Change Password
                  </h2>
                  <form
                    className="mt-4 space-y-8 lg:mt-5 md:space-y-8"
                    onSubmit={changePassword}
                  >
                    <div>
                      <label
                        htmlFor="oldPassword"
                        className="block mb-2 text-sm font-radios font-medium text-[#3654ff]"
                      >
                        old Password
                      </label>
                      <div className="relative">
                        <input
                        type={showPasswords.old ? "text" : "password"}
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="bg-[#3654ff] border text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((current) => ({ ...current, old: !current.old }))
                          }
                          className="absolute right-3 top-3 text-sm font-medium text-white hover:underline"
                          aria-label={showPasswords.old ? "Hide current password" : "Show current password"}
                        >
                          {showPasswords.old ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-radios font-medium text-[#3654ff]"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <input
                        type={showPasswords.new ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        minLength={10}
                        maxLength={128}
                        className="bg-[#3654ff] border text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((current) => ({ ...current, new: !current.new }))
                          }
                          className="absolute right-3 top-3 text-sm font-medium text-white hover:underline"
                          aria-label={showPasswords.new ? "Hide new password" : "Show new password"}
                        >
                          {showPasswords.new ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-radios font-medium text-[#3654ff]"
                      >
                        Confirm password
                      </label>
                      <div className="relative">
                        <input
                        type={showPasswords.confirm ? "text" : "password"}
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        minLength={10}
                        maxLength={128}
                        className="bg-[#3654ff] border text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((current) => ({ ...current, confirm: !current.confirm }))
                          }
                          className="absolute right-3 top-3 text-sm font-medium text-white hover:underline"
                          aria-label={
                            showPasswords.confirm
                              ? "Hide confirmed password"
                              : "Show confirmed password"
                          }
                        >
                          {showPasswords.confirm ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white shadow-lg bg-[#3654ff] hover:bg-white shadow-fade-black transition-all duration-500 ease-in-out hover:text-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-radios font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800"
                    >
                      Reset password
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ChangePassword;
