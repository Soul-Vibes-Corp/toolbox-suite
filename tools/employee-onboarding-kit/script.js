import React, { useState } from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const OnboardingKitGenerator = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [equipmentChecklist, setEquipmentChecklist] = useState([
    { item: "Laptop", checked: false },
    { item: "Email Setup", checked: false },
    { item: "Software Access", checked: false },
  ]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Welcome to the Team, ${employeeName}!`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Role: ${role}`, 10, 30);
    doc.text(`Start Date: ${startDate}`, 10, 40);

    doc.text("Equipment Checklist:", 10, 55);
    equipmentChecklist.forEach((item, index) => {
      doc.text(`- [ ] ${item.item}`, 15, 65 + index * 10);
    });

    doc.save(`${employeeName}_Onboarding_Kit.pdf`);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Employee Onboarding Kit Generator</h2>
      <input
        placeholder="Employee Name"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />
      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />
      <button onClick={generatePDF} style={{ padding: "10px 20px" }}>
        Generate PDF Kit
      </button>
    </div>
  );
};

export default OnboardingKitGenerator;
