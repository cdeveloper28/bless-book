import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"

export default function QuotesApiPage() {
  const api = {
    id: "quotes-api",
    name: "Quotable API",
    description: "Free API for quotes from famous historical figures",
    category: "Entertainment",
    difficulty: "Beginner",
    baseUrl: "https://api.quotable.io",
    authType: "None",
    endpoints: [
      {
        name: "Random Quote",
        path: "/random",
        method: "GET",
        description: "Get a random quote",
        parameters: [
          {
            name: "tags",
            type: "string",
            required: false,
            description: "Filter random quotes by tag(s)",
          },
          {
            name: "maxLength",
            type: "number",
            required: false,
            description: "Maximum length in characters",
          },
          {
            name: "minLength",
            type: "number",
            required: false,
            description: "Minimum length in characters",
          },
        ],
      },
      {
        name: "Quotes List",
        path: "/quotes",
        method: "GET",
        description: "Get a paginated list of all quotes",
        parameters: [
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number (default: 1)",
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Number of results per page (default: 20, max: 150)",
          },
          {
            name: "tags",
            type: "string",
            required: false,
            description: "Filter quotes by tag(s)",
          },
          {
            name: "author",
            type: "string",
            required: false,
            description: "Filter quotes by author",
          },
        ],
      },
      {
        name: "Tags List",
        path: "/tags",
        method: "GET",
        description: "Get a list of all tags",
        parameters: [],
      },
      {
        name: "Authors List",
        path: "/authors",
        method: "GET",
        description: "Get a paginated list of all authors",
        parameters: [
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number (default: 1)",
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Number of results per page (default: 20, max: 150)",
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
  <title>Inspirational Quotes</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Inspirational Quotes</h1>
    
    <div class="quote-container">
      <div class="quote-card">
        <blockquote id="quote-text"></blockquote>
        <p id="quote-author"></p>
        <div id="quote-tags"></div>
      </div>
      
      <button id="new-quote-btn">New Quote</button>
    </div>
    
    <div class="filter-container">
      <h2>Filter Quotes</h2>
      <div class="filter-options">
        <div class="filter-group">
          <label for="tag-select">Filter by Tag:</label>
          <select id="tag-select">
            <option value="">Any Tag</option>
            <!-- Tags will be populated by JavaScript -->
          </select>
        </div>
        
        <div class="filter-group">
          <label for="length-select">Quote Length:</label>
          <select id="length-select">
            <option value="">Any Length</option>
            <option value="short">Short (< 50 chars)</option>
            <option value="medium">Medium (50-100 chars)</option>
            <option value="long">Long (> 100 chars)</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="browse-container">
      <h2>Browse Quotes</h2>
      <div id="quotes-list"></div>
      <div class="pagination">
        <button id="prev-page" disabled>Previous</button>
        <span id="page-info">Page 1</span>
        <button id="next-page">Next</button>
      </div>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`

  const javascriptCode = `// API Base URL
const API_BASE_URL = 'https://api.quotable.io';

// DOM Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteTags = document.getElementById('quote-tags');
const newQuoteBtn = document.getElementById('new-quote-btn');
const tagSelect = document.getElementById('tag-select');
const lengthSelect = document.getElementById('length-select');
const quotesList = document.getElementById('quotes-list');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

// State variables
let currentPage = 1;
let totalPages = 1;

// Event Listeners
document.addEventListener('DOMContentLoaded', initialize);
newQuoteBtn.addEventListener('click', getRandomQuote);
tagSelect.addEventListener('change', getRandomQuote);
lengthSelect.addEventListener('change', getRandomQuote);
prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    getQuotesList();
  }
});
nextPageBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    getQuotesList();
  }
});

// Initialize the app
async function initialize() {
  await loadTags();
  getRandomQuote();
  getQuotesList();
}

// Load tags for the filter dropdown
async function loadTags() {
  try {
    const response = await fetch(\`\${API_BASE_URL}/tags\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const tags = await response.json();
    
    // Populate tag select dropdown
    tags.forEach(tag => {
      const option = document.createElement('option');
      option.value = tag.name;
      option.textContent = tag.name;
      tagSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading tags:', error);
  }
}

// Get a random quote
async function getRandomQuote() {
  // Show loading state
  quoteText.textContent = 'Loading...';
  quoteAuthor.textContent = '';
  quoteTags.innerHTML = '';
  
  try {
    // Build URL with filters
    let url = \`\${API_BASE_URL}/random\`;
    const params = new URLSearchParams();
    
    // Add tag filter if selected
    if (tagSelect.value) {
      params.append('tags', tagSelect.value);
    }
    
    // Add length filter if selected
    if (lengthSelect.value) {
      switch (lengthSelect.value) {
        case 'short':
          params.append('maxLength', 50);
          break;
        case 'medium':
          params.append('minLength', 50);
          params.append('maxLength', 100);
          break;
        case 'long':
          params.append('minLength', 100);
          break;
      }
    }
    
    // Add params to URL if any exist
    if (params.toString()) {
      url += \`?\${params.toString()}\`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const quote = await response.json();
    displayQuote(quote);
  } catch (error) {
    console.error('Error fetching random quote:', error);
    quoteText.textContent = 'Failed to load quote. Please try again.';
  }
}

// Display a quote
function displayQuote(quote) {
  quoteText.textContent = quote.content;
  quoteAuthor.textContent = \`— \${quote.author}\`;
  
  // Display tags
  quoteTags.innerHTML = '';
  if (quote.tags && quote.tags.length > 0) {
    quote.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'tag';
      tagSpan.textContent = tag;
      quoteTags.appendChild(tagSpan);
    });
  }
}

// Get a list of quotes
async function getQuotesList() {
  // Show loading state
  quotesList.innerHTML = '<p class="loading">Loading quotes...</p>';
  
  try {
    const response = await fetch(\`\${API_BASE_URL}/quotes?page=\${currentPage}&limit=10\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayQuotesList(data);
    
    // Update pagination
    totalPages = data.totalPages;
    pageInfo.textContent = \`Page \${currentPage} of \${totalPages}\`;
    prevPageBtn.disabled = currentPage <= 1;
    nextPageBtn.disabled = currentPage >= totalPages;
  } catch (error) {
    console.error('Error fetching quotes list:', error);
    quotesList.innerHTML = '<p class="error">Failed to load quotes. Please try again.</p>';
  }
}

// Display a list of quotes
function displayQuotesList(data) {
  quotesList.innerHTML = '';
  
  if (!data.results || data.results.length === 0) {
    quotesList.innerHTML = '<p class="no-results">No quotes found.</p>';
    return;
  }
  
  data.results.forEach(quote => {
    const quoteItem = document.createElement('div');
    quoteItem.className = 'quote-item';
    
    quoteItem.innerHTML = \`
      <blockquote>\${quote.content}</blockquote>
      <p class="author">— \${quote.author}</p>
      <div class="tags">
        \${quote.tags.map(tag => \`<span class="tag">\${tag}</span>\`).join('')}
      </div>
    \`;
    
    quotesList.appendChild(quoteItem);
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

.quote-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.quote-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
}

blockquote {
  font-size: 24px;
  line-height: 1.5;
  margin: 0 0 20px 0;
  font-style: italic;
  color: #333;
}

#quote-author {
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;
}

#quote-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
}

.tag {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

#new-quote-btn {
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#new-quote-btn:hover {
  background-color: #1b5e20;
}

.filter-container {
  margin-bottom: 40px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 15px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 200px;
}

.filter-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.filter-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.browse-container {
  margin-top: 40px;
}

#quotes-list {
  margin: 20px 0;
}

.quote-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quote-item blockquote {
  font-size: 18px;
  margin-bottom: 10px;
}

.quote-item .author {
  font-size: 16px;
  color: #555;
  text-align: right;
  margin-bottom: 10px;
}

.quote-item .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-end;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.pagination button {
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:hover:not(:disabled) {
  background-color: #1b5e20;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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
                    The Quotable API is a free, public API that doesn't require authentication. It provides random
                    quotes, a searchable database of quotes, and filtering by tags, authors, and length.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your quotes application:</p>
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
                    Open your HTML file in a browser to test your quotes application. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Get a random quote by clicking the "New Quote" button</li>
                    <li>Filter quotes by tag</li>
                    <li>Filter quotes by length</li>
                    <li>Browse through a paginated list of quotes</li>
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
                      <strong>400 Bad Request</strong>: Invalid query parameters
                    </li>
                    <li>
                      <strong>Network Errors</strong>: Connection issues or API downtime
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
                  <p>
                    The Quotable API doesn't explicitly state rate limits, but as with any public API, it's good
                    practice to implement reasonable request limits in your application.
                  </p>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      To be a good API citizen, avoid making excessive requests in short periods. Consider implementing
                      caching for frequently accessed data like tags and authors.
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
                        href="https://github.com/lukePeavey/quotable"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official Quotable API Documentation"
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
