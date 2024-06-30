import { toast } from "react-toastify";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
import { forgotPassword } from "../Redux/Slices/ForgetPasswordSlice";
import { useDispatch, useSelector } from "react-redux";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, forgotPasswordData } = useSelector(
    (state) => state.forgotPassword
  );
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const resetPassword = (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("write email first");
    }
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error("Invalid credentials");
    }

    if (forgotPasswordData) {
      toast.success("password reset link sended successfully");
    }
  }, [forgotPasswordData, error]);

  return (
    <div
      className="h-screen flex flex-col w-full gap-y-36 bg-white"
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      <Navbar />

      <main
        id="content"
        role="main"
        className="w-full mx-auto p-6 flex flex-col gap-y-3 justify-center items-center"
      >
        <div className="mt-7 bg-white rounded-xl shadow-lg shadow-fade-black border-2 border-indigo-300 w-[30%]">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-[#3654ff]">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-[#3654ff] flex flex-row gap-x-2 justify-center items-center">
                Remember your password?
                <a
                  className="text-[#3654ff] decoration-2 hover:underline font-medium"
                  href="#"
                >
                  Login here
                </a>
              </p>
            </div>
            <div className="mt-5">
              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xl font-bold ml-1 mb-2 text-[#3654ff]"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="py-3 px-4 block w-full border-2 border-gray-300 rounded-md text-sm shadow-sm text-black"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={resetPassword}
                    className=" mt-4 w-full hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-[#3654ff] bg-[#3654ff] px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-[#3654ff] hover:shadow-[#3654ff] hover:before:left-0 hover:before:w-full"
                  >
                    <span className="relative z-10 text-radios text-lg">
                      Reset Password
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <p className="mt-3 flex justify-center items-center text-center divide-x">
          <a
            className="pr-3.5 inline-flex items-center gap-x-2 text-sm text-[#3654ff] decoration-2 hover:underline hover:text-black"
            href="#"
            target="_blank"
          >
            <svg
              className="w-3.5 h-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View Github
          </a>
          <a
            className="pl-3 inline-flex items-center gap-x-2 text-sm text-[#3654ff] decoration-2 hover:underline hover:text-black p-2 hover:bg-white hover:shadow-lg shadow-black"
            href="#"
          >
            Contact us!
          </a>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default ForgetPassword;
