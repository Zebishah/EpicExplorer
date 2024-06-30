import Navbar from "./Navbar";
import image from "../images/gregory-dalleau-wAOKtzvZ350-unsplash.jpg";
import image1 from "../images/jed-villejo-8y0VL09lDXM-unsplash.jpg";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  showAllRooms,
  showFilterRoom,
} from "../Redux/Slices/showAccommodationsSlice";
import { useNavigate } from "react-router";
import image2 from "../images/vecteezy_blue-trendy-background-design-template-for-banner-poster_.jpg";

const Room = () => {
  const [Rooms, setRooms] = useState([]);
  const [Hotel, setHotel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allRooms, filterRooms } = useSelector(
    (state) => state.showAccommodations
  );
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleCheckboxChange = (event, setState, state) => {
    const { value, checked } = event.target;
    if (checked) {
      setState([...state, value]);
    } else {
      setState(state.filter((item) => item !== value));
    }
  };
  useEffect(() => {
    dispatch(showAllRooms());
  }, [dispatch]);

  useEffect(() => {
    if (allRooms && allRooms.rooms) {
      setRooms(allRooms.rooms);
      setHotel(allRooms.hotel);
      console.log(allRooms);
    }
  }, [allRooms]);
  useEffect(() => {
    if (filterRooms && filterRooms.rooms) {
      setRooms(filterRooms.rooms);
      console.log(filterRooms.rooms);
    }
    if (
      selectedPrices.length === 0 &&
      selectedCategories.length === 0 &&
      selectedLocations.length === 0 &&
      selectedMembers.length === 0 &&
      searchTerm === ""
    ) {
      console.log("hey");
      if (allRooms && allRooms.rooms) {
        setRooms(allRooms.rooms);
      }
    } else {
      if (filterRooms && filterRooms.rooms) {
        setRooms(filterRooms.rooms);
        console.log(filterRooms.rooms);
      }
    }
  }, [
    filterRooms,
    selectedPrices,
    selectedCategories,
    selectedMembers,
    selectedLocations,
    searchTerm,
  ]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(
      showFilterRoom(
        selectedCategories,
        selectedPrices,
        selectedMembers,
        selectedLocations,
        searchTerm
      )
    );
  };

  const search = () => {
    console.log(
      selectedPrices,
      selectedCategories,
      selectedMembers,
      selectedLocations
    );
    dispatch(
      showFilterRoom(
        selectedCategories,
        selectedPrices,
        selectedMembers,
        selectedLocations,
        searchTerm
      )
    );
  };

  let bookTour = (id) => {
    navigate(`/BookTour?id=${encodeURIComponent(id)}`);
  };
  const totalPages = Math.ceil(Rooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRooms = Rooms.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div
      className="w-[100%]"
      style={{
        backgroundImage: `url(${image2})`,
      }}
    >
      <Navbar />
      <div className="relative w-full mt-20 h-[35vh]">
        <img
          src={image}
          alt="image"
          className="w-full h-full object-cover bg-center bg-no-repeat"
        />
        <div className="absolute inset-0 flex items-center justify-center w-full">
          <h2 className="text-white text-6xl font-radios font-bold p-4 rounded">
            All Rooms
          </h2>
        </div>
      </div>
      <div className="bg-dark flex-col lg:flex-row gap-x-6 p-8 min-h-screen flex items-center justify-center overflow-hidden w-full">
        <div className=" mx-auto w-full">
          <div className="text-center bg-[#3654ff] py-4 rounded mb-8 text-white">
            <h1 className="text-2xl font-bold">List of All Rooms</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-[20%] p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Filters</h3>
              <div>
                <h4 className="font-semibold mb-2 ">price</h4>
                {[
                  "2000-3000",
                  "3000-4000",
                  "4000-5000",
                  "6000-7000",
                  "16000-18000",
                  "20000-30000",
                  "30000-40000",
                  "40000-50000",
                  "50000-60000",
                  "60000-70000",
                  "70000-80000",
                ].map((price) => (
                  <div key={price}>
                    <input
                      type="checkbox"
                      id={price}
                      name={price}
                      value={price}
                      className="mt-3"
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          setSelectedPrices,
                          selectedPrices
                        )
                      }
                    />
                    <label className="ml-2 " htmlFor={price}>
                      {price}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Category</h4>
                {[
                  "Suite Rooms",
                  "Couple Rooms",
                  "Vip Rooms",
                  "Simple Rooms",
                  "Heavy Rooms",
                ].map((category) => (
                  <div key={category}>
                    <input
                      type="checkbox"
                      id={category}
                      name={category}
                      value={category}
                      className="mt-3"
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          setSelectedCategories,
                          selectedCategories
                        )
                      }
                    />
                    <label className="ml-2" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Members Limit</h4>
                {["2", "3", "4", "5", "7", "8", "9"].map((Members) => (
                  <div key={Members}>
                    <input
                      type="checkbox"
                      id={Members}
                      name={Members}
                      value={Members}
                      className="mt-3"
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          setSelectedMembers,
                          selectedMembers
                        )
                      }
                    />
                    <label className="ml-2" htmlFor={Members}>
                      {Members} members
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Room Location</h4>
                {[
                  "BeachFront",
                  "balconyfront",
                  "TopFloor",
                  "LowFloor",
                  "Vip Location",
                  "Entry Location",
                ].map((location) => (
                  <div key={location}>
                    <input
                      type="checkbox"
                      id={location}
                      name={location}
                      value={location}
                      className="mt-3"
                      onChange={(e) =>
                        handleCheckboxChange(
                          e,
                          setSelectedLocations,
                          selectedLocations
                        )
                      }
                    />
                    <label className="ml-2" htmlFor={location}>
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className=" flex flex-col gap-y-3 w-full lg:w-3/4">
              <div className="text-center bg-[#3654ff] py-4 rounded mb-8 text-white">
                <h1 className="text-2xl font-bold">Search for any Room</h1>
              </div>
              <div className=" flex gap-x-1 mb-6">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full px-4 py-4 rounded-lg shadow-lg "
                  placeholder="Search for tours..."
                />
                <button
                  className="bg-[#3654ff] text-white px-4 py-2 shadow-lg shadow-fade-black rounded-md"
                  onClick={search}
                >
                  Search
                </button>
              </div>

              <div className="flex flex-wrap gap-8 justify-center">
                {currentRooms.length > 0 &&
                  currentRooms.map((tour, index) => (
                    <div
                      className="bg-[#3654ff] w-full max-w-sm rounded-lg overflow-hidden font-[sans-serif] shadow-lg shadow-black"
                      key={index}
                    >
                      <img src={image1} className="w-full" alt="Car" />
                      <div className="px-4 py-6 border-[#3654ff] border-2 border-t-0">
                        <div className="flex flex-row justify-between">
                          <h3 className="text-white text-xl font-radios">
                            {tour.name}
                          </h3>
                          <h3 className="text-white text-xl font-radios">
                            {tour.prices}
                          </h3>
                        </div>
                        <p className="mt-4 text-sm text-white font-radios">
                          {tour.description}
                        </p>
                        <p className="mt-4 text-sm text-white font-radios">
                          Hotel: {tour.hotelName}
                        </p>
                        <div className="flex justify-center mt-6">
                          <button
                            type="button"
                            className="px-6 py-2.5 rounded text-sm tracking-wider font-radios border-none outline-none bg-white text-[#3654ff] "
                            onClick={() => bookTour(tour._id)}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex justify-center mt-8">
                <ul className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} className="mx-1">
                      <button
                        className={`px-3 py-1 rounded ${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Room;
