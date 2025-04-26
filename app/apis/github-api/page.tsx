import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "@/components/ui/code-block"
import { BlessCliIntegration } from "@/components/bless-cli-integration"

export default function GitHubApiPage() {
  const api = {
    id: "github-api",
    name: "GitHub API",
    description: "Access GitHub repositories, users, issues, and more",
    category: "Development",
    difficulty: "Intermediate",
    baseUrl: "https://api.github.com",
    authType: "OAuth or Personal Access Token",
    endpoints: [
      {
        name: "User Profile",
        path: "/users/{username}",
        method: "GET",
        description: "Get public information about a GitHub user",
        parameters: [
          {
            name: "username",
            type: "string",
            required: true,
            description: "The GitHub username",
          },
        ],
      },
      {
        name: "User Repositories",
        path: "/users/{username}/repos",
        method: "GET",
        description: "List public repositories for a user",
        parameters: [
          {
            name: "username",
            type: "string",
            required: true,
            description: "The GitHub username",
          },
          {
            name: "sort",
            type: "string",
            required: false,
            description: "Sort by: created, updated, pushed, full_name (default: full_name)",
          },
          {
            name: "direction",
            type: "string",
            required: false,
            description: "Sort direction: asc or desc (default: asc)",
          },
          {
            name: "per_page",
            type: "number",
            required: false,
            description: "Results per page (max 100, default: 30)",
          },
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number of results",
          },
        ],
      },
      {
        name: "Repository Details",
        path: "/repos/{owner}/{repo}",
        method: "GET",
        description: "Get details about a specific repository",
        parameters: [
          {
            name: "owner",
            type: "string",
            required: true,
            description: "The repository owner (username or organization)",
          },
          {
            name: "repo",
            type: "string",
            required: true,
            description: "The repository name",
          },
        ],
      },
      {
        name: "Repository Issues",
        path: "/repos/{owner}/{repo}/issues",
        method: "GET",
        description: "List issues for a repository",
        parameters: [
          {
            name: "owner",
            type: "string",
            required: true,
            description: "The repository owner (username or organization)",
          },
          {
            name: "repo",
            type: "string",
            required: true,
            description: "The repository name",
          },
          {
            name: "state",
            type: "string",
            required: false,
            description: "Issue state: open, closed, all (default: open)",
          },
          {
            name: "sort",
            type: "string",
            required: false,
            description: "Sort by: created, updated, comments (default: created)",
          },
          {
            name: "direction",
            type: "string",
            required: false,
            description: "Sort direction: asc or desc (default: desc)",
          },
        ],
      },
      {
        name: "Search Repositories",
        path: "/search/repositories",
        method: "GET",
        description: "Search for repositories",
        parameters: [
          {
            name: "q",
            type: "string",
            required: true,
            description: "Search query",
          },
          {
            name: "sort",
            type: "string",
            required: false,
            description: "Sort by: stars, forks, updated (default: best match)",
          },
          {
            name: "order",
            type: "string",
            required: false,
            description: "Sort order: asc or desc (default: desc)",
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
  <title>GitHub Profile Explorer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>GitHub Profile Explorer</h1>
    
    <div class="search-container">
      <input type="text" id="username-input" placeholder="Enter GitHub username">
      <button id="search-btn">Search</button>
    </div>
    
    <div class="profile-container" id="profile-container">
      <!-- Profile data will be displayed here -->
    </div>
    
    <div class="repos-container">
      <h2>Repositories</h2>
      <div class="repo-filters">
        <select id="sort-select">
          <option value="full_name">Name (A-Z)</option>
          <option value="created">Newest</option>
          <option value="updated">Recently Updated</option>
          <option value="pushed">Recently Pushed</option>
        </select>
        <select id="direction-select">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div id="repos-list">
        <!-- Repositories will be displayed here -->
      </div>
      <div class="pagination" id="pagination">
        <!-- Pagination controls will be displayed here -->
      </div>
    </div>
  </div>
  
  <script src="github.js"></script>
</body>
</html>`

  const javascriptCode = `// GitHub API base URL
const API_BASE_URL = 'https://api.github.com';

// DOM Elements
const usernameInput = document.getElementById('username-input');
const searchBtn = document.getElementById('search-btn');
const profileContainer = document.getElementById('profile-container');
const reposList = document.getElementById('repos-list');
const sortSelect = document.getElementById('sort-select');
const directionSelect = document.getElementById('direction-select');
const pagination = document.getElementById('pagination');

// State variables
let currentUsername = '';
let currentPage = 1;
const perPage = 10;

// Event Listeners
searchBtn.addEventListener('click', searchUser);
usernameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchUser();
  }
});
sortSelect.addEventListener('change', () => fetchRepositories(currentUsername, 1));
directionSelect.addEventListener('change', () => fetchRepositories(currentUsername, 1));

// Search for a GitHub user
async function searchUser() {
  const username = usernameInput.value.trim();
  
  if (!username) {
    showError('Please enter a GitHub username');
    return;
  }
  
  currentUsername = username;
  currentPage = 1;
  
  // Show loading state
  profileContainer.innerHTML = '<div class="loading">Loading profile...</div>';
  reposList.innerHTML = '<div class="loading">Loading repositories...</div>';
  pagination.innerHTML = '';
  
  try {
    // Fetch user profile
    const userResponse = await fetch(\`\${API_BASE_URL}/users/\${username}\`);
    
    if (!userResponse.ok) {
      if (userResponse.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(\`HTTP error! Status: \${userResponse.status}\`);
    }
    
    const userData = await userResponse.json();
    displayUserProfile(userData);
    
    // Fetch repositories
    fetchRepositories(username, currentPage);
  } catch (error) {
    console.error('Error fetching user data:', error);
    profileContainer.innerHTML = \`<div class="error">\${error.message || 'Failed to load user data'}</div>\`;
    reposList.innerHTML = '';
    pagination.innerHTML = '';
  }
}

// Fetch repositories for a user
async function fetchRepositories(username, page) {
  if (!username) return;
  
  // Show loading state
  reposList.innerHTML = '<div class="loading">Loading repositories...</div>';
  pagination.innerHTML = '';
  
  try {
    const sort = sortSelect.value;
    const direction = directionSelect.value;
    
    const reposResponse = await fetch(
      \`\${API_BASE_URL}/users/\${username}/repos?sort=\${sort}&direction=\${direction}&per_page=\${perPage}&page=\${page}\`
    );
    
    if (!reposResponse.ok) {
      throw new Error(\`HTTP error! Status: \${reposResponse.status}\`);
    }
    
    const reposData = await reposResponse.json();
    
    // Get total count from Link header for pagination
    const linkHeader = reposResponse.headers.get('Link');
    const totalPages = parseLinkHeader(linkHeader);
    
    displayRepositories(reposData);
    displayPagination(page, totalPages);
    
    currentPage = page;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    reposList.innerHTML = \`<div class="error">\${error.message || 'Failed to load repositories'}</div>\`;
    pagination.innerHTML = '';
  }
}

// Display user profile
function displayUserProfile(user) {
  profileContainer.innerHTML = \`
    <div class="profile">
      <div class="profile-header">
        <img src="\${user.avatar_url}" alt="\${user.login}" class="avatar">
        <div class="profile-info">
          <h2>\${user.name || user.login}</h2>
          <p class="username">@\${user.login}</p>
          \${user.bio ? \`<p class="bio">\${user.bio}</p>\` : ''}
        </div>
      </div>
      <div class="profile-stats">
        <div class="stat">
          <span class="stat-value">\${user.public_repos}</span>
          <span class="stat-label">Repositories</span>
        </div>
        <div class="stat">
          <span class="stat-value">\${user.followers}</span>
          <span class="stat-label">Followers</span>
        </div>
        <div class="stat">
          <span class="stat-value">\${user.following}</span>
          <span class="stat-label">Following</span>
        </div>
      </div>
      <div class="profile-links">
        \${user.blog ? \`<a href="\${user.blog}" target="_blank" class="profile-link">Website</a>\` : ''}
        <a href="\${user.html_url}" target="_blank" class="profile-link">View on GitHub</a>
      </div>
    </div>
  \`;
}

// Display repositories
function displayRepositories(repos) {
  if (repos.length === 0) {
    reposList.innerHTML = '<div class="no-results">No repositories found</div>';
    return;
  }
  
  reposList.innerHTML = '';
  
  repos.forEach(repo => {
    const repoElement = document.createElement('div');
    repoElement.className = 'repo-card';
    
    repoElement.innerHTML = \`
      <h3 class="repo-name">
        <a href="\${repo.html_url}" target="_blank">\${repo.name}</a>
        \${repo.fork ? '<span class="fork-badge">Fork</span>' : ''}
      </h3>
      \${repo.description ? \`<p class="repo-description">\${repo.description}</p>\` : ''}
      <div class="repo-stats">
        <span class="repo-stat"><span class="star-icon">★</span> \${repo.stargazers_count}</span>
        <span class="repo-stat"><span class="fork-icon">⑂</span> \${repo.forks_count}</span>
        <span class="repo-language">\${repo.language || 'Unknown'}</span>
      </div>
      <div class="repo-meta">
        <span>Updated: \${new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    \`;
    
    reposList.appendChild(repoElement);
  });
}

// Display pagination controls
function displayPagination(currentPage, totalPages) {
  if (!totalPages || totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }
  
  let paginationHTML = '<div class="pagination-controls">';
  
  // Previous button
  paginationHTML += \`
    <button 
      class="pagination-btn \${currentPage === 1 ? 'disabled' : ''}" 
      \${currentPage === 1 ? 'disabled' : ''}
      onclick="fetchRepositories('\${currentUsername}', \${currentPage - 1})"
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
        onclick="fetchRepositories('\${currentUsername}', \${i})"
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
      onclick="fetchRepositories('\${currentUsername}', \${currentPage + 1})"
    >
      Next
    </button>
  \`;
  
  paginationHTML += '</div>';
  pagination.innerHTML = paginationHTML;
}

// Parse Link header to get total pages
function parseLinkHeader(header) {
  if (!header) return null;
  
  // Look for the last page in the Link header
  const matches = header.match(/page=(\\d+)>; rel="last"/);
  if (matches && matches[1]) {
    return parseInt(matches[1], 10);
  }
  
  return null;
}

// Show error message
function showError(message) {
  profileContainer.innerHTML = \`<div class="error">\${message}</div>\`;
  reposList.innerHTML = '';
  pagination.innerHTML = '';
}

// Make fetchRepositories available globally for pagination buttons
window.fetchRepositories = fetchRepositories;`

  const cssCode = `
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

h1, h2 {
  color: #24292e;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.search-container {
  display: flex;
  margin-bottom: 30px;
}

#username-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #e1e4e8;
  border-radius: 6px 0 0 6px;
  font-size: 16px;
}

#search-btn {
  padding: 10px 20px;
  background-color: #2ea44f;
  color: white;
  border: none;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  font-size: 16px;
}

#search-btn:hover {
  background-color: #2c974b;
}

.profile {
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 30px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  margin: 0 0 5px 0;
}

.username {
  color: #666;
  margin: 0 0 10px 0;
}

.bio {
  margin: 10px 0 0 0;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  text-align: center;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
}

.stat-label {
  color: #666;
}

.profile-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.profile-link {
  display: inline-block;
  padding: 8px 16px;
  background-color: #f1f1f1;
  color: #24292e;
  text-decoration: none;
  border-radius: 6px;
}

.profile-link:hover {
  background-color: #e1e4e8;
}

.repo-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

select {
  padding: 8px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  background-color: white;
}

.repo-card {
  background-color: white;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
}

.repo-name {
  margin-top: 0;
  margin-bottom: 10px;
}

.repo-name a {
  color: #0366d6;
  text-decoration: none;
}

.repo-name a:hover {
  text-decoration: underline;
}

.fork-badge {
  display: inline-block;
  padding: 2px 5px;
  font-size: 12px;
  font-weight: normal;
  color: #586069;
  background-color: #f1f8ff;
  border-radius: 3px;
  margin-left: 5px;
}

.repo-description {
  color: #586069;
  margin-bottom: 10px;
}

.repo-stats {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

.repo-stat {
  color: #586069;
  font-size: 14px;
}

.star-icon, .fork-icon {
  margin-right: 3px;
}

.repo-language {
  color: #586069;
  font-size: 14px;
}

.repo-meta {
  color: #586069;
  font-size: 12px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination-controls {
  display: flex;
  gap: 5px;
}

.pagination-btn {
  padding: 5px 10px;
  border: 1px solid #e1e4e8;
  background-color: white;
  cursor: pointer;
  border-radius: 3px;
}

.pagination-btn:hover:not(.disabled):not(.active) {
  background-color: #f6f8fa;
}

.pagination-btn.active {
  background-color: #0366d6;
  color: white;
  border-color: #0366d6;
}

.pagination-btn.disabled {
  color: #d1d5da;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #586069;
  font-style: italic;
}

.error {
  text-align: center;
  padding: 20px;
  color: #cb2431;
  background-color: #ffeef0;
  border: 1px solid #f97583;
  border-radius: 6px;
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #586069;
  background-color: #f6f8fa;
  border-radius: 6px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .avatar {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .profile-stats {
    flex-wrap: wrap;
  }
  
  .stat {
    flex-basis: 33%;
    margin-bottom: 15px;
  }
  
  .repo-filters {
    flex-direction: column;
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
                  <h3 className="text-xl font-semibold mb-2">Step 1: Authentication</h3>
                  <p className="mb-4">
                    The GitHub API allows limited access for unauthenticated requests, but for higher rate limits and
                    access to private data, you&apos;ll need to authenticate. There are two main methods:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      <strong>Personal Access Token (PAT)</strong>: For personal or testing use. Create one in your{" "}
                      <a
                        href="https://github.com/settings/tokens"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub settings
                      </a>
                      .
                    </li>
                    <li>
                      <strong>OAuth App</strong>: For production applications that need to access GitHub on behalf of
                      other users. Register an{" "}
                      <a
                        href="https://github.com/settings/applications/new"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        OAuth App
                      </a>
                      .
                    </li>
                  </ol>
                  <Alert className="mt-4">
                    <AlertTitle>Security Note</AlertTitle>
                    <AlertDescription>
                      Never expose your tokens in client-side code. For production applications, always use a server to
                      proxy requests to the GitHub API.
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your GitHub profile explorer:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>index.html - The HTML structure</li>
                    <li>styles.css - CSS for styling</li>
                    <li>github.js - JavaScript for API integration</li>
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
                    Open your HTML file in a browser to test your GitHub profile explorer. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Search for GitHub users by username</li>
                    <li>View user profile information including avatar, bio, and stats</li>
                    <li>Browse the user&apos;s repositories with sorting options</li>
                    <li>Navigate through paginated repository results</li>
                    <li>Click through to view profiles and repositories on GitHub</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bless Network CLI Integration Section */}
            <BlessCliIntegration
              apiName={api.name}
              apiBaseUrl={api.baseUrl}
              apiEndpoint="/users/octocat"
              authType="bearer"
              authParam="header 'Authorization: Bearer YOUR_PERSONAL_ACCESS_TOKEN'"
            />

            <div>
              <h2 className="text-2xl font-bold mb-4">Error Handling</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Common Errors</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>401 Unauthorized</strong>: Invalid or expired token
                    </li>
                    <li>
                      <strong>403 Forbidden</strong>: Rate limit exceeded or insufficient permissions
                    </li>
                    <li>
                      <strong>404 Not Found</strong>: User or repository doesn&apos;t exist
                    </li>
                    <li>
                      <strong>422 Unprocessable Entity</strong>: Validation failed or endpoint has been spammed
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
                  <p>GitHub API has rate limits that vary based on authentication:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Unauthenticated requests: 60 requests per hour</li>
                    <li>Authenticated requests: 5,000 requests per hour</li>
                  </ul>
                  <p className="mt-2">
                    You can check your rate limit status by calling:{" "}
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">https://api.github.com/rate_limit</code>
                  </p>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      Monitor your rate limit usage and implement exponential backoff for retries. GitHub provides rate
                      limit information in response headers: <code>X-RateLimit-Limit</code>,{" "}
                      <code>X-RateLimit-Remaining</code>, and <code>X-RateLimit-Reset</code>.
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
                        href="https://docs.github.com/en/rest"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official GitHub API Documentation"
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
                      href="https://bless.network/templates/github-api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      GitHub API Template
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
