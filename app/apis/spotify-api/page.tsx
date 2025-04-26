import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"
import BlessCliIntegration from "@/components/bless-cli-integration"

export default function SpotifyApiPage() {
  const api = {
    id: "spotify-api",
    name: "Spotify API",
    description: "Access music data, control playback, and manage playlists",
    category: "Music",
    difficulty: "Intermediate",
    baseUrl: "https://api.spotify.com/v1",
    authType: "OAuth 2.0",
    endpoints: [
      {
        name: "Get Track",
        path: "/tracks/{id}",
        method: "GET",
        description: "Get Spotify catalog information for a single track",
        parameters: [
          {
            name: "id",
            type: "string",
            required: true,
            description: "The Spotify ID for the track",
          },
          {
            name: "market",
            type: "string",
            required: false,
            description: "An ISO 3166-1 alpha-2 country code",
          },
        ],
      },
      {
        name: "Get User's Playlists",
        path: "/users/{user_id}/playlists",
        method: "GET",
        description: "Get a list of the playlists owned or followed by a Spotify user",
        parameters: [
          {
            name: "user_id",
            type: "string",
            required: true,
            description: "The user's Spotify user ID",
          },
          {
            name: "limit",
            type: "integer",
            required: false,
            description: "Maximum number of playlists to return (default: 20, maximum: 50)",
          },
          {
            name: "offset",
            type: "integer",
            required: false,
            description: "The index of the first playlist to return (default: 0)",
          },
        ],
      },
      {
        name: "Search",
        path: "/search",
        method: "GET",
        description: "Search for an item in the Spotify catalog",
        parameters: [
          {
            name: "q",
            type: "string",
            required: true,
            description: "Search query keywords and optional field filters and operators",
          },
          {
            name: "type",
            type: "string",
            required: true,
            description:
              "Comma-separated list of item types to search across (album, artist, playlist, track, show, episode, audiobook)",
          },
          {
            name: "market",
            type: "string",
            required: false,
            description: "An ISO 3166-1 alpha-2 country code",
          },
          {
            name: "limit",
            type: "integer",
            required: false,
            description: "Maximum number of results to return (default: 20, maximum: 50)",
          },
          {
            name: "offset",
            type: "integer",
            required: false,
            description: "The index of the first result to return (default: 0)",
          },
        ],
      },
      {
        name: "Get Current User's Profile",
        path: "/me",
        method: "GET",
        description: "Get detailed profile information about the current user",
        parameters: [],
      },
      {
        name: "Create Playlist",
        path: "/users/{user_id}/playlists",
        method: "POST",
        description: "Create a playlist for a Spotify user",
        parameters: [
          {
            name: "user_id",
            type: "string",
            required: true,
            description: "The user's Spotify user ID",
          },
          {
            name: "name",
            type: "string",
            required: true,
            description: "The name for the new playlist",
          },
          {
            name: "public",
            type: "boolean",
            required: false,
            description: "Whether the playlist will be public (default: true)",
          },
          {
            name: "collaborative",
            type: "boolean",
            required: false,
            description: "Whether the playlist will be collaborative (default: false)",
          },
          {
            name: "description",
            type: "string",
            required: false,
            description: "The playlist description",
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
  <title>Spotify API Demo</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>Spotify Explorer</h1>
      <div id="user-profile">
        <!-- User profile will be displayed here after login -->
      </div>
    </header>
    
    <div class="login-section" id="login-section">
      <button id="login-button" class="btn">Login with Spotify</button>
      <p class="info-text">Login to access your Spotify data and playlists</p>
    </div>
    
    <div class="main-content" id="main-content" style="display: none;">
      <div class="search-section">
        <h2>Search for Music</h2>
        <div class="search-container">
          <input type="text" id="search-input" placeholder="Search for songs, artists, or albums...">
          <select id="search-type">
            <option value="track">Tracks</option>
            <option value="artist">Artists</option>
            <option value="album">Albums</option>
            <option value="playlist">Playlists</option>
          </select>
          <button id="search-button" class="btn">Search</button>
        </div>
      </div>
      
      <div class="results-section">
        <h2>Results</h2>
        <div id="search-results" class="results-container">
          <!-- Search results will be displayed here -->
        </div>
      </div>
      
      <div class="playlists-section">
        <h2>Your Playlists</h2>
        <div id="user-playlists" class="playlists-container">
          <!-- User playlists will be displayed here -->
        </div>
      </div>
    </div>
  </div>
  
  <script src="spotify-api.js"></script>
</body>
</html>`

  const cssCode = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #121212;
  color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;
}

h1 {
  color: #1DB954;
  font-size: 2.5rem;
}

h2 {
  margin-bottom: 20px;
  color: #1DB954;
}

.btn {
  background-color: #1DB954;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #1ed760;
}

.login-section {
  text-align: center;
  margin: 100px auto;
  max-width: 500px;
}

.info-text {
  margin-top: 20px;
  color: #b3b3b3;
}

.search-section {
  margin-bottom: 40px;
}

.search-container {
  display: flex;
  gap: 10px;
}

input, select {
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

input {
  flex: 1;
  background-color: #282828;
  color: white;
}

select {
  background-color: #282828;
  color: white;
}

.results-section, .playlists-section {
  margin-bottom: 40px;
}

.results-container, .playlists-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.card {
  background-color: #181818;
  border-radius: 8px;
  overflow: hidden;
  transition: background-color 0.3s;
}

.card:hover {
  background-color: #282828;
}

.card-img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-title {
  font-weight: bold;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-subtitle {
  color: #b3b3b3;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.profile-name {
  font-weight: bold;
}

.play-button {
  background-color: #1DB954;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
  opacity: 0;
  transition: opacity 0.3s;
}

.card:hover .play-button {
  opacity: 1;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }
  
  .results-container, .playlists-container {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}`

  const javascriptCode = `// Spotify API Configuration
const clientId = 'YOUR_CLIENT_ID'; // Replace with your Spotify Client ID
const redirectUri = 'http://localhost:3000/callback'; // Replace with your redirect URI

// Spotify API endpoints
const AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const API_BASE_URL = 'https://api.spotify.com/v1';

// DOM Elements
const loginButton = document.getElementById('login-button');
const loginSection = document.getElementById('login-section');
const mainContent = document.getElementById('main-content');
const userProfile = document.getElementById('user-profile');
const searchInput = document.getElementById('search-input');
const searchType = document.getElementById('search-type');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const userPlaylists = document.getElementById('user-playlists');

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeApp);
loginButton.addEventListener('click', authorizeWithSpotify);
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    performSearch();
  }
});

// Initialize the application
function initializeApp() {
  // Check if the user is already authenticated
  const accessToken = getAccessTokenFromUrl() || localStorage.getItem('spotify_access_token');
  const tokenExpiry = localStorage.getItem('spotify_token_expiry');
  
  if (accessToken && tokenExpiry && new Date().getTime() < parseInt(tokenExpiry)) {
    // User is authenticated and token is valid
    showAuthenticatedUI(accessToken);
  } else {
    // Clear any expired tokens
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_token_expiry');
    
    // Show login UI
    loginSection.style.display = 'block';
    mainContent.style.display = 'none';
  }
}

// Authorize with Spotify
function authorizeWithSpotify() {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-modify-public'
  ];
  
  const authUrl = new URL(AUTHORIZE_ENDPOINT);
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('scope', scopes.join(' '));
  authUrl.searchParams.append('response_type', 'token');
  
  // Redirect to Spotify authorization page
  window.location.href = authUrl.toString();
}

// Extract access token from URL after authorization
function getAccessTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  
  if (params.has('access_token')) {
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');
    
    // Calculate expiry time
    const expiryTime = new Date().getTime() + (parseInt(expiresIn) * 1000);
    
    // Store token and expiry in localStorage
    localStorage.setItem('spotify_access_token', accessToken);
    localStorage.setItem('spotify_token_expiry', expiryTime.toString());
    
    // Clean up the URL
    window.history.replaceState({}, document.title, window.location.pathname);
    
    return accessToken;
  }
  
  return null;
}

// Show authenticated UI and load user data
async function showAuthenticatedUI(accessToken) {
  loginSection.style.display = 'none';
  mainContent.style.display = 'block';
  
  try {
    // Load user profile
    await loadUserProfile(accessToken);
    
    // Load user playlists
    await loadUserPlaylists(accessToken);
  } catch (error) {
    console.error('Error loading user data:', error);
    
    // If unauthorized, show login UI again
    if (error.status === 401) {
      localStorage.removeItem('spotify_access_token');
      localStorage.removeItem('spotify_token_expiry');
      loginSection.style.display = 'block';
      mainContent.style.display = 'none';
    }
  }
}

// Load user profile
async function loadUserProfile(accessToken) {
  const response = await fetch(\`\${API_BASE_URL}/me\`, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`
    }
  });
  
  if (!response.ok) {
    throw { status: response.status, message: 'Failed to load user profile' };
  }
  
  const profile = await response.json();
  
  // Display user profile
  userProfile.innerHTML = \`
    <div class="user-profile">
      <img src="\${profile.images[0]?.url || 'default-profile.png'}" alt="Profile" class="profile-img">
      <span class="profile-name">\${profile.display_name}</span>
    </div>
  \`;
}

// Load user playlists
async function loadUserPlaylists(accessToken) {
  const response = await fetch(\`\${API_BASE_URL}/me/playlists?limit=10\`, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`
    }
  });
  
  if (!response.ok) {
    throw { status: response.status, message: 'Failed to load playlists' };
  }
  
  const data = await response.json();
  
  // Display playlists
  userPlaylists.innerHTML = '';
  
  if (data.items.length === 0) {
    userPlaylists.innerHTML = '<p>No playlists found</p>';
    return;
  }
  
  data.items.forEach(playlist => {
    const playlistElement = document.createElement('div');
    playlistElement.className = 'card';
    
    playlistElement.innerHTML = \`
      <img src="\${playlist.images[0]?.url || 'default-playlist.png'}" alt="\${playlist.name}" class="card-img">
      <div class="card-content">
        <div class="card-title">\${playlist.name}</div>
        <div class="card-subtitle">\${playlist.tracks.total} tracks</div>
      </div>
    \`;
    
    userPlaylists.appendChild(playlistElement);
  });
}

// Perform search
async function performSearch() {
  const query = searchInput.value.trim();
  const type = searchType.value;
  
  if (!query) return;
  
  const accessToken = localStorage.getItem('spotify_access_token');
  
  if (!accessToken) {
    alert('You need to log in first');
    return;
  }
  
  try {
    searchResults.innerHTML = '<p>Searching...</p>';
    
    const response = await fetch(
      \`\${API_BASE_URL}/search?q=\${encodeURIComponent(query)}&type=\${type}&limit=12\`,
      {
        headers: {
          'Authorization': \`Bearer \${accessToken}\`
        }
      }
    );
    
    if (!response.ok) {
      throw { status: response.status, message: 'Search failed' };
    }
    
    const data = await response.json();
    displaySearchResults(data, type);
  } catch (error) {
    console.error('Search error:', error);
    searchResults.innerHTML = '<p>Search failed. Please try again.</p>';
    
    if (error.status === 401) {
      alert('Your session has expired. Please log in again.');
      localStorage.removeItem('spotify_access_token');
      localStorage.removeItem('spotify_token_expiry');
      loginSection.style.display = 'block';
      mainContent.style.display = 'none';
    }
  }
}

// Display search results
function displaySearchResults(data, type) {
  searchResults.innerHTML = '';
  
  let items;
  switch (type) {
    case 'track':
      items = data.tracks.items;
      break;
    case 'artist':
      items = data.artists.items;
      break;
    case 'album':
      items = data.albums.items;
      break;
    case 'playlist':
      items = data.playlists.items;
      break;
    default:
      items = [];
  }
  
  if (items.length === 0) {
    searchResults.innerHTML = '<p>No results found</p>';
    return;
  }
  
  items.forEach(item => {
    const resultElement = document.createElement('div');
    resultElement.className = 'card';
    
    let imageUrl, title, subtitle;
    
    switch (type) {
      case 'track':
        imageUrl = item.album.images[0]?.url || 'default-album.png';
        title = item.name;
        subtitle = item.artists.map(artist => artist.name).join(', ');
        break;
      case 'artist':
        imageUrl = item.images[0]?.url || 'default-artist.png';
        title = item.name;
        subtitle = \`\${item.followers.total.toLocaleString()} followers\`;
        break;
      case 'album':
        imageUrl = item.images[0]?.url || 'default-album.png';
        title = item.name;
        subtitle = item.artists.map(artist => artist.name).join(', ');
        break;
      case 'playlist':
        imageUrl = item.images[0]?.url || 'default-playlist.png';
        title = item.name;
        subtitle = \`By \${item.owner.display_name}\`;
        break;
    }
    
    resultElement.innerHTML = \`
      <img src="\${imageUrl}" alt="\${title}" class="card-img">
      <div class="card-content">
        <div class="card-title">\${title}</div>
        <div class="card-subtitle">\${subtitle}</div>
      </div>
    \`;
    
    searchResults.appendChild(resultElement);
  });
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
              <p className="text-muted-foreground">
                The Spotify Web API provides a powerful set of endpoints that allow developers to access Spotify's music
                catalog, manage playlists, control playback, and retrieve user data. With this API, you can build
                applications that integrate with Spotify's vast music library and user ecosystem.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Integration Guide</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Register Your Application</h3>
                  <p className="mb-4">
                    Before you can use the Spotify API, you need to register your application on the Spotify Developer
                    Dashboard.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Go to the{" "}
                      <a
                        href="https://developer.spotify.com/dashboard/"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Spotify Developer Dashboard
                      </a>
                    </li>
                    <li>Log in with your Spotify account</li>
                    <li>Click "Create an App"</li>
                    <li>Fill in the app name, description, and agree to the terms</li>
                    <li>Once created, you'll see your Client ID and Client Secret</li>
                    <li>
                      Add your redirect URIs in the app settings (e.g., http://localhost:3000/callback for development)
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Authentication</h3>
                  <p className="mb-4">
                    Spotify uses OAuth 2.0 for authentication. There are several authorization flows available:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Authorization Code Flow</strong>: For long-running applications with server-side
                      components
                    </li>
                    <li>
                      <strong>Implicit Grant Flow</strong>: For client-side applications running in the browser
                    </li>
                    <li>
                      <strong>Client Credentials Flow</strong>: For server-to-server authentication without user context
                    </li>
                  </ul>
                  <p className="mt-4">
                    For this example, we'll use the Implicit Grant Flow, which is suitable for client-side web
                    applications.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 3: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your Spotify integration:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>index.html - The HTML structure</li>
                    <li>styles.css - CSS for styling</li>
                    <li>spotify-api.js - JavaScript for API integration</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 4: Implement the Code</h3>
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
                  <h3 className="text-xl font-semibold mb-2">Step 5: Replace the Client ID</h3>
                  <p className="mb-4">
                    Replace <code className="bg-muted px-1 py-0.5 rounded">YOUR_CLIENT_ID</code> in the JavaScript file
                    with your actual Spotify Client ID.
                  </p>
                  <Alert>
                    <AlertTitle>Security Note</AlertTitle>
                    <AlertDescription>
                      In a production environment, you should consider using the Authorization Code Flow with PKCE for
                      better security, especially if your application needs to access user data for extended periods.
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 6: Test Your Implementation</h3>
                  <p className="mb-4">
                    Open your HTML file in a browser to test your Spotify integration. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Log in with your Spotify account</li>
                    <li>View your profile information</li>
                    <li>See your playlists</li>
                    <li>Search for tracks, artists, albums, and playlists</li>
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
                      <strong>401 Unauthorized</strong>: Invalid or expired access token
                    </li>
                    <li>
                      <strong>403 Forbidden</strong>: Valid token but insufficient permissions
                    </li>
                    <li>
                      <strong>404 Not Found</strong>: The requested resource doesn't exist
                    </li>
                    <li>
                      <strong>429 Too Many Requests</strong>: Rate limit exceeded
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
                  <p>
                    Spotify API has rate limits that vary by endpoint. The API returns a 429 status code when you exceed
                    the rate limit, along with a "Retry-After" header indicating how many seconds to wait before making
                    another request.
                  </p>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      Implement exponential backoff for retries when you encounter rate limiting. Also, consider caching
                      responses for frequently accessed data to reduce the number of API calls.
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Token Refresh</h3>
                  <p>
                    Access tokens for the Spotify API expire after one hour. When using the Implicit Grant Flow, you'll
                    need to redirect the user to the authorization page again to get a new token. If you're using the
                    Authorization Code Flow, you can use the refresh token to obtain a new access token without user
                    interaction.
                  </p>
                  <CodeBlock
                    language="javascript"
                    code={`// Example of refreshing token with Authorization Code Flow
async function refreshAccessToken(refreshToken) {
  const clientId = 'YOUR_CLIENT_ID';
  const clientSecret = 'YOUR_CLIENT_SECRET';
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });
  
  const data = await response.json();
  return data.access_token;
}`}
                  />
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
                        href="https://developer.spotify.com/documentation/web-api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official Spotify API Documentation"
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
