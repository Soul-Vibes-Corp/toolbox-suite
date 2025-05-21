const generateBtn = document.getElementById('generateBtn');
const keywordInput = document.getElementById('keywordInput');
const nameResults = document.getElementById('nameResults');
const loading = document.getElementById('loading');

const suffixes = ['ify', 'ly', 'hub', 'base', 'space', 'zone', 'flow', 'nest'];
const domains = ['.com', '.net', '.co', '.io', '.ai'];

function randomSuffix() {
  return suffixes[Math.floor(Math.random() * suffixes.length)];
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function generateNames(keyword) {
  const names = [];
  for (let i = 0; i < 6; i++) {
    const base = capitalize(keyword);
    const suggestion = `${base}${randomSuffix()}`;
    names.push(suggestion);
  }
  return names;
}

function showLoading(show) {
  loading.classList.toggle('hidden', !show);
}

function createCard(name) {
  const card = document.createElement('div');
  card.className = 'card';
  let domainStatus = '';
  domains.forEach(ext => {
    domainStatus += `<div><strong>${name.toLowerCase()}${ext}</strong> — <em>checking...</em></div>`;
  });
  card.innerHTML = `<h3>${name}</h3>${domainStatus}`;
  nameResults.appendChild(card);

  // Simulated async domain check
  setTimeout(() => {
    card.innerHTML = `<h3>${name}</h3>` + domains.map(ext => {
      const isAvailable = Math.random() > 0.5;
      return `<div><strong>${name.toLowerCase()}${ext}</strong> — <span style="color:${isAvailable ? 'lightgreen' : '#ff8080'}">${isAvailable ? 'Available' : 'Taken'}</span></div>`;
    }).join('');
  }, 1000 + Math.random() * 500);
}

generateBtn.addEventListener('click', () => {
  const keyword = keywordInput.value.trim();
  if (!keyword) return;
  nameResults.innerHTML = '';
  showLoading(true);
  setTimeout(() => {
    const names = generateNames(keyword);
    names.forEach(name => createCard(name));
    showLoading(false);
  }, 1200);
});
