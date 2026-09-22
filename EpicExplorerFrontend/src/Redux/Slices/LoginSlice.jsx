import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setEmail } from "./emailSlice";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    signUpRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetLoginState: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  resetLoginState,
} = loginSlice.actions;

export const signUp = ({
  userName,
  email,
  password,
  confirmPassword,
  googleSign,
}) => async (dispatch) => {
  dispatch(signUpRequest());
  try {
    const response = await axios.post(
      `${API_URL}/User/createUser`,
      { userName, email, password, confirmPassword, googleSign },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.token) {
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
    }

    dispatch(signUpSuccess(response.data));
    dispatch(setEmail(email));
  } catch (error) {
    const errorMessage = error.response?.data?.message ||
      (error.request
        ? `Cannot connect to the server at ${API_URL}. Start the backend and try again.`
        : error.message);
    dispatch(signUpFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export default loginSlice.reducer;
