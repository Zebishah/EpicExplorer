import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";
import { SignIn, resetSignInState } from "../Redux/Slices/SignInSlice";
import AboveNavbar from "./AboveNavbar";
import { userSearchFrEmail } from "../Redux/Slices/SearchingUserSlice";
import { Link } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, data } = useSelector((state) => state.SignIn);
  const ReadMore = () => {
    console.log("Read More");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(SignIn({ email, password }));
  };

  useEffect(() => {
    if (error) {
      return toast.error("Invalid credentials");
    } else if (data) {
      toast.success("signIn successful!");
      dispatch(userSearchFrEmail(email));

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error, data, dispatch, email, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetSignInState());
    };
  }, [dispatch]);
  return (
    <div className="h-screen flex">
      <ToastContainer />
      <AboveNavbar />
      <div className="flex smd:w-1/2 justify-center items-center bg-fade-black sssm:w-full">
        <form className=" flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-yellows font-joining font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-yellows font-joining font-bold text-2xl mb-1 ">
              Welcome Back
            </p>{" "}
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center border-2 border-yellows shadow-lg shadow-yellows py-3 px-3 mt-4 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellows"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 text-white outline-none bg-transparent bg-light-black placeholder:text-white"
                type="text"
                name="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex items-center border-2 border-yellows shadow-lg shadow-yellows py-3 px-3 mt-4 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellows"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 text-white outline-none bg-transparent bg-light-black placeholder:text-white"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              type="submit"
              onSubmit={handleSubmit}
              className=" mt-4 w-full hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-light-black px-3 text-yellows shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-yellows before:transition-all before:duration-500 hover:text-black hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
            >
              <span className="relative z-10 text-radios text-lg">Login</span>
            </button>
            <div className="flex-flex-row gap-x-4">
              <Link to={"/ResetPassword"}>
                <span className="text-sm ml-2 text-yellows font-radios cursor-pointer">
                  Forgot Password ?
                </span>
              </Link>
              <Link to={"/signUp"}>
                <span className="text-sm ml-2 text-white font-radios cursor-pointer hover:text-yellows">
                  Register Account
                </span>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden smd:flex w-1/2 bg-yellows i justify-around items-center">
        <div>
          <h1 className="text-black text-5xl font-joining">Epic Explorer</h1>
          <p className="text-black mt-1">
            The most popular Tour and travel and booking agency
          </p>
          <button
            type="submit"
            onSubmit={ReadMore}
            className=" mt-4 w-auto hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border border-yellows bg-light-black px-3 text-yellows shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-black hover:shadow-yellow-400 hover:before:left-0 hover:before:w-full"
          >
            <span className="relative z-10 text-radios text-lg">Read More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
