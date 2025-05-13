// routes/bookingsRoute.js
const express = require("express");
const Booking = require("../models/booking"); // Adjust the path as needed
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    customerId,
    name,
    tourDate,
    totalPeople,
    totalCost,
    email,
    mobile,
    tourId,
    tourTitle,
    destination,
  } = req.body;

  const newBooking = new Booking({
    customerId,
    name,
    tourDate,
    totalPeople,
    totalCost,
    email,
    mobile,
    tourId,
    tourTitle,
    destination,
  });

  try {
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
