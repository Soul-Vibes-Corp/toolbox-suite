import React, { useState } from "react";
import LogoPlaceholder from "./LogoPlaceholder";

const themes = {
  minimalist: "bg-white text-black",
  bold: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  elegant: "bg-gray-100 text-gray-800 font-serif",
  tech: "bg-black text-green-400",
  creative: "bg-yellow-200 text-black",
};

export default function BusinessCardPreview() {
  const [logoUrl, setLogoUrl] = useState(null);
  const [theme, setTheme] = useState("minimalist");

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h2 className="text-2xl font-bold">Business Card Maker</h2>

      <LogoPlaceholder logoUrl={logoUrl} />

      <input type="file" onChange={handleLogoUpload} accept="image/*" className="p-2" />

      <select value={theme} onChange={(e) => setTheme(e.target.value)} className="p-2 border rounded">
        {Object.keys(themes).map((key) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>

      <div className={`w-80 h-48 p-6 rounded-xl shadow-lg flex flex-col justify-center items-center ${themes[theme]}`}>
        <div className="w-16 h-16 mb-4">
          {logoUrl ? (
            <img src={logoUrl} alt="Business Logo" className="object-cover w-full h-full" />
          ) : (
            <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-600">Logo</div>
          )}
        </div>
        <h3 className="text-xl font-semibold">Your Name</h3>
        <p className="text-sm">Your Business Title</p>
      </div>
    </div>
  );
}
