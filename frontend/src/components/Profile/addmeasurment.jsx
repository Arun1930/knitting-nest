import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "../Layout/Header";
import ProfileSidebar from "./ProfileSidebar";
import styles from "../../styles/styles";

const AddMeasurement = () => {
  const [measurementData, setMeasurementData] = useState({
    fullLength: "",
    topLength: "",
    bottomLength: "",
    sleeveLengthFull: "",
    sleeveLengthHalf: "",
    sleeveLengthThreeQuarter: "",
    armHole: "",
    sleeveGirth: "",
    shoulderLength: "",
    bustCircumference: "",
    pointToPoint: "",
    fromNeckLength: "",
    backNeckLength: "",
    slightLengthTop: "",
    upperWaist: "",
    hip: "",
    lowerWaist: "",
    seat: "",
    thighCircumference: "",
    ankleGirth: "",
    pantSlightLength: "",
    kneeGirth: "",
  });
  const { user } = useSelector((state) => state.user); // Access user from Redux store

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurementData({ ...measurementData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v2/measurment/takemeasurment",
        {
          ...measurementData,
          userId: user._id,  // Assuming `user._id` contains the correct ID from Redux
        },
        {
          withCredentials: true, // Enables cookie sending
        }
      );
  
      alert("Measurement saved successfully!");
    } catch (error) {
      console.error("Error saving measurement:", error);
      alert("Failed to save measurement.");
    }
  };
  

  return (
    <div>
      {/* <Header /> */}
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] 800px:w-[5px] sticky 800px:mt-0 mt-[18%]">
          {/* <ProfileSidebar /> */}
        </div>
        <div className="flex-1 p-5 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-5">Take Measurement</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {Object.keys(measurementData).map((field) => (
              <div key={field} className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  {field.replace(/([A-Z])/g, " $1")}:
                </label>
                <input
                  type="text"
                  name={field}
                  value={measurementData[field]}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            ))}
            <button
              type="submit"
              className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Save Measurement
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMeasurement;
