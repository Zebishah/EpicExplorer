import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userInfoSlice = createSlice({
  name: "userInfoSearch",
  initialState: {
    toursBooked: null,
    transportsBooked: null,
    hotelsBooked: null,
    transactions: null,
    notifications: [],
    loading: false,
    errorSearch: null,
  },
  reducers: {
    userSearchRequest: (state) => {
      state.loading = true;
      state.errorSearch = null;
    },
    userToursSuccess: (state, action) => {
      state.loading = false;
      state.toursBooked = action.payload;
    },
    userTransportSuccess: (state, action) => {
      state.loading = false;
      state.transportsBooked = action.payload;
    },
    userHotelsSuccess: (state, action) => {
      state.loading = false;
      state.hotelsBooked = action.payload;
    },
    userTransactionsSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    userNotificationSuccess: (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
    },
    userSearchFailure: (state, action) => {
      state.loading = false;
      state.errorSearch = action.payload;
    },
    resetUserSearchState: (state) => {
      state.toursBooked = null;
      state.transportsBooked = null;
      state.hotelsBooked = null;
      state.transactions = null;
      state.errorSearch = null;
      state.loading = false;
    },
  },
});

export const {
  userSearchRequest,
  userToursSuccess,
  userTransportSuccess,
  userHotelsSuccess,
  userTransactionsSuccess,
  userNotificationSuccess,
  userSearchFailure,
  resetUserSearchState,
} = userInfoSlice.actions;

export const userBookedTours = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/User/toursBooked`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(userToursSuccess(response.data));
  } catch (errorSearch) {
    dispatch(
      userSearchFailure(
        errorSearch.response ? errorSearch.response.data : errorSearch.message
      )
    );
    console.log(
      "errorSearch:",
      errorSearch.response ? errorSearch.response.data : errorSearch.message
    );
  }
};

export const userBookedTransport = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/User/transportBooked`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(userTransportSuccess(response.data));
  } catch (errorSearch) {
    dispatch(
      userSearchFailure(
        errorSearch.response ? errorSearch.response.data : errorSearch.message
      )
    );
    console.log(
      "errorSearch:",
      errorSearch.response ? errorSearch.response.data : errorSearch.message
    );
  }
};

export const userBookedHotels = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/User/RoomsBooked`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(userHotelsSuccess(response.data));
  } catch (errorSearch) {
    dispatch(
      userSearchFailure(
        errorSearch.response ? errorSearch.response.data : errorSearch.message
      )
    );
    console.log(
      "errorSearch:",
      errorSearch.response ? errorSearch.response.data : errorSearch.message
    );
  }
};

export const userTransactions = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/User/userTotalTransactions`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(userTransactionsSuccess(response.data));
  } catch (errorSearch) {
    dispatch(
      userSearchFailure(
        errorSearch.response ? errorSearch.response.data : errorSearch.message
      )
    );
    console.log(
      "errorSearch:",
      errorSearch.response ? errorSearch.response.data : errorSearch.message
    );
  }
};

export const userNotifications = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/Notification/getUserNotifications`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(userNotificationSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export default userInfoSlice.reducer;
