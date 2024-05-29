import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setEmail } from "./emailSlice";

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
      `http://localhost:5000/User/createUser`,
      { userName, email, password, confirmPassword, googleSign },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (googleSign == "yes") {
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
    }

    dispatch(signUpSuccess(response.data));
    dispatch(setEmail(email));
  } catch (error) {
    dispatch(
      signUpFailure(error.response ? error.response.data : error.message)
    );
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

export default loginSlice.reducer;
