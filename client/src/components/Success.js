import React from "react";
import { Alert, Button, Container } from "react-bootstrap";

const Success = ({ message, onRetry }) => {
  return (
    <Container className="d-flex justify-content-center">
      <Alert
        variant="success"
        className="text-center mt-5"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <Alert.Heading>Success!</Alert.Heading>
        <p>{message}</p>
        <Button variant="outline-success" onClick={onRetry}>
          Go Back
        </Button>
      </Alert>
    </Container>
  );
};

export default Success;
