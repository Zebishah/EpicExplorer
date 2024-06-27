import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showReviewStart } from "../Redux/Slices/TourPackagesSlice";
const ReviewShowingTour = () => {
  const [rating, setRating] = useState(3);
  const [Reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const { TourReviews } = useSelector((state) => state.TourPackage);

  useEffect(() => {
    dispatch(showReviewStart());
  }, [dispatch]);

  useEffect(() => {
    if (TourReviews) {
      if (TourReviews.getReview) {
        setReviews(TourReviews.getReview.slice(0, 3));
      }
    }
  }, [TourReviews]);

  //   const reviews = [
  //     {
  //       name: "Emma Davis",
  //       date: "20 Mar, 2024",
  //       review:
  //         "I recently had the opportunity to explore Pagedone's UI design system, and it left a lasting impression on my workflow. The system seamlessly blends user-friendly features with a robust set of design components, making it a go-to for creating visually stunning and consistent interfaces.",
  //       likes: 8,
  //       comments: 2,
  //       img: "https://via.placeholder.com/50", // replace with actual image URL
  //     },
  //     {
  //       name: "Anuj Mishra",
  //       date: "16 Dec, 2023",
  //       review:
  //         "I recently had the opportunity to explore Pagedone's UI design system, and it left a lasting impression on my workflow. The system seamlessly blends user-friendly features with a robust set of design components, making it a go-to for creating visually stunning and consistent interfaces.",
  //       likes: 10,
  //       comments: 5,
  //       img: "https://via.placeholder.com/50", // replace with actual image URL
  //     },
  //     {
  //       name: "Robert Karmazov",
  //       date: "24 Oct, 2023",
  //       review:
  //         "I recently had the opportunity to explore Pagedone's UI design system, and it left a lasting impression on my workflow. The system seamlessly blends user-friendly features with a robust set of design components, making it a go-to for creating visually stunning and consistent interfaces.",
  //       likes: 4,
  //       comments: 0,
  //       img: "https://via.placeholder.com/50", // replace with actual image URL
  //     },
  //   ];
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-6 text-white bg-[#206eff] p-3 rounded-lg shadow-lg">
        Customer Reviews
      </h2>
      {Reviews.map((review, index) => (
        <div
          key={index}
          className="bg-white shadow-black shadow-lg rounded-lg p-6 mb-6 flex flex-col md:flex-row items-start md:items-center"
        >
          <img
            src={review.pic}
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
              </div>
              <span className="text-gray-500 text-sm">{review.date}</span>
            </div>
            <p className="text-gray-700 mb-4">{review.review}</p>
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
