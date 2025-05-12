import React, { useState } from "react";

const archetypes = [
  "Hero",
  "Outlaw",
  "Magician",
  "Creator",
  "Caregiver",
  "Explorer",
  "Sage",
  "Lover",
  "Jester",
];

const niches = [
  "Real Estate",
  "Tech Startup",
  "Fashion Brand",
  "Consulting",
  "Music Artist",
  "Fitness Coach",
];

export default function BrandArchetypeTool() {
  const [selectedArchetype, setSelectedArchetype] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");

  return (
    <div className="flex flex-col space-y-6 p-6">
      <h2 className="text-2xl font-bold">Brand Archetype & Niche Tool</h2>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Choose Archetype</label>
        <select value={selectedArchetype} onChange={(e) => setSelectedArchetype(e.target.value)} className="p-2 border rounded">
          <option value="">Select Archetype</option>
          {archetypes.map((arch) => (
            <option key={arch} value={arch}>{arch}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Choose Niche</label>
        <select value={selectedNiche} onChange={(e) => setSelectedNiche(e.target.value)} className="p-2 border rounded">
          <option value="">Select Niche</option>
          {niches.map((niche) => (
            <option key={niche} value={niche}>{niche}</option>
          ))}
        </select>
      </div>

      {selectedArchetype && selectedNiche && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <p className="font-bold">Suggestions for {selectedArchetype} in {selectedNiche}:</p>
          <ul className="list-disc list-inside text-sm mt-2">
            <li>Recommended Color: {selectedArchetype === "Hero" ? "Royal Blue" : "Custom Color"}</li>
            <li>Font Style: {selectedArchetype === "Magician" ? "Elegant Serif" : "Modern Sans-Serif"}</li>
            <li>Copy Tone: {selectedArchetype === "Outlaw" ? "Bold and Disruptive" : "Trustworthy and Inspirational"}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
