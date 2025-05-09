const colorInput = document.getElementById('colorInput');
const hexValue = document.getElementById('hexValue');
const rgbValue = document.getElementById('rgbValue');
const hslValue = document.getElementById('hslValue');
const copyBtns = document.querySelectorAll('.copyBtn');

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [
    Math.round(h * 360),
    Math.round(s * 100),
    Math.round(l * 100)
  ];
}

function updateValues(hex) {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);

  hexValue.value = hex;
  rgbValue.value = `rgb(${r}, ${g}, ${b})`;
  hslValue.value = `hsl(${h}, ${s}%, ${l}%)`;
}

// Initial populate
updateValues(colorInput.value);

colorInput.addEventListener('input', (e) => {
  updateValues(e.target.value);
});

copyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    let value = '';

    if (type === 'hex') value = hexValue.value;
    if (type === 'rgb') value = rgbValue.value;
    if (type === 'hsl') value = hslValue.value;

    navigator.clipboard.writeText(value)
      .then(() => alert(`${type.toUpperCase()} copied!`))
      .catch(() => alert('Failed to copy!'));
  });
});
