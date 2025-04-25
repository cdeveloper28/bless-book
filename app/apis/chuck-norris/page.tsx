import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"

export default function ChuckNorrisApiPage() {
  const api = {
    id: "chuck-norris",
    name: "Chuck Norris API",
    description: "Free JSON API for hand curated Chuck Norris facts",
    category: "Entertainment",
    difficulty: "Beginner",
    baseUrl: "https://api.chucknorris.io",
    authType: "None",
    endpoints: [
      {
        name: "Random Joke",
        path: "/jokes/random",
        method: "GET",
        description: "Retrieve a random chuck norris joke",
        parameters: [],
      },
      {
        name: "Random Joke by Category",
        path: "/jokes/random?category={category}",
        method: "GET",
        description: "Retrieve a random chuck norris joke from a given category",
        parameters: [
          {
            name: "category",
            type: "string",
            required: true,
            description: "The category to fetch a joke from (e.g., animal, career, celebrity)",
          },
        ],
      },
      {
        name: "Categories",
        path: "/jokes/categories",
        method: "GET",
        description: "Retrieve all available categories",
        parameters: [],
      },
      {
        name: "Search",
        path: "/jokes/search?query={query}",
        method: "GET",
        description: "Search for jokes",
        parameters: [
          {
            name: "query",
            type: "string",
            required: true,
            description: "The search query (min 3, max 120 characters)",
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
  <title>Chuck Norris Jokes</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Chuck Norris Jokes</h1>
    
    <div class="categories">
      <h2>Categories</h2>
      <div id="category-buttons"></div>
    </div>
    
    <div class="joke-container">
      <div id="joke-text">Click a category or the button below to get a joke</div>
      <button id="random-joke">Get Random Joke</button>
    </div>
    
    <div class="search-container">
      <h2>Search Jokes</h2>
      <input type="text" id="search-input" placeholder="Enter search term (min 3 characters)">
      <button id="search-button">Search</button>
      <div id="search-results"></div>
    </div>
  </div>
  
  <script src="chuck.js"></script>
</body>
</html>`

  const javascriptCode = `// API Base URL
const API_BASE_URL = 'https://api.chucknorris.io';

// DOM Elements
const categoryButtonsContainer = document.getElementById('category-buttons');
const jokeTextElement = document.getElementById('joke-text');
const randomJokeButton = document.getElementById('random-joke');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResultsContainer = document.getElementById('search-results');

// Fetch and display categories
async function fetchCategories() {
  try {
    const response = await fetch(\`\${API_BASE_URL}/jokes/categories\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const categories = await response.json();
    displayCategories(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    categoryButtonsContainer.innerHTML = '<p class="error">Failed to load categories</p>';
  }
}

// Display categories as buttons
function displayCategories(categories) {
  categoryButtonsContainer.innerHTML = '';
  
  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category;
    button.classList.add('category-button');
    button.addEventListener('click', () => fetchJokeByCategory(category));
    categoryButtonsContainer.appendChild(button);
  });
}

// Fetch random joke
async function fetchRandomJoke() {
  try {
    const response = await fetch(\`\${API_BASE_URL}/jokes/random\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const joke = await response.json();
    displayJoke(joke);
  } catch (error) {
    console.error('Error fetching random joke:', error);
    jokeTextElement.textContent = 'Failed to load joke. Please try again.';
    jokeTextElement.classList.add('error');
  }
}

// Fetch joke by category
async function fetchJokeByCategory(category) {
  try {
    const response = await fetch(\`\${API_BASE_URL}/jokes/random?category=\${category}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const joke = await response.json();
    displayJoke(joke);
  } catch (error) {
    console.error(\`Error fetching joke from category \${category}:\`, error);
    jokeTextElement.textContent = 'Failed to load joke. Please try again.';
    jokeTextElement.classList.add('error');
  }
}

// Display joke
function displayJoke(joke) {
  jokeTextElement.textContent = joke.value;
  jokeTextElement.classList.remove('error');
  jokeTextElement.classList.remove('error');
}

// Search jokes
async function searchJokes(query) {
  if (query.length < 3) {
    searchResultsContainer.innerHTML = '<p class="error">Search term must be at least 3 characters long</p>';
    return;
  }
  
  try {
    const response = await fetch(\`\${API_BASE_URL}/jokes/search?query=\${encodeURIComponent(query)}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const result = await response.json();
    displaySearchResults(result);
  } catch (error) {
    console.error('Error searching jokes:', error);
    searchResultsContainer.innerHTML = '<p class="error">Failed to search jokes. Please try again.</p>';
  }
}

// Display search results
function displaySearchResults(result) {
  searchResultsContainer.innerHTML = '';
  
  if (result.total === 0) {
    searchResultsContainer.innerHTML = '<p>No jokes found matching your search.</p>';
    return;
  }
  
  const resultsList = document.createElement('ul');
  resultsList.classList.add('search-results-list');
  
  result.result.forEach(joke => {
    const listItem = document.createElement('li');
    listItem.textContent = joke.value;
    resultsList.appendChild(listItem);
  });
  
  searchResultsContainer.appendChild(resultsList);
}

// Event Listeners
randomJokeButton.addEventListener('click', fetchRandomJoke);

searchButton.addEventListener('click', () => {
  searchJokes(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchJokes(searchInput.value);
  }
});

// Initialize
fetchCategories();`

  const cssCode = `.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1, h2 {
  text-align: center;
  color: #333;
}

.categories {
  margin-bottom: 30px;
}

#category-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.category-button {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.category-button:hover {
  background-color: #e0e0e0;
}

.joke-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
}

#joke-text {
  font-size: 18px;
  margin-bottom: 20px;
  min-height: 50px;
}

#random-joke {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

#random-joke:hover {
  background-color: #45a049;
}

.search-container {
  margin-top: 30px;
}

#search-input {
  width: 70%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

#search-button {
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

#search-button:hover {
  background-color: #0b7dda;
}

#search-results {
  margin-top: 20px;
}

.search-results-list {
  list-style-type: none;
  padding: 0;
}

.search-results-list li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.error {
  color: #d9534f;
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
                    The Chuck Norris API is a free, public API that doesn't require authentication. It provides random
                    Chuck Norris jokes, categorized jokes, and search functionality.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your Chuck Norris jokes application:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>index.html - The HTML structure</li>
                    <li>styles.css - CSS for styling</li>
                    <li>chuck.js - JavaScript for API integration</li>
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
                    Open your HTML file in a browser to test your Chuck Norris jokes application. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>View all available joke categories</li>
                    <li>Get a random joke by clicking the "Get Random Joke" button</li>
                    <li>Get a joke from a specific category by clicking on a category button</li>
                    <li>Search for jokes containing specific text</li>
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
                      <strong>404 Not Found</strong>: Invalid endpoint or resource not found
                    </li>
                    <li>
                      <strong>400 Bad Request</strong>: Invalid query parameters (e.g., search term too short)
                    </li>
                    <li>
                      <strong>Network Errors</strong>: Connection issues or API downtime
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
                  <p>
                    The Chuck Norris API doesn't explicitly state rate limits, but as with any public API, it's good
                    practice to implement reasonable request limits in your application.
                  </p>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      To be a good API citizen, avoid making excessive requests in short periods. Consider adding a
                      small delay between rapid successive requests, especially for search functionality.
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
                        href="https://api.chucknorris.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official Chuck Norris API Documentation"
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
