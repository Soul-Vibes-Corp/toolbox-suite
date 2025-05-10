const themeToggle = document.getElementById('themeToggle');
const valueInput = document.getElementById('valueInput');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const resultField = document.getElementById('result');

// Conversion rates for meters
const conversionRates = {
  meter: 1,
  kilometer: 0.001,
  mile: 0.000621371,
  centimeter: 100,
  inch: 39.3701,
};

// Convert function
function convertUnits() {
  const value = parseFloat(valueInput.value);
  if (isNaN(value)) {
    resultField.value = 'Please enter a valid number';
    return;
  }

  const fromUnitValue = fromUnit.value;
  const toUnitValue = toUnit.value;

  const valueInMeters = value * conversionRates[fromUnitValue];
  const convertedValue = valueInMeters * (1 / conversionRates[toUnitValue]);

  resultField.value = convertedValue.toFixed(4);
}

// Event listeners for changes
valueInput.addEventListener('input', convertUnits);
fromUnit.addEventListener('change', convertUnits);
toUnit.addEventListener('change', convertUnits);

// Dark mode toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
});

// Initial conversion
convertUnits();
