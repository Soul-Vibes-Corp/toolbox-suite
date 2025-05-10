// Dark mode toggle
const toggleBtn = document.getElementById('toggle-dark');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

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

