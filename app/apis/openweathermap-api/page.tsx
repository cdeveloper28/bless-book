import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"
import BlessCliIntegration from "@/components/bless-cli-integration"

export default function OpenWeatherMapApiPage() {
  const api = {
    id: "openweathermap-api",
    name: "OpenWeatherMap API",
    description: "Access current weather data, forecasts, and historical weather information for any location",
    category: "Weather",
    difficulty: "Beginner",
    baseUrl: "https://api.openweathermap.org/data/2.5",
    authType: "API Key",
    endpoints: [
      {
        name: "Current Weather",
        path: "/weather",
        method: "GET",
        description: "Get current weather data for a specific location",
        parameters: [
          {
            name: "q",
            type: "string",
            required: false,
            description: "City name, state code and country code (e.g., 'London,uk')",
          },
          {
            name: "lat",
            type: "number",
            required: false,
            description: "Latitude coordinate",
          },
          {
            name: "lon",
            type: "number",
            required: false,
            description: "Longitude coordinate",
          },
          {
            name: "appid",
            type: "string",
            required: true,
            description: "Your API key",
          },
          {
            name: "units",
            type: "string",
            required: false,
            description: "Units of measurement (standard, metric, imperial)",
          },
        ],
      },
      {
        name: "5-Day Forecast",
        path: "/forecast",
        method: "GET",
        description: "Get 5-day weather forecast for a specific location",
        parameters: [
          {
            name: "q",
            type: "string",
            required: false,
            description: "City name, state code and country code (e.g., 'London,uk')",
          },
          {
            name: "lat",
            type: "number",
            required: false,
            description: "Latitude coordinate",
          },
          {
            name: "lon",
            type: "number",
            required: false,
            description: "Longitude coordinate",
          },
          {
            name: "appid",
            type: "string",
            required: true,
            description: "Your API key",
          },
          {
            name: "units",
            type: "string",
            required: false,
            description: "Units of measurement (standard, metric, imperial)",
          },
        ],
      },
      {
        name: "Weather by City ID",
        path: "/weather",
        method: "GET",
        description: "Get current weather data by city ID",
        parameters: [
          {
            name: "id",
            type: "number",
            required: true,
            description: "City ID",
          },
          {
            name: "appid",
            type: "string",
            required: true,
            description: "Your API key",
          },
          {
            name: "units",
            type: "string",
            required: false,
            description: "Units of measurement (standard, metric, imperial)",
          },
        ],
      },
    ],
  }

  // Sample code snippets
  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Weather App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Weather Dashboard</h1>
    
    <div class="search-container">
      <input type="text" id="city-input" placeholder="Enter city name">
      <button id="search-btn">Search</button>
    </div>
    
    <div class="weather-container" id="weather-container">
      <!-- Weather data will be displayed here -->
    </div>
    
    <div class="forecast-container" id="forecast-container">
      <!-- Forecast data will be displayed here -->
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`

  const javascriptCode = `// Replace with your actual API key
const API_KEY = 'your_api_key_here';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherContainer = document.getElementById('weather-container');
const forecastContainer = document.getElementById('forecast-container');

// Event Listeners
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    getForecast(city);
  }
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

// Get Current Weather
async function getWeather(city) {
  try {
    weatherContainer.innerHTML = '<div class="loading">Loading weather data...</div>';
    
    const response = await fetch(\`\${API_BASE_URL}/weather?q=\${city}&units=metric&appid=\${API_KEY}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    weatherContainer.innerHTML = \`<div class="error">Failed to load weather data. Please try again.</div>\`;
  }
}

// Get 5-Day Forecast
async function getForecast(city) {
  try {
    forecastContainer.innerHTML = '<div class="loading">Loading forecast data...</div>';
    
    const response = await fetch(\`\${API_BASE_URL}/forecast?q=\${city}&units=metric&appid=\${API_KEY}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error('Error fetching forecast:', error);
    forecastContainer.innerHTML = \`<div class="error">Failed to load forecast data. Please try again.</div>\`;
  }
}

// Display Current Weather
function displayWeather(data) {
  const weatherIconUrl = \`https://openweathermap.org/img/wn/\${data.weather[0].icon}@2x.png\`;
  
  weatherContainer.innerHTML = \`
    <div class="weather-card">
      <div class="weather-header">
        <h2>\${data.name}, \${data.sys.country}</h2>
        <p class="date">\${new Date().toLocaleDateString()}</p>
      </div>
      
      <div class="weather-info">
        <img src="\${weatherIconUrl}" alt="\${data.weather[0].description}" class="weather-icon">
        <div class="temperature">\${Math.round(data.main.temp)}°C</div>
        <div class="description">\${data.weather[0].description}</div>
      </div>
      
      <div class="weather-details">
        <div class="detail">
          <span class="label">Feels Like:</span>
          <span class="value">\${Math.round(data.main.feels_like)}°C</span>
        </div>
        <div class="detail">
          <span class="label">Humidity:</span>
          <span class="value">\${data.main.humidity}%</span>
        </div>
        <div class="detail">
          <span class="label">Wind:</span>
          <span class="value">\${data.wind.speed} m/s</span>
        </div>
        <div class="detail">
          <span class="label">Pressure:</span>
          <span class="value">\${data.main.pressure} hPa</span>
        </div>
      </div>
    </div>
  \`;
}

// Display 5-Day Forecast
function displayForecast(data) {
  // Group forecast data by day
  const dailyForecasts = {};
  
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        date: date,
        temperatures: [],
        icons: [],
        descriptions: []
      };
    }
    
    dailyForecasts[date].temperatures.push(item.main.temp);
    dailyForecasts[date].icons.push(item.weather[0].icon);
    dailyForecasts[date].descriptions.push(item.weather[0].description);
  });
  
  // Convert to array and take only the next 5 days
  const forecastArray = Object.values(dailyForecasts).slice(0, 5);
  
  // Create forecast HTML
  let forecastHTML = '<h2>5-Day Forecast</h2><div class="forecast-cards">';
  
  forecastArray.forEach(day => {
    // Calculate average temperature
    const avgTemp = day.temperatures.reduce((sum, temp) => sum + temp, 0) / day.temperatures.length;
    
    // Get the most common icon
    const mostCommonIcon = getMostCommonItem(day.icons);
    const weatherIconUrl = \`https://openweathermap.org/img/wn/\${mostCommonIcon}@2x.png\`;
    
    // Get the most common description
    const mostCommonDescription = getMostCommonItem(day.descriptions);
    
    forecastHTML += \`
      <div class="forecast-card">
        <div class="forecast-date">\${day.date}</div>
        <img src="\${weatherIconUrl}" alt="\${mostCommonDescription}" class="forecast-icon">
        <div class="forecast-temp">\${Math.round(avgTemp)}°C</div>
        <div class="forecast-desc">\${mostCommonDescription}</div>
      </div>
    \`;
  });
  
  forecastHTML += '</div>';
  forecastContainer.innerHTML = forecastHTML;
}

// Helper function to get the most common item in an array
function getMostCommonItem(arr) {
  return arr.sort((a, b) =>
    arr.filter(v => v === a).length - arr.filter(v => v === b).length
  ).pop();
}

// Initialize with a default city
window.addEventListener('DOMContentLoaded', () => {
  cityInput.value = 'London';
  searchBtn.click();
});`

  const cssCode = `.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.search-container {
  display: flex;
  margin-bottom: 30px;
}

#city-input {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

#search-btn {
  padding: 12px 24px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
}

#search-btn:hover {
  background-color: #357ae8;
}

.weather-container {
  margin-bottom: 40px;
}

.weather-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.weather-header h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.date {
  color: #666;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.weather-icon {
  width: 100px;
  height: 100px;
}

.temperature {
  font-size: 48px;
  font-weight: bold;
  margin: 10px 0;
}

.description {
  text-transform: capitalize;
  color: #666;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.detail {
  display: flex;
  justify-content: space-between;
}

.label {
  color: #666;
}

.value {
  font-weight: bold;
}

.forecast-container h2 {
  margin-bottom: 20px;
  text-align: center;
}

.forecast-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
}

.forecast-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.forecast-date {
  font-weight: bold;
  margin-bottom: 10px;
}

.forecast-icon {
  width: 50px;
  height: 50px;
  margin: 0 auto;
}

.forecast-temp {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.forecast-desc {
  text-transform: capitalize;
  color: #666;
  font-size: 14px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

.error {
  text-align: center;
  padding: 20px;
  color: #e74c3c;
  background-color: #fadbd8;
  border-radius: 4px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .weather-details {
    grid-template-columns: 1fr;
  }
  
  .forecast-cards {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}`

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/apis" aria-label="Back to API catalog">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{api.name}</h1>
          <Badge>{api.category}</Badge>
          <Badge variant="outline">{api.difficulty}</Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overview</h2>
              <p className="text-muted-foreground">{api.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Integration Guide</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Get API Key</h3>
                  <p className="mb-4">
                    To use the OpenWeatherMap API, you need to sign up for a free account and get an API key.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Visit{" "}
                      <a
                        href="https://home.openweathermap.org/users/sign_up"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        OpenWeatherMap Sign Up
                      </a>
                    </li>
                    <li>Create an account with your email</li>
                    <li>After signing up, go to the API keys tab in your account</li>
                    <li>Copy your API key (it may take a few hours to activate)</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your weather application:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>index.html - The HTML structure</li>
                    <li>styles.css - CSS for styling</li>
                    <li>script.js - JavaScript for API integration</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 3: Implement the Code</h3>
                  <p className="mb-4">Copy the following code into your project files:</p>

                  <Tabs defaultValue="html">
                    <TabsList aria-label="Code examples">
                      <TabsTrigger value="html">HTML</TabsTrigger>
                      <TabsTrigger value="js">JavaScript</TabsTrigger>
                      <TabsTrigger value="css">CSS</TabsTrigger>
                    </TabsList>
                    <TabsContent value="html">
                      <CodeBlock code={htmlCode} language="html" />
                    </TabsContent>
                    <TabsContent value="js">
                      <CodeBlock code={javascriptCode} language="javascript" />
                    </TabsContent>
                    <TabsContent value="css">
                      <CodeBlock code={cssCode} language="css" />
                    </TabsContent>
                  </Tabs>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 4: Replace the API Key</h3>
                  <p className="mb-4">
                    Replace <code className="bg-muted px-1 py-0.5 rounded">your_api_key_here</code> in the JavaScript
                    file with your actual API key.
                  </p>
                  <Alert>
                    <AlertTitle>Security Note</AlertTitle>
                    <AlertDescription>
                      In a production environment, you should never expose your API key in client-side code. Use a
                      server-side solution or environment variables instead.
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 5: Test Your Implementation</h3>
                  <p className="mb-4">
                    Open your HTML file in a browser to test your weather application. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Search for weather by city name</li>
                    <li>View current weather conditions including temperature, humidity, and wind speed</li>
                    <li>See a 5-day forecast</li>
                    <li>View weather icons representing the conditions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bless Network CLI Integration Section */}
            <BlessCliIntegration
              apiName={api.name}
              apiBaseUrl={api.baseUrl}
              apiEndpoint="/weather?q=London"
              authType="apiKey"
              authParam="query 'appid=YOUR_API_KEY_HERE'"
            />

            <div>
              <h2 className="text-2xl font-bold mb-4">Error Handling</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Common Errors</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>401 Unauthorized</strong>: Invalid API key
                    </li>
                    <li>
                      <strong>404 Not Found</strong>: City not found
                    </li>
                    <li>
                      <strong>429 Too Many Requests</strong>: Rate limit exceeded
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
                  <p>The free tier of OpenWeatherMap API allows:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>60 calls per minute</li>
                    <li>1,000,000 calls per month</li>
                  </ul>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      Implement caching for weather data to reduce API calls. Weather data doesn't change frequently, so
                      you can safely cache it for 10-30 minutes.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">API Details</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Base URL</dt>
                    <dd className="flex items-center gap-1">
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">{api.baseUrl}</code>
                      <Button variant="ghost" size="icon" className="h-4 w-4" aria-label="Copy base URL">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Authentication</dt>
                    <dd>{api.authType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Documentation</dt>
                    <dd>
                      <a
                        href="https://openweathermap.org/api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official OpenWeatherMap API Documentation"
                      >
                        Official Docs <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Endpoints</h3>
                <ul className="space-y-4">
                  {api.endpoints.map((endpoint, index) => (
                    <li key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{endpoint.method}</Badge>
                        <code className="text-sm font-semibold">{endpoint.path}</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                      <details className="text-sm">
                        <summary className="font-medium cursor-pointer">Parameters</summary>
                        <ul className="mt-2 space-y-2">
                          {endpoint.parameters.map((param, paramIndex) => (
                            <li key={paramIndex} className="grid grid-cols-[1fr,2fr] gap-2">
                              <div>
                                <code className="text-xs bg-muted px-1 py-0.5 rounded">{param.name}</code>
                                {param.required && <span className="text-red-500 ml-1">*</span>}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <span className="text-foreground">{param.type}</span> - {param.description}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border p-4 bg-muted/30">
                <h3 className="text-lg font-semibold mb-2">Bless Network Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://docs.bless.network/build-on-bless/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      Bless Network CLI Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bless.network/templates/weather-api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      Weather API Template
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/yXUWUzQU"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      Join Bless Network Discord
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
