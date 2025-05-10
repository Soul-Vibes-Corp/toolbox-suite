const toggleBtn = document.getElementById('toggle-dark');

function updateToggledocument.addEventListener('DOMContentLoaded', () => {
  // Cache elements
  const searchInput = document.getElementById('search');
  const resultCount = document.getElementById('result-count');
  const darkToggle = document.getElementById('toggle-dark');
  const toolCards = Array.from(document.querySelectorAll('.tool-card'));
  const categories = Array.from(document.querySelectorAll('.category'));
  
  let currentFocus = -1; // For keyboard navigation

  // ---- Dark Mode Toggle ----
  const DARK_CLASS = 'dark-mode';
  const darkPrefKey = 'toolbox-suite-dark';

  // Function to set dark mode
  const setDarkMode = (enable) => {
    document.body.classList.toggle(DARK_CLASS, enable);
    localStorage.setItem(darkPrefKey, enable ? '1' : '0');
  };

  // Load saved theme preference
  if (localStorage.getItem(darkPrefKey) === '1') {
    setDarkMode(true);
  }

  // Dark mode toggle button event
  darkToggle.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains(DARK_CLASS));
  });

  // ---- Search Functionality ----
  const searchTools = (term) => {
    const query = term.toLowerCase().trim();
    let matches = 0;

    categories.forEach(section => {
      const cards = Array.from(section.querySelectorAll('.tool-card'));
      let sectionMatches = 0;

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const match = text.includes(query);
        card.style.display = match ? 'inline-block' : 'none';
        if (match) sectionMatches++;
      });

      // Auto-expand/collapse based on matches
      section.style.display = sectionMatches > 0 ? 'block' : 'none';
      matches += sectionMatches;
    });

    // Update result count
    resultCount.textContent = query ? `${matches} result${matches !== 1 ? 's' : ''}` : '';
    currentFocus = -1; // Reset keyboard focus
  };

  // Search input event listener
  searchInput.addEventListener('input', (e) => {
    searchTools(e.target.value);
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

  // ---- Make tool-cards focusable ----
  toolCards.forEach(card => {
    card.setAttribute('tabindex', '0'); // Ensure tool cards are focusable
  });
  
  // ---- Dark Mode Icon Update ----
  const toggleBtn = document.getElementById('toggle-dark');

  const updateToggleIcon = () => {
    toggleBtn.textContent = document.body.classList.contains(DARK_CLASS) ? '☀️' : '🌙';
  };

  // Initial dark mode icon update
  updateToggleIcon();

  // Save dark mode preference on toggle
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle(DARK_CLASS);
    updateToggleIcon();
    localStorage.setItem(darkPrefKey, document.body.classList.contains(DARK_CLASS) ? '1' : '0');
  });
});
Icon() {
  if (document.body.classList.contains('dark')) {
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  updateToggleIcon();

  localStorage.setItem('mode', document.body.classList.contains('dark') ? 'dark' : 'light');
});
document.getElementById('toggle-dark').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
// Dark Mode Toggle
document.getElementById('toggle-dark').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Live Search Filter
const searchInput = document.getElementById('search');
const toolCards = document.querySelectorAll('.tool-card');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  toolCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? 'flex' : 'none';
  });
});

// Load saved mode on startup
if (localStorage.getItem('mode') === 'dark') {
  document.body.classList.add('dark');
}
updateToggleIcon();
