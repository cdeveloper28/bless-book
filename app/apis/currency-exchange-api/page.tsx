import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { BlessCliIntegration } from "@/components/bless-cli-integration"

export const metadata: Metadata = {
  title: "Currency Exchange API Documentation | Bless API Book",
  description:
    "Learn how to use the Currency Exchange API to convert currencies and get exchange rates in your applications.",
}

export default function CurrencyExchangeApiPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Currency Exchange API</h1>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          The Currency Exchange API provides real-time and historical exchange rates for various currencies around the
          world. It's a reliable service for applications that need to convert currencies or display exchange rates.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold mb-2">Base URL</h3>
            <code className="text-sm bg-background p-2 rounded block">https://api.exchangerate-api.com/v4/latest</code>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold mb-2">Response Format</h3>
            <p>JSON</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold mb-2">Authentication</h3>
            <p>API Key (required for some endpoints)</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold mb-2">Rate Limits</h3>
            <p>Free tier: 1,500 requests per month</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Real-time exchange rates for 160+ currencies</li>
          <li>Historical exchange rates data</li>
          <li>Currency conversion</li>
          <li>Time-series data</li>
          <li>Reliable and accurate data from multiple sources</li>
        </ul>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Common Endpoints</h2>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">Get Latest Exchange Rates</h3>
            <code className="text-sm bg-background p-2 rounded block mb-2">
              GET https://api.exchangerate-api.com/v4/latest/USD
            </code>
            <p className="text-sm mb-2">Retrieves the latest exchange rates with USD as the base currency.</p>
            <div className="mt-2">
              <h4 className="font-medium text-sm">Parameters:</h4>
              <ul className="list-disc pl-6 text-sm">
                <li>
                  <code>base</code> - Base currency code (e.g., USD, EUR, GBP)
                </li>
              </ul>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">Convert Currency</h3>
            <code className="text-sm bg-background p-2 rounded block mb-2">
              GET https://api.exchangerate-api.com/v4/pair/USD/EUR/100
            </code>
            <p className="text-sm mb-2">Converts 100 USD to EUR based on the latest exchange rate.</p>
            <div className="mt-2">
              <h4 className="font-medium text-sm">Parameters:</h4>
              <ul className="list-disc pl-6 text-sm">
                <li>
                  <code>from</code> - Source currency code
                </li>
                <li>
                  <code>to</code> - Target currency code
                </li>
                <li>
                  <code>amount</code> - Amount to convert
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Historical Rates</h3>
            <code className="text-sm bg-background p-2 rounded block mb-2">
              GET https://api.exchangerate-api.com/v4/historical/2023-01-01/USD
            </code>
            <p className="text-sm mb-2">Retrieves historical exchange rates for USD on January 1, 2023.</p>
            <div className="mt-2">
              <h4 className="font-medium text-sm">Parameters:</h4>
              <ul className="list-disc pl-6 text-sm">
                <li>
                  <code>date</code> - Date in YYYY-MM-DD format
                </li>
                <li>
                  <code>base</code> - Base currency code
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Example: Currency Converter</h2>
        <p className="mb-4">
          Let's build a simple currency converter that allows users to convert between different currencies using the
          latest exchange rates.
        </p>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">HTML</h3>
          <CodeBlock
            language="html"
            code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Currency Converter</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Currency Converter</h1>
    
    <div class="converter">
      <div class="input-group">
        <input type="number" id="amount" value="1" min="0.01" step="0.01">
        <select id="from-currency">
          <option value="USD" selected>USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CNY">CNY - Chinese Yuan</option>
        </select>
      </div>
      
      <button id="swap-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
        </svg>
      </button>
      
      <div class="input-group">
        <input type="number" id="result" readonly>
        <select id="to-currency">
          <option value="USD">USD - US Dollar</option>
          <option value="EUR" selected>EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CNY">CNY - Chinese Yuan</option>
        </select>
      </div>
    </div>
    
    <div class="info">
      <p id="exchange-rate">1 USD = 0.85 EUR</p>
      <p id="last-updated">Last updated: <span></span></p>
    </div>
    
    <div id="error-message" class="error-message"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>`}
          />
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">CSS</h3>
          <CodeBlock
            language="css"
            code={`* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f7fa;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.converter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 10px;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input, select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

input:focus, select:focus {
  outline: none;
  border-color: #3498db;
}

#swap-btn {
  background-color: #f1f5f9;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

#swap-btn:hover {
  background-color: #e2e8f0;
}

.info {
  text-align: center;
  margin-bottom: 20px;
}

#exchange-rate {
  font-weight: bold;
  color: #2c3e50;
}

#last-updated {
  font-size: 14px;
  color: #64748b;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}

@media (max-width: 600px) {
  .converter {
    flex-direction: column;
  }
  
  #swap-btn {
    transform: rotate(90deg);
    margin: 10px 0;
  }
}`}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">JavaScript</h3>
          <CodeBlock
            language="javascript"
            code={`// DOM elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const resultInput = document.getElementById('result');
const swapButton = document.getElementById('swap-btn');
const exchangeRateText = document.getElementById('exchange-rate');
const lastUpdatedText = document.querySelector('#last-updated span');
const errorMessage = document.getElementById('error-message');

// API URL (using the free version without API key)
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';

// Exchange rates cache
let exchangeRates = {};
let lastUpdated = null;

// Initialize the converter
async function initConverter() {
  try {
    // Load initial exchange rates (USD as base)
    await fetchExchangeRates('USD');
    
    // Set up event listeners
    amountInput.addEventListener('input', convertCurrency);
    fromCurrency.addEventListener('change', handleCurrencyChange);
    toCurrency.addEventListener('change', convertCurrency);
    swapButton.addEventListener('click', swapCurrencies);
    
    // Perform initial conversion
    convertCurrency();
  } catch (error) {
    showError('Failed to initialize currency converter. Please try again later.');
    console.error('Initialization error:', error);
  }
}

// Fetch exchange rates for a base currency
async function fetchExchangeRates(base) {
  try {
    errorMessage.textContent = '';
    
    // Check if we already have rates for this base currency and they're less than 1 hour old
    if (exchangeRates[base] && lastUpdated && (new Date() - lastUpdated) < 3600000) {
      return exchangeRates[base];
    }
    
    const response = await fetch(\`\${API_BASE_URL}\${base}\`);
    
    if (!response.ok) {
      throw new Error(\`API request failed with status \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Update cache
    exchangeRates[base] = data.rates;
    lastUpdated = new Date();
    
    // Update last updated text
    lastUpdatedText.textContent = lastUpdated.toLocaleTimeString();
    
    return data.rates;
  } catch (error) {
    showError('Failed to fetch exchange rates. Please try again later.');
    console.error('API error:', error);
    throw error;
  }
}

// Convert currency based on user input
async function convertCurrency() {
  try {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    if (isNaN(amount) || amount <= 0) {
      resultInput.value = '';
      exchangeRateText.textContent = '';
      return;
    }
    
    // Fetch rates if needed
    const rates = await fetchExchangeRates(from);
    const rate = rates[to];
    
    if (!rate) {
      throw new Error(\`Exchange rate not available for \${from} to \${to}\`);
    }
    
    // Calculate and display result
    const result = amount * rate;
    resultInput.value = result.toFixed(4);
    
    // Update exchange rate text
    exchangeRateText.textContent = \`1 \${from} = \${rate.toFixed(4)} \${to}\`;
  } catch (error) {
    showError('Conversion failed. Please try again later.');
    console.error('Conversion error:', error);
  }
}

// Handle base currency change
async function handleCurrencyChange() {
  try {
    const from = fromCurrency.value;
    
    // Fetch new rates for the selected base currency
    await fetchExchangeRates(from);
    
    // Update conversion
    convertCurrency();
  } catch (error) {
    showError('Failed to update currency. Please try again later.');
    console.error('Currency change error:', error);
  }
}

// Swap currencies
function swapCurrencies() {
  const tempCurrency = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCurrency;
  
  // Update conversion
  handleCurrencyChange();
}

// Show error message
function showError(message) {
  errorMessage.textContent = message;
}

// Initialize the app
initConverter();`}
          />
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>
        <p className="mb-4">
          When working with the Currency Exchange API, it's important to implement proper error handling to ensure a
          good user experience.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Common Error Codes</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>401</strong> - Unauthorized (invalid API key)
              </li>
              <li>
                <strong>404</strong> - Not found (invalid endpoint or currency)
              </li>
              <li>
                <strong>429</strong> - Too many requests (rate limit exceeded)
              </li>
              <li>
                <strong>500</strong> - Server error
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Best Practices</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Always check the response status before processing data</li>
              <li>Implement retry logic with exponential backoff for transient errors</li>
              <li>Cache exchange rates to reduce API calls and handle offline scenarios</li>
              <li>Provide clear error messages to users</li>
              <li>Log detailed error information for debugging</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Advanced Usage</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Historical Data Analysis</h3>
            <p>
              You can use historical exchange rate data to analyze currency trends over time. This is useful for
              financial applications, investment tools, or data visualization projects.
            </p>
            <CodeBlock
              language="javascript"
              code={`// Fetch historical exchange rates for the past 7 days
async function getWeeklyRates(baseCurrency, targetCurrency) {
  const rates = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];
    
    try {
      const response = await fetch(\`https://api.exchangerate-api.com/v4/historical/\${formattedDate}/\${baseCurrency}\`);
      const data = await response.json();
      
      rates.push({
        date: formattedDate,
        rate: data.rates[targetCurrency]
      });
    } catch (error) {
      console.error(\`Failed to fetch rates for \${formattedDate}:\`, error);
    }
  }
  
  return rates;
}`}
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Currency Basket Conversion</h3>
            <p>
              Convert multiple currencies at once, which is useful for applications that deal with international pricing
              or multi-currency portfolios.
            </p>
            <CodeBlock
              language="javascript"
              code={`// Convert an amount to multiple currencies at once
async function convertToMultipleCurrencies(amount, baseCurrency, targetCurrencies) {
  try {
    const response = await fetch(\`https://api.exchangerate-api.com/v4/latest/\${baseCurrency}\`);
    const data = await response.json();
    
    const results = {};
    
    for (const currency of targetCurrencies) {
      if (data.rates[currency]) {
        results[currency] = amount * data.rates[currency];
      }
    }
    
    return results;
  } catch (error) {
    console.error('Conversion error:', error);
    throw error;
  }
}

// Example usage
const amount = 1000;
const baseCurrency = 'USD';
const targetCurrencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

convertToMultipleCurrencies(amount, baseCurrency, targetCurrencies)
  .then(results => {
    console.log(\`\${amount} \${baseCurrency} equals:\`);
    for (const [currency, value] of Object.entries(results)) {
      console.log(\`\${value.toFixed(2)} \${currency}\`);
    }
  })
  .catch(error => {
    console.error('Failed to convert currencies:', error);
  });`}
            />
          </div>
        </div>
      </div>

      <BlessCliIntegration
        apiName="Currency Exchange API"
        cliCommand="bless add api currency-exchange"
        configExample={`{
  "name": "currency-exchange",
  "baseUrl": "https://api.exchangerate-api.com/v4",
  "endpoints": [
    {
      "name": "getLatestRates",
      "path": "/latest/{baseCurrency}",
      "method": "GET",
      "params": [
        {
          "name": "baseCurrency",
          "type": "path",
          "required": true,
          "description": "Base currency code (e.g., USD, EUR)"
        }
      ]
    },
    {
      "name": "convertCurrency",
      "path": "/pair/{from}/{to}/{amount}",
      "method": "GET",
      "params": [
        {
          "name": "from",
          "type": "path",
          "required": true,
          "description": "Source currency code"
        },
        {
          "name": "to",
          "type": "path",
          "required": true,
          "description": "Target currency code"
        },
        {
          "name": "amount",
          "type": "path",
          "required": true,
          "description": "Amount to convert"
        }
      ]
    }
  ]
}`}
      />
    </div>
  )
}
