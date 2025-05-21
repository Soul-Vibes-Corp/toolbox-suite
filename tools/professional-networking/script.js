document.getElementById('network-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const inputs = this.querySelectorAll('input, textarea');
  const values = [...inputs].map(input => input.value.trim());
  
  if (values.some(v => v === '')) {
    alert('Please fill out all fields.');
    return;
  }

  const [name, title, industry, goals, bio] = values;

  const profileContent = `
📛 Name: ${name}
💼 Title: ${title}
🏢 Industry: ${industry}

🎯 Looking for:
${goals}

🧠 About:
${bio}
  `.trim();

  document.getElementById('profile-content').textContent = profileContent;
  document.getElementById('profile-output').classList.remove('hidden');
});

function downloadProfile() {
  const content = document.getElementById('profile-content').textContent;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.download = 'ProNet_Profile.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
}
