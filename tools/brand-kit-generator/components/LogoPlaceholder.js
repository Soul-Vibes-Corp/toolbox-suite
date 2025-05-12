import React, { useState } from "react";

const shapes = {
  circle: "rounded-full",
  square: "",
  rounded: "rounded-lg",
  hexagon: "clip-hexagon", // You’ll define hexagon clip-path later
};

export default function LogoPlaceholder({ logoUrl, onShapeChange }) {
  const [shape, setShape] = useState("square");

  const handleShapeChange = (e) => {
    setShape(e.target.value);
    onShapeChange && onShapeChange(e.target.value);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className={`w-32 h-32 bg-gray-200 flex items-center justify-center overflow-hidden ${shapes[shape]}`}>
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-500">Logo Placeholder</span>
        )}
      </div>

      <select value={shape} onChange={handleShapeChange} className="p-2 border rounded">
        <option value="square">Square</option>
        <option value="rounded">Rounded</option>
        <option value="circle">Circle</option>
        <option value="hexagon">Hexagon</option>
      </select>
    </div>
  );
}
