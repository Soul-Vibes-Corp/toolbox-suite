const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cropBtn = document.getElementById('cropBtn');
const rotateLeftBtn = document.getElementById('rotateLeftBtn');
const rotateRightBtn = document.getElementById('rotateRightBtn');
const flipHBtn = document.getElementById('flipHBtn');
const flipVBtn = document.getElementById('flipVBtn');
const downloadBtn = document.getElementById('downloadBtn');
const themeToggle = document.getElementById('themeToggle');

let image = new Image();
let scaleX = 1;
let scaleY = 1;
let rotation = 0;
let cropping = false;
let cropStart = {};
let cropEnd = {};

// Upload + draw
imageUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
});

image.onload = () => {
  canvas.width = image.width;
  canvas.height = image.height;
  resetTransforms();
  drawImage();
};

// Utilities
function resetTransforms() {
  scaleX = 1;
  scaleY = 1;
  rotation = 0;
}

function drawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(scaleX, scaleY);
  ctx.rotate(rotation * Math.PI / 180);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);
  ctx.restore();
}

// Crop
canvas.addEventListener('mousedown', (e) => {
  if (!cropping) return;
  cropStart = getMousePos(canvas, e);
});

canvas.addEventListener('mouseup', (e) => {
  if (!cropping) return;
  cropEnd = getMousePos(canvas, e);
  applyCrop();
  cropping = false;
});

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: Math.round((evt.clientX - rect.left) * (canvas.width / rect.width)),
    y: Math.round((evt.clientY - rect.top) * (canvas.height / rect.height))
  };
}

function applyCrop() {
  const x = Math.min(cropStart.x, cropEnd.x);
  const y = Math.min(cropStart.y, cropEnd.y);
  const width = Math.abs(cropEnd.x - cropStart.x);
  const height = Math.abs(cropEnd.y - cropStart.y);

  const croppedImage = ctx.getImageData(x, y, width, height);

  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(croppedImage, 0, 0);

  // Update base image
  const newDataURL = canvas.toDataURL();
  image.src = newDataURL;
}

// Controls
cropBtn.addEventListener('click', () => {
  cropping = true;
  alert('Drag mouse on image to select crop area.');
});

rotateLeftBtn.addEventListener('click', () => {
  rotation -= 90;
  drawImage();
});

rotateRightBtn.addEventListener('click', () => {
  rotation += 90;
  drawImage();
});

flipHBtn.addEventListener('click', () => {
  scaleX *= -1;
  drawImage();
});

flipVBtn.addEventListener('click', () => {
  scaleY *= -1;
  drawImage();
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = canvas.toDataURL();
  link.click();
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
});
