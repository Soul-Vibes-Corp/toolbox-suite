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

const template = document.getElementById('w2-template');
const canvas = await html2canvas(template);
const imgData = canvas.toDataURL("image/png");
doc.addImage(imgData, "PNG", 10, 10, 190, 0);
