import { createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/client";

const otpSlice = createSlice({
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
} = otpSlice.actions;

export const otpSender = (otp, email) => async (dispatch) => {
  dispatch(OTPRequest());

  try {
    const response = await apiClient.post(
      "/User/verifyOTP",
      { otp, email }, // Include email in the request payload
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(OTPSuccess(response.data));
    console.log("Successful OTP verification");
  } catch (error) {
    dispatch(OTPFailure(error.response ? error.response.data : error.message));
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

export default otpSlice.reducer;
