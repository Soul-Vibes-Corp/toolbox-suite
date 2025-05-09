const textInput = document.getElementById('textInput');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.getElementById('qrcode');

let qr = null;

generateBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (!text) {
    alert('Please enter text or a URL');
    return;
  }

  // Clear existing QR code
  qrContainer.innerHTML = '';

  // Generate new QR code
  qr = new QRCode(qrContainer, {
    text: text,
    width: 200,
    height: 200,
  });
});

downloadBtn.addEventListener('click', () => {
  if (!qr) {
    alert('Generate a QR code first!');
    return;
  }

  // Get the canvas or img from the QR code container
  const qrImage = qrContainer.querySelector('img') || qrContainer.querySelector('canvas');
  if (qrImage) {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrImage.src || qrImage.toDataURL('image/png');
    link.click();
  }
});

