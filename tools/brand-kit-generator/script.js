let allData = {};

// Dark/Light Mode Toggle
document.getElementById("toggle-dark").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Tagline and Bio Presets
const taglines = [
  "Empowering Brands Worldwide", "Innovation Starts Here", "Your Success, Our Mission",
  "Branding That Speaks", "Creating Icons, Not Just Brands", "Leading the Future of Branding",
  "Designing Tomorrow’s Vision", "Where Ideas Become Reality", "Your Brand, Our Passion",
  "Crafting Stories, Building Brands", "Transforming Ideas Into Impact", "Making Brands Matter",
  "Empowering Bold Ambitions", "Shaping the Future of Business", "Inspiring Growth Through Branding",
  "Building the Brands of Tomorrow", "Redefining Excellence in Branding", "Designing Brands with Purpose",
  "Your Brand, Our Blueprint", "Driven by Innovation, Powered by Design",
  "Passionate About Your Brand’s Future", "Your Vision, Our Brand Expertise", "Mastering the Art of Branding",
  "Every Brand Has a Story", "We Speak Brand Language", "Innovative Branding for Every Industry",
  "Stronger Brands, Stronger Business", "Future-Proof Your Brand", "Crafting Powerful, Purposeful Brands",
  "Branding with Impact", "Building Legacies Through Branding", "Where Creativity Meets Strategy",
  "Designing Iconic Brand Identities", "Bringing Brands to Life", "Making a Lasting Impression",
  "Innovative Designs for Future Brands", "From Vision to Victory", "Elevating Brands to New Heights",
  "Turning Ideas Into Iconic Brands", "Creating Unforgettable Impressions", "Branding That Works",
  "Revolutionizing Brand Identity", "Redefining What a Brand Can Be", "Crafting Brands with a Purpose",
  "Turning Dreams Into Brands", "Building Stronger Connections Through Branding", "Next-Level Branding Solutions",
  "Branding with Heart and Soul", "Transforming Ideas Into Icons", "Creating Tomorrow’s Icons Today",
  "Designing Your Brand’s Future"
];

const bios = [
  "We specialize in transforming ideas into unforgettable brands.",
  "Bringing vision to life with powerful branding solutions.",
  "Your brand's success is our business.", "Innovative branding for the modern entrepreneur.",
  "Helping brands break through the noise.", "Turning creative ideas into market-leading brands.",
  "We build brands that make a difference.", "Empowering brands to thrive in a competitive world.",
  "Designing brands that connect with your audience.", "Transforming your ideas into iconic brands.",
  "Fueling your brand’s success through innovation.", "Turning concepts into captivating brands.",
  "We help brands tell their unique story.", "Designing memorable brands that leave a lasting impact.",
  "Crafting brands that resonate with consumers.", "Transforming businesses with creative branding strategies.",
  "Delivering exceptional branding solutions that inspire.", "Bringing your vision to life through powerful branding.",
  "We build authentic, meaningful brands.", "Creating brands that stand out in the marketplace.",
  "Redefining branding through innovative design.", "Crafting compelling brand identities that drive growth.",
  "Innovating branding strategies for modern businesses.", "Empowering businesses to connect through branding.",
  "Designing brands that are built to last.", "We help you create a brand that tells your story.",
  "Inspiring your brand’s success through creativity.", "Building brands with a purpose and passion.",
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

// Random Tagline Generator
document.getElementById("generate-tagline").addEventListener("click", () => {
  const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
  document.getElementById("tagline-display").textContent = randomTagline;
  allData.tagline = randomTagline;  // Save the generated tagline to allData
});

// Random Bio Generator
document.getElementById("generate-bio").addEventListener("click", () => {
  const randomBio = bios[Math.floor(Math.random() * bios.length)];
  document.getElementById("bio-display").textContent = randomBio;
  allData.bio = randomBio;  // Save the generated bio to allData
});

// Custom Tagline Generator
function generateTagline() {
  const input = document.getElementById('taglineInput').value;
  const tagline = `Empowering your journey in ${input}.`;
  document.getElementById('taglinePreview').innerText = tagline;
  allData.tagline = tagline;
}

// Custom Bio Generator
function generateBio() {
  const input = document.getElementById('bioInput').value;
  const bio = `We started because we believe in ${input}. Our mission is to change the world one step at a time.`;
  document.getElementById('bioPreview').innerText = bio;
  allData.bio = bio;
}

// Auto-Generate Tagline and Bio
function autoGenerate() {
  const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
  const randomBio = bios[Math.floor(Math.random() * bios.length)];

  document.getElementById("tagline-display").textContent = randomTagline;
  document.getElementById("bio-display").textContent = randomBio;

  // Save both to allData
  allData.tagline = randomTagline;
  allData.bio = randomBio;
}

// Random-Generate Button
document.getElementById("random-generate-btn").addEventListener("click", () => {
  autoGenerate();
});

// Placeholder Logo Generator
function generatePlaceholderLogo() {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "#007bff";
  ctx.fillRect(0, 0, 200, 200);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 40px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("LOGO", 100, 100);

  const img = document.createElement('img');
  img.src = canvas.toDataURL('image/png');
  document.getElementById('logoPreview').innerHTML = '';
  document.getElementById('logoPreview').appendChild(img);
  allData.logo = canvas.toDataURL('image/png');
}

// Logo Upload Handler
document.getElementById('logoUpload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.createElement('img');
    img.src = e.target.result;
    img.style.maxWidth = '200px';
    document.getElementById('logoPreview').innerHTML = '';
    document.getElementById('logoPreview').appendChild(img);
    allData.logo = e.target.result;
  };
  reader.readAsDataURL(file);
});

// Palette Generator
function generatePalette() {
  const colors = chroma.scale(['#fafa6e', '#2A4858']).mode('lch').colors(5);
  document.getElementById('palettePreview').innerHTML = colors.map(color =>
    `<div class="color-box" style="background:${color}" title="${color}"></div>`
  ).join('');
  allData.palette = colors;
}

// Business Card Generator
function generateBusinessCard() {
  const name = document.getElementById('cardName').value;
  const title = document.getElementById('cardTitle').value;
  const email = document.getElementById('cardEmail').value;
  const cardHtml = `<div style="border:1px solid #000; padding:10px; width:300px;">
    <h3>${name}</h3><p>${title}</p><p>${email}</p></div>`;
  document.getElementById('cardPreview').innerHTML = cardHtml;
  allData.businessCard = cardHtml;
}

// Signature Generator
function generateSignature() {
  const name = document.getElementById('signatureName').value;
  const title = document.getElementById('signatureTitle').value;
  const website = document.getElementById('signatureWebsite').value;
  const signatureHtml = `<div>
    <strong>${name}</strong><br>${title}<br><a href="${website}" target="_blank">${website}</a>
  </div>`;
  document.getElementById('signaturePreview').innerHTML = signatureHtml;
  allData.signature = signatureHtml;
}

// Brandbook PDF Generator
function generateBrandbook() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text('Brandbook', 10, 10);
  if (allData.tagline) doc.text(`Tagline: ${allData.tagline}`, 10, 20);
  if (allData.bio) doc.text(`Bio: ${allData.bio}`, 10, 30);
  if (allData.palette) {
    allData.palette.forEach((color, i) => {
      doc.setFillColor(color);
      doc.rect(10 + (i * 30), 40, 20, 20, 'F');
    });
  }
  doc.save('Brandbook.pdf');
}

// Download Toolkit ZIP
function downloadAll() {
  const zip = new JSZip();
  if (allData.tagline) zip.file('tagline.txt', allData.tagline);
  if (allData.bio) zip.file('bio.txt', allData.bio);
  if (allData.logo) {
    const imgData = allData.logo.split(',')[1];
    zip.file('logo.png', imgData, { base64: true });
  }
  if (allData.palette) zip.file('palette.txt', allData.palette.join('\n'));
  if (allData.businessCard) zip.file('businessCard.html', allData.businessCard);
  if (allData.signature) zip.file('signature.html', allData.signature);

  zip.generateAsync({ type: "blob" }).then(function(content) {
    saveAs(content, "branding_toolkit.zip");
  });
}
