import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Modules/Home';

function App() {
  return (

    <div className="App">
      <Router>


        <Routes>

          <Route exact path="/" element={<Home key="home" />} />
          {/* <Route exact path="/about" element={<About key=" About" />} />
          <Route exact path="/SignIn" element={<SignIn key="signIn" />} />
          <Route exact path="/SignUp" element={<SignUp key=" signUp" />} />
          <Route exact path="/contact" element={<Contacts key="contacts" />} />
          <Route exact path="/AllNotes" element={<AllNotes key="notes" />} />
          <Route exact path="/help" element={<Help key="help" />} />
          <Route exact path="/links" element={<Links key="links" />} /> */}

        </Routes>


      </Router>

    </div>
  );
}

export default App;
