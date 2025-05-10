const category = document.getElementById('category');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const inputValue = document.getElementById('inputValue');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');
const themeToggle = document.getElementById('themeToggle');

const units = {
  length: ['meters', 'kilometers', 'miles', 'feet', 'inches'],
  weight: ['kilograms', 'grams', 'pounds', 'ounces'],
  temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
  time: ['seconds', 'minutes', 'hours', 'days'],
  area: ['square meters', 'square feet', 'acres'],
  volume: ['liters', 'milliliters', 'gallons', 'cups']
};

const conversions = {
  length: {
    meters: 1,
    kilometers: 0.001,
    miles: 0.000621371,
    feet: 3.28084,
    inches: 39.3701
  },
  weight: {
    kilograms: 1,
    grams: 1000,
    pounds: 2.20462,
    ounces: 35.274
  },
  time: {
    seconds: 1,
    minutes: 1/60,
    hours: 1/3600,
    days: 1/86400
  },
  area: {
    "square meters": 1,
    "square feet": 10.7639,
    acres: 0.000247105
  },
  volume: {
    liters: 1,
    milliliters: 1000,
    gallons: 0.264172,
    cups: 4.22675
  }
};

function populateUnits(cat) {
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';
  units[cat].forEach(u => {
    fromUnit.innerHTML += `<option value="${u}">${u}</option>`;
    toUnit.innerHTML += `<option value="${u}">${u}</option>`;
  });
}

category.addEventListener('change', () => {
  populateUnits(category.value);
});

convertBtn.addEventListener('click', () => {
  const val = parseFloat(inputValue.value);
  const cat = category.value;
  const from = fromUnit.value;
  const to = toUnit.value;

  if (isNaN(val)) {
    result.textContent = 'Invalid input';
    return;
  }

  let output;
  if (cat === 'temperature') {
    output = convertTemperature(val, from, to);
  } else {
    const baseVal = val / conversions[cat][from];
    output = baseVal * conversions[cat][to];
  }

  const locale = navigator.language;
  result.textContent = output.toLocaleString(locale, { maximumFractionDigits: 6 });
});

function convertTemperature(value, from, to) {
  let celsius;
  if (from === 'Celsius') celsius = value;
  if (from === 'Fahrenheit') celsius = (value - 32) * 5 / 9;
  if (from === 'Kelvin') celsius = value - 273.15;

  if (to === 'Celsius') return celsius;
  if (to === 'Fahrenheit') return (celsius * 9 / 5) + 32;
  if (to === 'Kelvin') return celsius + 273.15;
}

// Initialize default units
populateUnits('length');

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
});
