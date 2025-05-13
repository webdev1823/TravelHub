import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import regPic from "../components/regpic-removebg-preview.png";
import axios from "axios";
import AirplaneSpinner from "../components/AirplaneSpinner";
import { useNavigate } from "react-router-dom";

function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!name || !email || !password || !confirmPassword || !mobile) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
    const isValidMobile = (mobile) => /^\d{10}$/.test(mobile);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    if (!isValidMobile(mobile)) {
      setError("Please enter a valid mobile number.");
      setLoading(false);
      return;
    }

    const user = { name, email, mobile, password };

    try {
      const result = await axios.post("/api/users/register", user);
      setSuccess(true);
      setError(null);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AirplaneSpinner />;

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card text-black logincard reg-card"
        style={{ borderRadius: "25px", width: "800px" }}
      >
        <div className="row g-0 regrow">
          <div className="col-md-6 card-body p-md-5">
            <p className="text-center text-body h1 fw-bold mb-5 mt-4 logtitle">
              Sign up
            </p>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">
                Registration successful! Redirecting to login...
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="logtitle">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="logtitle">Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="logtitle">Your Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="logtitle">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="logtitle">Repeat your password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form-check text-body mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="form2Example3c"
                  required
                />
                <label
                  className="form-check-label logtitle"
                  htmlFor="form2Example3"
                >
                  I agree to all statements in{" "}
                  <a
                    className="t&c"
                    href="#!"
                    style={{ color: "#F3C623", textDecoration: "underline" }} // Change color here
                  >
                    Terms of service
                  </a>
                </label>
              </div>
              <div className="d-flex justify-content-center">
                <Button type="submit" className="btn btn-primary btn-lg logbtn">
                  Register
                </Button>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <img
              src={regPic}
              className="img-fluid"
              alt="Registration illustration"
              style={{
                borderTopRightRadius: "25px",
                borderBottomRightRadius: "25px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
