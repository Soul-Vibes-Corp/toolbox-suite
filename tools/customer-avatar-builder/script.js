document.getElementById('avatar-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const inputs = this.querySelectorAll('input, textarea');
  const values = [...inputs].map(input => input.value.trim());

  if (values.some(v => v === '')) {
    alert('Please fill out all fields to generate a complete avatar.');
    return;
  }

  const [name, demo, job, pain, goals, hangouts, buying] = values;

  const profile = `
👤 Avatar Name: ${name}
📊 Demographics: ${demo}
💼 Job & Income: ${job}

🚧 Challenges:
${pain}

🎯 Goals & Desires:
${goals}

🌐 Online Behavior:
${hangouts}

🛒 Buying Triggers:
${buying}
  `.trim();

  document.getElementById('avatar-content').textContent = profile;
  document.getElementById('avatar-output').classList.remove('hidden');
});

function downloadAvatar() {
  const content = document.getElementById('avatar-content').textContent;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.download = 'Customer_Avatar.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
}
