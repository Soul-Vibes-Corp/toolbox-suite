const imageInput = document.getElementById('imageInput');
const formatSelect = document.getElementById('formatSelect');
const qualityRange = document.getElementById('qualityRange');
const qualityValue = document.getElementById('qualityValue');
const processBtn = document.getElementById('processBtn');
const previewImage = document.getElementById('previewImage');
const downloadBtn = document.getElementById('downloadBtn');

qualityRange.addEventListener('input', () => {
    qualityValue.textContent = `${qualityRange.value}%`;
});

processBtn.addEventListener('click', () => {
    const file = imageInput.files[0];
    if (!file) {
        alert('Please select an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const selectedFormat = formatSelect.value;
            let mimeType = 'image/jpeg';
            if (selectedFormat === 'png') mimeType = 'image/png';
            if (selectedFormat === 'webp') mimeType = 'image/webp';

            const quality = qualityRange.value / 100;
            const dataUrl = canvas.toDataURL(mimeType, quality);

            // Preview processed image
            previewImage.src = dataUrl;

            // Set up download
            const extension = selectedFormat === 'jpeg' ? 'jpg' : selectedFormat;
            downloadBtn.href = dataUrl;
            downloadBtn.download = `compressed-image.${extension}`;
            downloadBtn.style.display = 'inline-block';
        };
    };

    reader.readAsDataURL(file);
});
