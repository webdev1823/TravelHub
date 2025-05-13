import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="container udet">
      <h1 className="usp">User Profile</h1>
      {user ? (
        <div className="udet-it">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Mobile:</strong> {user.mobile}
          </p>{" "}
          {/* Display mobile number */}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
