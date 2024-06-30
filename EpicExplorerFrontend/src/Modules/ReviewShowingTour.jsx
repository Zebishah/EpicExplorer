import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showTourReviews } from "../Redux/Slices/ShowTourDetailsSlice";
const ReviewShowingTour = (id) => {
  const [Reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const { TourReviews } = useSelector((state) => state.TourDetail);

  useEffect(() => {
    dispatch(showTourReviews(id));
  }, [dispatch]);

  useEffect(() => {
    if (TourReviews) {
      if (TourReviews.getReview) {
        setReviews(TourReviews.getReview.slice(0, 3));
        console.log(TourReviews.getReview);
      }
    }
  }, [TourReviews]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-6 text-white bg-[#206eff] p-3 rounded-lg shadow-lg">
        Customer Reviews
      </h2>
      {Reviews.map((review, index) => (
        <div
          key={index}
          className="bg-white shadow-black shadow-lg rounded-lg p-6 mb-6 flex flex-col md:flex-row items-start md:items-start"
        >
          <img
            src={review.image}
            alt={review.name}
            className="w-12 h-12 rounded-full mr-4 mb-4 md:mb-0"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center flex-col">
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <div className="flex items-center">
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={30}
                    activeColor="#FFD700"
                    isHalf={false}
                    edit={false}
                  />
                </div>
                <h3 className="text-lg font-semibold">
                  {review.reviewedService}
                </h3>
              </div>
              <span className="text-gray-500 text-sm">
                {formatDate(review.createdAt)}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{review.words}</p>
            <div className="flex items-center text-gray-500">
              <div className="flex items-center mr-4">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.172 4.828a4 4 0 010 5.656L3 12h2a1 1 0 011 1v1a1 1 0 011 1h6a1 1 0 011-1v-1a1 1 0 011-1h2l-.172-.516a4 4 0 010-5.656l-.172-.172a4 4 0 00-5.656 0L10 7.172l-.828-.828a4 4 0 00-5.656 0l-.344.344zM6 11l4 4 4-4H6z" />
                </svg>
                {review.likes}
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm4 3h2V7H6v1zm6 0h2V7h-2v1zm-3 0h2V7h-2v1z" />
                </svg>
                {review.comments}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewShowingTour;
