const themeToggle = document.getElementById('themeToggle');
const form = document.getElementById('resumeForm');
const downloadButton = document.getElementById('downloadResume');
const previewContent = document.getElementById('previewContent');
const addExperienceButton = document.getElementById('addExperience');
const addEducationButton = document.getElementById('addEducation');
const experienceContainer = document.getElementById('experienceContainer');
const educationContainer = document.getElementById('educationContainer');

let experienceFields = [];
let educationFields = [];

function updatePreview() {
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const skills = document.getElementById('skills').value;

  previewContent.innerHTML = `
    <h3>${fullName}</h3>
    <p>Email: ${email}</p>
    <p>Phone: ${phone}</p>
    <h4>Skills:</h4>
    <p>${skills}</p>
    <h4>Experience:</h4>
    ${experienceFields.map(exp => `<p>${exp}</p>`).join('')}
    <h4>Education:</h4>
    ${educationFields.map(edu => `<p>${edu}</p>`).join('')}
  `;
}

function addExperience() {
  experienceFields.push([
    ...document.querySelectorAll('.experience')
  ].map(input => input.value).join(', '));
  updatePreview();
}

function addEducation() {
  educationFields.push([
    ...document.querySelectorAll('.education')
  ].map(input => input.value).join(', '));
  updatePreview();
}

function downloadResume(event) {
  event.preventDefault();
  const resumeContent = document.getElementById('previewContent').innerText;

  const blob = new Blob([resumeContent], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resume.pdf';
  link.click();
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
});

addExperienceButton.addEventListener('click', () => {
  addExperience();
});

addEducationButton.addEventListener('click', () => {
  addEducation();
});

form.addEventListener('input', updatePreview);
downloadButton.addEventListener('click', downloadResume);

// Initialize Preview
updatePreview();
