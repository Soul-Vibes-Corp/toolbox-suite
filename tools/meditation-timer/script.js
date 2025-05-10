const themeToggle = document.getElementById('themeToggle');
const startSessionButton = document.getElementById('startSession');
const sessionDurationInput = document.getElementById('sessionDuration');
const warmupDurationInput = document.getElementById('warmupDuration');
const cooldownDurationInput = document.getElementById('cooldownDuration');
const timerDisplay = document.getElementById('timerDisplay');
const soundSelect = document.getElementById('soundSelect');
const volumeControl = document.getElementById('volumeControl');
const sessionHistory = document.getElementById('sessionHistory');
const historyContent = document.getElementById('historyContent');
const exportHistoryButton = document.getElementById('exportHistory');
let sessionInterval;
let timerSeconds = 0;
let isSessionActive = false;
let selectedSound = "calm";
let audio = new Audio(`sounds/${selectedSound}.mp3`);

function startSession() {
  let sessionDuration = parseInt(sessionDurationInput.value) * 60 || 0;
  let warmupDuration = parseInt(warmupDurationInput.value) * 60 || 0;
  let cooldownDuration = parseInt(cooldownDurationInput.value) * 60 || 0;

  let totalDuration = warmupDuration + sessionDuration + cooldownDuration;

  if (totalDuration <= 0) {
    alert("Please set valid durations.");
    return;
  }

  isSessionActive = true;
  timerSeconds = warmupDuration;

  audio.loop = true;
  audio.volume = volumeControl.value / 100;
  audio.play();

  sessionInterval = setInterval(() => {
    if (timerSeconds >= totalDuration) {
      clearInterval(sessionInterval);
      audio.pause();
      alert("Meditation session completed!");
      logSession(warmupDuration, sessionDuration, cooldownDuration);
    } else {
      updateTimerDisplay();
      timerSeconds++;
    }
  }, 1000);
}

function updateTimerDisplay() {
  let minutes = Math.floor(timerSeconds / 60);
  let seconds = timerSeconds % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function logSession(warmupDuration, sessionDuration, cooldownDuration) {
  let sessionEntry = {
    warmup: warmupDuration,
    session: sessionDuration,
    cooldown: cooldownDuration,
    date: new Date().toLocaleDateString()
  };

  let history = JSON.parse(localStorage.getItem('meditationHistory')) || [];
  history.push(sessionEntry);
  localStorage.setItem('meditationHistory', JSON.stringify(history));

  displayHistory();
}

function displayHistory() {
  let history = JSON.parse(localStorage.getItem('meditationHistory')) || [];
  historyContent.textContent = history.map(entry => `
    Date: ${entry.date}
    Warm-up: ${entry.warmup} min
    Session: ${entry.session} min
    Cool-down: ${entry.cooldown} min
  `).join("\n");

  sessionHistory.style.display = history.length > 0 ? 'block' : 'none';
}

function exportHistory() {
  let history = JSON.parse(localStorage.getItem('meditationHistory')) || [];
  const csvContent = "Date,Warm-up (min),Session (min),Cool-down (min)\n" +
    history.map(entry => `${entry.date},${entry.warmup},${entry.session},${entry.cooldown}`).join("\n");

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'meditation_history.csv';
  a.click();
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
});

startSessionButton.addEventListener('click', startSession);
exportHistoryButton.addEventListener('click', exportHistory);

soundSelect.addEventListener('change', (e) => {
  selectedSound = e.target.value;
  audio.src = `sounds/${selectedSound}.mp3`;
  audio.play();
});

volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value / 100;
});
