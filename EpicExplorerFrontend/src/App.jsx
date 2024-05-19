import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from './Modules/Home';
import StripeMainForm from "./Modules/StripeMainForm";
// import RequestBalance from './Modules/RequestBalance';

import Home from "./Modules/Home";
import SignUpForm from "./Modules/SignUpForm";
import SignInForm from "./Modules/SignInForm";
import LandingPage from "./Modules/LandingPage";
import BookTour from "./Modules/BookTour";
import BookTourBanner from "./Modules/BookTourBanner";
import BookTransport from "./Modules/BookTransport";
import AllTransport from "./Modules/AllTransport";
import AllHotels from "./Modules/AllHotels";
import AllTours from "./Modules/AllTours";
import HotelRelRooms from "./Modules/HotelRelRooms";
import HotelBooking from "./Modules/HotelBooking";
import ContactUs from "./Modules/ContactUs";
import DiscountedTours from "./Modules/DiscountedTours";
import Blogs from "./Modules/Blogs";
import FamilyTour from "./Modules/FamilyTour";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FamilyTour" element={<FamilyTour />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/DiscountedTour" element={<DiscountedTours />} />
          <Route path="/BookTour" element={<BookTour />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AllTransport" element={<AllTransport />} />
          <Route path="/AllHotels" element={<AllHotels />} />
          <Route path="/HotelRelRooms" element={<HotelRelRooms />} />
          <Route path="/AllTours" element={<AllTours />} />
          <Route path="/BookTransport" element={<BookTransport />} />
          <Route path="/BookHotel" element={<HotelBooking />} />
          <Route path="/BookTour" element={<BookTour />} />
          <Route path="/TourBanner" element={<BookTourBanner />} />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/SignIn" element={<SignInForm />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/StripeForm" element={<StripeMainForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
