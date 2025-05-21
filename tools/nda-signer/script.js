// Simple canvas signature capture
function initSignaturePad(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  let drawing = false;

  function startDraw(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }
  function draw(e) {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = "#0073e6";
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
  function endDraw() {
    drawing = false;
  }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', endDraw);
  canvas.addEventListener('mouseleave', endDraw);
}

function clearSignature(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

initSignaturePad('sigCanvasDisclosing');
initSignaturePad('sigCanvasReceiving');

document.getElementById('ndaForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const disclosingParty = document.getElementById('disclosingParty').value.trim();
  const receivingParty = document.getElementById('receivingParty').value.trim();
  const ndaTerms = document.getElementById('ndaTerms').value.trim();

  const disclosingSig = document.getElementById('sigCanvasDisclosing').toDataURL();
  const receivingSig = document.getElementById('sigCanvasReceiving').toDataURL();

  if (disclosingSig === document.createElement('canvas').toDataURL() || receivingSig === document.createElement('canvas').toDataURL()) {
    alert('Both parties must provide their signatures.');
    return;
  }

  const currentDate = new Date().toLocaleDateString();

  const ndaText = `
NON-DISCLOSURE AGREEMENT (NDA)

This Agreement is entered into on ${currentDate} between:

Disclosing Party: ${disclosingParty}
Receiving Party: ${receivingParty}

1. CONFIDENTIAL INFORMATION
${ndaTerms}

2. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to keep all confidential information strictly confidential and not disclose it to any third party.

3. TERM
This Agreement remains in effect for 3 years from the date above.

4. GOVERNING LAW
This Agreement shall be governed by the laws of the jurisdiction where the Disclosing Party resides.

SIGNATURES

Disclosing Party Signature:
[See below]

Receiving Party Signature:
[See below]

---

`;

  // Display the contract + signatures as images below
  const outputEl = document.getElementById('ndaOutput');
  outputEl.innerText = ndaText;

  const sigDisclosingImg = document.createElement('img');
  sigDisclosingImg.src = disclosingSig;
  sigDisclosingImg.alt = "Disclosing Party Signature";
  sigDisclosingImg.style.border = "1px solid #0073e6";
  sigDisclosingImg.style.marginBottom = "25px";
  sigDisclosingImg.style.maxWidth = "400px";

  const sigReceivingImg = document.createElement('img');
  sigReceivingImg.src = receivingSig;
  sigReceivingImg.alt = "Receiving Party Signature";
  sigReceivingImg.style.border = "1px solid #0073e6";
  sigReceivingImg.style.marginBottom = "25px";
  sigReceivingImg.style.maxWidth = "400px";

  outputEl.appendChild(document.createElement('br'));
  outputEl.appendChild(document.createTextNode('Disclosing Party Signature:'));
  outputEl.appendChild(document.createElement('br'));
  outputEl.appendChild(sigDisclosingImg);

  outputEl.appendChild(document.createTextNode('Receiving Party Signature:'));
  outputEl.appendChild(document.createElement('br'));
  outputEl.appendChild(sigReceivingImg);
});
