import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetLoginState, signUp } from "../Redux/Slices/LoginSlice";
const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, data } = useSelector((state) => state.login);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(signUp({ userName, email, password, confirmPassword }));
  };
  useEffect(() => {
    if (error) {
      toast.error("Invalid credentials");
    }
    if (data) {
      toast.success("signUp successful!");
      setTimeout(() => {
        navigate("/SignIn");
        dispatch(resetLoginState());
      }, 5000);
    }
  }, [data, error, navigate, dispatch]);
  useEffect(() => {
    return () => {
      dispatch(resetLoginState());
    };
  }, [dispatch]);
  return (
    <div className="h-screen flex ">
      <ToastContainer />
      <div className="hidden smd:flex w-1/2 bg-yellows i justify-around items-center">
        <div>
          <h1 className="text-black text-5xl font-joining ">Epic Explorer</h1>
          <p className="text-black mt-3 font-radios">
            The most popular Tour and travel and booking agency
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-black mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="flex smd:w-1/2 justify-center items-center bg-white sssm:w-full">
        <form className="bg-white" onSubmit={handleSubmit}>
          {/* Form inputs */}
          <h1 className="text-gray-800 font-joining font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-joining font-bold text-gray-600 mb-7">
            Welcome Back
          </p>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            {/* Email input */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
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
              className="pl-2 outline-none border-none"
              type="text"
              name="userName"
              placeholder="userName"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            {/* Email input */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
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
              className="pl-2 outline-none border-none"
              type="text"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            {/* Password input */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
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
              className="pl-2 outline-none border-none"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 mt-4 rounded-2xl">
            {/* Confirm Password input */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
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
              className="pl-2 outline-none border-none"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="block w-full bg-yellows mt-4 py-2 rounded-2xl text-black font-semibold mb-2"
            onSubmit={handleSubmit}
          >
            SignUp
          </button>
          <div className="flex flex-row gap-x-2 mt-4">
            <input type="checkbox" className="text-lg " />
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              I agree to the conditions and terms
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
