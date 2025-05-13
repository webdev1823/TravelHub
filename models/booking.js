// models/booking.js

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Assuming you have a User model
    },
    name: {
      type: String,
      required: true,
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tour", // Assuming you have a Tour model
    },
    tourTitle: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    tourDate: {
      type: Date,
      required: true,
    },
    totalPeople: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    mobile: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // Adjust the regex as needed for your use case
    },
  },
  { timestamps: true }
); // This will add createdAt and updatedAt fields

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
