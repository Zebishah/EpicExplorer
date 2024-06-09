import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgetPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    forgotPasswordData: null,
    updatePasswordData: null,
    changePasswordData: null,
    loading: false,
    error: null,
  },
  reducers: {
    ForgotPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    ForgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.forgotPasswordData = action.payload;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.updatePasswordData = action.payload;
    },
    changePasswordSuccess: (state, action) => {
      state.loading = false;
      state.changePasswordData = action.payload;
    },
    ForgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetFPasswordState: (state) => {
      state.forgotPasswordData = null;
      state.error = null;
      state.loading = false;
      state.updatePasswordData = null;
      state.changePasswordData = null;
    },
  },
});

export const {
  ForgotPasswordRequest,
  ForgotPasswordSuccess,
  updatePasswordSuccess,
  changePasswordSuccess,
  ForgotPasswordFailure,
  resetFPasswordState,
} = forgetPasswordSlice.actions;

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(ForgotPasswordRequest());

  try {
    const response = await axios.post(
      `http://localhost:5000/User/forgetPassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    dispatch(ForgotPasswordSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(ForgotPasswordFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const updatePasswordUser = (email, hash, password) => async (
  dispatch
) => {
  dispatch(ForgotPasswordRequest());
  const token = localStorage.getItem("jwtToken");
  try {
    const response = await axios.post(
      `http://localhost:5000/User/resetPassword`,
      { email, hash, password },
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(updatePasswordSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(ForgotPasswordFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const changeUserPassword = (
  oldPassword,
  newPassword,
  confirmPassword
) => async (dispatch) => {
  dispatch(ForgotPasswordRequest());
  const token = localStorage.getItem("jwtToken");
  try {
    const response = await axios.post(
      `http://localhost:5000/User/updatePassword`,
      { oldPassword, newPassword, confirmPassword },
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );
    console.log(response.data);
    dispatch(changePasswordSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(ForgotPasswordFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const userBookedHotels = () => async (dispatch) => {
  dispatch(ForgotPasswordRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/User/updatePassword`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(changePasswordSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(ForgotPasswordFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export default forgetPasswordSlice.reducer;
