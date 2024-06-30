import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const showAccommodationSlice = createSlice({
  name: "showAccommodations",
  initialState: {
    tours: [],
    blogs: [],
    Blog: [],
    contact: [],
    allRooms: [],
    room: {
      rooms: [],
      hotel: null,
    },
    hotels: [],
    transport: [],
    discountedTour: [],
    searchedTours: [],
    filterTours: [],
    filterTransport: [],
    filterRooms: [],
    perPageTours: [],
    loading: false,
    errorSearch: null,
  },
  reducers: {
    userSearchRequest: (state) => {
      state.loading = true;
      state.errorSearch = null;
    },

    TourSuccess: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    TransportSuccess: (state, action) => {
      state.loading = false;
      state.transport = action.payload;
    },
    BlogSuccess: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    },
    ViewBlogSuccess: (state, action) => {
      state.loading = false;
      state.Blog = action.payload;
    },
    HotelSuccess: (state, action) => {
      state.loading = false;
      state.hotels = action.payload;
    },
    searchedTourSuccess: (state, action) => {
      state.loading = false;
      state.searchedTours = action.payload;
    },
    filterToursSuccess: (state, action) => {
      state.loading = false;
      state.filterTours = action.payload;
    },
    filterRoomSuccess: (state, action) => {
      state.loading = false;
      state.filterRooms = action.payload;
    },
    filterTransportSuccess: (state, action) => {
      state.loading = false;
      state.filterTransport = action.payload;
    },
    roomSuccess: (state, action) => {
      state.loading = false;
      state.room = action.payload;
    },
    contactSuccess: (state, action) => {
      state.loading = false;
      state.contact = action.payload;
    },

    AllRoomsSuccess: (state, action) => {
      state.loading = false;
      state.allRooms = action.payload;
    },
    discountedTourSuccess: (state, action) => {
      state.loading = false;
      state.discountedTour = action.payload;
    },
    perPageToursSuccess: (state, action) => {
      state.loading = false;
      state.perPageTours = action.payload;
    },
    userSearchFailure: (state, action) => {
      state.loading = false;
      state.errorSearch = action.payload;
    },
    resetUserSearchState: (state) => {
      (state.tours = []), (state.errorSearch = null), (state.loading = false);
    },
  },
});

export const {
  userSearchRequest,
  TourSuccess,
  TransportSuccess,
  HotelSuccess,
  roomSuccess,
  BlogSuccess,
  contactSuccess,
  ViewBlogSuccess,
  AllRoomsSuccess,
  filterRoomSuccess,
  discountedTourSuccess,
  searchedTourSuccess,
  filterToursSuccess,
  filterTransportSuccess,
  perPageToursSuccess,
  userSearchFailure,
  resetUserSearchState,
} = showAccommodationSlice.actions;

export const showTours = () => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.get(
      `http://localhost:5000/Tour/showTour`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(TourSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showBlogs = () => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.get(
      `http://localhost:5000/Blog/getBlog`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(BlogSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const showBlogsById = (id) => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `http://localhost:5000/Blog/getBlogById`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(ViewBlogSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const contactMessage = (firstName, lastName, email, message) => async (
  dispatch
) => {
  dispatch(userSearchRequest());
  let token = localStorage.getItem("jwtToken");
  try {
    const response = await axios.post(
      `http://localhost:5000/User/contactUs`,
      { firstName, lastName, email, message },
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(contactSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const showDiscountedTours = () => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.get(
      `http://localhost:5000/Tour/DiscountedTours`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(discountedTourSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const showHotels = () => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.get(
      `http://localhost:5000/Hotel/showHotel`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(HotelSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showTransport = () => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.get(
      `http://localhost:5000/Transport/showTransport`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(TransportSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showRooms = (id) => async (dispatch) => {
  dispatch(userSearchRequest());
  id = id.toString();
  console.log(id);
  try {
    const response = await axios.post(
      `http://localhost:5000/Hotel/showHotelRooms`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(roomSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showAllRooms = () => async (dispatch) => {
  dispatch(userSearchRequest());
  try {
    const response = await axios.get(
      `http://localhost:5000/Room/showRooms`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(AllRoomsSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const searchTours = () => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.get(
      `http://localhost:5000/Tour/searchTourByName`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(searchedTourSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showFilterTours = (
  type,
  price,
  membersLimit,
  tourLocation,
  name
) => async (dispatch) => {
  dispatch(userSearchRequest());
  console.log(name);
  try {
    const response = await axios.post(
      `http://localhost:5000/Tour/filterTour`,
      { type, price, membersLimit, tourLocation, name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(filterToursSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showFilterRoom = (
  type,
  prices,
  noOfGuests,
  location,
  name
) => async (dispatch) => {
  dispatch(userSearchRequest());
  console.log(name);
  try {
    const response = await axios.post(
      `http://localhost:5000/Room/RoomFilters`,
      { type, prices, noOfGuests, location, name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(filterRoomSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};

export const showFilterTransport = (
  type,
  prices,
  allowedGuests,
  seats,
  carName
) => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `http://localhost:5000/Transport/filterTransport`,
      { type, prices, allowedGuests, seats, carName },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(filterTransportSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const pagination = (page, perPage) => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.post(
      `http://localhost:5000/Tour/perPageTours`,
      { page, perPage },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(perPageToursSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export default showAccommodationSlice.reducer;
