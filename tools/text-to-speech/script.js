const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const rateValue = document.getElementById('rateValue');
const pitchValue = document.getElementById('pitchValue');

const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const themeToggle = document.getElementById('themeToggle');

let voices = [];
let utterance = new SpeechSynthesisUtterance();

function populateVoices() {
  voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';

  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang}) ${voice.default ? ' - Default' : ''}`;
    voiceSelect.appendChild(option);
  });

  // Auto-select based on browser language
  const browserLang = navigator.language || navigator.userLanguage;
  const matchedVoiceIndex = voices.findIndex(voice => voice.lang.startsWith(browserLang.slice(0, 2)));

  if (matchedVoiceIndex !== -1) {
    voiceSelect.value = matchedVoiceIndex;
  }
}

speechSynthesis.onvoiceschanged = populateVoices;

function speak() {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

  utterance = new SpeechSynthesisUtterance(textInput.value);
  const selectedVoice = voices[voiceSelect.value];
  utterance.voice = selectedVoice;
  utterance.rate = parseFloat(rateInput.value);
  utterance.pitch = parseFloat(pitchInput.value);

  speechSynthesis.speak(utterance);
}

playBtn.addEventListener('click', speak);

pauseBtn.addEventListener('click', () => {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
  } else if (speechSynthesis.paused) {
    speechSynthesis.resume();
  }
});

stopBtn.addEventListener('click', () => {
  speechSynthesis.cancel();
});

rateInput.addEventListener('input', () => {
  rateValue.textContent = rateInput.value;
});

pitchInput.addEventListener('input', () => {
  pitchValue.textContent = pitchInput.value;
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
});

// Initial
populateVoices();
