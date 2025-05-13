document.addEventListener('DOMContentLoaded', () => {
  // ---- Cache Elements ----
  const searchInput = document.getElementById('search');
  const resultCount = document.getElementById('result-count');
  const toggleDarkBtn = document.getElementById('toggle-dark');
  const toolCards = Array.from(document.querySelectorAll('.tool-card'));
  const categories = Array.from(document.querySelectorAll('.category'));

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
  toggleDarkBtn.addEventListener('click', () => {
    const enable = !document.body.classList.contains(DARK_CLASS);
    setDarkMode(enable);
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
  // 🛠️ Freelance Marketing, Branding & Employment
  { name: "🎨 Instant Brand Kit Creator", tags: ["branding", "design", "brand"], link: "../tools/brand-kit-generator/index.html" },
  { name: "📅 Marketing Content Calendar Generator", tags: ["marketing", "calendar", "content"], link: "../tools/content-calendar-generator/index.html" },
  { name: "📚 Lead Magnet Creator", tags: ["lead", "magnet", "conversion"], link: "../tools/lead-magnet-creator/index.html" },
  { name: "📊 Social Media Analytics Snapshot", tags: ["social", "analytics", "media"], link: "../tools/social-media-analytics-snapshot/index.html" },
  { name: "🔍 Smart Business Name & Domain Finder", tags: ["business", "domain", "name"], link: "../tools/business-name-domain-finder/index.html" },
  { name: "🏢 Find Gigs", tags: ["jobs", "gigs", "freelance"], link: "../tools/find-gigs/index.html" },
  { name: "🔐 Job Search Tools", tags: ["job", "search", "career"], link: "../tools/job-search-tools/index.html" },
  { name: "📄 Resume Builder", tags: ["resume", "cv", "builder"], link: "../tools/resume-builder/index.html" },
  { name: "🗣️ Interview Prep Tools", tags: ["interview", "preparation", "job"], link: "../tools/interview-prep-tools/index.html" },
  { name: "🏢 Work Schedule Management", tags: ["schedule", "work", "management"], link: "../tools/work-schedule-management/index.html" },
  { name: "📄 Salary Calculator", tags: ["salary", "finance", "calculator"], link: "../tools/salary-calculator/index.html" },
  { name: "⏱️ Time Tracking Tool", tags: ["time", "tracking", "productivity"], link: "../tools/time-tracking-tool/index.html" },

  // 📈 Business Strategy & Financial Planning
  { name: "📝 One-Page Business Plan Generator", tags: ["business", "plan", "strategy"], link: "../tools/business-plan-generator/index.html" },
  { name: "⚖️ Instant SWOT Analysis Generator", tags: ["swot", "analysis", "strategy"], link: "../tools/swot-analysis-generator/index.html" },
  { name: "💲 Profit & Investment Calculator", tags: ["profit", "investment", "finance"], link: "../tools/profit-investment-calculator/index.html" },
  { name: "📊 Smart KPI Dashboard", tags: ["kpi", "dashboard", "metrics"], link: "../tools/kpi-dashboard/index.html" },
  { name: "🔧 Smart Cost-Cutting Analyzer", tags: ["cost", "cutting", "savings"], link: "../tools/cost-cutting-analyzer/index.html" },
  { name: "🖲️ Expense Tracking", tags: ["expense", "tracking", "finance"], link: "../tools/expense-tracking/index.html" },

  // 📊 Sales & Client Management
  { name: "📑 Smart Proposal Generator", tags: ["proposal", "sales", "client"], link: "../tools/proposal-generator/index.html" },
  { name: "🧾 Invoice + Bill Payment Services", tags: ["invoice", "payment", "billing"], link: "../tools/invoice-bill-payment/index.html" },
  { name: "📝 Client Contract Generator", tags: ["contract", "client", "agreement"], link: "../tools/client-contract-generator/index.html" },
  { name: "🖋️ Automated NDA Signer Tool", tags: ["nda", "signer", "legal"], link: "../tools/nda-signer/index.html" },
  { name: "📅 Meeting Agenda + Summary Maker", tags: ["meeting", "agenda", "summary"], link: "../tools/meeting-agenda-summary/index.html" },
  { name: "🧾 Invoice Generator", tags: ["invoice", "generator", "billing"], link: "../tools/invoice-generator/index.html" },

  // 🧑‍💼 Operations & Team Management
  { name: "📋 Employee Onboarding Kit Generator", tags: ["employee", "onboarding", "hr"], link: "../tools/employee-onboarding-kit/index.html" },
  { name: "🗂️ Team Taskboard Generator", tags: ["team", "taskboard", "management"], link: "../tools/team-taskboard/index.html" },
  { name: "📏 Professional Networking", tags: ["networking", "professional", "connections"], link: "../tools/professional-networking/index.html" },

  // 🤝 Customer & Audience Building
  { name: "👥 Customer Avatar Builder", tags: ["customer", "avatar", "persona"], link: "../tools/customer-avatar-builder/index.html" },
  { name: "📧 Smart Email Sequence Generator", tags: ["email", "sequence", "marketing"], link: "../tools/email-sequence-generator/index.html" },

  // 🛠️ Everyday Utility Tools
  { name: "📎 PDF Merger Tool", tags: ["pdf", "merge", "documents"], link: "../tools/pdf-merger/index.html" },
  { name: "🖼️ Image Compressor", tags: ["image", "compressor", "optimize"], link: "../tools/image-compressor/index.html" },
  { name: "🔗 QR Code Generator", tags: ["qr", "code", "generator"], link: "../tools/qr-code-generator/index.html" },
  { name: "📄 Document Scanner", tags: ["document", "scanner", "pdf"], link: "../tools/document-scanner/index.html" },
  { name: "💬 Quote Box", tags: ["quote", "box", "inspiration"], link: "../tools/quote-box/index.html" },
  { name: "💱 Currency Converter", tags: ["currency", "converter", "exchange"], link: "../tools/currency-converter/index.html" },
  { name: "🏋️‍♂️ Fitness Tracker", tags: ["fitness", "tracker", "health"], link: "../tools/fitness-tracker/index.html" },
  { name: "🖌️ Image Editor", tags: ["image", "editor", "design"], link: "../tools/image-editor/index.html" },
  { name: "🗄️ JSON Formatter", tags: ["json", "formatter", "code"], link: "../tools/json-formatter/index.html" },
  { name: "🧘 Meditation Timer", tags: ["meditation", "timer", "relaxation"], link: "../tools/meditation-timer/index.html" },
  { name: "🔐 Password Generator", tags: ["password", "generator", "security"], link: "../tools/password-generator/index.html" },
  { name: "🗣️ Text to Speech", tags: ["text", "speech", "audio"], link: "../tools/text-to-speech/index.html" },
  { name: "📏 Unit Converter", tags: ["unit", "converter", "measurement"], link: "../tools/unit-converter/index.html" },
  { name: "🥁 Drum Pad", tags: ["drum", "pad", "music"], link: "../tools/drum-pad/index.html" }
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
   toolElement.href = tool.link;
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
