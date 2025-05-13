const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  activities: { type: String, required: true },
});

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    type: { type: String, required: true },
    maxParticipants: { type: Number, required: true, min: 1 },
    imageUrls: [
      {
        type: String,
        validate: {
          validator: function (v) {
            return /^(http|https):\/\/[^ "]+$/.test(v);
          },
          message: (props) => `${props.value} is not a valid URL!`,
        },
      },
    ],
    description: { type: String, required: true },
    itinerary: [itinerarySchema],
    availableDates: [{ type: Date }],
    costPerHeadINR: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
