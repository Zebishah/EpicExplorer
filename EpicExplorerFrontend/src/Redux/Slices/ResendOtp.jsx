import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectOtpEmail } from "./emailSlice";

const resendOtp = createSlice({
  name: "ResendOTP",
  initialState: {
    otpData: null,
    loading: false,
    otpError: null,
  },
  reducers: {
    ResendOTPRequest: (state) => {
      state.loading = true;
      state.otpError = null;
    },
    ResendOTPSuccess: (state, action) => {
      state.loading = false;

      state.otpData = action.payload;
    },
    ResendOTPFailure: (state, action) => {
      state.loading = false;
      state.otpError = action.payload;
    },
    ResendResetOTPState: (state) => {
      state.otpData = null;
      state.otpError = null;
      state.loading = false;
    },
  },
});

export const {
  ResendOTPRequest,
  ResendOTPSuccess,
  ResendOTPFailure,
  ResendResetOTPState,
} = resendOtp.actions;

export const resendOTP = (otp) => async (dispatch, getState) => {
  dispatch(ResendOTPRequest());

  try {
    const email = await selectOtpEmail(getState());

    const response = await axios.post(
      `http://localhost:5000/User/verifyOTP`,
      { otp, email }, // Include email in the request payload
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(ResendOTPSuccess, response.data);
    console.log("Successful OTP verification");
  } catch (error) {
    dispatch(
      ResendOTPFailure(error.response ? error.response.data : error.message)
    );
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

export default resendOtp.reducer;
