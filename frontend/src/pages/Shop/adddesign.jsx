import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";

;

const AddDesign = () => {
  const canvasRef = useRef();
  const [isErasing, setIsErasing] = useState(false);
  const [strokeColor, setStrokeColor] = useState("#000000")

  const handleToggleEraser = () => {
    setIsErasing(!isErasing);
    canvasRef.current.eraseMode(!isErasing);
  };
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);
  const handleSave = async () => {
    const canvas = canvasRef.current;
    const imageData = await canvas.exportImage("png"); // base64
    const blob = await (await fetch(imageData)).blob();
    const file = new File([blob], "design.png", { type: "image/png" });
  
    const formData = new FormData();
    formData.append("sellerId", seller._id);
    formData.append("designImage", file);
  
    await axios.post(`${server}/shop/add-design`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    toast.success("Design saved!");
    navigate("/dashboard");
  };
  
  const handleClear = () => {
    canvasRef.current.clearCanvas();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Design Your Dress</h2>

      <ReactSketchCanvas
        ref={canvasRef}
        width="100%"
        height="500px"
        strokeWidth={4}
        strokeColor={strokeColor}
        backgroundColor="#fff"
        className="rounded-lg border"
      />

        <div className="mt-4 flex gap-4 flex-wrap">
        <button
            onClick={handleToggleEraser}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
            {isErasing ? "Switch to Draw" : "Switch to Eraser"}
        </button>
        <div className="flex items-center gap-2 mt-4">
          <label className="font-medium">Select Color:</label>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="w-10 h-10 p-0 border rounded"
          />
        </div>

        <button
            onClick={handleClear}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
            Clear Canvas
        </button>

        <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            Save Design
        </button>
        </div>
    </div>
  );
};

export default AddDesign;
