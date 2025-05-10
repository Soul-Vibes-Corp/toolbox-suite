document.addEventListener('DOMContentLoaded', () => {
  // Cache elements
  const searchInput = document.getElementById('search');
  const resultCount = document.getElementById('result-count');
  const darkToggle = document.getElementById('toggle-dark');
  const toolCards = Array.from(document.querySelectorAll('.tool-card'));
  const categories = Array.from(document.querySelectorAll('.category'));

  let currentFocus = -1; // For keyboard navigation

  // ---- Dark Mode ----
  const DARK_CLASS = 'dark-mode';
  const darkPrefKey = 'toolbox-suite-dark';

  // Function to set dark mode
  const setDarkMode = (enable) => {
    document.body.classList.toggle(DARK_CLASS, enable);
    localStorage.setItem(darkPrefKey, enable ? '1' : '0');
    updateToggleIcon(); // Update the dark mode icon
  };

  // Function to update dark mode icon
  const updateToggleIcon = () => {
    darkToggle.textContent = document.body.classList.contains(DARK_CLASS) ? '☀️' : '🌙';
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

  // ---- Initialize the dark mode icon ----
  updateToggleIcon();

  // Load saved mode on startup
  if (localStorage.getItem('mode') === 'dark') {
    document.body.classList.add('dark');
    updateToggleIcon(); // Ensure the icon is set correctly
  }
});
