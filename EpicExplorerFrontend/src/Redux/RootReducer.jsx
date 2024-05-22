// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import LoginSlice from "./Slices/LoginSlice";
import SignInSlice from "./Slices/SignInSlice";

// Import your slice reducers here
// import counterReducer from './counterSlice';
// import todoReducer from './todoSlice';

const rootReducer = combineReducers({
  login: LoginSlice,
  SignIn: SignInSlice,
  // todo: todoReducer,
});

export default rootReducer;
