
let allJobs = [];
let filteredJobs = [];

document.addEventListener('DOMContentLoaded', () => {
  loadJobs();
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('salaryRange').addEventListener('input', updateSalaryLabel);
});

function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

function updateSalaryLabel() {
  document.getElementById('salaryValue').textContent = document.getElementById('salaryRange').value;
}

function loadJobs() {
  allJobs = [
    { id: '1', title: 'Frontend Developer', company: 'Tech Corp', location: 'Remote', salary: 90000 },
    { id: '2', title: 'Backend Engineer', company: 'CodeBase', location: 'New York', salary: 120000 },
    { id: '3', title: 'UI/UX Designer', company: 'DesignPro', location: 'Remote', salary: 75000 },
    { id: '4', title: 'DevOps Engineer', company: 'Cloudify', location: 'San Francisco', salary: 130000 }
  ];
  filteredJobs = [...allJobs];
  renderJobs(filteredJobs);
}

function renderJobs(jobs) {
  const container = document.getElementById('jobsContainer');
  container.innerHTML = '';
  const favorites = JSON.parse(localStorage.getItem('jobFavorites')) || [];

  jobs.forEach(job => {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.innerHTML = `
      <h2>${job.title}</h2>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Salary:</strong> $${job.salary}</p>
      <span class="favorite ${favorites.includes(job.id) ? 'hearted' : ''}" onclick="toggleJobFavorite('${job.id}')">❤️</span>
    `;
    container.appendChild(card);
  });
}

function toggleJobFavorite(jobId) {
  let favorites = JSON.parse(localStorage.getItem('jobFavorites')) || [];
  if (favorites.includes(jobId)) {
    favorites = favorites.filter(id => id !== jobId);
  } else {
    favorites.push(jobId);
  }
  localStorage.setItem('jobFavorites', JSON.stringify(favorites));
  renderJobs(filteredJobs);
}

function applyFilters() {
  const keyword = document.getElementById('keywordFilter').value.toLowerCase();
  const location = document.getElementById('locationFilter').value.toLowerCase();
  const salary = document.getElementById('salaryRange').value;
  const remoteOnly = document.getElementById('remoteOnly').checked;

  filteredJobs = allJobs.filter(job =>
    job.title.toLowerCase().includes(keyword) &&
    job.location.toLowerCase().includes(location) &&
    job.salary >= salary &&
    (!remoteOnly || job.location.toLowerCase().includes('remote'))
  );

  renderJobs(filteredJobs);
}

function exportJobsToJSON() {
  const data = JSON.stringify(filteredJobs);
  const blob = new Blob([data], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'jobs.json';
  link.click();
}

function exportJobsToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  filteredJobs.forEach((job, index) => {
    doc.text(`${index + 1}. ${job.title} at ${job.company}`, 10, 10 + index * 10);
  });
  doc.save('jobs.pdf');
}
