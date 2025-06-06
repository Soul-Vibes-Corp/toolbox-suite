// Firebase Config
firebase.initializeApp({
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
});

const db = firebase.firestore();

// Handle Form Submission
document.getElementById('w2-form').addEventListener('submit', e => {
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
    stateTax: document.getElementById('stateTax').value,
    timestamp: new Date()
  };

  db.collection("w2_submissions").add(data)
    .then(() => {
      alert("Saved to TraceCore Cloud.");
    })
    .catch(err => console.error(err));
});

document.getElementById('out-wages').innerText = data.wages;
document.getElementById('out-fedTax').innerText = data.fedTax;
document.getElementById('out-wages2').innerText = data.wages;
document.getElementById('out-fedTax2').innerText = (data.fedTax * 0.062).toFixed(2);
document.getElementById('out-wages3').innerText = data.wages;
document.getElementById('out-fedTax3').innerText = (data.fedTax * 0.0145).toFixed(2);

document.getElementById('out-employeeName').innerText = data.employeeName;
document.getElementById('out-employeeSSN').innerText = data.employeeSSN;
document.getElementById('out-employeeAddress').innerText = data.employeeAddress;
document.getElementById('out-employerName').innerText = data.employerName;
document.getElementById('out-employerEIN').innerText = data.employerEIN;
document.getElementById('out-employerAddress').innerText = data.employerAddress;


// PDF Generation
async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const form = document.getElementById('w2-form');
  const canvas = await html2canvas(form);
  const imgData = canvas.toDataURL("image/png");
  doc.addImage(imgData, "PNG", 10, 10, 190, 0);

  doc.addPage();
  const guide = document.getElementById('guide');
  const guideCanvas = await html2canvas(guide);
  const guideImg = guideCanvas.toDataURL("image/png");
  doc.addImage(guideImg, "PNG", 10, 10, 190, 0);

  doc.save("W2_Form.pdf");
}


const template = document.getElementById('w2-template');
const canvas = await html2canvas(template);
const imgData = canvas.toDataURL("image/png");
doc.addImage(imgData, "PNG", 10, 10, 190, 0);
