const openCameraBtn = document.getElementById('openCameraBtn');
const cameraPreview = document.getElementById('cameraPreview');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const processBtn = document.getElementById('processBtn');
const scanPreviewImage = document.getElementById('scanPreviewImage');
const scanPreviewContainer = document.getElementById('scanPreviewContainer');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');
const downloadTextBtn = document.getElementById('downloadTextBtn');

let videoStream;
let capturedImageData;

openCameraBtn.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            videoStream = stream;
            cameraPreview.style.display = 'block';
            cameraPreview.srcObject = stream;
            cameraPreview.play();
            openCameraBtn.style.display = 'none';
            captureBtn.style.display = 'block';
        })
        .catch(error => {
            alert('Camera access denied or not available.');
            console.error(error);
        });
});

captureBtn.addEventListener('click', () => {
    canvas.width = cameraPreview.videoWidth;
    canvas.height = cameraPreview.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);

    capturedImageData = canvas.toDataURL('image/jpeg');
    scanPreviewImage.src = capturedImageData;
    scanPreviewContainer.style.display = 'block';
    processBtn.style.display = 'block';
    captureBtn.style.display = 'none';
});

processBtn.addEventListener('click', () => {
    // Assuming we want to apply basic document processing, like auto-cropping or straightening.
    processScan(capturedImageData);
});

function processScan(imageData) {
    // Apply basic enhancements here (auto-crop, straighten, brightness/contrast adjustments, etc.)
    // For simplicity, we'll just use the raw image for now and enable download options.

    // Show download options
    downloadPdfBtn.style.display = 'inline-block';
    downloadTextBtn.style.display = 'inline-block';

    // Placeholder for OCR and PDF generation
    downloadPdfBtn.onclick = () => generatePDF(imageData);
    downloadTextBtn.onclick = () => generateText(imageData);
}

function generatePDF(imageData) {
    // Use jsPDF to generate a PDF from the captured image
    const doc = new jsPDF();
    doc.addImage(imageData, 'JPEG', 10, 10, 180, 250);
    doc.save('document.pdf');
}

function generateText(imageData) {
    // Use Tesseract.js for OCR to extract text from the image
    Tesseract.recognize(
        imageData,
        'eng',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'document.txt';
        link.click();
    });
}
