import { useEffect, useState } from "react";
import Rating from "react-rating-stars-component";
import { addReviews } from "../Redux/Slices/ShowTourDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import {
  getErrorMessage,
  validateEmail,
  validateText,
} from "../utils/validation";
const ReviewForm = ({ id }) => {
  const dispatch = useDispatch();
  const { Review, errorSearch } = useSelector((state) => state.TourDetail);
  // State to store form inputs
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    review: "",
    rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleRatingChange = (newRating) => {
    setReviewData({ ...reviewData, rating: newRating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameError = validateText("Name", reviewData.name, { min: 2, max: 100 });
    const emailError = validateEmail(reviewData.email);
    const reviewError = validateText("Review", reviewData.review, {
      min: 10,
      max: 2000,
    });
    const ratingError = reviewData.rating
      ? ""
      : "Please choose a rating from 1 to 5 stars.";
    const firstError = [nameError, emailError, reviewError, ratingError].find(
      Boolean
    );
    if (firstError) {
      toast.error(firstError);
      return;
    }
    dispatch(
      addReviews(
        { id },
        reviewData.name.trim(),
        reviewData.email.trim().toLowerCase(),
        reviewData.review.trim(),
        reviewData.rating
      )
    );
    setReviewData({
      name: "",
      email: "",
      review: "",
      rating: 0,
    });
  };
  useEffect(() => {
    if (Review) {
      if (Review.success == true) {
        toast.success("Review submitted successfully");
      }
      console.log(Review.existingReview);
    }
  }, [Review]);
  useEffect(() => {
    if (errorSearch) {
      toast.error(getErrorMessage(errorSearch, "Unable to submit the review."));
    }
  }, [errorSearch]);

  return (
    <>
      <ToastContainer />
      <div className="mx-auto bg-white p-8 rounded-md shadow-lg shadow-black mt-10 mb-10 w-[60%]">
        <h2 className="text-2xl text-blue-600 font-semibold mb-4 text-center">
          Leave a Review
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-bold font-radios text-[#206eff]"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={reviewData.name}
              onChange={handleInputChange}
              minLength={2}
              maxLength={100}
              placeholder="Write your name here.."
              required
              className="p-4 block w-full placeholder:text-white text-white border-gray-300 bg-[#5aa7ff] rounded-md shadow-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-4"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-bold font-radios text-[#206eff]"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={reviewData.email}
              onChange={handleInputChange}
              maxLength={254}
              placeholder="Write your email here.."
              required
              className="p-4 block w-full placeholder:text-white text-white border-gray-300 bg-[#5aa7ff] rounded-md shadow-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-4"
            />
          </div>

          <div>
            <label
              htmlFor="review"
              className="block text-lg font-bold font-radios text-[#206eff]"
            >
              Review
            </label>
            <textarea
              id="review"
              name="review"
              value={reviewData.review}
              onChange={handleInputChange}
              minLength={10}
              maxLength={2000}
              required
              rows="3"
              placeholder="Write a Review..."
              className="p-4 block w-full placeholder:text-white text-white border-gray-300 bg-[#5aa7ff] rounded-md shadow-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-4"
            ></textarea>
          </div>
          <div>
            <label className="block text-lg font-bold font-radios text-[#206eff]">
              Rating (out of 5 stars)
            </label>
            <Rating
              count={5}
              value={reviewData.rating}
              onChange={handleRatingChange}
              size={40}
              activeColor="#206eff"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#206eff] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

ReviewForm.propTypes = {
  id: PropTypes.string,
};

export default ReviewForm;
