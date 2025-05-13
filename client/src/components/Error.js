import React from "react";
import { Alert, Button, Container } from "react-bootstrap";

const Error = ({ message, onClose }) => {
  return (
    <Container className="d-flex justify-content-center">
      <Alert
        variant="danger"
        className="text-center mt-5"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <Alert.Heading>Oops!</Alert.Heading>
        <p>{message}</p>
        <Button variant="outline-danger" onClick={onClose}>
          Close
        </Button>
      </Alert>
    </Container>
  );
};

export default Error;
