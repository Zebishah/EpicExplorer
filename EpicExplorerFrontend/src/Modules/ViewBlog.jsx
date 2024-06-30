import { useLocation, useNavigate } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { showBlogsById } from "../Redux/Slices/showAccommodationsSlice";
import { useEffect, useState } from "react";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
import image from "../images/jed-villejo-8y0VL09lDXM-unsplash.jpg";
const ViewBlog = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [Blogs, setBlogs] = useState({});
  // const [FamilyTours, setFamilyTours] = useState([]);

  const dispatch = useDispatch();
  const { Blog } = useSelector((state) => state.showAccommodations);
  useEffect(() => {
    dispatch(showBlogsById(id));
  }, [dispatch]);

  useEffect(() => {
    if (Blog) {
      if (Blog.blogs) {
        setBlogs(Blog.blogs);
        console.log(Blogs);
      }
    }
  }, [Blog]);
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };
  return (
    <div
      className="flex flex-col gap-y-44 min-h-screen"
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-blue-600 text-white shadow-lg shadow-fade-black p-4 rounded-lg">
        <div className="max-w-3xl mx-auto">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2 text-white">
              A Majestic Journey of {Blogs.name}
            </h1>
            <p className="text-sm text-white">
              Published on{" "}
              <time dateTime="2022-04-05"> {formatDate(Blogs.createdAt)}</time>
            </p>
          </div>
          <img
            src={image}
            alt="Featured image"
            className="w-full h-auto mb-8"
          />
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto  ">
            <p>{Blogs.words}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ViewBlog;
