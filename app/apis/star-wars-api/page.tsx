import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"
import BlessCliIntegration from "@/components/bless-cli-integration"

export default function StarWarsApiPage() {
  const api = {
    id: "star-wars-api",
    name: "SWAPI - The Star Wars API",
    description: "All the Star Wars data you've ever wanted",
    category: "Entertainment",
    difficulty: "Beginner",
    baseUrl: "https://swapi.dev/api",
    authType: "None",
    endpoints: [
      {
        name: "Get People",
        path: "/people/{id}",
        method: "GET",
        description: "Get a specific person",
        parameters: [
          {
            name: "id",
            type: "number",
            required: true,
            description: "The ID of the person to fetch",
          },
        ],
      },
      {
        name: "Get Films",
        path: "/films/{id}",
        method: "GET",
        description: "Get a specific film",
        parameters: [
          {
            name: "id",
            type: "number",
            required: true,
            description: "The ID of the film to fetch",
          },
        ],
      },
      {
        name: "Get Planets",
        path: "/planets/{id}",
        method: "GET",
        description: "Get a specific planet",
        parameters: [
          {
            name: "id",
            type: "number",
            required: true,
            description: "The ID of the planet to fetch",
          },
        ],
      },
      {
        name: "Get Species",
        path: "/species/{id}",
        method: "GET",
        description: "Get a specific species",
        parameters: [
          {
            name: "id",
            type: "number",
            required: true,
            description: "The ID of the species to fetch",
          },
        ],
      },
      {
        name: "Get Vehicles",
        path: "/vehicles/{id}",
        method: "GET",
        description: "Get a specific vehicle",
        parameters: [
          {
            name: "id",
            type: "number",
            required: true,
            description: "The ID of the vehicle to fetch",
          },
        ],
      },
      {
        name: "Get Starships",
        path: "/starships/{id}",
        method: "GET",
        description: "Get a specific starship",
        parameters: [
          {
            name: "id",
            type: "number",
            required: true,
            description: "The ID of the starship to fetch",
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
  <title>Star Wars Explorer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>Star Wars Explorer</h1>
    </header>
    
    <div class="category-selector">
      <button class="category-btn active" data-category="people">People</button>
      <button class="category-btn" data-category="films">Films</button>
      <button class="category-btn" data-category="planets">Planets</button>
      <button class="category-btn" data-category="species">Species</button>
      <button class="category-btn" data-category="vehicles">Vehicles</button>
      <button class="category-btn" data-category="starships">Starships</button>
    </div>
    
    <div class="search-container">
      <input type="number" id="id-input" min="1" placeholder="Enter ID">
      <button id="search-btn">Search</button>
    </div>
    
    <div class="results-container">
      <div id="results-card">
        <p class="initial-message">Select a category and enter an ID to explore Star Wars data</p>
      </div>
    </div>
    
    <div class="pagination">
      <button id="prev-btn" disabled>Previous</button>
      <span id="page-info">Page 1</span>
      <button id="next-btn">Next</button>
    </div>
    
    <div id="list-container" class="list-container"></div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`

  const javascriptCode = `// API Base URL
const API_BASE_URL = 'https://swapi.dev/api';

// DOM Elements
const categoryButtons = document.querySelectorAll('.category-btn');
const idInput = document.getElementById('id-input');
const searchBtn = document.getElementById('search-btn');
const resultsCard = document.getElementById('results-card');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');
const listContainer = document.getElementById('list-container');

// State
let currentCategory = 'people';
let currentPage = 1;
let totalPages = 1;

// Event Listeners
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Update current category
    currentCategory = button.dataset.category;
    
    // Reset pagination
    currentPage = 1;
    
    // Load list for the selected category
    loadList();
  });
});

searchBtn.addEventListener('click', searchById);
idInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchById();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadList();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    loadList();
  }
});

// Initialize
loadList();

// Load list of items for the current category
async function loadList() {
  // Show loading state
  listContainer.innerHTML = '<p class="loading">Loading data...</p>';
  
  try {
    const response = await fetch(\`\${API_BASE_URL}/\${currentCategory}/?page=\${currentPage}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Update pagination
    totalPages = Math.ceil(data.count / 10);
    pageInfo.textContent = \`Page \${currentPage} of \${totalPages}\`;
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
    
    // Display list
    displayList(data.results);
  } catch (error) {
    console.error('Error loading list:', error);
    listContainer.innerHTML = '<p class="error">Failed to load data. Please try again.</p>';
  }
}

// Display list of items
function displayList(items) {
  if (!items || items.length === 0) {
    listContainer.innerHTML = '<p class="no-results">No items found</p>';
    return;
  }
  
  // Create list HTML
  const listHTML = items.map((item, index) => {
    // Extract ID from URL
    const urlParts = item.url.split('/');
    const id = urlParts[urlParts.length - 2];
    
    // Determine primary display field based on category
    let primaryField = item.name || item.title;
    
    return \`
      <div class="list-item" data-id="\${id}">
        <span class="item-number">\${id}</span>
        <span class="item-name">\${primaryField}</span>
        <button class="view-btn" data-id="\${id}">View Details</button>
      </div>
    \`;
  }).join('');
  
  listContainer.innerHTML = listHTML;
  
  // Add event listeners to view buttons
  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', () => {
      idInput.value = button.dataset.id;
      searchById();
    });
  });
}

// Search for an item by ID
async function searchById() {
  const id = idInput.value.trim();
  
  if (!id) {
    showError('Please enter an ID');
    return;
  }
  
  // Show loading state
  resultsCard.innerHTML = '<p class="loading">Loading data...</p>';
  
  try {
    const response = await fetch(\`\${API_BASE_URL}/\${currentCategory}/\${id}/\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayDetails(data);
  } catch (error) {
    console.error('Error fetching item:', error);
    showError(\`Couldn't find \${currentCategory} with ID \${id}\`);
  }
}

// Display item details
function displayDetails(item) {
  // Determine which properties to display based on category
  let detailsHTML = '';
  
  switch (currentCategory) {
    case 'people':
      detailsHTML = \`
        <h2>\${item.name}</h2>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Height:</span>
            <span class="detail-value">\${item.height} cm</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Mass:</span>
            <span class="detail-value">\${item.mass} kg</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Hair Color:</span>
            <span class="detail-value">\${item.hair_color}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Skin Color:</span>
            <span class="detail-value">\${item.skin_color}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Eye Color:</span>
            <span class="detail-value">\${item.eye_color}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Birth Year:</span>
            <span class="detail-value">\${item.birth_year}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Gender:</span>
            <span class="detail-value">\${item.gender}</span>
          </div>
        </div>
      \`;
      break;
    
    case 'films':
      detailsHTML = \`
        <h2>\${item.title}</h2>
        <div class="film-info">
          <p class="episode">Episode \${item.episode_id}</p>
          <p class="director">Directed by \${item.director}</p>
          <p class="release-date">Released: \${formatDate(item.release_date)}</p>
        </div>
        <div class="opening-crawl">
          <h3>Opening Crawl</h3>
          <p>\${item.opening_crawl}</p>
        </div>
      \`;
      break;
    
    case 'planets':
      detailsHTML = \`
        <h2>\${item.name}</h2>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Rotation Period:</span>
            <span class="detail-value">\${item.rotation_period} hours</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Orbital Period:</span>
            <span class="detail-value">\${item.orbital_period} days</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Diameter:</span>
            <span class="detail-value">\${item.diameter} km</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Climate:</span>
            <span class="detail-value">\${item.climate}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Gravity:</span>
            <span class="detail-value">\${item.gravity}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Terrain:</span>
            <span class="detail-value">\${item.terrain}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Population:</span>
            <span class="detail-value">\${formatNumber(item.population)}</span>
          </div>
        </div>
      \`;
      break;
    
    // Add cases for other categories as needed
    default:
      // Generic display for other categories
      detailsHTML = \`<h2>\${item.name || item.title}</h2>\`;
      
      // Convert item to array of key-value pairs
      const details = Object.entries(item).filter(([key]) => 
        !['created', 'edited', 'url'].includes(key) && 
        !Array.isArray(item[key])
      );
      
      detailsHTML += \`
        <div class="details-grid">
          \${details.map(([key, value]) => \`
            <div class="detail-item">
              <span class="detail-label">\${formatKey(key)}:</span>
              <span class="detail-value">\${value}</span>
            </div>
          \`).join('')}
        </div>
      \`;
  }
  
  resultsCard.innerHTML = detailsHTML;
}

// Show error message
function showError(message) {
  resultsCard.innerHTML = \`<p class="error">\${message}</p>\`;
}

// Helper function to format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Helper function to format numbers
function formatNumber(numString) {
  if (numString === 'unknown') return 'Unknown';
  
  const num = parseInt(numString, 10);
  if (isNaN(num)) return numString;
  
  return num.toLocaleString();
}

// Helper function to format keys
function formatKey(key) {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}`

  const cssCode = `.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  color: #FFE81F;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.category-selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.category-btn {
  background-color: #333;
  color: #FFE81F;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-btn:hover {
  background-color: #444;
}

.category-btn.active {
  background-color: #FFE81F;
  color: #000;
}

.search-container {
  display: flex;
  margin-bottom: 20px;
}

#id-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

#search-btn {
  background-color: #FFE81F;
  color: #000;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

#search-btn:hover {
  background-color: #FFD700;
}

.results-container {
  margin-bottom: 30px;
}

#results-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-height: 200px;
}

.initial-message {
  text-align: center;
  color: #777;
  padding: 40px 0;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

.film-info {
  margin-bottom: 20px;
}

.episode {
  font-weight: bold;
  color: #FFE81F;
}

.opening-crawl {
  background-color: #000;
  color: #FFE81F;
  padding: 20px;
  border-radius: 8px;
  font-style: italic;
  line-height: 1.6;
}

.opening-crawl h3 {
  text-align: center;
  margin-bottom: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.pagination button {
  background-color: #333;
  color: #FFE81F;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:hover:not(:disabled) {
  background-color: #444;
}

.pagination button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 10px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-number {
  background-color: #FFE81F;
  color: #000;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
}

.item-name {
  flex: 1;
  font-weight: bold;
}

.view-btn {
  background-color: #333;
  color: #FFE81F;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.view-btn:hover {
  background-color: #444;
}

.loading {
  text-align: center;
  color: #777;
  padding: 20px;
}

.error {
  color: #d32f2f;
  text-align: center;
  padding: 20px;
}

.no-results {
  text-align: center;
  color: #777;
  padding: 20px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .category-selector {
    flex-direction: column;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .list-item {
    flex-wrap: wrap;
  }
  
  .item-number {
    margin-bottom: 10px;
  }
  
  .view-btn {
    margin-top: 10px;
    width: 100%;
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
                  <h3 className="text-xl font-semibold mb-2">Step 1: Understanding the API</h3>
                  <p className="mb-4">
                    The Star Wars API (SWAPI) is a free, RESTful API that provides comprehensive data about the Star
                    Wars universe. It doesn't require authentication and offers information about people, films,
                    planets, species, vehicles, and starships.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your Star Wars Explorer application:</p>
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
                    Open your HTML file in a browser to test your Star Wars Explorer application. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Browse different categories of Star Wars data</li>
                    <li>Search for specific items by ID</li>
                    <li>View detailed information about each item</li>
                    <li>Navigate through paginated lists of items</li>
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
                      <strong>404 Not Found</strong>: Invalid ID or resource not found
                    </li>
                    <li>
                      <strong>Network Errors</strong>: Connection issues or API downtime
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Pagination</h3>
                  <p>
                    The SWAPI uses pagination for listing resources. Each page contains up to 10 items, and you need to
                    navigate through pages to see all available data.
                  </p>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      When implementing pagination, always check the total number of pages and disable navigation
                      buttons appropriately to prevent users from attempting to access non-existent pages.
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
                        href="https://swapi.dev/documentation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official SWAPI Documentation"
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
