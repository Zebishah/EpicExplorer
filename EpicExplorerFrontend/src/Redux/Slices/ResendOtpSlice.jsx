import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const resendOtpSlice = createSlice({
  name: "ResendOtp",
  initialState: {
    resendOtpData: null,
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
      state.resendOtpData = action.payload;
    },
    ResendOTPFailure: (state, action) => {
      state.loading = false;
      state.otpError = action.payload;
    },
    ResendResetOTPState: (state) => {
      state.resendOtpData = null;
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
} = resendOtpSlice.actions;

export const resendOtp = (email) => async (dispatch) => {
  dispatch(ResendOTPRequest());

  try {
    const response = await axios.post(
      `http://localhost:5000/User/resendOtp`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    dispatch(ResendOTPSuccess(response.data));
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

export default resendOtpSlice.reducer;
