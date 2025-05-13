const express = require("express");
const Booking = require("../models/booking"); // Adjust the path as needed
const router = express.Router();

// POST: Create a new booking
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
    console.error(error); // Log the error for debugging
    res.status(400).json({ message: error.message });
  }
});

// GET: Fetch bookings by customer ID
router.get("/:customerId", async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.params.customerId });
    res.json(bookings);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
