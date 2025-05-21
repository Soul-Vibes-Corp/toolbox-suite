const form = document.getElementById("gigForm");
const resultsDiv = document.getElementById("gigResults");
const loader = document.getElementById("loader");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const keyword = document.getElementById("gigKeyword").value;
  const skill = document.getElementById("skill").value;
  const location = document.getElementById("location").value;
  const remote = document.getElementById("remoteToggle").checked;
  const budget = document.getElementById("budgetRange").value;

  resultsDiv.innerHTML = "";
  loader.style.display = "block";

  const gigs = generateGigs(keyword, skill, location, remote, budget);

  setTimeout(() => {
    loader.style.display = "none";
    displayGigs(gigs);
  }, 1600);
});

function generateGigs(keyword, skill, location, remote, budget) {
  const gigTypes = ["Developer", "Designer", "Writer", "Strategist", "Producer", "Editor"];
  const platforms = ["Upwork", "Fiverr", "RemoteOK", "Freelancer", "PeoplePerHour"];
  const tags = ["Remote", "Urgent", "Featured", "Short-term", "Long-term"];

  let gigs = [];
  for (let i = 0; i < 6; i++) {
    const type = gigTypes[Math.floor(Math.random() * gigTypes.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const tag = tags[Math.floor(Math.random() * tags.length)];

    gigs.push({
      title: `${keyword} ${type}`,
      platform,
      tag,
      location: remote ? "Remote" : location || "Flexible",
      budget: budget === "any" ? "Negotiable" : budget === "low" ? "$200-$500" : budget === "mid" ? "$800-$1500" : "$2K+"
    });
  }
  return gigs;
}

function displayGigs(gigs) {
  gigs.forEach(gig => {
    const card = document.createElement("div");
    card.className = "gig-card";

    card.innerHTML = `
      <div class="gig-title">${gig.title}</div>
      <div class="gig-tags">
        Platform: ${gig.platform} <br>
        Budget: ${gig.budget} <br>
        Location: ${gig.location}
      </div>
      <div class="gig-badge">${gig.tag === "Urgent" ? "🔥" : gig.tag === "Featured" ? "💎" : "✅"} ${gig.tag}</div>
      <a href="#" class="apply-btn">Apply Now</a>
    `;

    resultsDiv.appendChild(card);
  });
}

// Toggle favorite
function toggleFavorite(gigId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.includes(gigId)) {
    favorites = favorites.filter(id => id !== gigId);
  } else {
    favorites.push(gigId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoriteUI(gigId);
}

// Update UI
function updateFavoriteUI(gigId) {
  const heartIcon = document.getElementById(`heart-${gigId}`);
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  heartIcon.classList.toggle('favorited', favorites.includes(gigId));
}

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Optionally, save preference to localStorage
});

function exportToJSON() {
  const dataStr = JSON.stringify(gigData);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  // Create a link and trigger download
}

function exportToPDF() {
  // Use a library like jsPDF to generate and download PDF
}
