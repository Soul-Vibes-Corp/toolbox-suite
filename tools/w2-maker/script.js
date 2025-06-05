// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('w2-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    employeeName: document.getElementById('employeeName').value,
    employeeSSN: document.getElementById('employeeSSN').value,
    employeeAddress: document.getElementById('employeeAddress').value,
    employerName: document.getElementById('employerName').value,
    employerEIN: document.getElementById('employerEIN').value,
    employerAddress: document.getElementById('employerAddress').value,
    wages: document.getElementById('wages').value,
    fedTax: document.getElementById('fedTax').value,
    stateTax: document.getElementById('stateTax').value
  };

  const preview = `
    TraceCore™ W-2 Summary
    =====================
    Employee: ${data.employeeName}
    SSN: ${data.employeeSSN}
    Address: ${data.employeeAddress}

    Employer: ${data.employerName}
    EIN: ${data.employerEIN}
    Address: ${data.employerAddress}

    Wages: $${data.wages}
    Federal Tax: $${data.fedTax}
    State Tax: $${data.stateTax || "0"}
  `;

  document.getElementById('preview').textContent = preview;

  try {
    const user = firebase.auth().currentUser;
    if (!user) return alert("Login required.");
    await db.collection("users").doc(user.uid).collection("w2Forms").add(data);
    alert("W-2 saved to Firestore.");
  } catch (err) {
    alert("Failed to save: " + err.message);
  }
});

function downloadPDF() {
  const text = document.getElementById('preview').textContent;
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'w2-summary.txt';
  a.click();
}
