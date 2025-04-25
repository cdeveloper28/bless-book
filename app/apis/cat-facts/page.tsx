import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"

export default function CatFactsApiPage() {
  const api = {
    id: "cat-facts",
    name: "Cat Facts API",
    description: "Free API for random facts about cats",
    category: "Animals",
    difficulty: "Beginner",
    baseUrl: "https://catfact.ninja",
    authType: "None",
    endpoints: [
      {
        name: "Random Fact",
        path: "/fact",
        method: "GET",
        description: "Get a random cat fact",
        parameters: [
          {
            name: "max_length",
            type: "number",
            required: false,
            description: "Maximum length of returned fact",
          },
        ],
      },
      {
        name: "Facts List",
        path: "/facts",
        method: "GET",
        description: "Get a list of cat facts",
        parameters: [
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Limit the number of facts returned (default: 10, max: 100)",
          },
          {
            name: "max_length",
            type: "number",
            required: false,
            description: "Maximum length of returned facts",
          },
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number for pagination",
          },
        ],
      },
      {
        name: "Breeds List",
        path: "/breeds",
        method: "GET",
        description: "Get a list of cat breeds",
        parameters: [
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Limit the number of breeds returned (default: 10, max: 100)",
          },
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number for pagination",
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
  <title>Cat Facts</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Cat Facts</h1>
    
    <div class="fact-container">
      <div class="fact-card">
        <p id="fact-text">Click the button to get a cat fact...</p>
      </div>
      
      <div class="controls">
        <div class="length-filter">
          <label for="max-length">Max Length:</label>
          <input type="number" id="max-length" min="20" max="500" value="200">
        </div>
        <button id="get-fact-btn">Get Cat Fact</button>
      </div>
    </div>
    
    <div class="breeds-container">
      <h2>Cat Breeds</h2>
      <div id="breeds-list" class="breeds-list">
        <!-- Breeds will be loaded here -->
        <p class="loading">Loading cat breeds...</p>
      </div>
      <div class="pagination">
        <button id="prev-page" disabled>Previous</button>
        <span id="page-info">Page 1</span>
        <button id="next-page">Next</button>
      </div>
    </div>
    
    <div class="facts-list-container">
      <h2>More Cat Facts</h2>
      <button id="load-facts-btn">Load More Facts</button>
      <div id="facts-list" class="facts-list">
        <!-- Facts will be loaded here -->
      </div>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`

  const javascriptCode = `// API Base URL
const API_BASE_URL = 'https://catfact.ninja';

// DOM Elements
const factText = document.getElementById('fact-text');
const maxLengthInput = document.getElementById('max-length');
const getFactBtn = document.getElementById('get-fact-btn');
const breedsList = document.getElementById('breeds-list');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');
const loadFactsBtn = document.getElementById('load-facts-btn');
const factsList = document.getElementById('facts-list');

// State variables
let currentBreedPage = 1;
let totalBreedPages = 1;
let factsLoaded = false;

// Event Listeners
document.addEventListener('DOMContentLoaded', initialize);
getFactBtn.addEventListener('click', getRandomFact);
prevPageBtn.addEventListener('click', () => {
  if (currentBreedPage > 1) {
    currentBreedPage--;
    loadBreeds();
  }
});
nextPageBtn.addEventListener('click', () => {
  if (currentBreedPage < totalBreedPages) {
    currentBreedPage++;
    loadBreeds();
  }
});
loadFactsBtn.addEventListener('click', loadFacts);

// Initialize the app
function initialize() {
  getRandomFact();
  loadBreeds();
}

// Get a random cat fact
async function getRandomFact() {
  // Show loading state
  factText.textContent = 'Loading...';
  
  try {
    // Get max length value
    const maxLength = maxLengthInput.value;
    
    // Build URL with optional max_length parameter
    let url = \`\${API_BASE_URL}/fact\`;
    if (maxLength) {
      url += \`?max_length=\${maxLength}\`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    factText.textContent = data.fact;
  } catch (error) {
    console.error('Error fetching cat fact:', error);
    factText.textContent = 'Failed to load cat fact. Please try again.';
  }
}

// Load cat breeds
async function loadBreeds() {
  // Show loading state
  breedsList.innerHTML = '<p class="loading">Loading cat breeds...</p>';
  
  try {
    const response = await fetch(\`\${API_BASE_URL}/breeds?page=\${currentBreedPage}&limit=10\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayBreeds(data);
    
    // Update pagination
    totalBreedPages = data.last_page;
    pageInfo.textContent = \`Page \${currentBreedPage} of \${totalBreedPages}\`;
    prevPageBtn.disabled = currentBreedPage <= 1;
    nextPageBtn.disabled = currentBreedPage >= totalBreedPages;
  } catch (error) {
    console.error('Error fetching cat breeds:', error);
    breedsList.innerHTML = '<p class="error">Failed to load cat breeds. Please try again.</p>';
  }
}

// Display cat breeds
function displayBreeds(data) {
  breedsList.innerHTML = '';
  
  if (!data.data || data.data.length === 0) {
    breedsList.innerHTML = '<p class="no-results">No cat breeds found.</p>';
    return;
  }
  
  const table = document.createElement('table');
  table.className = 'breeds-table';
  
  // Create table header
  const thead = document.createElement('thead');
  thead.innerHTML = \`
    <tr>
      <th>Breed</th>
      <th>Country</th>
      <th>Origin</th>
      <th>Coat</th>
      <th>Pattern</th>
    </tr>
  \`;
  table.appendChild(thead);
  
  // Create table body
  const tbody = document.createElement('tbody');
  data.data.forEach(breed => {
    const row = document.createElement('tr');
    row.innerHTML = \`
      <td>\${breed.breed}</td>
      <td>\${breed.country || 'Unknown'}</td>
      <td>\${breed.origin || 'Unknown'}</td>
      <td>\${breed.coat || 'Various'}</td>
      <td>\${breed.pattern || 'Various'}</td>
    \`;
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  
  breedsList.appendChild(table);
}

// Load more cat facts
async function loadFacts() {
  // Show loading state or change button text
  loadFactsBtn.textContent = 'Loading...';
  loadFactsBtn.disabled = true;
  
  try {
    const response = await fetch(\`\${API_BASE_URL}/facts?limit=5\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayFacts(data);
    
    // Update button
    loadFactsBtn.textContent = 'Load More Facts';
    loadFactsBtn.disabled = false;
    factsLoaded = true;
  } catch (error) {
    console.error('Error fetching cat facts:', error);
    loadFactsBtn.textContent = 'Failed to Load';
    setTimeout(() => {
      loadFactsBtn.textContent = 'Try Again';
      loadFactsBtn.disabled = false;
    }, 2000);
  }
}

// Display cat facts
function displayFacts(data) {
  if (!factsLoaded) {
    // Clear the list if this is the first load
    factsList.innerHTML = '';
  }
  
  if (!data.data || data.data.length === 0) {
    factsList.innerHTML += '<p class="no-results">No more cat facts available.</p>';
    return;
  }
  
  data.data.forEach(factData => {
    const factItem = document.createElement('div');
    factItem.className = 'fact-item';
    factItem.textContent = factData.fact;
    factsList.appendChild(factItem);
  });
}`

  const cssCode = `.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1, h2 {
  text-align: center;
  color: #2e7d32;
}

.fact-container {
  margin-bottom: 40px;
}

.fact-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

#fact-text {
  font-size: 20px;
  line-height: 1.5;
  margin: 0;
  color: #333;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.length-filter {
  display: flex;
  align-items: center;
  gap: 10px;
}

label {
  font-weight: bold;
}

input[type="number"] {
  width: 80px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #1b5e20;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.breeds-container, .facts-list-container {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.breeds-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.breeds-table th, .breeds-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.breeds-table th {
  background-color: #e8f5e9;
  color: #2e7d32;
  font-weight: bold;
}

.breeds-table tr:hover {
  background-color: #f5f5f5;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

#load-facts-btn {
  display: block;
  margin: 20px auto;
}

.facts-list {
  margin-top: 20px;
}

.fact-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  color: #777;
  font-style: italic;
}

.error {
  color: #d32f2f;
  text-align: center;
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
                    The Cat Facts API is a free, public API that doesn't require authentication. It provides random cat
                    facts, a list of cat facts, and information about cat breeds.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your cat facts application:</p>
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
                    Open your HTML file in a browser to test your cat facts application. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Get a random cat fact</li>
                    <li>Filter facts by maximum length</li>
                    <li>Browse through a list of cat breeds</li>
                    <li>Load additional cat facts</li>
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
                      <strong>404 Not Found</strong>: Invalid endpoint
                    </li>
                    <li>
                      <strong>Network Errors</strong>: Connection issues or API downtime
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Pagination</h3>
                  <p>
                    The Cat Facts API uses pagination for the breeds and facts lists. Make sure to handle pagination
                    correctly to allow users to navigate through all available data.
                  </p>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      When implementing pagination, always check the total number of pages returned by the API and
                      disable navigation buttons appropriately to prevent users from attempting to access non-existent
                      pages.
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
                        href="https://catfact.ninja/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official Cat Facts API Documentation"
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
