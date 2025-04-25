import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"

// This is a sample API documentation page for the Weather API
// In a real implementation, you would fetch this data from a database or CMS
export default function ApiDocumentation({ params }: { params: { slug: string } }) {
  // For demo purposes, we'll just show the Weather API documentation
  // In a real app, you would use params.slug to fetch the correct API data

  const api = {
    id: "weather",
    name: "Weather API",
    description: "Get current weather data and forecasts for any location",
    category: "Weather",
    difficulty: "Beginner",
    baseUrl: "https://api.weatherapi.com/v1",
    authType: "API Key",
    endpoints: [
      {
        name: "Current Weather",
        path: "/current.json",
        method: "GET",
        description: "Get current weather data for a location",
        parameters: [
          { name: "key", type: "string", required: true, description: "Your API key" },
          { name: "q", type: "string", required: true, description: "Location name, IP address, or coordinates" },
          { name: "aqi", type: "string", required: false, description: "Include air quality data (yes/no)" },
        ],
      },
      {
        name: "Forecast",
        path: "/forecast.json",
        method: "GET",
        description: "Get weather forecast for a location",
        parameters: [
          { name: "key", type: "string", required: true, description: "Your API key" },
          { name: "q", type: "string", required: true, description: "Location name, IP address, or coordinates" },
          { name: "days", type: "number", required: false, description: "Number of days of forecast (1-10)" },
          { name: "aqi", type: "string", required: false, description: "Include air quality data (yes/no)" },
          { name: "alerts", type: "string", required: false, description: "Include weather alerts (yes/no)" },
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
  <title>Weather API Example</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="weather-container">
    <h1>Current Weather</h1>
    <div id="weather-data">
      <p>Loading weather data...</p>
    </div>
    <button id="refresh-btn">Refresh</button>
  </div>
  
  <script src="weather.js"></script>
</body>
</html>`

  const javascriptCode = `// Replace with your actual API key
const API_KEY = 'your_api_key_here';
const LOCATION = 'London';

// Function to fetch weather data
async function getWeatherData() {
  try {
    const response = await fetch(
      \`https://api.weatherapi.com/v1/current.json?key=\${API_KEY}&q=\${LOCATION}\`
    );
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('weather-data').innerHTML = 
      '<p class="error">Failed to load weather data. Please try again later.</p>';
  }
}

// Function to display weather data
function displayWeatherData(data) {
  const weatherHtml = \`
    <div class="weather-info">
      <h2>\${data.location.name}, \${data.location.country}</h2>
      <div class="weather-details">
        <img src="\${data.current.condition.icon}" alt="\${data.current.condition.text}">
        <p class="temperature">\${data.current.temp_c}°C</p>
        <p class="condition">\${data.current.condition.text}</p>
      </div>
      <div class="weather-stats">
        <p>Humidity: \${data.current.humidity}%</p>
        <p>Wind: \${data.current.wind_kph} km/h</p>
        <p>Feels like: \${data.current.feelslike_c}°C</p>
      </div>
      <p class="updated">Last updated: \${data.current.last_updated}</p>
    </div>
  \`;
  
  document.getElementById('weather-data').innerHTML = weatherHtml;
}

// Initial load
document.addEventListener('DOMContentLoaded', getWeatherData);

// Refresh button
document.getElementById('refresh-btn').addEventListener('click', getWeatherData);`

  const cssCode = `.weather-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-details {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px 0;
}

.temperature {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 5px 0;
}

.condition {
  font-size: 1.2rem;
  color: #666;
}

.weather-stats {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.updated {
  font-size: 0.8rem;
  color: #999;
  text-align: right;
  width: 100%;
}

.error {
  color: #d9534f;
  text-align: center;
}

#refresh-btn {
  display: block;
  margin: 20px auto 0;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#refresh-btn:hover {
  background-color: #45a049;
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
                  <p className="mb-4">To use the Weather API, you need to sign up for an account and get an API key.</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Visit{" "}
                      <a
                        href="https://www.weatherapi.com/signup.aspx"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Weather API Sign Up
                      </a>
                    </li>
                    <li>Create an account and verify your email</li>
                    <li>Navigate to your dashboard to find your API key</li>
                    <li>Copy your API key for use in your application</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your weather application:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>index.html - The HTML structure</li>
                    <li>styles.css - CSS for styling</li>
                    <li>weather.js - JavaScript for API integration</li>
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
                    Open your HTML file in a browser to test your weather application. You should see the current
                    weather for London (or change the location in the code).
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Error Handling</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Common Errors</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>401 Unauthorized</strong>: Invalid API key or exceeded quota
                    </li>
                    <li>
                      <strong>400 Bad Request</strong>: Invalid location parameter
                    </li>
                    <li>
                      <strong>429 Too Many Requests</strong>: Rate limit exceeded
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
                  <p>
                    The free tier of Weather API allows 1,000,000 calls per month with a rate limit of 1 request per
                    second.
                  </p>
                  <p className="mt-2">To handle rate limiting:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Implement exponential backoff for retries</li>
                    <li>Cache responses when appropriate</li>
                    <li>Monitor your usage in the Weather API dashboard</li>
                  </ul>
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
                        href="https://www.weatherapi.com/docs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official Weather API Documentation"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
