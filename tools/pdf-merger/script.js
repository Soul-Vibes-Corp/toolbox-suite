const fileInput = document.getElementById('pdfFiles');
const mergeBtn = document.getElementById('mergeBtn');
const outputDiv = document.getElementById('output');

mergeBtn.addEventListener('click', async () => {
  const files = fileInput.files;
  if (files.length < 2) {
    alert('Please select at least 2 PDF files to merge.');
    return;
  }

  const mergedPdf = await PDFLib.PDFDocument.create();

  for (let file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  download(mergedPdfBytes, 'merged.pdf', 'application/pdf');
});

function download(blobData, filename, mimeType) {
  const blob = new Blob([blobData], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  outputDiv.innerHTML = `<p>✅ Merged PDF is ready! Check your downloads.</p>`;
}

