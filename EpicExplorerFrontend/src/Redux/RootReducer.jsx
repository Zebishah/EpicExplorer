// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import LoginSlice from "./Slices/LoginSlice";
import SignInSlice from "./Slices/SignInSlice";
import OtpSlices from "./Slices/OtpSlices";
import emailSlice from "./Slices/emailSlice";
import ResendOtpSlice from "./Slices/ResendOtpSlice";
import SearchingUserSlice from "./Slices/SearchingUserSlice";
import userInfoSlice from "./Slices/userInfoSlice";
import ManageUserSlice from "./Slices/ManageUserSlice";
import ForgetPasswordSlice from "./Slices/ForgetPasswordSlice";
import UserBookingSlice from "./Slices/UserBookingSlice";

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
  userInfoSearch: userInfoSlice,
  manageUser: ManageUserSlice,
  forgotPassword: ForgetPasswordSlice,
  userBookings: UserBookingSlice,
  // todo: todoReducer,
});

export default rootReducer;
