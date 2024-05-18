// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// import EpicIntro from "./EpicIntro";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";

// const stripePromise = loadStripe('pk_test_51OlT63EhRIYwGoSWf1KwCnKI6NoAfDGxmMPlWmKTKqiLV4n7GYEOWt0xqzjzE1rVsYGpCjB2hxupQWGkdK8OVnqE00nLgRNBzu');
const Home = () => {

  return (
    <div className="flex flex-col">
        <Navbar/>
        <LandingPage/>
   
    </div>
  );
};

export default Home;