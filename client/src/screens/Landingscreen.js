import React from "react";
import { Link } from "react-router-dom";
import "./LandingScreen.css"; // Assuming you want to create a separate CSS file for styles

function Landingscreen() {
  return (
    <div className="landing">
      <div className="text-center">
        <h2 className="landing-title">Harrison Tours</h2>
        <h1 className="landing-slogan">
          "Enjoy life by exploring with your loved ones"
        </h1>

        <Link to="/home">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
