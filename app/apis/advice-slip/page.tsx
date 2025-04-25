import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"

export default function AdviceSlipApiPage() {
  const api = {
    id: "advice-slip",
    name: "Advice Slip API",
    description: "Free API for random advice slips",
    category: "Entertainment",
    difficulty: "Beginner",
    baseUrl: "https://api.adviceslip.com",
    authType: "None",
    endpoints: [
      {
        name: "Random Advice",
        path: "/advice",
        method: "GET",
        description: "Get a random advice slip",
        parameters: [],
      },
      {
        name: "Advice by ID",
        path: "/advice/{slip_id}",
        method: "GET",
        description: "Get a specific advice slip by ID",
        parameters: [
          {
            name: "slip_id",
            type: "number",
            required: true,
            description: "The ID of the advice slip to retrieve",
          },
        ],
      },
      {
        name: "Search Advice",
        path: "/advice/search/{query}",
        method: "GET",
        description: "Search for advice slips containing a specific term",
        parameters: [
          {
            name: "query",
            type: "string",
            required: true,
            description: "The search term to look for in advice slips",
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
  <title>Daily Advice</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Daily Advice</h1>
    
    <div class="advice-container">
      <div class="advice-card">
        <p id="advice-text">Click the button to get some advice...</p>
        <span id="advice-id"></span>
      </div>
      
      <button id="get-advice-btn">Get Advice</button>
    </div>
    
    <div class="search-container">
      <h2>Search for Advice</h2>
      <div class="search-form">
        <input type="text" id="search-input" placeholder="Enter search term...">
        <button id="search-btn">Search</button>
      </div>
      <div id="search-results"></div>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`

  const javascriptCode = `// DOM Elements
const adviceText = document.getElementById('advice-text');
const adviceId = document.getElementById('advice-id');
const getAdviceBtn = document.getElementById('get-advice-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');

// API Base URL
const API_BASE_URL = 'https://api.adviceslip.com';

// Event Listeners
getAdviceBtn.addEventListener('click', getRandomAdvice);
searchBtn.addEventListener('click', searchAdvice);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchAdvice();
  }
});

// Get Random Advice
async function getRandomAdvice() {
  try {
    // Add a cache-busting parameter to avoid browser caching
    const timestamp = new Date().getTime();
    const response = await fetch(\`\${API_BASE_URL}/advice?timestamp=\${timestamp}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayAdvice(data.slip);
  } catch (error) {
    console.error('Error fetching advice:', error);
    adviceText.textContent = 'Failed to load advice. Please try again.';
    adviceId.textContent = '';
  }
}

// Display Advice
function displayAdvice(slip) {
  adviceText.textContent = slip.advice;
  adviceId.textContent = \`Advice #\${slip.id}\`;
}

// Search Advice
async function searchAdvice() {
  const searchTerm = searchInput.value.trim();
  
  if (!searchTerm) {
    searchResults.innerHTML = '<p class="error">Please enter a search term</p>';
    return;
  }
  
  searchResults.innerHTML = '<p class="loading">Searching...</p>';
  
  try {
    const response = await fetch(\`\${API_BASE_URL}/advice/search/\${encodeURIComponent(searchTerm)}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displaySearchResults(data);
  } catch (error) {
    console.error('Error searching advice:', error);
    searchResults.innerHTML = '<p class="error">Failed to search advice. Please try again.</p>';
  }
}

// Display Search Results
function displaySearchResults(data) {
  searchResults.innerHTML = '';
  
  if (data.message && data.message.text) {
    // No results found
    searchResults.innerHTML = \`<p class="no-results">\${data.message.text}</p>\`;
    return;
  }
  
  if (data.slips && data.slips.length > 0) {
    const resultsList = document.createElement('ul');
    resultsList.className = 'results-list';
    
    data.slips.forEach(slip => {
      const listItem = document.createElement('li');
      listItem.innerHTML = \`
        <div class="result-item">
          <p>\${slip.advice}</p>
          <span>Advice #\${slip.id}</span>
        </div>
      \`;
      resultsList.appendChild(listItem);
    });
    
    searchResults.appendChild(resultsList);
  }
}

// Load random advice when page loads
getRandomAdvice();`

  const cssCode = `.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1, h2 {
  text-align: center;
  color: #2e7d32;
}

.advice-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.advice-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
}

#advice-text {
  font-size: 24px;
  line-height: 1.5;
  margin: 0;
  font-style: italic;
  color: #333;
}

#advice-id {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: #777;
}

#get-advice-btn {
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#get-advice-btn:hover {
  background-color: #1b5e20;
}

.search-container {
  margin-top: 40px;
}

.search-form {
  display: flex;
  margin-bottom: 20px;
}

#search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
  font-size: 16px;
}

#search-btn {
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#search-btn:hover {
  background-color: #1b5e20;
}

.results-list {
  list-style: none;
  padding: 0;
}

.result-item {
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.result-item p {
  margin: 0 0 15px 0;
  font-size: 18px;
}

.result-item span {
  font-size: 12px;
  color: #777;
  position: absolute;
  bottom: 5px;
  right: 10px;
}

.error {
  color: #d32f2f;
  text-align: center;
}

.loading {
  text-align: center;
  color: #777;
  font-style: italic;
}

.no-results {
  text-align: center;
  color: #777;
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
                  <h3 className="text-xl font-semibold mb-2">Step 1: Understanding the API</h3>
                  <p className="mb-4">
                    The Advice Slip API is a free, public API that doesn't require authentication. It provides random
                    advice slips, specific advice by ID, and search functionality.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your advice application:</p>
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
                  <h3 className="text-xl font-semibold mb-2">Step 4: Test Your Implementation</h3>
                  <p className="mb-4">
                    Open your HTML file in a browser to test your advice application. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Get a random advice slip by clicking the "Get Advice" button</li>
                    <li>Search for advice slips containing specific terms</li>
                    <li>View the advice ID for each slip</li>
                  </ul>
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
                      <strong>404 Not Found</strong>: Invalid endpoint or advice ID not found
                    </li>
                    <li>
                      <strong>Network Errors</strong>: Connection issues or API downtime
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Caching Issues</h3>
                  <p>
                    The Advice Slip API responses may be cached by browsers, which can result in the same advice being
                    returned for multiple requests. To avoid this, we've added a timestamp parameter to the request URL.
                  </p>
                  <Alert className="mt-4">
                    <AlertTitle>Important Note</AlertTitle>
                    <AlertDescription>
                      When working with the Advice Slip API, always include a cache-busting parameter (like a timestamp)
                      to ensure you get fresh results each time.
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
                        href="https://api.adviceslip.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official Advice Slip API Documentation"
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
                      {endpoint.parameters.length > 0 && (
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
                      )}
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
