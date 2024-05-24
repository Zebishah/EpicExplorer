import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    data: null,
    email: null,
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
      state.email = action.payload.email;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetLoginState: (state) => {
      state.data = null;
      state.email = null;
      state.error = null;
      state.loading = false;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  resetLoginState,
  setEmail,
} = loginSlice.actions;

export const signUp = ({
  userName,
  email,
  password,
  confirmPassword,
}) => async (dispatch) => {
  dispatch(signUpRequest());
  try {
    const response = await axios.post(
      `http://localhost:5000/User/createUser`,
      { userName, email, password, confirmPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(signUpSuccess(response.data));
    dispatch(setEmail(email));
    console.log(
      "Now authenticate your Account with OTP we sent it on ur email"
    );
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
