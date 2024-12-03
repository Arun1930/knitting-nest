
const express = require("express");
const router = express.Router();
const Measurement = require("../model/measurments"); // Adjust the path as needed
const { isAuthenticated } = require("../middleware/auth");

router.post("/takemeasurment",isAuthenticated, async (req, res) => {
  try {
    // Extract data from the request body with default values of "null" if not provided
    const {
      fullLength = "null",
      topLength = "null",
      bottomLength = "null",
      sleeveLengthFull = "null",
      sleeveLengthHalf = "null",
      sleeveLengthThreeQuarter = "null",
      armHole = "null",
      sleeveGirth = "null",
      shoulderLength = "null",
      bustCircumference = "null",
      pointToPoint = "null",
      fromLeckLent = "null",
      backNeckLength = "null",
      slightLengthTop = "null",
      upperWaist = "null",
      hip = "null",
      lowerWaist = "null",
      seat = "null",
      thighCircumference = "null",
      ankleGirth = "null",
      pantSlightLength = "null",
      kneeGirth = "null",
      elasticIntake = "null",
      ropeIntake = "null",
      buttonIntake = "null",
      userId="null"
    } = req.body;

    // Create a new measurement document with default values
    const newMeasurement = new Measurement({
      fullLength,
      topLength,
      bottomLength,
      sleeveLengthFull,
      sleeveLengthHalf,
      sleeveLengthThreeQuarter,
      armHole,
      sleeveGirth,
      shoulderLength,
      bustCircumference,
      pointToPoint,
      fromLeckLent,
      backNeckLength,
      slightLengthTop,
      upperWaist,
      hip,
      lowerWaist,
      seat,
      thighCircumference,
      ankleGirth,
      pantSlightLength,
      kneeGirth,
      elasticIntake,
      ropeIntake,
      buttonIntake,
      userId
    });

    // Save the measurement to the database
    await newMeasurement.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: "Measurement saved successfully",
      measurement: newMeasurement
    });
  } catch (error) {
    console.error("Error saving measurement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save measurement",
      error: error.message
    });
  }
});


router.post("/getmeasurment/:userId", async(req,res) =>{
  const userId = req.params.userId

  try {
    const getmeasurment = await Measurement.find({userId})
    res.status(200).send(getmeasurment)
  } catch (error) {
    console.error("Error saving measurement:", error);
  }
})



module.exports = router;
