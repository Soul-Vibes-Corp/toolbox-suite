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

// Load saved mode on startup
if (localStorage.getItem('mode') === 'dark') {
  document.body.classList.add('dark');
}
updateToggleIcon();
