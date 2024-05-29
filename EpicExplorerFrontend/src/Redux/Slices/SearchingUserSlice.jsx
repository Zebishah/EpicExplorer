import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const searchingUserSlice = createSlice({
  name: "userSearch",
  initialState: {
    dataSearch: null,
    loading: false,
    errorSearch: null,
  },
  reducers: {
    userSearchRequest: (state) => {
      state.loading = true;
      state.errorSearch = null;
    },
    userSearchSuccess: (state, action) => {
      state.loading = false;
      state.dataSearch = action.payload;
    },
    userSearchFailure: (state, action) => {
      state.loading = false;
      state.errorSearch = action.payload;
    },
    resetUserSearchState: (state) => {
      state.dataSearch = null;
      state.errorSearch = null;
      state.loading = false;
    },
  },
});

export const {
  userSearchRequest,
  userSearchSuccess,
  userSearchFailure,
  resetUserSearchState,
} = searchingUserSlice.actions;

export const userSearchFrEmail = (email) => async (dispatch) => {
  dispatch(userSearchRequest());
  try {
    const response = await axios.post(
      `http://localhost:5000/User/userInfoFrEmail`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(userSearchSuccess(response.data));
  } catch (errorSearch) {
    dispatch(
      userSearchFailure(
        errorSearch.response
          ? errorSearch.response.dataSearch
          : errorSearch.message
      )
    );
    console.log(
      "errorSearch:",
      errorSearch.response
        ? errorSearch.response.dataSearch
        : errorSearch.message
    );
  }
};

export const userSearchFrToken = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/User/userInfo`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(userSearchSuccess(response.data));
  } catch (errorSearch) {
    dispatch(
      userSearchFailure(
        errorSearch.response
          ? errorSearch.response.dataSearch
          : errorSearch.message
      )
    );
    console.log(
      "errorSearch:",
      errorSearch.response
        ? errorSearch.response.dataSearch
        : errorSearch.message
    );
  }
};

export default searchingUserSlice.reducer;
