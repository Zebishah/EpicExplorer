import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userBookingSlice = createSlice({
  name: "userBookings",
  initialState: {
    tourBooking: [],
    tourBookingDet: [],
    hotelBooking: [],
    hotelBookingDet: [],
    transportBooking: [],
    transportBookingDet: [],
    tourPayment: [],
    tourPaymentDet: [],
    hotelPayment: [],
    hotelPaymentDet: [],
    transportPayment: [],
    transportPaymentDet: [],
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
    tourBookingDetSuccess: (state, action) => {
      state.loading = false;
      state.tourBookingDet = action.payload;
    },
    hotelBookingSuccess: (state, action) => {
      state.loading = false;
      state.hotelBooking = action.payload;
    },
    hotelBookingDetSuccess: (state, action) => {
      state.loading = false;
      state.hotelBookingDet = action.payload;
    },
    transportBookingSuccess: (state, action) => {
      state.loading = false;
      state.transportBooking = action.payload;
    },
    transportBookingDetSuccess: (state, action) => {
      state.loading = false;
      state.transportBookingDet = action.payload;
    },
    tourPaymentSuccess: (state, action) => {
      state.loading = false;
      state.tourPayment = action.payload;
    },
    tourPaymentDetSuccess: (state, action) => {
      state.loading = false;
      state.tourPaymentDet = action.payload;
    },
    hotelPaymentSuccess: (state, action) => {
      state.loading = false;
      state.hotelPayment = action.payload;
    },
    hotelPaymentDetSuccess: (state, action) => {
      state.loading = false;
      state.hotelPaymentDet = action.payload;
    },
    transportPaymentSuccess: (state, action) => {
      state.loading = false;
      state.transportPayment = action.payload;
    },
    transportPaymentDetSuccess: (state, action) => {
      state.loading = false;
      state.transportPaymentDet = action.payload;
    },
    userSearchFailure: (state, action) => {
      state.loading = false;
      state.errorSearch = action.payload;
    },
    resetUserSearchState: (state) => {
      state.tourBooking = [];
      state.hotelBooking = [];
      state.transportBooking = [];
      state.tourBookingDet = [];
      state.hotelBookingDet = [];
      state.errorSearch = null;
      state.loading = false;
    },
  },
});

export const {
  userSearchRequest,
  tourBookingSuccess,
  hotelBookingSuccess,
  tourPaymentSuccess,
  tourPaymentDetSuccess,
  transportPaymentSuccess,
  transportPaymentDetSuccess,
  hotelPaymentSuccess,
  hotelPaymentDetSuccess,
  tourBookingDetSuccess,
  hotelBookingDetSuccess,
  transportBookingSuccess,
  transportBookingDetSuccess,
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
export const userTourPayment = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/Bill/getUserTourBill`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(tourPaymentSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const userHotelPayment = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/Bill/getUserHotelBill`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(hotelPaymentSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const userTransportPayment = () => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await axios.post(
      `http://localhost:5000/Bill/getUserTransportBill`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(transportPaymentSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const tourBookingDetail = (id) => async (dispatch) => {
  dispatch(userSearchRequest());
  console.log(id);
  try {
    const response = await axios.post(
      `http://localhost:5000/Tour/searchTour`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(tourBookingDetSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const HotelBookingDetail = (id) => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `http://localhost:5000/Room/searchRoomById`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    dispatch(hotelBookingDetSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const transportBookingDetail = (id) => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `http://localhost:5000/Transport/searchTransportById`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    dispatch(transportBookingDetSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const tourPaymentDetail = (id) => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `http://localhost:5000/Bill/searchTourBillFId`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    dispatch(tourPaymentDetSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const HotelPaymentDetail = (id) => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `http://localhost:5000/Bill/searchHotelBillFId`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    dispatch(hotelPaymentDetSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const transportPaymentDetail = (id) => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `http://localhost:5000/Bill/searchTransportBillFId`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    dispatch(transportPaymentDetSuccess(response.data));
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
