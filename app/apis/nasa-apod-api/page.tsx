import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"
import BlessCliIntegration from "@/components/bless-cli-integration"

export default function NasaApodApiPage() {
  const api = {
    id: "nasa-apod-api",
    name: "NASA APOD API",
    description: "Access NASA's Astronomy Picture of the Day, featuring stunning space images with explanations",
    category: "Science",
    difficulty: "Beginner",
    baseUrl: "https://api.nasa.gov/planetary/apod",
    authType: "API Key",
    endpoints: [
      {
        name: "APOD",
        path: "/",
        method: "GET",
        description: "Get the Astronomy Picture of the Day",
        parameters: [
          {
            name: "api_key",
            type: "string",
            required: true,
            description: "Your API key",
          },
          {
            name: "date",
            type: "string",
            required: false,
            description: "The date of the APOD image to retrieve (YYYY-MM-DD)",
          },
          {
            name: "start_date",
            type: "string",
            required: false,
            description: "The start of a date range (YYYY-MM-DD)",
          },
          {
            name: "end_date",
            type: "string",
            required: false,
            description: "The end of a date range (YYYY-MM-DD)",
          },
          {
            name: "count",
            type: "number",
            required: false,
            description: "Number of random images to retrieve (cannot be used with date or date range)",
          },
          {
            name: "thumbs",
            type: "boolean",
            required: false,
            description: "Return URL of thumbnail image for video media types",
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
  <title>NASA Astronomy Picture of the Day</title>
  <link rel  initial-scale=1.0">
  <title>NASA Astronomy Picture of the Day</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>NASA Astronomy Picture of the Day</h1>
    
    <div class="date-picker">
      <label for="date-input">Select a date:</label>
      <input type="date" id="date-input">
      <button id="view-btn">View</button>
      <button id="random-btn">Random</button>
    </div>
    
    <div class="apod-container" id="apod-container">
      <!-- APOD content will be displayed here -->
      <div class="loading">Loading today's astronomy picture...</div>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`

  const javascriptCode = `// Replace with your actual API key
// You can get a free API key from https://api.nasa.gov/
const API_KEY = 'DEMO_KEY'; // DEMO_KEY has a limited rate, get your own for production
const API_URL = 'https://api.nasa.gov/planetary/apod';

// DOM Elements
const dateInput = document.getElementById('date-input');
const viewBtn = document.getElementById('view-btn');
const randomBtn = document.getElementById('random-btn');
const apodContainer = document.getElementById('apod-container');

// Set max date to today
const today = new Date();
dateInput.max = today.toISOString().split('T')[0];
dateInput.value = today.toISOString().split('T')[0];

// Event Listeners
viewBtn.addEventListener('click', () => {
  const date = dateInput.value;
  getAPOD(date);
});

randomBtn.addEventListener('click', () => {
  getRandomAPOD();
});

// Get APOD for a specific date
async function getAPOD(date) {
  try {
    apodContainer.innerHTML = '<div class="loading">Loading astronomy picture...</div>';
    
    const response = await fetch(\`\${API_URL}?api_key=\${API_KEY}&date=\${date}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayAPOD(data);
  } catch (error) {
    console.error('Error fetching APOD:', error);
    apodContainer.innerHTML = \`<div class="error">Failed to load astronomy picture. Please try again.</div>\`;
  }
}

// Get a random APOD
async function getRandomAPOD() {
  try {
    apodContainer.innerHTML = '<div class="loading">Loading random astronomy picture...</div>';
    
    const response = await fetch(\`\${API_URL}?api_key=\${API_KEY}&count=1\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayAPOD(data[0]);
    
    // Update date input to match the random image date
    dateInput.value = data[0].date;
  } catch (error) {
    console.error('Error fetching random APOD:', error);
    apodContainer.innerHTML = \`<div class="error">Failed to load random astronomy picture. Please try again.</div>\`;
  }
}

// Display APOD data
function displayAPOD(data) {
  let mediaHTML = '';
  
  // Check if it's an image or video
  if (data.media_type === 'image') {
    mediaHTML = \`<img src="\${data.hdurl || data.url}" alt="\${data.title}" class="apod-image">\`;
  } else if (data.media_type === 'video') {
    mediaHTML = \`
      <div class="video-container">
        <iframe src="\${data.url}" frameborder="0" allowfullscreen></iframe>
      </div>
    \`;
  }
  
  apodContainer.innerHTML = \`
    <div class="apod-card">
      <h2 class="apod-title">\${data.title}</h2>
      <p class="apod-date">\${data.date}</p>
      
      <div class="apod-media">
        \${mediaHTML}
      </div>
      
      <div class="apod-explanation">
        <h3>Explanation</h3>
        <p>\${data.explanation}</p>
      </div>
      
      <div class="apod-copyright">
        \${data.copyright ? \`© \${data.copyright}\` : 'Image Credit: NASA'}
      </div>
    </div>
  \`;
}

// Initialize with today's APOD
window.addEventListener('DOMContentLoaded', () => {
  getAPOD(dateInput.value);
});`

  const cssCode = `.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #0B3D91; /* NASA blue */
  margin-bottom: 30px;
}

.date-picker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

label {
  font-weight: bold;
}

#date-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #0B3D91; /* NASA blue */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0A3278;
}

#random-btn {
  background-color: #FC3D21; /* NASA red */
}

#random-btn:hover {
  background-color: #E0361D;
}

.apod-container {
  margin-bottom: 30px;
}

.apod-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.apod-title {
  padding: 20px;
  margin: 0;
  background-color: #0B3D91;
  color: white;
}

.apod-date {
  padding: 0 20px 20px;
  margin: 0;
  background-color: #0B3D91;
  color: white;
  font-style: italic;
}

.apod-media {
  width: 100%;
  max-height: 600px;
  overflow: hidden;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.apod-image {
  width: 100%;
  height: auto;
  display: block;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  width: 100%;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.apod-explanation {
  padding: 20px;
}

.apod-explanation h3 {
  margin-top: 0;
  color: #0B3D91;
}

.apod-copyright {
  padding: 10px 20px;
  background-color: #f0f0f0;
  font-size: 12px;
  text-align: right;
  color: #666;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
  font-style: italic;
}

.error {
  text-align: center;
  padding: 20px;
  color: #FC3D21;
  background-color: #FEE;
  border-radius: 4px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .date-picker {
    flex-direction: column;
    align-items: stretch;
  }
  
  .date-picker label {
    margin-bottom: 5px;
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
                  <p className="mb-4">NASA's APOD API is free to use, but you'll need an API key for production use.</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Visit{" "}
                      <a
                        href="https://api.nasa.gov/"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        NASA API Portal
                      </a>
                    </li>
                    <li>Fill out the form to generate an API key</li>
                    <li>You'll receive your API key instantly</li>
                    <li>For testing, you can use the demo key: "DEMO_KEY" (limited to 30 requests per hour)</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your APOD viewer application:</p>
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
                    For production use, replace <code className="bg-muted px-1 py-0.5 rounded">DEMO_KEY</code> in the
                    JavaScript file with your actual API key.
                  </p>
                  <Alert>
                    <AlertTitle>Note</AlertTitle>
                    <AlertDescription>
                      The DEMO_KEY is limited to 30 requests per hour and 50 requests per day. For a production
                      application, you should use your own API key, which allows for 1,000 requests per hour.
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 5: Test Your Implementation</h3>
                  <p className="mb-4">
                    Open your HTML file in a browser to test your APOD viewer application. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>View today's Astronomy Picture of the Day</li>
                    <li>Select a specific date to view that day's picture</li>
                    <li>Get a random astronomy picture</li>
                    <li>Read the explanation provided by NASA for each image</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bless Network CLI Integration Section */}
          
            <div>
              <h2 className="text-2xl font-bold mb-4">Error Handling</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Common Errors</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>403 Forbidden</strong>: Invalid API key
                    </li>
                    <li>
                      <strong>429 Too Many Requests</strong>: Rate limit exceeded
                    </li>
                    <li>
                      <strong>400 Bad Request</strong>: Invalid parameters (e.g., invalid date format)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
                  <p>NASA's API has the following rate limits:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>DEMO_KEY: 30 requests per hour, 50 requests per day</li>
                    <li>Registered API key: 1,000 requests per hour</li>
                  </ul>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      Implement caching for APOD data to reduce API calls. Since the APOD only changes once per day, you
                      can safely cache responses for 24 hours.
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Media Types</h3>
                  <p>
                    The APOD API can return either images or videos. Our example code handles both types, but be aware
                    that you'll need to check the <code className="bg-muted px-1 py-0.5 rounded">media_type</code> field
                    to determine how to display the content.
                  </p>
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
                        href="https://api.nasa.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official NASA API Documentation"
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
