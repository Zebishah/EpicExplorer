import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetLoginState, signUp } from "../Redux/Slices/LoginSlice";
import AboveNavbar from "./AboveNavbar";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import PropTypes from "prop-types";
import {
  getErrorMessage,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/validation";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleSignupButton = ({ onSuccess, onFailure }) => {
  const login = useGoogleLogin({ onSuccess, onError: onFailure });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="bg-[#3654ff] text-white text-balance p-4 rounded-lg shadow-lg shadow-fade-black"
    >
      Sign in with Google 🚀
    </button>
  );
};
GoogleSignupButton.propTypes = {
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

const FieldError = ({ message }) =>
  message ? (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {message}
    </p>
  ) : null;

FieldError.propTypes = {
  message: PropTypes.string,
};

const FieldHint = ({ children, id }) => (
  <p id={id} className="mt-1 text-xs text-[#3654ff]" aria-live="polite">
    {children}
  </p>
);

FieldHint.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, data } = useSelector((state) => state.login);
  const [email, setEmail] = useState("");
  const [googleLogin, setGoogleLogin] = useState(false);
  const [googleUserName, setGoogleUserName] = useState("");
  const [userName, setUserName] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const termsCheckboxRef = useRef(null);
  const [user, setUser] = useState({});
  const clearFieldError = (field) =>
    setFieldErrors((current) => ({ ...current, [field]: "" }));
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    clearFieldError("userName");
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    clearFieldError("email");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    clearFieldError("password");
    clearFieldError("confirmPassword");
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    clearFieldError("confirmPassword");
  };
  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
    // Handle login failure here
  };
  const handleLoginSuccess = async (tokenResponse) => {
    setGoogleLogin(true);
    let googleSign = "true";
    try {
      const token = tokenResponse.access_token;
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userInfo = response.data;
      console.log("Login Success:", userInfo);
      setUser(userInfo);
      let password = " ",
        confirmPassword = " ";
      setLoading(true);
      setGoogleUserName(userInfo.name);
      setGoogleEmail(userInfo.email);
      dispatch(
        signUp({
          userName: userInfo.name,
          email: userInfo.email,
          password,
          confirmPassword,
          googleSign,
        })
      );
      console.log(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  const ReadMore = () => {
    console.log("Read More");
  };

  const handleSubmit = (e) => {
    let googleSign = "false";
    setGoogleLogin(false);
    e.preventDefault();
    const errors = {
      userName: validateUsername(userName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
      terms: termsCheckboxRef.current?.checked
        ? ""
        : "Please agree to the terms before signing up.",
    };
    const firstError = Object.values(errors).find(Boolean);
    if (firstError) {
      setFieldErrors(errors);
      toast.error(firstError);
      return;
    }

    setLoading(true);

    dispatch(
      signUp({
        userName: userName.trim(),
        email: email.trim().toLowerCase(),
        password,
        confirmPassword,
        googleSign,
      })
    );
  };
  useEffect(() => {
    if (error) {
      setLoading(false);
      toast.error(getErrorMessage(error, "Signup failed. Please review the form."));
    }
    if (data) {
      setLoading(false);
      const requiresVerification = data.requiresVerification !== false;
      if (googleLogin == false && requiresVerification) {
        toast.success(
          "Account created successfully. Verification code sent to your email."
        );
      } else {
        toast.success("Account created successfully.");
      }

      const redirectTimer = setTimeout(() => {
        if (googleLogin == false && requiresVerification) {
          navigate(`/otp?email=${encodeURIComponent(email)}`);
          setUserName("");
          setPassword("");
          setConfirmPassword("");
          setEmail("");
        } else if (googleLogin == true) {
          navigate(
            `/?email=${encodeURIComponent(
              googleEmail
            )}&userName=${encodeURIComponent(googleUserName)}`
          );
        } else {
          navigate("/", { replace: true });
        }

        dispatch(resetLoginState());
      }, 1200);

      return () => clearTimeout(redirectTimer);
    }
  }, [
    data,
    error,
    navigate,
    dispatch,
    email,
    googleLogin,
    googleEmail,
    googleUserName,
  ]);
  useEffect(() => {
    return () => {
      dispatch(resetLoginState());
    };
  }, [dispatch]);
  return (
    <div className="h-screen flex ">
      <ToastContainer />
      <AboveNavbar />
      <div className="hidden smd:flex w-1/2 bg-[#3654ff] i justify-around items-center">
        <div>
          <h1 className="text-white text-5xl font-joining ">Epic Explorer</h1>
          <p className="text-white mt-3 font-radios">
            The most popular Tour and travel and booking agency
          </p>
          <button
            type="submit"
            onSubmit={ReadMore}
            className=" mt-4 w-auto hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border bg-white px-3 text-[#3654ff] shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-[#3654ff] hover:shadow-fade-black hover:before:left-0 hover:before:w-full"
          >
            <span className="relative z-10 text-radios text-lg">Read More</span>
          </button>
        </div>
      </div>
      <div className="flex smd:w-1/2 justify-center items-center bg-white sssm:w-full">
        <form className="" onSubmit={handleSubmit}>
          {/* Form inputs */}
          <h1 className="text-[#3654ff] font-joining font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-joining font-bold text-[#3654ff] mb-7">
            Welcome Back
          </p>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center border-2 shadow-lg shadow-fade-black py-3 px-3 mt-4 rounded-2xl">
              {/* Email input */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#3654ff]"
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
                className="pl-2 text-[#3654ff] outline-none bg-white placeholder:text-[#3654ff]"
                type="text"
                name="userName"
                placeholder="userName"
                value={userName}
                onChange={handleUserNameChange}
                autoComplete="username"
                minLength={3}
                maxLength={30}
                pattern="[A-Za-z0-9_]{3,30}"
                aria-invalid={Boolean(fieldErrors.userName)}
                aria-describedby="username-format"
                title="Use 3–30 letters, numbers, or underscores only. Spaces are not allowed."
                onInvalid={(event) =>
                  event.currentTarget.setCustomValidity(
                    "Username must be 3–30 characters and use only letters, numbers, or underscores. Spaces are not allowed."
                  )
                }
                onInput={(event) => event.currentTarget.setCustomValidity("")}
                required
              />
            </div>
            <FieldHint id="username-format">
              Format: 3–30 characters using letters, numbers, or underscores only; no spaces.
            </FieldHint>
            <FieldError message={fieldErrors.userName} />
            <div className="flex items-center border-2 shadow-lg shadow-fade-black py-3 px-3 mt-4 rounded-2xl">
              {/* Email input */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#3654ff]"
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
                className="pl-2 text-[#3654ff] outline-none bg-white placeholder:text-[#3654ff]"
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
                autoComplete="email"
                maxLength={254}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby="email-format"
                required
              />
            </div>
            <FieldHint id="email-format">
              Format: a valid address such as name@example.com.
            </FieldHint>
            <FieldError message={fieldErrors.email} />
            <div className="flex items-center border-2 shadow-lg shadow-fade-black py-3 px-3 mt-4 rounded-2xl">
              {/* Password input */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#3654ff]"
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
                className="pl-2 flex-1 min-w-0 text-[#3654ff] outline-none bg-white placeholder:text-[#3654ff]"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="new-password"
                minLength={10}
                maxLength={128}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby="password-format"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="ml-2 text-sm font-medium text-[#3654ff] hover:underline"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <FieldHint id="password-format">
              Format: 10+ characters with uppercase, lowercase, number, and special character.
            </FieldHint>
            <FieldError message={fieldErrors.password} />
            <div className="flex items-center border-2 shadow-lg shadow-fade-black py-3 px-3 mt-4 rounded-2xl relative">
              {/* Confirm Password input */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#3654ff]"
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
                className="pl-2 flex-1 min-w-0 text-[#3654ff] outline-none bg-white placeholder:text-[#3654ff] transition duration-300 ease-in-out focus:border-pink-500 focus:shadow-lg"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                autoComplete="new-password"
                minLength={10}
                maxLength={128}
                aria-invalid={Boolean(fieldErrors.confirmPassword)}
                aria-describedby="confirm-password-format"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                className="ml-2 text-sm font-medium text-[#3654ff] hover:underline"
                aria-label={
                  showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"
                }
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            <FieldHint id="confirm-password-format">
              Format: enter the exact same password again.
            </FieldHint>
            <FieldError message={fieldErrors.confirmPassword} />
            <div className="flex flex-row gap-x-2 mt-4 items-center">
              <input
                ref={termsCheckboxRef}
                type="checkbox"
                id="termsCheckbox"
                className="text-lg"
                aria-invalid={Boolean(fieldErrors.terms)}
              />
              <label
                htmlFor="termsCheckbox"
                className="text-lg text-[#3654ff] cursor-pointer"
              >
                I agree to the conditions and terms
              </label>
            </div>
            <FieldError message={fieldErrors.terms} />
            {/* Submit button */}
            {/* <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            /> */}
            {googleClientId && (
              <GoogleSignupButton
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
              />
            )}

            <button
              type="submit"
              onSubmit={handleSubmit}
              className=" mt-2 w-full text-center hover:before:bg-red rounded-xl relative h-[50px] overflow-hidden border bg-[#3654ff] px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-[#3654ff] hover:shadow-fade-black hover:before:left-0 hover:before:w-full"
            >
              {loading ? (
                <div className="status flex flex-row gap-x-2 justify-center items-center">
                  <span className=" text-green-500 z-10">Loading...</span>
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-green-500 animate-spin dark:text-green-500 fill-green-800"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                <span className="relative z-10 text-radios text-lg">
                  SignUp
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
