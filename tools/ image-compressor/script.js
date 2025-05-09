const imageInput = document.getElementById('imageInput');
const qualityRange = document.getElementById('qualityRange');
const qualityValue = document.getElementById('qualityValue');
const compressBtn = document.getElementById('compressBtn');
const previewImage = document.getElementById('previewImage');
const downloadLink = document.getElementById('downloadLink');

let uploadedImage = null;

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (event) => {
      uploadedImage = new Image();
      uploadedImage.src = event.target.result;
      uploadedImage.onload = () => {
        previewImage.src = uploadedImage.src;
      };
    };
    reader.readAsDataURL(file);
  }
});

qualityRange.addEventListener('input', () => {
  qualityValue.textContent = qualityRange.value;
});

compressBtn.addEventListener('click', () => {
  if (!uploadedImage) {
    alert('Please select an image first!');
    return;
  }

  const canvas = document.createElement('canvas');
  const maxWidth = 1000; // Optional max width resize

  let width = uploadedImage.width;
  let height = uploadedImage.height;

  // Resize image if it's too large (optional)
  if (width > maxWidth) {
    height = height * (maxWidth / width);
    width = maxWidth;
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(uploadedImage, 0, 0, width, height);

  const quality = parseFloat(qualityRange.value);
  canvas.toBlob((blob) => {
    const compressedURL = URL.createObjectURL(blob);
    previewImage.src = compressedURL;
    downloadLink.href = compressedURL;
  }, 'image/jpeg', quality);
});

