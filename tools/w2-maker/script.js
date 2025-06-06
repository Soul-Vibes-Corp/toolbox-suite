document.getElementById('w2-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Populate fields
  document.getElementById('field-empName').textContent = document.getElementById('empName').value;
  document.getElementById('field-empSSN').textContent = document.getElementById('empSSN').value;
  document.getElementById('field-empAddress').textContent = document.getElementById('empAddress').value;

  document.getElementById('field-employerName').textContent = document.getElementById('employerName').value;
  document.getElementById('field-employerEIN').textContent = document.getElementById('employerEIN').value;
  document.getElementById('field-employerAddress').textContent = document.getElementById('employerAddress').value;

  document.getElementById('field-wages').textContent = `$${document.getElementById('wages').value}`;
  document.getElementById('field-fedTax').textContent = `$${document.getElementById('federalTax').value}`;
  document.getElementById('field-stateTax').textContent = `$${document.getElementById('stateTax').value || "0.00"}`;
});

document.getElementById('download-btn').addEventListener('click', function() {
  html2canvas(document.getElementById('w2-canvas')).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0); // fit width
    pdf.save('W-2_2025_TraceCore.pdf');
  });
});
