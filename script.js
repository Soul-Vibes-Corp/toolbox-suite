// Dark mode toggle
const toggleBtn = document.getElementById('toggle-dark');

function updateToggleIcon() {
  if (document.body.classList.contains('dark')) {
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  updateToggleIcon();

  // Save
  localStorage.setItem('mode', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Initialize on page load
if (localStorage.getItem('mode') === 'dark') {
  document.body.classList.add('dark');
}
updateToggleIcon();


// Remember preference
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
// script.js

document.getElementById('toggle-dark').addEventListener('click', () => {
  document.body.classList.toggle('dark');

  // Optional: Save mode
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('mode', 'dark');
  } else {
    localStorage.setItem('mode', 'light');
  }
});

// Load saved mode
if (localStorage.getItem('mode') === 'dark') {
  document.body.classList.add('dark');
}

