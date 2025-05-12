// Dark/Light Mode Toggle
document.getElementById("toggle-dark").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Tagline and Bio Generation
const taglines = [
  "Empowering Brands Worldwide", 
  "Innovation Starts Here", 
  "Your Success, Our Mission", 
  "Branding That Speaks", 
  "Creating Icons, Not Just Brands"
];
const bios = [
  "We specialize in transforming ideas into unforgettable brands.",
  "Bringing vision to life with powerful branding solutions.",
  "Your brand's success is our business.",
  "Innovative branding for the modern entrepreneur."
];

document.getElementById("generate-tagline").addEventListener("click", () => {
  const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
  document.getElementById("tagline-display").textContent = randomTagline;
});

document.getElementById("generate-bio").addEventListener("click", () => {
  const randomBio = bios[Math.floor(Math.random() * bios.length)];
  document.getElementById("bio-display").textContent = randomBio;
});

// Logo Upload & Preview
document.getElementById("logo-upload").addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById("logo-preview").innerHTML = `<img src="${e.target.result}" alt="Logo Preview" width="150">`;
  };
  reader.readAsDataURL(file);
});

// Logo Upload + Display (from previous code)
function generateLogo() {
  const fileInput = document.getElementById('logoUpload');
  const canvas = document.getElementById('logoCanvas');
  const ctx = canvas.getContext('2d');
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      canvas.width = 300;
      canvas.height = 300;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 300, 300);
    }
    img.src = e.target.result;
  }

  if (file) reader.readAsDataURL(file);
}

// Generate Color Palette (Simple demo)
function generatePalette() {
  const baseColor = document.getElementById('colorPicker').value;
  const paletteDisplay = document.getElementById('paletteDisplay');
  paletteDisplay.innerHTML = '';

  const scale = chroma.scale([baseColor, 'white']).mode('lab').colors(5);
  scale.forEach(color => {
    const div = document.createElement('div');
    div.style.background = color;
    div.style.width = '60px';
    div.style.height = '60px';
    div.style.display = 'inline-block';
    paletteDisplay.appendChild(div);
  });
}

// Generate Brandbook PDF
function generateBrandbook() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Brand Guidelines", 20, 20);
  doc.text("Brand Name: " + document.getElementById("brand-name").value, 20, 30);
  doc.text("Tagline: " + document.getElementById("tagline-display").textContent, 20, 40);
  doc.text("Bio: " + document.getElementById("bio-display").textContent, 20, 50);
  doc.text("Brand Color: " + document.getElementById("brand-color").value, 20, 60);
  doc.text("Font: " + document.getElementById("brand-font").value, 20, 70);

  doc.save("Brandbook.pdf");
}

// Dummy business card generator
function generateBusinessCard() {
  alert('Business Card generated (demo)');
}

// Dummy email signature generator
function generateEmailSignature() {
  alert('Email Signature generated (demo)');
}

// Dummy social media asset generator
function generateSocialMediaAssets() {
  alert('Social Media Assets generated (demo)');
}

// Dummy ZIP download (for demo purposes)
function downloadKit() {
  alert('Brand Kit ZIP downloaded (demo)');
}

// Download Branding Guide as PDF (integrated with brand details)
document.getElementById("download-pdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  doc.text("Brand Name: " + document.getElementById("brand-name").value, 10, 10);
  doc.text("Tagline: " + document.getElementById("tagline-display").textContent, 10, 20);
  doc.text("Bio: " + document.getElementById("bio-display").textContent, 10, 30);
  doc.text("Brand Color: " + document.getElementById("brand-color").value, 10, 40);
  doc.text("Font: " + document.getElementById("brand-font").value, 10, 50);

  doc.save("branding-guide.pdf");
});

// ZIP Export (Dummy functionality - ready to integrate with backend or JSZip)
document.getElementById("zip-export").addEventListener("click", () => {
  alert("ZIP Export feature coming soon!");
});
