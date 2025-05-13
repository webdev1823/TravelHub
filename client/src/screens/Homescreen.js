import React, { useEffect, useState } from "react";
import axios from "axios";
import Tour from "../components/Tour";
import AirplaneSpinner from "../components/AirplaneSpinner"; // Adjust the path as necessary

function Homescreen() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // Default filter to "all"

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("/api/tours/getalltours");
        if (Array.isArray(response.data)) {
          setTours(response.data);
          setFilteredTours(response.data); // Initially show all tours
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "An unknown error occurred"
        );
      } finally {
        // Introduce a delay before hiding the loading spinner
        const timeoutId = setTimeout(() => {
          setLoading(false);
        }, 1500);

        return () => clearTimeout(timeoutId);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    // Filter tours based on selected filter
    if (filter === "all") {
      setFilteredTours(tours);
    } else {
      const filtered = tours.filter((tour) => tour.type === filter);
      setFilteredTours(filtered);
    }
  }, [filter, tours]);

  return (
    <div className="container">
      <h1 className="mt-3">Explore Our Tours</h1>
      <div className="mb-3">
        <label htmlFor="tourFilter" className="form-label">
          Filter by Type:
        </label>
        <select
          id="tourFilter"
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Friends">Friends</option>
          <option value="Family">Family</option>
          <option value="Couple">Couple</option>
          {/* Add more options based on your tour types */}
        </select>
      </div>
      <div className="row justify-content-center mt-0">
        {loading ? (
          <AirplaneSpinner /> // Show the spinner while loading
        ) : error ? (
          <h1>Error: {error}</h1>
        ) : (
          filteredTours.map((tour) => (
            <div className="col-md-10 mt-3 bs tourconta" key={tour._id}>
              <Tour tour={tour} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;
