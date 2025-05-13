import React from "react";
import { useLocation } from "react-router-dom";
import pic from "../components/hbj.png";

const HappyJourneyScreen = () => {
  const location = useLocation();
  const { title, details } = location.state || {};

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Happy Journey Message Column */}
        <div className="col-md-6 hpj-cont">
          <div>
            <img
              src={pic}
              alt="Happy Journey"
              className="img-fluid mb-3"
              style={{ width: "400px" }}
            />
          </div>
          <div
            className="text-center"
            style={{ fontWeight: "bold", fontSize: "25px" }}
          >
            <p>We Wish You a Wonderful Journey Ahead!</p>
          </div>
        </div>

        {/* Tour Details Column */}
        <div className="col-md-4 det-cont">
          <div>
            <h4
              style={{
                fontWeight: "bold",
                marginBottom: "40px",
                textAlign: "center",
              }}
            >
              Booking Details
            </h4>
            {details ? (
              <div>
                <p>
                  <strong>Name:</strong> {details.name || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {details.email || "N/A"}
                </p>
                <p>
                  <strong>Mobile:</strong> {details.mobile || "N/A"}
                </p>
                <p>
                  <strong>Destination:</strong> {details.destination || "N/A"}
                </p>
                <p>
                  <strong>Tour Title:</strong> {details.tourTitle || "N/A"}
                </p>
                <p>
                  <strong>Tour Date:</strong>{" "}
                  {details.tourDate ? formatDate(details.tourDate) : "N/A"}
                </p>
                <p>
                  <strong>Number of People:</strong>{" "}
                  {details.numberOfPeople || "N/A"}
                </p>
                <p>
                  <strong>Total Cost:</strong> ₹{details.totalCost || "N/A"}
                </p>
              </div>
            ) : (
              <p>No booking details available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HappyJourneyScreen;
