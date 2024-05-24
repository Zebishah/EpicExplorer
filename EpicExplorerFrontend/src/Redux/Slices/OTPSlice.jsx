import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const OTPSlice = createSlice({
  name: "OTP",
  initialState: {
    otpData: null,
    loading: false,
    otpError: null,
  },
  reducers: {
    OTPRequest: (state) => {
      state.loading = true;
      state.otpError = null;
    },
    OTPSuccess: (state, action) => {
      state.loading = false;
      state.otpData = action.payload;
    },
    OTPFailure: (state, action) => {
      state.loading = false;
      state.otpError = action.payload;
    },
    resetOTPState: (state) => {
      state.otpData = null;
      state.otpError = null;
      state.loading = false;
    },
  },
});

export const {
  OTPRequest,
  OTPSuccess,
  OTPFailure,
  resetOTPState,
} = OTPSlice.actions;

export const OTP = ({ otp }) => async (dispatch, getState) => {
  dispatch(OTPRequest());
  const email = getState().login.email;
  try {
    const response = await axios.post(
      `http://localhost:5000/User/verifyOTP`,
      { email, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(OTPSuccess(response.otpData));
    console.log("Successful signUp");
  } catch (otpError) {
    dispatch(
      OTPFailure(
        otpError.response ? otpError.response.otpData : otpError.message
      )
    );
    console.otpError(
      "otpError:",
      otpError.response ? otpError.response.otpData : otpError.message
    );
  }
};

export default OTPSlice.reducer;
