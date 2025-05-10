const themeToggle = document.getElementById('themeToggle');
const saveGoalsButton = document.getElementById('saveGoals');
const logActivityButton = document.getElementById('logActivity');
const exportDataButton = document.getElementById('exportData');
const fitnessReport = document.getElementById('fitnessReport');
const reportContent = document.getElementById('reportContent');
const dailyStepsGoal = document.getElementById('dailyStepsGoal');
const caloriesGoal = document.getElementById('caloriesGoal');
const stepsLogged = document.getElementById('stepsLogged');
const caloriesLogged = document.getElementById('caloriesLogged');
const hydrationLogged = document.getElementById('hydrationLogged');

let fitnessGoals = {
  steps: 0,
  calories: 0,
};

let activityLog = [];

function saveGoals() {
  fitnessGoals.steps = parseInt(dailyStepsGoal.value) || 0;
  fitnessGoals.calories = parseInt(caloriesGoal.value) || 0;
  alert("Goals saved!");
}

function logActivity() {
  const steps = parseInt(stepsLogged.value) || 0;
  const calories = parseInt(caloriesLogged.value) || 0;
  const hydration = parseInt(hydrationLogged.value) || 0;
  
  const logEntry = {
    date: new Date().toLocaleDateString(),
    steps,
    calories,
    hydration,
  };

  activityLog.push(logEntry);
  alert("Activity logged!");
  stepsLogged.value = '';
  caloriesLogged.value = '';
  hydrationLogged.value = '';
}

function generateReport() {
  const totalSteps = activityLog.reduce((total, log) => total + log.steps, 0);
  const totalCalories = activityLog.reduce((total, log) => total + log.calories, 0);
  const totalHydration = activityLog.reduce((total, log) => total + log.hydration, 0);

  const report = `
    Total Steps: ${totalSteps}\n
    Total Calories Burned: ${totalCalories}\n
    Total Hydration (ml): ${totalHydration}
  `;

  reportContent.textContent = report;
  fitnessReport.style.display = 'block';
}

function exportData() {
  const csvContent = "Date,Steps,Calories,Hydration\n" + 
    activityLog.map(log => `${log.date},${log.steps},${log.calories},${log.hydration}`).join("\n");

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'fitness_data.csv';
  a.click();
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
});

saveGoalsButton.addEventListener('click', saveGoals);
logActivityButton.addEventListener('click', logActivity);
exportDataButton.addEventListener('click', exportData);

generateReport();
