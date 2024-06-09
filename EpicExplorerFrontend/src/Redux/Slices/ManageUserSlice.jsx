import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const manageUserSlice = createSlice({
  name: "manageUser",
  initialState: {
    updatedDated: null,
    userFavorite: [],
    loading: false,
    errorSearch: null,
  },
  reducers: {
    ManageUserRequest: (state) => {
      state.loading = true;
      state.errorSearch = null;
    },
    ManageUserSuccess: (state, action) => {
      state.loading = false;
      state.updatedDated = action.payload;
    },
    ManageUserFavoriteSuccess: (state, action) => {
      state.loading = false;
      state.userFavorite = action.payload;
    },
    ManageUserFailure: (state, action) => {
      state.loading = false;
      state.errorSearch = action.payload;
    },
    resetManageState: (state) => {
      state.updatedDated = null;
      state.userFavorite = [];
      state.errorSearch = null;
      state.loading = false;
    },
  },
});

export const {
  ManageUserRequest,
  ManageUserSuccess,
  ManageUserFavoriteSuccess,
  ManageUserFailure,
  resetManageState,
} = manageUserSlice.actions;

export const updateUser = (formData) => async (dispatch) => {
  dispatch(ManageUserRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/User/updateUser`,
      {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        phoneNo: formData.phoneNo,
        imageUrl: formData.imageUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(ManageUserSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(ManageUserFailure(errorMessage));
    console.error("Error:", errorMessage);
  }
};

export const getUserFavorite = () => async (dispatch) => {
  dispatch(ManageUserRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/UserFavrt/getUserFavorite`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );
    console.log(response.data);
    dispatch(ManageUserFavoriteSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;
    dispatch(ManageUserFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export default manageUserSlice.reducer;
