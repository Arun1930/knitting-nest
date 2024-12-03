import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MeasurementsTable = () => {
  const [measurements, setMeasurements] = useState([]);
  const { user } = useSelector((state) => state.user); // Access user   from Redux store

  useEffect(() => {
    if (user && user._id) {
      axios
        .post(`http://localhost:8000/api/v2/measurment/getmeasurment/${user._id}`)
        .then((response) => {
console.log(response.data);
          setMeasurements(response.data); // Assuming response.data is the array of measurements
        })
        .catch((error) => {
          console.error('Error fetching measurements:', error);
        });
    }
  }, [user]);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Measurements</h2>
      {measurements.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Full Length</th>
              <th className="border px-4 py-2">Top Length</th>
              <th className="border px-4 py-2">Bottom Length</th>
              <th className="border px-4 py-2">Sleeve Length (Full)</th>
              <th className="border px-4 py-2">Sleeve Length (Half)</th>
              <th className="border px-4 py-2">Sleeve Length (3/4)</th>
              <th className="border px-4 py-2">Arm Hole</th>
              <th className="border px-4 py-2">Sleeve Girth</th>
              <th className="border px-4 py-2">Shoulder Length</th>
              <th className="border px-4 py-2">Bust Circumference</th>
              <th className="border px-4 py-2">Point to Point</th>
              <th className="border px-4 py-2">Back Neck Length</th>
              <th className="border px-4 py-2">Slight Length (Top)</th>
              <th className="border px-4 py-2">Upper Waist</th>
              <th className="border px-4 py-2">Hip</th>
              <th className="border px-4 py-2">Lower Waist</th>
              <th className="border px-4 py-2">Seat</th>
              <th className="border px-4 py-2">Thigh Circumference</th>
              <th className="border px-4 py-2">Ankle Girth</th>
              <th className="border px-4 py-2">Pant Slight Length</th>
              <th className="border px-4 py-2">Knee Girth</th>
            </tr>
          </thead>
          <tbody>
            {measurements.map((measurement) => (
              <tr key={measurement._id} className="text-center">
                <td className="border px-4 py-2">{measurement.fullLength}</td>
                <td className="border px-4 py-2">{measurement.topLength}</td>
                <td className="border px-4 py-2">{measurement.bottomLength}</td>
                <td className="border px-4 py-2">{measurement.sleeveLengthFull}</td>
                <td className="border px-4 py-2">{measurement.sleeveLengthHalf}</td>
                <td className="border px-4 py-2">{measurement.sleeveLengthThreeQuarter}</td>
                <td className="border px-4 py-2">{measurement.armHole}</td>
                <td className="border px-4 py-2">{measurement.sleeveGirth}</td>
                <td className="border px-4 py-2">{measurement.shoulderLength}</td>
                <td className="border px-4 py-2">{measurement.bustCircumference}</td>
                <td className="border px-4 py-2">{measurement.pointToPoint}</td>
                <td className="border px-4 py-2">{measurement.backNeckLength}</td>
                <td className="border px-4 py-2">{measurement.slightLengthTop}</td>
                <td className="border px-4 py-2">{measurement.upperWaist}</td>
                <td className="border px-4 py-2">{measurement.hip}</td>
                <td className="border px-4 py-2">{measurement.lowerWaist}</td>
                <td className="border px-4 py-2">{measurement.seat}</td>
                <td className="border px-4 py-2">{measurement.thighCircumference}</td>
                <td className="border px-4 py-2">{measurement.ankleGirth}</td>
                <td className="border px-4 py-2">{measurement.pantSlightLength}</td>
                <td className="border px-4 py-2">{measurement.kneeGirth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No measurements available.</p>
      )}
    </div>
  );
};

export default MeasurementsTable;
