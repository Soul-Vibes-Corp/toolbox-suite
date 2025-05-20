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

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('menu').classList.toggle('show');
});
