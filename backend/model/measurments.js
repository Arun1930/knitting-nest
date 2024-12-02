const mongoose = require("mongoose");

const MeasurementSchema = new mongoose.Schema({
  fullLength: { type: String, required: false },
  topLength: { type: String, required: false },
  bottomLength: { type: String, required: false },
  sleeveLengthFull: { type: String, required: false },
  sleeveLengthHalf: { type: String, required: false },
  sleeveLengthThreeQuarter: { type: String, required: false },
  armHole: { type: String, required: false },
  sleeveGirth: { type: String, required: false },
  shoulderLength: { type: String, required: false },
  bustCircumference: { type: String, required: false },
  pointToPoint: { type: String, required: false },
  fromLeckLent: { type: String, required: false },
  backNeckLength: { type: String, required: false },
  slightLengthTop: { type: String, required: false },
  upperWaist: { type: String, required: false },
  hip: { type: String, required: false },
  lowerWaist: { type: String, required: false },
  seat: { type: String, required: false },
  thighCircumference: { type: String, required: false },
  ankleGirth: { type: String, required: false },
  pantSlightLength: { type: String, required: false },
  kneeGirth: { type: String, required: false },
  elasticIntake: { type: String, required: false },
  ropeIntake: { type: String, required: false },
  buttonIntake: { type: String, required: false },
  userId: {
    type: String,
  },
}, { timestamps: true });

const Measurement = mongoose.model("Measurement", MeasurementSchema);

module.exports = Measurement;
