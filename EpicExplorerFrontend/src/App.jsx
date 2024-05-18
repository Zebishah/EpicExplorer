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
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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
