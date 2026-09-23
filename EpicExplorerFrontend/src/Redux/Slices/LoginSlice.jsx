import { createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/client";
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
  googleAccessToken,
}) => async (dispatch) => {
  dispatch(signUpRequest());
  try {
    const response = await apiClient.post(
      "/User/createUser",
      { userName, email, password, confirmPassword, googleSign, googleAccessToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(signUpSuccess(response.data));
    dispatch(setEmail(email));
  } catch (error) {
    const errorMessage = error.response?.data?.message ||
      (error.request
        ? "Cannot connect to the server. Start the backend and try again."
        : error.message);
    dispatch(signUpFailure(error.response?.data || errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export default loginSlice.reducer;
