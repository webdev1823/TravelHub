import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AirplaneSpinner from "../components/AirplaneSpinner";

function Bookingscreen() {
  const { tourid } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tourDate, setTourDate] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/tours/gettourbyid/${tourid}`);
        setTour(response.data);
        setTourDate(response.data.availableDates[0]);
      } catch (err) {
        setError(
          "Failed to load tour details. " +
            (err.response ? err.response.data.message : "")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, [tourid]);

  useEffect(() => {
    if (tour) {
      setTotalCost(tour.costPerHeadINR * numberOfPeople);
    }
  }, [numberOfPeople, tour]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!currentUser) {
      setError("You must be logged in to book a tour.");
      setLoading(false);
      return;
    }

    const bookingData = {
      customerId: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      mobile: currentUser.mobile,
      tourId: tour._id,
      tourTitle: tour.title,
      destination: tour.location,
      tourDate: tourDate,
      totalPeople: numberOfPeople,
      totalCost: totalCost,
    };

    try {
      const result = await axios.post("/api/bookings", bookingData);
      console.log("Booking successful:", result.data);

      navigate("/happy-journey", {
        state: {
          title: `Happy Journey to ${tour.title}!`,
          details: {
            name: currentUser.name,
            email: currentUser.email,
            mobile: currentUser.mobile,
            tourDate: tourDate,
            numberOfPeople: numberOfPeople,
            totalCost: totalCost,
            destination: tour.location,
            tourTitle: tour.title,
          },
        },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Booking failed. Please try again.";
      setError(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AirplaneSpinner />;

  return (
    <div className="container">
      <h1>Book Tour: {tour ? tour.title : "Loading..."}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {tour && (
        <div className="row">
          <div className="col-md-6 d-flex justify-content-start">
            <img
              src={tour.imageUrls[0]}
              alt={tour.title}
              className="img-fluid"
            />
          </div>

          <div className="col-md-6 d-flex flex-column align-items-end bcont">
            <form
              onSubmit={handleSubmit}
              className="w-100 d-flex flex-wrap justify-content-end"
            >
              <div className="mb-3 w-100 d-flex flex-column align-items-end">
                <label>Tour Date</label>
                <select
                  className="form-control custom-select-width"
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                >
                  {tour.availableDates.map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString("en-US")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3 w-100 d-flex flex-column align-items-end">
                <label>No. of People</label>
                <select
                  className="form-control custom-select-width"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                >
                  {[...Array(tour.maxParticipants)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <hr className="w-100" />

              <h1 className="w-100 text-end">Amount</h1>

              <div className="mb-3 w-100 d-flex flex-column align-items-end">
                <p>Cost per Head: ₹{tour.costPerHeadINR}</p>
                <h4>Total Cost: ₹{totalCost}</h4>
              </div>

              <div className="w-100 d-flex justify-content-end paybtn">
                <Button type="submit" className="btn btn-primary btn-lg">
                  Proceed to Pay
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
