// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import LoginSlice from "./Slices/LoginSlice";
import SignInSlice from "./Slices/SignInSlice";
import OTPSlice from "./Slices/OTPSlice";

// Import your slice reducers here
// import counterReducer from './counterSlice';
// import todoReducer from './todoSlice';

const rootReducer = combineReducers({
  login: LoginSlice,
  SignIn: SignInSlice,
  OTP: OTPSlice,
  // todo: todoReducer,
});

export default rootReducer;
