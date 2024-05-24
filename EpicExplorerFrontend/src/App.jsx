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
import Bookings from "./Modules/Bookings";
import Favorites from "./Modules/Favorites";
import UserProfile from "./Modules/UserProfile";
import Dashboard from "./Modules/Dashboard";
import UserBookingsRecord from "./Modules/UserBookingsRecord";
import ChangePassword from "./Modules/ChangePassword";
import Notifications from "./Modules/Notifications";
import CheckoutForm from "./Modules/CheckoutForm";
import RequestBalance from "./Modules/RequestBalance";
import Confirmation from "./Modules/Confirmation";
import Ticket from "./Modules/Ticket";
import PaymentSuccess from "./Modules/PaymentSuccess";
import OTP from "./Modules/OTP";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/OTP" element={<OTP />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/UserBooking" element={<UserBookingsRecord />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/Bookings" element={<Bookings />} />
          <Route path="/Favorites" element={<Favorites />} />
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
          <Route path="/requestBalance" element={<RequestBalance />} />
          <Route path="/CheckoutForm" element={<CheckoutForm />} />
          <Route path="/Confirmation" element={<Confirmation />} />
          <Route path="/Ticket" element={<Ticket />} />
          <Route path="/paymentConfirmation" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
