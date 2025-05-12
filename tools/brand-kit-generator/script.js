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
  "Creating Icons, Not Just Brands",
  "Leading the Future of Branding",
  "Designing Tomorrow’s Vision",
  "Where Ideas Become Reality",
  "Your Brand, Our Passion",
  "Crafting Stories, Building Brands",
  "Transforming Ideas Into Impact",
  "Making Brands Matter",
  "Empowering Bold Ambitions",
  "Shaping the Future of Business",
  "Inspiring Growth Through Branding",
  "Building the Brands of Tomorrow",
  "Redefining Excellence in Branding",
  "Designing Brands with Purpose",
  "Your Brand, Our Blueprint",
  "Driven by Innovation, Powered by Design",
  "Passionate About Your Brand’s Future",
  "Your Vision, Our Brand Expertise",
  "Mastering the Art of Branding",
  "Every Brand Has a Story",
  "We Speak Brand Language",
  "Innovative Branding for Every Industry",
  "Stronger Brands, Stronger Business",
  "Future-Proof Your Brand",
  "Crafting Powerful, Purposeful Brands",
  "Branding with Impact",
  "Building Legacies Through Branding",
  "Where Creativity Meets Strategy",
  "Designing Iconic Brand Identities",
  "Bringing Brands to Life",
  "Making a Lasting Impression",
  "Innovative Designs for Future Brands",
  "From Vision to Victory",
  "Elevating Brands to New Heights",
  "Turning Ideas Into Iconic Brands",
  "Creating Unforgettable Impressions",
  "Branding That Works",
  "Revolutionizing Brand Identity",
  "Redefining What a Brand Can Be",
  "Crafting Brands with a Purpose",
  "Turning Dreams Into Brands",
  "Building Stronger Connections Through Branding",
  "Next-Level Branding Solutions",
  "Branding with Heart and Soul",
  "Transforming Ideas Into Icons",
  "Creating Tomorrow’s Icons Today",
  "Designing Your Brand’s Future"
];

const bios = [
  "We specialize in transforming ideas into unforgettable brands.",
  "Bringing vision to life with powerful branding solutions.",
  "Your brand's success is our business.",
  "Innovative branding for the modern entrepreneur.",
  "Helping brands break through the noise.",
  "Turning creative ideas into market-leading brands.",
  "We build brands that make a difference.",
  "Empowering brands to thrive in a competitive world.",
  "Designing brands that connect with your audience.",
  "Transforming your ideas into iconic brands.",
  "Fueling your brand’s success through innovation.",
  "Turning concepts into captivating brands.",
  "We help brands tell their unique story.",
  "Designing memorable brands that leave a lasting impact.",
  "Crafting brands that resonate with consumers.",
  "Transforming businesses with creative branding strategies.",
  "Delivering exceptional branding solutions that inspire.",
  "Bringing your vision to life through powerful branding.",
  "We build authentic, meaningful brands.",
  "Creating brands that stand out in the marketplace.",
  "Redefining branding through innovative design.",
  "Crafting compelling brand identities that drive growth.",
  "Innovating branding strategies for modern businesses.",
  "Empowering businesses to connect through branding.",
  "Designing brands that are built to last.",
  "We help you create a brand that tells your story.",
  "Inspiring your brand’s success through creativity.",
  "Building brands with a purpose and passion.",
  "Helping you build a brand that stands the test of time.",
  "Elevating your business with powerful branding strategies.",
  "Turning your brand vision into reality.",
  "Designing brands that are as unique as your business.",
  "We specialize in creating brands that leave an impact.",
  "Creating branding strategies that drive business success.",
  "Building brands that inspire trust and loyalty.",
  "Helping businesses grow through strategic branding.",
  "Designing brands that are more than just logos.",
  "Helping brands define their voice in the market.",
  "We create brands that foster strong connections.",
  "Helping you build a brand that resonates with your audience.",
  "Designing brands that make an emotional connection.",
  "We help you build a brand that is unforgettable.",
  "Building brands that reflect your company’s values.",
  "We create brands that people love.",
  "Designing brands that create a strong identity.",
  "We help your brand stand out in a crowded market.",
  "Creating brands that make a lasting impression.",
  "Transforming brands with fresh, creative ideas.",
  "Designing brands that are both timeless and modern.",
  "We specialize in building brands that evolve with the times.",
  "Turning your passion into a brand that connects."
];

// Tagline Display
document.getElementById("generate-tagline").addEventListener("click", () => {
  const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
  document.getElementById("tagline-display").textContent = randomTagline;
});

// Bio Display
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

// Random Logo Generator based on description
function generateRandomLogo() {
  const logoCanvas = document.getElementById("logoCanvas");
  const ctx = logoCanvas.getContext("2d");

  // Clear the previous canvas
  ctx.clearRect(0, 0, logoCanvas.width, logoCanvas.height);

  // Getting values from the description input form
  const shape = document.getElementById("logo-shape").value; // Circle, Square, etc.
  const color = document.getElementById("logo-color").value; // Color picker for logo color
  const text = document.getElementById("logo-text").value; // Text for logo

  // Set canvas size
  logoCanvas.width = 300;
  logoCanvas.height = 300;

  // Drawing the logo based on description
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;

  // Create the logo shape
  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(150, 150, 100, 0, 2 * Math.PI);
    ctx.fill();
  } else if (shape === "square") {
    ctx.fillRect(50, 50, 200, 200);
  }

  // Add the logo text
  if (text) {
    ctx.fillStyle = "white"; // Text color
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 150, 150);
  }
}

// Event Listener to trigger the random logo generation
document.getElementById("generate-logo-button").addEventListener("click", () => {
  generateRandomLogo();
});

// Generate Color Palette
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

// ZIP Export (Dummy functionality - ready to integrate with backend or JSZip)
document.getElementById("zip-export").addEventListener("click", () => {
  alert("ZIP Export feature coming soon!");
});
