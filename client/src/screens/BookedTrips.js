import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

const BookedTrips = () => {
  const [bookedTrips, setBookedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookedTrips = async () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (!user) {
        setError("You need to log in to view your booked trips.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/bookings/${user._id}`);
        setBookedTrips(response.data);
      } catch (err) {
        setError(
          "Failed to fetch booked trips. " +
            (err.response ? err.response.data.message : "")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookedTrips();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container udet">
      <h1>Your Booked Trips</h1>
      {bookedTrips.length === 0 ? (
        <p>No booked trips found.</p>
      ) : (
        <ul className="list-group liss">
          {bookedTrips.map((trip) => (
            <li key={trip._id} className="list-group-item udet-it">
              <h5>{trip.tourTitle}</h5>
              <p>Date: {new Date(trip.tourDate).toLocaleDateString()}</p>
              <p>Destination: {trip.destination}</p>
              <p>Number of People: {trip.totalPeople}</p>
              <p>Total Cost: ₹{trip.totalCost}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookedTrips;
