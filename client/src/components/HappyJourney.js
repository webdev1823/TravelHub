import React from "react";
import { Carousel } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const HappyJourney = () => {
  const location = useLocation();
  const { tour } = location.state; // Get the tour data from location state

  return (
    <div className="text-center">
      <h1>Happy Journey!</h1>
      <Carousel>
        {tour.imageUrls.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Slide ${index}`}
              style={{ height: "500px", objectFit: "cover" }} // Adjust height as needed
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HappyJourney;
