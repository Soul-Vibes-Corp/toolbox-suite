const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyBtn');
const strengthValue = document.getElementById('strengthValue');
const themeToggle = document.getElementById('themeToggle');

lengthInput.addEventListener('input', () => {
  lengthValue.textContent = lengthInput.value;
});

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

function generatePassword() {
  const length = parseInt(lengthInput.value);
  let charset = '';
  let password = '';

  if (uppercase.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers.checked) charset += '0123456789';
  if (symbols.checked) charset += '!@#$%^&*()_+[]{}|;:,.<>?';

  if (!charset) {
    passwordOutput.value = 'Please select at least one option';
    strengthValue.textContent = '-';
    return;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  passwordOutput.value = password;
  evaluateStrength(password);
}

function evaluateStrength(pw) {
  let score = 0;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(pw)) score++;
  if (pw.length >= 12) score++;

  let strength;
  if (score <= 2) strength = 'Weak';
  else if (score === 3) strength = 'Medium';
  else strength = 'Strong';

  strengthValue.textContent = strength;
}

function copyPassword() {
  passwordOutput.select();
  document.execCommand('copy');
  copyBtn.textContent = '✅ Copied!';
  setTimeout(() => {
    copyBtn.textContent = '📋 Copy to Clipboard';
  }, 2000);
}

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
});
