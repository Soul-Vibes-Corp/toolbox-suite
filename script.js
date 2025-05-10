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
