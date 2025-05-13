const express = require("express");
const router = express.Router();
const Tour = require("../models/tour");

// Route to get all tours
router.get("/getalltours", async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.json(tours);
  } catch (error) {
    console.error("Error fetching tours:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get a tour by ID
router.get("/gettourbyid/:id", async (req, res) => {
  // Changed to GET and added :id parameter
  const { id } = req.params; // Use 'id' from params

  try {
    const tour = await Tour.findById(id); // Simplified to findById
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.json(tour);
  } catch (error) {
    console.error("Error fetching tour by ID:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
