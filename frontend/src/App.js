import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Modules/Home';


import Success from './Modules/Success';

import Cancel from './Modules/Cancel';
import CheckOutFrom from './Modules/CheckOutFrom';
import Main from './Modules/Main';


function App() {
  return (

    <div className="App">
      <Router>


        <Routes>

          <Route exact path="/" element={<Home key="home" />} />
          <Route exact path="/Main" element={<Main key="Main" />} />
          {/* {/* <Route exact path="/about" element={<About key=" About" />} /> */}
          <Route exact path="/Success" element={<Success key="Success" />} />
          <Route exact path="/Cancel" element={<Cancel key="Cancel" />} />
          {/* <Route exact path="/SignUp" element={<SignUp key=" signUp" />} />
          <Route exact path="/contact" element={<Contacts key="contacts" />} />
          <Route exact path="/AllNotes" element={<AllNotes key="notes" />} />
          <Route exact path="/help" element={<Help key="help" />} />
          <Route exact path="/links" element={<Links key="links" />} /> */} */

        </Routes>


      </Router>

    </div>
  );
}

export default App;
