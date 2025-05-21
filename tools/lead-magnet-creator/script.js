document.getElementById('lead-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const type = document.getElementById('lead-type').value;
  const topic = document.getElementById('lead-topic').value.trim();

  if (!type || !topic) return;

  // Generate content
  const titleTemplates = [
    `The Ultimate ${topic} ${type}`,
    `10 Secrets to Better ${topic} Using This ${type}`,
    `${topic} Mastery: Your Go-To ${type}`,
    `Boost Your ${topic} Strategy with This Powerful ${type}`,
    `Free Download: The Only ${type} You Need for ${topic}`,
    `Dominate ${topic} with This Complete ${type}`,
    `A Modern ${type} Blueprint for Smarter ${topic}`,
    `The Smart Marketer’s Guide to ${topic} (${type})`
  ];

  const subTemplates = [
    `Discover the expert-crafted ${type.toLowerCase()} designed to skyrocket your ${topic} game.`,
    `Packed with actionable tips, this ${type.toLowerCase()} will make your ${topic} efforts smarter and faster.`,
    `Get instant access to the proven strategies behind winning ${topic} — all in one ${type.toLowerCase()}.`
  ];

  const bullets = [
    `✅ Step-by-step breakdowns to dominate ${topic}`,
    `🚀 Time-saving tools and tactics included`,
    `📊 Real-world use cases and data-backed examples`,
    `🎯 Perfect for beginners and pros alike`,
    `🧠 Bonus tips to outsmart your competition`,
    `📈 A plug-and-play resource to improve your results fast`
  ];

  // Randomize content
  const title = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  const subheading = subTemplates[Math.floor(Math.random() * subTemplates.length)];
  const bulletList = shuffleArray(bullets).slice(0, 4);

  // Render to DOM
  document.getElementById('lead-title').textContent = title;
  document.getElementById('lead-subheading').textContent = subheading;

  const bulletsContainer = document.getElementById('lead-bullets');
  bulletsContainer.innerHTML = '';
  bulletList.forEach(b => {
    const li = document.createElement('li');
    li.textContent = b;
    bulletsContainer.appendChild(li);
  });

  document.getElementById('lead-output').classList.remove('hidden');
});

// Shuffle utility
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Download as PDF
document.getElementById('download-pdf').addEventListener('click', () => {
  const title = document.getElementById('lead-title').textContent;
  const sub = document.getElementById('lead-subheading').textContent;
  const bullets = Array.from(document.querySelectorAll('#lead-bullets li')).map(li => li.textContent);

  const content = `
    ${title}\n\n
    ${sub}\n\n
    ${bullets.map(b => `• ${b}`).join('\n')}
  `;

  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.txt';
  link.click();
});
