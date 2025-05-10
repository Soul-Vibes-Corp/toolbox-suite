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

