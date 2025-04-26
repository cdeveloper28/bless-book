import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"
import BlessCliIntegration from "@/components/bless-cli-integration"

export default function NewsApiPage() {
  const api = {
    id: "news-api",
    name: "News API",
    description: "Search for news articles and headlines from various sources worldwide",
    category: "News",
    difficulty: "Beginner",
    baseUrl: "https://newsapi.org/v2",
    authType: "API Key",
    endpoints: [
      {
        name: "Top Headlines",
        path: "/top-headlines",
        method: "GET",
        description: "Get top headlines by country, category, or source",
        parameters: [
          {
            name: "apiKey",
            type: "string",
            required: true,
            description: "Your API key",
          },
          {
            name: "country",
            type: "string",
            required: false,
            description: "2-letter ISO 3166-1 country code (e.g., us, gb, de)",
          },
          {
            name: "category",
            type: "string",
            required: false,
            description: "Category (business, entertainment, general, health, science, sports, technology)",
          },
          {
            name: "sources",
            type: "string",
            required: false,
            description: "Comma-separated string of news source IDs (cannot be mixed with country or category)",
          },
          {
            name: "q",
            type: "string",
            required: false,
            description: "Keywords or phrases to search for",
          },
          {
            name: "pageSize",
            type: "number",
            required: false,
            description: "Number of results per page (1-100, default: 20)",
          },
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number (default: 1)",
          },
        ],
      },
      {
        name: "Everything",
        path: "/everything",
        method: "GET",
        description: "Search through all articles",
        parameters: [
          {
            name: "apiKey",
            type: "string",
            required: true,
            description: "Your API key",
          },
          {
            name: "q",
            type: "string",
            required: false,
            description: "Keywords or phrases to search for",
          },
          {
            name: "sources",
            type: "string",
            required: false,
            description: "Comma-separated string of news source IDs",
          },
          {
            name: "domains",
            type: "string",
            required: false,
            description: "Comma-separated string of domains to restrict the search to",
          },
          {
            name: "from",
            type: "string",
            required: false,
            description: "Date and optional time in ISO 8601 format (e.g., 2023-12-01 or 2023-12-01T12:00:00)",
          },
          {
            name: "to",
            type: "string",
            required: false,
            description: "Date and optional time in ISO 8601 format",
          },
          {
            name: "language",
            type: "string",
            required: false,
            description: "2-letter ISO-639-1 language code (e.g., en, de, fr)",
          },
          {
            name: "sortBy",
            type: "string",
            required: false,
            description: "Sort by: relevancy, popularity, publishedAt (default: publishedAt)",
          },
          {
            name: "pageSize",
            type: "number",
            required: false,
            description: "Number of results per page (1-100, default: 20)",
          },
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number (default: 1)",
          },
        ],
      },
      {
        name: "Sources",
        path: "/sources",
        method: "GET",
        description: "Get all news sources available",
        parameters: [
          {
            name: "apiKey",
            type: "string",
            required: true,
            description: "Your API key",
          },
          {
            name: "category",
            type: "string",
            required: false,
            description: "Category (business, entertainment, general, health, science, sports, technology)",
          },
          {
            name: "language",
            type: "string",
            required: false,
            description: "2-letter ISO-639-1 language code (e.g., en, de, fr)",
          },
          {
            name: "country",
            type: "string",
            required: false,
            description: "2-letter ISO 3166-1 country code (e.g., us, gb, de)",
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
  <title>News Explorer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>News Explorer</h1>
      <p>Stay updated with the latest news from around the world</p>
    </header>
    
    <div class="search-container">
      <input type="text" id="search-input" placeholder="Search for news...">
      <button id="search-btn">Search</button>
    </div>
    
    <div class="filters">
      <div class="filter-group">
        <label for="category-select">Category:</label>
        <select id="category-select">
          <option value="">All Categories</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="country-select">Country:</label>
        <select id="country-select">
          <option value="">All Countries</option>
          <option value="us">United States</option>
          <option value="gb">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="in">India</option>
          <option value="jp">Japan</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="sort-select">Sort By:</label>
        <select id="sort-select">
          <option value="publishedAt">Newest First</option>
          <option value="relevancy">Relevancy</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
    </div>
    
    <div class="tabs">
      <button class="tab-btn active" data-tab="headlines">Top Headlines</button>
      <button class="tab-btn" data-tab="everything">All News</button>
      <button class="tab-btn" data-tab="sources">News Sources</button>
    </div>
    
    <div id="news-container" class="news-container">
      <!-- News articles will be displayed here -->
      <div class="loading">Loading news...</div>
    </div>
    
    <div class="pagination" id="pagination">
      <!-- Pagination controls will be displayed here -->
    </div>
  </div>
  
  <script src="news.js"></script>
</body>
</html>`

  const javascriptCode = `// Replace with your actual API key
const API_KEY = 'your_api_key_here';
const API_BASE_URL = 'https://newsapi.org/v2';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categorySelect = document.getElementById('category-select');
const countrySelect = document.getElementById('country-select');
const sortSelect = document.getElementById('sort-select');
const tabButtons = document.querySelectorAll('.tab-btn');
const newsContainer = document.getElementById('news-container');
const pagination = document.getElementById('pagination');

// State variables
let currentTab = 'headlines';
let currentPage = 1;
let totalResults = 0;
let pageSize = 10;
let searchQuery = '';

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  loadTopHeadlines();
  
  // Tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update current tab
      currentTab = button.dataset.tab;
      currentPage = 1;
      
      // Load appropriate content
      switch (currentTab) {
        case 'headlines':
          loadTopHeadlines();
          break;
        case 'everything':
          loadEverything();
          break;
        case 'sources':
          loadSources();
          break;
      }
    });
  });
  
  // Search button
  searchBtn.addEventListener('click', () => {
    searchQuery = searchInput.value.trim();
    currentPage = 1;
    
    if (currentTab === 'headlines') {
      loadTopHeadlines();
    } else if (currentTab === 'everything') {
      loadEverything();
    }
  });
  
  // Search on Enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
  
  // Filters
  categorySelect.addEventListener('change', () => {
    currentPage = 1;
    if (currentTab === 'headlines') {
      loadTopHeadlines();
    } else if (currentTab === 'sources') {
      loadSources();
    }
  });
  
  countrySelect.addEventListener('change', () => {
    currentPage = 1;
    if (currentTab === 'headlines') {
      loadTopHeadlines();
    } else if (currentTab === 'sources') {
      loadSources();
    }
  });
  
  sortSelect.addEventListener('change', () => {
    currentPage = 1;
    if (currentTab === 'everything') {
      loadEverything();
    }
  });
});

// Load Top Headlines
async function loadTopHeadlines() {
  showLoading();
  
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      page: currentPage,
      pageSize: pageSize
    });
    
    // Add optional parameters
    if (searchQuery) {
      params.append('q', searchQuery);
    }
    
    if (categorySelect.value) {
      params.append('category', categorySelect.value);
    }
    
    if (countrySelect.value) {
      params.append('country', countrySelect.value);
    }
    
    const response = await fetch(\`\${API_BASE_URL}/top-headlines?\${params.toString()}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message || 'Failed to fetch news');
    }
    
    displayArticles(data.articles);
    totalResults = data.totalResults;
    displayPagination();
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    showError(error.message);
  }
}

// Load Everything (All News)
async function loadEverything() {
  showLoading();
  
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      page: currentPage,
      pageSize: pageSize,
      sortBy: sortSelect.value
    });
    
    // Add search query (required for /everything endpoint)
    if (searchQuery) {
      params.append('q', searchQuery);
    } else {
      // Default search if none provided
      params.append('q', 'world');
    }
    
    const response = await fetch(\`\${API_BASE_URL}/everything?\${params.toString()}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message || 'Failed to fetch news');
    }
    
    displayArticles(data.articles);
    totalResults = data.totalResults;
    displayPagination();
  } catch (error) {
    console.error('Error fetching all news:', error);
    showError(error.message);
  }
}

// Load News Sources
async function loadSources() {
  showLoading();
  
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY
    });
    
    // Add optional parameters
    if (categorySelect.value) {
      params.append('category', categorySelect.value);
    }
    
    if (countrySelect.value) {
      params.append('country', countrySelect.value);
    }
    
    const response = await fetch(\`\${API_BASE_URL}/sources?\${params.toString()}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message || 'Failed to fetch sources');
    }
    
    displaySources(data.sources);
    // No pagination for sources
    pagination.innerHTML = '';
  } catch (error) {
    console.error('Error fetching sources:', error);
    showError(error.message);
  }
}

// Display Articles
function displayArticles(articles) {
  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = '<div class="no-results">No articles found. Try different search terms or filters.</div>';
    return;
  }
  
  newsContainer.innerHTML = '';
  
  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.className = 'article';
    
    // Format date
    const publishedDate = new Date(article.publishedAt);
    const formattedDate = publishedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    articleElement.innerHTML = \`
      <div class="article-image">
        \${article.urlToImage ? \`<img src="\${article.urlToImage}" alt="\${article.title}" onerror="this.src='placeholder.jpg';">\` : '<div class="no-image">No Image</div>'}
      </div>
      <div class="article-content">
        <h2 class="article-title">
          <a href="\${article.url}" target="_blank" rel="noopener noreferrer">\${article.title}</a>
        </h2>
        <div class="article-meta">
          <span class="article-source">\${article.source.name}</span>
          <span class="article-date">\${formattedDate}</span>
        </div>
        <p class="article-description">\${article.description || 'No description available'}</p>
        <a href="\${article.url}" target="_blank" rel="noopener noreferrer" class="read-more">Read Full Article</a>
      </div>
    \`;
    
    newsContainer.appendChild(articleElement);
  });
}

// Display Sources
function displaySources(sources) {
  if (!sources || sources.length === 0) {
    newsContainer.innerHTML = '<div class="no-results">No sources found. Try different filters.</div>';
    return;
  }
  
  newsContainer.innerHTML = '';
  
  const sourcesGrid = document.createElement('div');
  sourcesGrid.className = 'sources-grid';
  
  sources.forEach(source => {
    const sourceElement = document.createElement('div');
    sourceElement.className = 'source-card';
    
    sourceElement.innerHTML = \`
      <h2 class="source-name">\${source.name}</h2>
      <div class="source-details">
        <span class="source-category">\${source.category.toUpperCase()}</span>
        <span class="source-country">\${source.country.toUpperCase()}</span>
        <span class="source-language">\${source.language.toUpperCase()}</span>
      </div>
      <p class="source-description">\${source.description}</p>
      <a href="\${source.url}" target="_blank" rel="noopener noreferrer" class="source-link">Visit Website</a>
    \`;
    
    sourcesGrid.appendChild(sourceElement);
  });
  
  newsContainer.appendChild(sourcesGrid);
}

// Display Pagination
function displayPagination() {
  const totalPages = Math.ceil(totalResults / pageSize);
  
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }
  
  let paginationHTML = '<div class="pagination-controls">';
  
  // Previous button
  paginationHTML += \`
    <button 
      class="pagination-btn \${currentPage === 1 ? 'disabled' : ''}" 
      \${currentPage === 1 ? 'disabled' : ''}
      onclick="changePage(\${currentPage - 1})"
    >
      Previous
    </button>
  \`;
  
  // Page numbers
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  
  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += \`
      <button 
        class="pagination-btn page-number \${i === currentPage ? 'active' : ''}"
        onclick="changePage(\${i})"
      >
        \${i}
      </button>
    \`;
  }
  
  // Next button
  paginationHTML += \`
    <button 
      class="pagination-btn \${currentPage === totalPages ? 'disabled' : ''}" 
      \${currentPage === totalPages ? 'disabled' : ''}
      onclick="changePage(\${currentPage + 1})"
    >
      Next
    </button>
  \`;
  
  paginationHTML += '</div>';
  pagination.innerHTML = paginationHTML;
}

// Change Page
function changePage(page) {
  currentPage = page;
  
  switch (currentTab) {
    case 'headlines':
      loadTopHeadlines();
      break;
    case 'everything':
      loadEverything();
      break;
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show Loading State
function showLoading() {
  newsContainer.innerHTML = '<div class="loading">Loading...</div>';
}

// Show Error Message
function showError(message) {
  newsContainer.innerHTML = \`<div class="error">\${message}</div>\`;
}

// Make changePage function available globally for pagination buttons
window.changePage = changePage;`

  const cssCode = `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  margin-bottom: 10px;
  color: #333;
}

.search-container {
  display: flex;
  margin-bottom: 20px;
}

#search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

#search-btn {
  padding: 10px 20px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
}

#search-btn:hover {
  background-color: #1976d2;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 150px;
  flex: 1;
}

.filter-group label {
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
}

.filter-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.tab-btn {
  padding: 10px 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  border-bottom: 3px solid transparent;
}

.tab-btn:hover {
  color: #1e88e5;
}

.tab-btn.active {
  color: #1e88e5;
  border-bottom-color: #1e88e5;
}

.news-container {
  margin-bottom: 30px;
}

.article {
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 30px;
}

.article-image {
  width: 250px;
  height: 150px;
  margin-right: 20px;
  flex-shrink: 0;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.no-image {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  border-radius: 4px;
}

.article-content {
  flex: 1;
}

.article-title {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 20px;
}

.article-title a {
  color: #333;
  text-decoration: none;
}

.article-title a:hover {
  color: #1e88e5;
}

.article-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.article-description {
  margin-bottom: 15px;
  color: #555;
  line-height: 1.5;
}

.read-more {
  display: inline-block;
  padding: 8px 16px;
  background-color: #f5f5f5;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
}

.read-more:hover {
  background-color: #e0e0e0;
}

.sources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.source-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.source-name {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}

.source-details {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.source-category,
.source-country,
.source-language {
  font-size: 12px;
  padding: 3px 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  color: #555;
}

.source-description {
  margin-bottom: 15px;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

.source-link {
  display: inline-block;
  padding: 8px 16px;
  background-color: #1e88e5;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
}

.source-link:hover {
  background-color: #1976d2;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.pagination-controls {
  display: flex;
  gap: 5px;
}

.pagination-btn {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination-btn:hover:not(.disabled):not(.active) {
  background-color: #f5f5f5;
}

.pagination-btn.active {
  background-color: #1e88e5;
  color: white;
  border-color: #1e88e5;
}

.pagination-btn.disabled {
  color: #ccc;
  cursor: not-allowed;
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
  color: #e53935;
  background-color: #ffebee;
  border-radius: 4px;
  margin: 20px 0;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 4px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .article {
    flex-direction: column;
  }
  
  .article-image {
    width: 100%;
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .tabs {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 5px;
  }
  
  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
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
                  <p className="mb-4">To use the News API, you need to sign up for an account and get an API key.</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Visit{" "}
                      <a
                        href="https://newsapi.org/register"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        News API Registration
                      </a>
                    </li>
                    <li>Create an account with your email</li>
                    <li>Verify your email address</li>
                    <li>Your API key will be displayed on your account dashboard</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your news application:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>index.html - The HTML structure</li>
                    <li>styles.css - CSS for styling</li>
                    <li>news.js - JavaScript for API integration</li>
                    <li>placeholder.jpg - A fallback image for articles without images</li>
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
                    Open your HTML file in a browser to test your news application. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>View top headlines from various countries and categories</li>
                    <li>Search for news articles by keywords</li>
                    <li>Browse news sources</li>
                    <li>Filter and sort results</li>
                    <li>Navigate through paginated results</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bless Network CLI Integration Section */}
            <BlessCliIntegration
              apiName={api.name}
              apiBaseUrl={api.baseUrl}
              apiEndpoint="/top-headlines?country=us"
              authType="apiKey"
              authParam="query 'apiKey=YOUR_API_KEY_HERE'"
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
                      <strong>429 Too Many Requests</strong>: Rate limit exceeded
                    </li>
                    <li>
                      <strong>400 Bad Request</strong>: Invalid parameters
                    </li>
                    <li>
                      <strong>426 Upgrade Required</strong>: Free plan not supported for this request
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
                  <p>The free tier of News API allows:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>100 requests per day</li>
                    <li>Access to the /top-headlines endpoint only</li>
                    <li>No access to /everything endpoint (requires paid plan)</li>
                    <li>Results limited to articles published in the last month</li>
                  </ul>
                  <Alert className="mt-4">
                    <AlertTitle>Important Note</AlertTitle>
                    <AlertDescription>
                      The free plan is limited to development environments only. For production use, you'll need to
                      upgrade to a paid plan. Also, the free plan doesn't allow you to use the API on a public website.
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
                        href="https://newsapi.org/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official News API Documentation"
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
                      href="https://bless.network/templates/news-api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      News API Template
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
