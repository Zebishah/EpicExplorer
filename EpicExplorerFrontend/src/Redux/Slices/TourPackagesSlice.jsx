import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tourPackageSlice = createSlice({
  name: "TourPackage",
  initialState: {
    tourPackage: {
      honeymoonTours: [],
      familyTours: [],
    },
    latestTour: [],
    Review: [],
    loading: false,
    errorSearch: null,
  },
  reducers: {
    userSearchRequest: (state) => {
      state.loading = true;
      state.errorSearch = null;
    },
    tourPackageSuccess: (state, action) => {
      state.loading = false;
      state.tourPackage = action.payload;
    },
    latestTourSuccess: (state, action) => {
      state.loading = false;
      state.latestTour = action.payload;
    },
    ReviewSuccess: (state, action) => {
      state.loading = false;
      state.Review = action.payload;
    },
    userSearchFailure: (state, action) => {
      state.loading = false;
      state.errorSearch = action.payload;
    },
    resetUserSearchState: (state) => {
      (state.tourPackage = []),
        (state.latestTour = []),
        (state.Review = []),
        (state.errorSearch = null);
      state.loading = false;
    },
  },
});

export const {
  userSearchRequest,
  tourPackageSuccess,
  latestTourSuccess,
  ReviewSuccess,
  userSearchFailure,
  resetUserSearchState,
} = tourPackageSlice.actions;

export const showTourPackages = () => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.get(
      `http://localhost:5000/Tour/TourPackages`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(tourPackageSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showLatestTours = () => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.get(
      `http://localhost:5000/Tour/LatestTour`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(latestTourSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showReviewStart = () => async (dispatch) => {
  dispatch(userSearchRequest());

  try {
    const response = await axios.get(
      `http://localhost:5000/Review/getReviews`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(ReviewSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export default tourPackageSlice.reducer;
