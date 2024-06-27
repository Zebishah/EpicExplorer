import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tourDetailSlice = createSlice({
  name: "TourDetail",
  initialState: {
    tourDetail: {
      tour: [],
      tourServiceIt: [],
    },
    relatedTour: [],
    RelatedBlogs: [],
    TourReviews: [],
    Review: [],
    loading: false,
    errorSearch: null,
  },
  reducers: {
    userSearchRequest: (state) => {
      state.loading = true;
      state.errorSearch = null;
    },
    tourDetailSuccess: (state, action) => {
      state.loading = false;
      state.tourDetail = action.payload;
    },
    relatedTourSuccess: (state, action) => {
      state.loading = false;
      state.relatedTour = action.payload;
    },
    RelatedBlogsSuccess: (state, action) => {
      state.loading = false;
      state.RelatedBlogs = action.payload;
    },
    TourReviewsSuccess: (state, action) => {
      state.loading = false;
      state.TourReviews = action.payload;
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
  tourDetailSuccess,
  relatedTourSuccess,
  RelatedBlogsSuccess,
  TourReviewsSuccess,
  ReviewSuccess,
  userSearchFailure,
  resetUserSearchState,
} = tourDetailSlice.actions;

export const showTourDetail = ({ id }) => async (dispatch) => {
  dispatch(userSearchRequest());
  const token = localStorage.getItem("jwtToken");
  const newId = id.toString();
  try {
    const response = await axios.post(
      `http://localhost:5000/Tour/openTour/${newId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
        },
      }
    );

    dispatch(tourDetailSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showRelatedTours = ({ id }) => async (dispatch) => {
  dispatch(userSearchRequest());
  id = id.toString();
  try {
    const response = await axios.post(
      `http://localhost:5000/Tour/RelatedTour`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(relatedTourSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showRelatedBlogs = ({ id }) => async (dispatch) => {
  dispatch(userSearchRequest());
  id = id.toString();
  try {
    const response = await axios.post(
      `http://localhost:5000/Blog/getTourBlog`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(RelatedBlogsSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const showTourReviews = ({ id }) => async (dispatch) => {
  dispatch(userSearchRequest());
  id = id.toString();
  try {
    const response = await axios.post(
      `http://localhost:5000/Review/getTourReviews`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(TourReviewsSuccess(response.data));
  } catch (errorSearch) {
    const errorMessage =
      errorSearch.response && errorSearch.response.data
        ? errorSearch.response.data.message
        : errorSearch.message;
    dispatch(userSearchFailure(errorMessage));
    console.log("errorSearch:", errorMessage);
  }
};
export const addReviews = ({ id }, name, email, words, rating) => async (
  dispatch
) => {
  dispatch(userSearchRequest());
  id = id.toString();
  const token = localStorage.getItem("jwtToken");
  try {
    const response = await axios.post(
      `http://localhost:5000/Review/addReviews`,
      { id, name, email, words, rating },
      {
        headers: {
          "Content-Type": "application/json",
          auth_token: token,
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
export default tourDetailSlice.reducer;
