// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import LoginSlice from "./Slices/LoginSlice";
import SignInSlice from "./Slices/SignInSlice";
import OtpSlices from "./Slices/OtpSlices";
import emailSlice from "./Slices/emailSlice";
import ResendOtpSlice from "./Slices/ResendOtpSlice";
import SearchingUserSlice from "./Slices/SearchingUserSlice";

// Import your slice reducers here
// import counterReducer from './counterSlice';
// import todoReducer from './todoSlice';

const rootReducer = combineReducers({
  login: LoginSlice,
  SignIn: SignInSlice,
  OTP: OtpSlices,
  email: emailSlice,
  ResendOtp: ResendOtpSlice,
  userSearch: SearchingUserSlice,
  // todo: todoReducer,
});

export default rootReducer;
