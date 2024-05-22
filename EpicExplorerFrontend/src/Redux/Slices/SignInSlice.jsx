import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SignInSlice = createSlice({
  name: "SignIn",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    SignInRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    SignInSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    SignInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSignInState: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  SignInRequest,
  SignInSuccess,
  SignInFailure,
  resetSignInState,
} = SignInSlice.actions;

export const SignIn = ({ email, password }) => async (dispatch) => {
  dispatch(SignInRequest());
  try {
    const response = await axios.post(
      `http://localhost:5000/User/userLogin`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { token, ...userData } = response.data;
    localStorage.setItem("jwtToken", token);
    dispatch(SignInSuccess(userData));
    console.log("Successful SignIn");
  } catch (error) {
    dispatch(
      SignInFailure(error.response ? error.response.data : error.message)
    );
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

export default SignInSlice.reducer;
