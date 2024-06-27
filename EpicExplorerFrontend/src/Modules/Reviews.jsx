import image from "../images/man-user-circle-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { showReviewStart } from "../Redux/Slices/TourPackagesSlice";
const Reviews = () => {
  const [Reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const { Review } = useSelector((state) => state.TourPackage);

  useEffect(() => {
    dispatch(showReviewStart());
  }, [dispatch]);

  useEffect(() => {
    if (Review) {
      if (Review.allReviews) {
        setReviews(Review.allReviews.slice(0, 3));
      }
    }
  }, [Review]);

  return (
    <div className="flex flex-col gap-y-20 w-full h-auto mt-16 items-center justify-center">
      <h1 className="text-white text-lg smd:text-5xl font-joining bg-[#206eff] p-6 rounded-lg shadow-lg shadow-fade-black">
        Reviews
      </h1>
      <div className="flex flex-col justify-center items-center space-y-10 h-screen p-12 w-[100%] smd:w-[80%]">
        {Reviews.map((review, index) => (
          <div
            className="bg-[#206eff] border-2 border-[#3654ff] p-4 rounded-xl shadow-lg shadow-fade-black"
            key={index}
          >
            <div className="flex flex-col gap-y-4 items-center mb-4">
              <div className="rounded-full overflow-hidden mr-4">
                <img
                  src={review.image ? review.image : image}
                  alt="image"
                  className="w-12 h-12"
                />
              </div>
              <div className="flex flex-col gap-y-2 justify-center items-center">
                <h2 className="text-sm smd:text-xl text-white font-radios">
                  {review.name}
                </h2>
                <h2 className="text-sm smd:text-xl text-white font-radios ">
                  Amazing thoughts on {review.reviewedService}
                </h2>
              </div>
            </div>
            <p className="text-white font-radios text-center smd:text-lg text-sm">
              “{review.words}”
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
