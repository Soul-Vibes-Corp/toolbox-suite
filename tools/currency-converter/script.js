const themeToggle = document.getElementById('themeToggle');
const valueInput = document.getElementById('valueInput');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const resultField = document.getElementById('result');

// API endpoint for live currency data (using a free API for demonstration)
const apiEndpoint = 'https://api.exchangerate-api.com/v4/latest/';

// Function to fetch exchange rates from API
async function fetchExchangeRates(baseCurrency) {
  try {
    const response = await fetch(`${apiEndpoint}${baseCurrency}`);
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}

// Convert function
async function convertCurrency() {
  const value = parseFloat(valueInput.value);
  if (isNaN(value)) {
    resultField.value = 'Please enter a valid number';
    return;
  }

  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  // Fetch live exchange rates
  const rates = await fetchExchangeRates(fromCurrencyValue);
  if (!rates) {
    resultField.value = 'Failed to fetch exchange rates';
    return;
  }

  const convertedValue = (value * rates[toCurrencyValue]).toFixed(2);
  resultField.value = `${convertedValue} ${toCurrencyValue}`;
}

// Event listeners for changes
valueInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

// Dark mode toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
});

// Initial conversion
convertCurrency();
