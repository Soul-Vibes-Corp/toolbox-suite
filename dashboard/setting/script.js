document.addEventListener('DOMContentLoaded', () => {
  // ---- Cache Elements ----
  const searchInput = document.getElementById('search');
  const resultCount = document.getElementById('result-count');
  const toggleDarkBtn = document.getElementById('toggle-dark');
  const toolCards = Array.from(document.querySelectorAll('.tool-card'));
  const categories = Array.from(document.querySelectorAll('.category'));
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');

   menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');

  // Update aria-expanded attribute
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && event.target !== menuToggle) {
      menu.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    });
});
  let currentFocus = -1; // For keyboard navigation

  // ---- Dark Mode ----
  const DARK_CLASS = 'dark';
  const darkPrefKey = 'darkMode';

  const setDarkMode = (enable) => {
    document.body.classList.toggle(DARK_CLASS, enable);
    localStorage.setItem(darkPrefKey, enable ? 'enabled' : 'disabled');
    updateToggleIcon();
  };

  const updateToggleIcon = () => {
    toggleDarkBtn.textContent = document.body.classList.contains(DARK_CLASS) ? '☀️' : '🌙';
  };

  // Load saved dark mode preference
  if (localStorage.getItem(darkPrefKey) === 'enabled') {
    setDarkMode(true);
  } else {
    updateToggleIcon();
  }

  // Toggle dark mode on button click
document.getElementById('toggle-dark').addEventListener('click', function() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  const pressed = this.getAttribute('aria-pressed') === 'true';
  this.setAttribute('aria-pressed', String(!pressed));
  this.textContent = pressed ? '🌙 Toggle Dark Mode' : '☀️ Toggle Light Mode';
});

  // ---- Search Functionality ----
  const filterTools = () => {
    const query = searchInput.value.toLowerCase().trim();
    let totalMatches = 0;

    categories.forEach(section => {
      const cards = Array.from(section.querySelectorAll('.tool-card'));
      let sectionMatches = 0;

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const match = text.includes(query);
        card.style.display = match ? 'inline-block' : 'none';
        if (match) sectionMatches++;
      });

      section.style.display = sectionMatches > 0 ? 'block' : 'none';
      totalMatches += sectionMatches;
    });

    resultCount.textContent = query ? `${totalMatches} tool${totalMatches !== 1 ? 's' : ''} found` : '';
    currentFocus = -1; // Reset focus after search
  };

  searchInput.addEventListener('input', filterTools);

import React from "react";
import BusinessCardPreview from "@/components/BusinessCardPreview";
import BrandArchetypeTool from "@/components/BrandArchetypeTool";

export default function Home() {
  return (
    <div className="min-h-screen p-10 bg-gray-50 flex flex-col items-center space-y-16">
      <BusinessCardPreview />
      <BrandArchetypeTool />
    </div>
  );
}

<script src="script.js"></script>
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('✅ Service Worker Registered'))
      .catch(err => console.error('Service Worker registration failed:', err));
  }
</script>

<script>
  const searchToggle = document.getElementById('search-toggle');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const suiteGrid = document.querySelector('.suite-grid');

const tools = [
  // 🛠️ Frelance Marketing, Branding & Employment
  { name: "🎨 Instant Brand Kit Creator", tags: ["branding", "design", "brand"] },
  { name: "📅 Marketing Content Calendar Generator", tags: ["marketing", "calendar", "content"] },
  { name: "📚 Lead Magnet Creator", tags: ["lead", "magnet", "conversion"] },
  { name: "📊 Social Media Analytics Snapshot", tags: ["social", "analytics", "media"] },
  { name: "🔍 Smart Business Name & Domain Finder", tags: ["business", "domain", "name"] },
  { name: "🏢 Find Gigs", tags: ["jobs", "gigs", "freelance"] },
  { name: "🔐 Job Search Tools", tags: ["job", "search", "career"] },
  { name: "📄 Resume Builder", tags: ["resume", "cv", "builder"] },
  { name: "🗣️ Interview Prep Tools", tags: ["interview", "preparation", "job"] },
  { name: "🏢 Work Schedule Management", tags: ["schedule", "work", "management"] },
  { name: "📄 Salary Calculator", tags: ["salary", "finance", "calculator"] },
  { name: "⏱️ Time Tracking Tool", tags: ["time", "tracking", "productivity"] },

  // 📈 Business Strategy & Financial Planning
  { name: "📝 One-Page Business Plan Generator", tags: ["business", "plan", "strategy"] },
  { name: "⚖️ Instant SWOT Analysis Generator", tags: ["swot", "analysis", "strategy"] },
  { name: "💲 Profit & Investment Calculator", tags: ["profit", "investment", "finance"] },
  { name: "📊 Smart KPI Dashboard", tags: ["kpi", "dashboard", "metrics"] },
  { name: "🔧 Smart Cost-Cutting Analyzer", tags: ["cost", "cutting", "savings"] },
  { name: "🖲️ Expense Tracking", tags: ["expense", "tracking", "finance"] },

  // 📊 Sales & Client Management
  { name: "📑 Smart Proposal Generator", tags: ["proposal", "sales", "client"] },
  { name: "🧾 Invoice + Bill Payment Services", tags: ["invoice", "payment", "billing"] },
  { name: "📝 Client Contract Generator", tags: ["contract", "client", "agreement"] },
  { name: "🖋️ Automated NDA Signer Tool", tags: ["nda", "signer", "legal"] },
  { name: "📅 Meeting Agenda + Summary Maker", tags: ["meeting", "agenda", "summary"] },
  { name: "🧾 Invoice Generator", tags: ["invoice", "generator", "billing"] },

  // 🧑‍💼 Operations & Team Management
  { name: "📋 Employee Onboarding Kit Generator", tags: ["employee", "onboarding", "hr"] },
  { name: "🗂️ Team Taskboard Generator", tags: ["team", "taskboard", "management"] },
  { name: "📏 Proffessional Networking", tags: ["networking", "professional", "connections"] },

  // 🤝 Customer & Audience Building
  { name: "👥 Customer Avatar Builder", tags: ["customer", "avatar", "persona"] },
  { name: "📧 Smart Email Sequence Generator", tags: ["email", "sequence", "marketing"] },

  // 🛠️ Everyday Utility Tools
  { name: "📎 PDF Merger Tool", tags: ["pdf", "merge", "documents"] },
  { name: "🖼️ Image Compressor", tags: ["image", "compressor", "optimize"] },
  { name: "🔗 QR Code Generator", tags: ["qr", "code", "generator"] },
  { name: "📄 Document Scanner", tags: ["document", "scanner", "pdf"] },
  { name: "💬 Quote Box", tags: ["quote", "box", "inspiration"] },
  { name: "💱 Currency Converter", tags: ["currency", "converter", "exchange"] },
  { name: "🏋️‍♂️ Fitness Tracker", tags: ["fitness", "tracker", "health"] },
  { name: "🖌️ Image Editor", tags: ["image", "editor", "design"] },
  { name: "🗄️ JSON Formatter", tags: ["json", "formatter", "code"] },
  { name: "🧘 Meditation Timer", tags: ["meditation", "timer", "relaxation"] },
  { name: "🔐 Password Generator", tags: ["password", "generator", "security"] },
  { name: "🗣️ Text to Speech", tags: ["text", "speech", "audio"] },
  { name: "📏 Unit Converter", tags: ["unit", "converter", "measurement"] },
  { name: "🥁 Drum Pad", tags: ["drum", "pad", "music"] }
  // ✅ All tools now included
];


  searchToggle.addEventListener('click', () => {
    searchInput.classList.toggle('expanded');
    if (searchInput.classList.contains('expanded')) {
      searchInput.focus();
    } else {
      searchInput.value = '';
      searchResults.style.display = 'none';
      suiteGrid.style.display = 'grid';
    }
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    if (query === '') {
      searchResults.style.display = 'none';
      suiteGrid.style.display = 'grid';
      return;
    }

    const filteredTools = tools.filter(tool =>
      tool.name.toLowerCase().includes(query) ||
      tool.tags.some(tag => tag.includes(query))
    );

    searchResults.innerHTML = '';
    filteredTools.forEach(tool => {
      const toolElement = document.createElement('a');
      toolElement.href = '#'; // Update with actual link if available
      toolElement.className = 'suite-button';
      toolElement.textContent = tool.name;
      searchResults.appendChild(toolElement);
    });

    suiteGrid.style.display = 'none';
    searchResults.style.display = 'grid';
  });
</script>

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("tool-search");
  const resultsContainer = document.getElementById("search-results");

  function renderTools(filteredTools) {
    resultsContainer.innerHTML = ""; // Clear previous
    filteredTools.forEach(tool => {
      const div = document.createElement("div");
      div.className = "tool-item";
      div.innerHTML = `<a href="${tool.link}">${tool.name}</a>`;
      resultsContainer.appendChild(div);
    });
  }

  function filterTools(keyword) {
    const lower = keyword.toLowerCase();
    return tools.filter(tool =>
      tool.name.toLowerCase().includes(lower) ||
      tool.tags.some(tag => tag.toLowerCase().includes(lower))
    );
  }

  searchInput?.addEventListener("input", () => {
    const value = searchInput.value.trim();
    if (value) {
      const filtered = filterTools(value);
      renderTools(filtered);
    } else {
      resultsContainer.innerHTML = "";
    }
  });

  // Optional: preload some tools on load
  renderTools(tools.slice(0, 5));
});

function saveUserSettings(settingsObject) {
  const user = firebase.auth().currentUser;
  if (!user) return;

  firebase.firestore().collection("userSettings").doc(user.uid).set(settingsObject);
}

// Example:
saveUserSettings({
  theme: "dark",
  compressorSettings: {
    threshold: -12,
    ratio: 4,
  },
  reverbPreset: "Valhalla Space",
});


  // ---- Keyboard Navigation ----
  searchInput.addEventListener('keydown', (e) => {
    const visibleCards = toolCards.filter(card => card.offsetParent !== null);
    if (!visibleCards.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentFocus = (currentFocus + 1) % visibleCards.length;
      visibleCards[currentFocus].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentFocus = (currentFocus - 1 + visibleCards.length) % visibleCards.length;
      visibleCards[currentFocus].focus();
    } else if (e.key === 'Enter' && currentFocus >= 0) {
      e.preventDefault();
      visibleCards[currentFocus].click();
    }
  });

  // ---- Make tool cards focusable ----
  toolCards.forEach(card => {
    card.setAttribute('tabindex', '0');
  });
});

firebase.firestore().collection("userSettings").doc(user.uid).get().then(doc => {
  if (doc.exists) {
    const settings = doc.data();
    // Apply settings to app UI
  }
});
