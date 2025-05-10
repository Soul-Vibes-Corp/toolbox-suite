const formatBtn = document.getElementById('formatBtn');
const minifyBtn = document.getElementById('minifyBtn');
const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');
const errorMessage = document.getElementById('errorMessage');
const copyBtn = document.getElementById('copyBtn');
const themeToggle = document.getElementById('themeToggle');

// Format and Beautify JSON
formatBtn.addEventListener('click', () => {
  try {
    const parsedJson = JSON.parse(jsonInput.value);
    jsonOutput.value = JSON.stringify(parsedJson, null, 2); // Beautify with 2 spaces indentation
    errorMessage.textContent = ''; // Clear error message
  } catch (error) {
    errorMessage.textContent = 'Invalid JSON! Please check your input.';
    jsonOutput.value = '';
  }
});

// Minify JSON
minifyBtn.addEventListener('click', () => {
  try {
    const parsedJson = JSON.parse(jsonInput.value);
    jsonOutput.value = JSON.stringify(parsedJson); // Minified version
    errorMessage.textContent = ''; // Clear error message
  } catch (error) {
    errorMessage.textContent = 'Invalid JSON! Please check your input.';
    jsonOutput.value = '';
  }
});

// Copy to clipboard
copyBtn.addEventListener('click', () => {
  jsonOutput.select();
  document.execCommand('copy');
  copyBtn.textContent = '✅ Copied!';
  setTimeout(() => {
    copyBtn.textContent = '📋 Copy to Clipboard';
  }, 2000);
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
});
