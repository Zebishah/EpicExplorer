import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userBookingSlice = createSlice({
  name: "userBookings",
  initialState: {
    tourBooking: [],
    hotelBooking: [],
    transportBooking: [],
    loading: false,
    errorSearch: null,
  },
  reducers: {
    userSearchRequest: (state) => {
      state.loading = true;
      state.errorSearch = null;
    },
    tourBookingSuccess: (state, action) => {
      state.loading = false;
      state.tourBooking = action.payload;
    },
    hotelBookingSuccess: (state, action) => {
      state.loading = false;
      state.hotelBooking = action.payload;
    },
    transportBookingSuccess: (state, action) => {
      state.loading = false;
      state.transportBooking = action.payload;
    },
    userSearchFailure: (state, action) => {
      state.loading = false;
      state.errorSearch = action.payload;
    },
    resetUserSearchState: (state) => {
      state.tourBooking = [];
      state.hotelBooking = [];
      state.transportBooking = [];
      state.errorSearch = null;
      state.loading = false;
    },
  },
});

export const {
  userSearchRequest,
  tourBookingSuccess,
  hotelBookingSuccess,
  transportBookingSuccess,
  userSearchFailure,
  resetUserSearchState,
} = userBookingSlice.actions;

export const userTourBookings = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/User/TourHistory`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(tourBookingSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const userHotelBookings = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/User/HotelHistory`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(hotelBookingSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const userTransportBooking = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/User/TransportHistory`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(transportBookingSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export default userBookingSlice.reducer;
