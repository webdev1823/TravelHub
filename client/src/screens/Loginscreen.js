import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import loginPic from "../components/regpic-removebg-preview.png"; // Import your login image
import axios from "axios"; // Import axios for API calls
import AirplaneSpinner from "../components/AirplaneSpinner"; // Import the loading spinner
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading

    // Validate form fields
    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false); // Stop loading
      return;
    }

    const user = { email, password };

    try {
      const result = await axios.post("/api/users/login", user);
      console.log("Login successful:", result.data);
      localStorage.setItem("currentUser", JSON.stringify(result.data)); // Save user to local storage
      alert("Login successful!"); // Show success message
      navigate("/home"); // Redirect to home page
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card text-black logincard"
        style={{ borderRadius: "25px", width: "800px" }}
      >
        <div className="row g-0">
          <div className="col-md-6 card-body p-md-5">
            <p className="text-center text-body h1 fw-bold mb-5 mt-4 logtitle">
              Login
            </p>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <AirplaneSpinner />} {/* Show loading spinner */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="logtitle" htmlFor="email">
                  Your Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading} // Disable input while loading
                />
              </div>

              <div className="mb-4">
                <label className="logtitle" htmlFor="password">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading} // Disable input while loading
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary shbtn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="btn btn-primary btn-lg logbtn"
                  disabled={loading}
                >
                  Login
                </Button>
              </div>
              <div>
                <p className="regintro">
                  New User? Press here to{" "}
                  <a className="regbtn" href="/register">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div className="col-md-6 d-flex align-items-center">
            <img
              src={loginPic}
              className="img-fluid"
              alt="Login illustration"
              style={{
                borderTopRightRadius: "25px",
                borderBottomRightRadius: "25px",
              }} // Rounded corners
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
