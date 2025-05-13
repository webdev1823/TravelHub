import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import HappyJourneyScreen from "./screens/HappyJourneyScreen";
import BookedTrips from "./screens/BookedTrips";
import Profile from "./screens/Profile";
import Landingscreen from "./screens/Landingscreen";
import { ReactComponent as MyLogo } from "./assets/logo.svg"; // Adjust the path as needed

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:tourid" element={<Bookingscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/happy-journey" element={<HappyJourneyScreen />} />
          <Route path="/booked-trips" element={<BookedTrips />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Landingscreen />} />{" "}
          {/* Corrected this line */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
