import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Tour({ tour }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!tour) {
    return <div>Loading...</div>; // Handle loading state or no tour case
  }

  return (
    <div className="row mb-4 px-3 tour-card">
      <div className="col-12 text-center mb-3 headc">
        <h1>{tour.title}</h1>
      </div>
      <div className="col-md-5 minic">
        <img
          src={tour.imageUrls[0]}
          className="smallimg"
          alt={`Image of ${tour.title}`}
        />
        <p className="ite">
          <span className="name">Itinerary Highlights: </span>
          <ul>
            {tour.itineraryHighlights && tour.itineraryHighlights.length > 0 ? (
              tour.itineraryHighlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))
            ) : (
              <li>No highlights available</li>
            )}
          </ul>
        </p>
        <p className="ite">
          <span className="name">Description: </span>
          {tour.description}
        </p>
      </div>
      <div className="col-md-7 py-2">
        <p className="ite">
          <span className="name">Destination: </span>
          {tour.location}
        </p>
        <p className="ite">
          <span className="name">Duration: </span>
          {tour.duration}
        </p>
        <p className="ite">
          <span className="name">Type: </span>
          {tour.type}
        </p>
        <p className="ite">
          <span className="name">Max Participants: </span>
          {tour.maxParticipants}
        </p>
        <p className="ite">
          <span className="name">Available Dates: </span>
          <ul>
            {tour.availableDates.map((date, index) => (
              <li key={index}>{formatDate(date)}</li>
            ))}
          </ul>
        </p>
        <p className="ite">
          <span className="name">Cost Per Person: </span>
          {tour.costPerHeadINR}
        </p>
        <div className="d-flex justify-content-end mt-2">
          <Link to={`/book/${tour._id}`}>
            <button className="btn btn-primary m-2 btn-block">Book Now</button>
          </Link>
          <button
            className="btn btn-primary m-2 btn-block"
            onClick={handleShow}
          >
            View Details
          </button>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header className="modalc" id="clsbtn" closeButton>
          <Modal.Title className="modalc" id="modtit">
            {tour.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalc">
          <Carousel>
            {tour.imageUrls.map((imageUrl, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 bigimg"
                  src={imageUrl}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{tour.detailedDescription}</p>
        </Modal.Body>
        <Modal.Footer className="modalc">
          <Button className="bkbtn" variant="primary" onClick={handleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Tour;
