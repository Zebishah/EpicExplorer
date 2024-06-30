import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { showBlogs } from "../Redux/Slices/showAccommodationsSlice";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";
const Blogs = () => {
  const [Blogs, setBlogs] = useState([]);
  // const [FamilyTours, setFamilyTours] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.showAccommodations);

  useEffect(() => {
    dispatch(showBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (blogs) {
      if (blogs.blogs) {
        setBlogs(blogs.blogs);
        console.log(Blogs);
      }
    }
  }, [blogs]);
  // const seeMore = () => {
  //   navigate(`/AllTourPackages`);
  // };
  const viewBlog = (id) => {
    navigate(`/ViewBlog?id=${encodeURIComponent(id)}`);
  };
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };
  return (
    <div
      className="flex flex-col gap-y-32"
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      <Navbar />
      <section className="py-24 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-14">
            Our popular blogs
          </h2>
          <div className="flex justify-center mb-14 gap-y-10 lg:gap-y-10 flex-wrap lg:flex-row lg:justify-between lg:gap-x-8 ">
            {Blogs.map((blog, index) => (
              <div
                className="group flex flex-col gap-y-4 cursor-pointer w-full max-lg:max-w-xl lg:w-[30%] border bg-white shadow-lg shadow-fade-black rounded-lg p-4 border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600"
                key={index}
              >
                <div className="flex items-center">
                  <img
                    src="https://pagedone.io/asset/uploads/1696244619.png"
                    alt="Alexa image"
                    className="rounded-lg w-full"
                  />
                </div>
                <div className="flex flex-col gap-y-5">
                  <h4 className="text-gray-900 font-radios">
                    A Majestic Journey of {blog.name}
                  </h4>
                  <h4 className=" text-gray-900 text-sm line-clamp-4 text-start">
                    {blog.words}
                  </h4>
                  <button
                    className="bg-blue-600 text-white p-3 shadow-lg rounded-lg "
                    onClick={() => viewBlog(blog._id)}
                  >
                    View Blog
                  </button>
                  <div className="flex items-center justify-between font-medium">
                    <h6 className="text-sm text-gray-500">{blog.writer}</h6>
                    <span className="text-sm text-indigo-600">
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blogs;
