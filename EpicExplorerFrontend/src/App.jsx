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
import OtpPage from "./Modules/OtpPage";
import SignInWithGoogle from "./Modules/SignInWithGoogle";
import BookingOptions from "./Modules/BookingOptions";
import TourBookings from "./Modules/TourBookings";
import TransportBookings from "./Modules/TransportBookings";
import HotelBookings from "./Modules/HotelBookings";
import ForgetPassword from "./Modules/ForgetPassword";
import UpdatePassword from "./Modules/UpdatePassword";
import IndependentOTP from "./Modules/IndependentOTP";

import "react-toastify/dist/ReactToastify.css";
import PaymentOptions from "./Modules/PaymentOptions";
import TourPayments from "./Modules/TourPayments";
import HotelPayments from "./Modules/HotelPayments";
import TransportPayments from "./Modules/TransportPayments";
import TourBookingDet from "./Modules/TourBookingDet";
import HotelBookingDet from "./Modules/HotelBookingDet";
import TransportBookingDet from "./Modules/TransportBookingDet";
import TourPaymentDet from "./Modules/TourPaymentDet";
import HotelPaymentDet from "./Modules/HotelPaymentDet";
import TransportPaymentDet from "./Modules/TransportPaymentDet";
import AllTourPackages from "./Modules/AllTourPackages";
import FamilyPackage from "./Modules/FamilyPackage";
import PersonalPackage from "./Modules/PersonalPackage";
import AllRoom from "./Modules/AllRoom";
import Room from "./Modules/Room";
import HoneyMoonPackages from "./Modules/HoneyMoonPackages";
import ViewBlog from "./Modules/ViewBlog";
import AdminLogin from "./Admin/AdminLogin";
import AdminGate from "./Admin/AdminGate";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminResourcePage from "./Admin/AdminResourcePage";
import AdminSettings from "./Admin/AdminSettings";
import ProtectedRoute from "./auth/ProtectedRoute";
import GuestRoute from "./auth/GuestRoute";

const protectedPage = (element) => <ProtectedRoute>{element}</ProtectedRoute>;
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ViewBlog" element={<ViewBlog />} />
          <Route path="/discountedTour" element={<DiscountedTours />} />
          <Route path="/HoneyMoonPackages" element={<HoneyMoonPackages />} />
          <Route path="/AllTransport" element={<AllTransport />} />
          <Route path="/allRooms" element={<Room />} />
          <Route path="/AllRoom" element={<AllRoom />} />
          <Route path="/AllHotels" element={<AllHotels />} />
          <Route path="/PersonalPackages" element={<PersonalPackage />} />
          <Route path="/FamilyTours" element={<FamilyPackage />} />
          <Route path="/AllTourPackages" element={<AllTourPackages />} />
          <Route
            path="/TransportPaymentDet"
            element={protectedPage(<TransportPaymentDet />)}
          />
          <Route path="/HotelPaymentDet" element={protectedPage(<HotelPaymentDet />)} />
          <Route path="/TourPaymentDet" element={protectedPage(<TourPaymentDet />)} />
          <Route
            path="/TransportBookingDet"
            element={protectedPage(<TransportBookingDet />)}
          />
          <Route path="/HotelBookingDet" element={protectedPage(<HotelBookingDet />)} />
          <Route path="/TourBookingDet" element={protectedPage(<TourBookingDet />)} />
          <Route path="/tourPayment" element={protectedPage(<TourPayments />)} />
          <Route path="/hotelPayment" element={protectedPage(<HotelPayments />)} />
          <Route path="/transportPayment" element={protectedPage(<TransportPayments />)} />
          <Route path="/PaymentOptions" element={protectedPage(<PaymentOptions />)} />
          <Route path="/indOtp" element={<IndependentOTP />} />
          <Route path="/UpdatePassword" element={<UpdatePassword />} />
          <Route path="/ResetPassword" element={<ForgetPassword />} />
          <Route path="/tourBooked" element={protectedPage(<TourBookings />)} />
          <Route path="/transportBooked" element={protectedPage(<TransportBookings />)} />
          <Route path="/hotelBooked" element={protectedPage(<HotelBookings />)} />
          <Route path="/SignInWithGoogle" element={<SignInWithGoogle />} />
          <Route path="/OTP" element={<OtpPage />} />
          <Route path="/verify-email" element={<OtpPage />} />
          <Route path="/Notifications" element={protectedPage(<Notifications />)} />
          <Route path="/changePassword" element={protectedPage(<ChangePassword />)} />
          <Route path="/UserBooking" element={protectedPage(<UserBookingsRecord />)} />
          <Route path="/dashboard" element={protectedPage(<Dashboard />)} />
          <Route path="/userProfile" element={protectedPage(<UserProfile />)} />
          <Route path="/Bookings" element={protectedPage(<BookingOptions />)} />
          <Route path="/Favorites" element={protectedPage(<Favorites />)} />
          <Route path="/FamilyTour" element={<FamilyTour />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/DiscountedTour" element={<DiscountedTours />} />
          <Route path="/BookTour" element={protectedPage(<BookTour />)} />
          <Route path="/ContactUs" element={protectedPage(<ContactUs />)} />
          <Route path="/AllTransport" element={<AllTransport />} />
          <Route path="/AllHotels" element={<AllHotels />} />
          <Route path="/HotelRelRooms" element={<HotelRelRooms />} />
          <Route path="/AllTours" element={<AllTours />} />
          <Route path="/BookTransport" element={protectedPage(<BookTransport />)} />
          <Route path="/BookHotel" element={protectedPage(<HotelBooking />)} />
          <Route path="/BookTour" element={protectedPage(<BookTour />)} />
          <Route path="/TourBanner" element={<BookTourBanner />} />
          <Route path="/signUp" element={<GuestRoute><SignUpForm /></GuestRoute>} />
          <Route path="/SignIn" element={<GuestRoute><SignInForm /></GuestRoute>} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/StripeForm" element={protectedPage(<StripeMainForm />)} />
          <Route path="/requestBalance" element={protectedPage(<RequestBalance />)} />
          <Route path="/CheckoutForm" element={protectedPage(<CheckoutForm />)} />
          <Route path="/Confirmation" element={protectedPage(<Confirmation />)} />
          <Route path="/Ticket" element={protectedPage(<Ticket />)} />
          <Route path="/paymentConfirmation" element={protectedPage(<PaymentSuccess />)} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminGate />}>
            <Route index element={<AdminDashboard />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path=":resource" element={<AdminResourcePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
