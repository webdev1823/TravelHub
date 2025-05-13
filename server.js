const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://JudeHarrison:Harry$on77@cluster0.lv17i.mongodb.net/mern-tours?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const toursRoute = require("./routes/toursRoute");
app.use("/api/tours", toursRoute);

const usersRoute = require("./routes/usersRoute");
app.use("/api/users", usersRoute);

const bookingsRoute = require("./routes/bookingsRoute"); // Import bookings route
app.use("/api/bookings", bookingsRoute); // Use bookings route

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node Server Started on port ${port}`));
