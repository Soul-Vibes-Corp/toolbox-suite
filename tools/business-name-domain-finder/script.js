const form = document.getElementById("nameForm");
const resultsDiv = document.getElementById("results");
const loader = document.getElementById("loader");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const keyword = document.getElementById("keyword").value.trim();
  const industry = document.getElementById("industry").value;
  const tone = document.getElementById("tone").value;
  const ext = document.getElementById("domainExt").value;

  resultsDiv.innerHTML = "";
  loader.style.display = "block";

  const ideas = generateNames(keyword, industry, tone);

  setTimeout(() => {
    loader.style.display = "none";
    displayResults(ideas, ext);
  }, 1500);
});

function generateNames(keyword, industry, tone) {
  const root = keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();

  const prefixes = {
    cool: ["Neo", "Vibe", "Nex", "Hype"],
    professional: ["Core", "Prime", "Edge", "Trust"],
    playful: ["Buzz", "Zappy", "Jumpy", "Bloop"],
    luxury: ["Aura", "Vel", "Roy", "Glitz"]
  };

  const suffixes = {
    tech: ["hub", "net", "byte", "flow"],
    fashion: ["ique", "wear", "mode", "fit"],
    finance: ["fund", "bank", "pay", "coin"],
    health: ["zen", "fit", "heal", "med"]
  };

  const ideas = [];
  for (let i = 0; i < 6; i++) {
    const pre = prefixes[tone][Math.floor(Math.random() * 4)];
    const suf = suffixes[industry][Math.floor(Math.random() * 4)];
    ideas.push(`${pre}${root}${suf}`);
  }

  return ideas;
}

function displayResults(ideas, ext) {
  ideas.forEach(name => {
    const domain = `${name.toLowerCase().replace(/\s+/g, "")}${ext}`;
    const available = Math.random() > 0.4;
    const card = document.createElement("div");
    card.className = "result-card";

    card.innerHTML = `
      <strong>${name}</strong>
      <div class="domain">${domain} – <span style="color:${available ? '#0f0' : '#f55'}">${available ? '✅ Available' : '❌ Taken'}</span></div>
    `;

    resultsDiv.appendChild(card);
  });
}
