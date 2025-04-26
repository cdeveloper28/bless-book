import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"
import BlessCliIntegration from "@/components/bless-cli-integration"

export default function MovieDatabaseApiPage() {
  const api = {
    id: "movie-database-api",
    name: "The Movie Database API",
    description: "Access information about movies, TV shows, actors, and more",
    category: "Entertainment",
    difficulty: "Intermediate",
    baseUrl: "https://api.themoviedb.org/3",
    authType: "API Key",
    endpoints: [
      {
        name: "Popular Movies",
        path: "/movie/popular",
        method: "GET",
        description: "Get a list of popular movies",
        parameters: [
          {
            name: "api_key",
            type: "string",
            required: true,
            description: "Your API key",
          },
          {
            name: "language",
            type: "string",
            required: false,
            description: "ISO 639-1 language code (default: en-US)",
          },
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number (default: 1)",
          },
          {
            name: "region",
            type: "string",
            required: false,
            description: "ISO 3166-1 region code",
          },
        ],
      },
      {
        name: "Movie Details",
        path: "/movie/{movie_id}",
        method: "GET",
        description: "Get detailed information about a specific movie",
        parameters: [
          {
            name: "movie_id",
            type: "number",
            required: true,
            description: "The ID of the movie",
          },
          {
            name: "api_key",
            type: "string",
            required: true,
            description: "Your API key",
          },
          {
            name: "language",
            type: "string",
            required: false,
            description: "ISO 639-1 language code (default: en-US)",
          },
          {
            name: "append_to_response",
            type: "string",
            required: false,
            description: "Additional data to include (e.g., videos,images,credits)",
          },
        ],
      },
      {
        name: "Search Movies",
        path: "/search/movie",
        method: "GET",
        description: "Search for movies by title",
        parameters: [
          {
            name: "api_key",
            type: "string",
            required: true,
            description: "Your API key",
          },
          {
            name: "query",
            type: "string",
            required: true,
            description: "Text query to search",
          },
          {
            name: "language",
            type: "string",
            required: false,
            description: "ISO 639-1 language code (default: en-US)",
          },
          {
            name: "page",
            type: "number",
            required: false,
            description: "Page number (default: 1)",
          },
          {
            name: "include_adult",
            type: "boolean",
            required: false,
            description: "Include adult content (default: false)",
          },
          {
            name: "region",
            type: "string",
            required: false,
            description: "ISO 3166-1 region code",
          },
          {
            name: "year",
            type: "number",
            required: false,
            description: "Year of release",
          },
          {
            name: "primary_release_year",
            type: "number",
            required: false,
            description: "Primary year of release",
          },
        ],
      },
      {
        name: "Trending",
        path: "/trending/{media_type}/{time_window}",
        method: "GET",
        description: "Get trending movies, TV shows, or people",
        parameters: [
          {
            name: "media_type",
            type: "string",
            required: true,
            description: "Type of media (all, movie, tv, person)",
          },
          {
            name: "time_window",
            type: "string",
            required: true,
            description: "Time window (day, week)",
          },
          {
            name: "api_key",
            type: "string",
            required: true,
            description: "Your API key",
          },
        ],
      },
      {
        name: "Movie Credits",
        path: "/movie/{movie_id}/credits",
        method: "GET",
        description: "Get the cast and crew for a movie",
        parameters: [
          {
            name: "movie_id",
            type: "number",
            required: true,
            description: "The ID of the movie",
          },
          {
            name: "api_key",
            type: "string",
            required: true,
            description: "Your API key",
          },
          {
            name: "language",
            type: "string",
            required: false,
            description: "ISO 639-1 language code (default: en-US)",
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
  <title>Movie Explorer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>Movie Explorer</h1>
      <div class="search-container">
        <input type="text" id="search-input" placeholder="Search for movies...">
        <button id="search-btn">Search</button>
      </div>
    </header>
    
    <nav class="tabs">
      <button class="tab-btn active" data-tab="popular">Popular</button>
      <button class="tab-btn" data-tab="trending">Trending</button>
      <button class="tab-btn" data-tab="search-results">Search Results</button>
    </nav>
    
    <main>
      <div id="movies-grid" class="movies-grid">
        <!-- Movies will be displayed here -->
        <div class="loading">Loading movies...</div>
      </div>
      
      <div class="pagination" id="pagination">
        <!-- Pagination controls will be displayed here -->
      </div>
    </main>
    
    <!-- Movie Details Modal -->
    <div id="movie-modal" class="modal">
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <div id="movie-details" class="movie-details">
          <!-- Movie details will be displayed here -->
        </div>
      </div>
    </div>
  </div>
  
  <script src="movies.js"></script>
</body>
</html>`

  const javascriptCode = `// Replace with your actual API key
const API_KEY = 'your_api_key_here';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// Image sizes
const POSTER_SIZE = 'w500';
const BACKDROP_SIZE = 'original';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const tabButtons = document.querySelectorAll('.tab-btn');
const moviesGrid = document.getElementById('movies-grid');
const pagination = document.getElementById('pagination');
const movieModal = document.getElementById('movie-modal');
const movieDetails = document.getElementById('movie-details');
const closeBtn = document.querySelector('.close-btn');

// State variables
let currentTab = 'popular';
let currentPage = 1;
let totalPages = 1;
let searchQuery = '';

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  loadMovies('popular', 1);
  
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
      if (currentTab === 'search-results' && searchQuery) {
        searchMovies(searchQuery, 1);
      } else if (currentTab === 'trending') {
        loadTrending(1);
      } else {
        loadMovies('popular', 1);
      }
    });
  });
  
  // Search button
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      searchQuery = query;
      currentPage = 1;
      
      // Switch to search results tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelector('[data-tab="search-results"]').classList.add('active');
      currentTab = 'search-results';
      
      searchMovies(query, 1);
    }
  });
  
  // Search on Enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
  
  // Close modal
  closeBtn.addEventListener('click', () => {
    movieModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === movieModal) {
      movieModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});

// Load Popular Movies
async function loadMovies(category = 'popular', page = 1) {
  showLoading();
  
  try {
    const response = await fetch(
      \`\${API_BASE_URL}/movie/\${category}?api_key=\${API_KEY}&language=en-US&page=\${page}\`
    );
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayMovies(data.results);
    
    // Update pagination
    totalPages = data.total_pages;
    displayPagination(page, totalPages);
  } catch (error) {
    console.error('Error fetching movies:', error);
    showError(error.message);
  }
}

// Load Trending Movies
async function loadTrending(page = 1) {
  showLoading();
  
  try {
    const response = await fetch(
      \`\${API_BASE_URL}/trending/movie/week?api_key=\${API_KEY}&page=\${page}\`
    );
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayMovies(data.results);
    
    // Update pagination
    totalPages = data.total_pages;
    displayPagination(page, totalPages);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    showError(error.message);
  }
}

// Search Movies
async function searchMovies(query, page = 1) {
  showLoading();
  
  try {
    const response = await fetch(
      \`\${API_BASE_URL}/search/movie?api_key=\${API_KEY}&language=en-US&query=\${encodeURIComponent(query)}&page=\${page}&include_adult=false\`
    );
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    if (data.results.length === 0) {
      moviesGrid.innerHTML = '<div class="no-results">No movies found matching your search.</div>';
      pagination.innerHTML = '';
      return;
    }
    
    displayMovies(data.results);
    
    // Update pagination
    totalPages = data.total_pages;
    displayPagination(page, totalPages);
  } catch (error) {
    console.error('Error searching movies:', error);
    showError(error.message);
  }
}

// Get Movie Details
async function getMovieDetails(movieId) {
  try {
    const response = await fetch(
      \`\${API_BASE_URL}/movie/\${movieId}?api_key=\${API_KEY}&language=en-US&append_to_response=credits,videos\`
    );
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const movie = await response.json();
    displayMovieDetails(movie);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    movieDetails.innerHTML = \`<div class="error">Failed to load movie details: \${error.message}</div>\`;
  }
}

// Display Movies
function displayMovies(movies) {
  moviesGrid.innerHTML = '';
  
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    
    // Format release date
    const releaseDate = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
    
    // Create poster URL or use placeholder
    const posterPath = movie.poster_path 
      ? \`\${IMAGE_BASE_URL}\${POSTER_SIZE}\${movie.poster_path}\`
      : 'placeholder.jpg';
    
    movieCard.innerHTML = \`
      <div class="movie-poster">
        <img src="\${posterPath}" alt="\${movie.title}" loading="lazy">
        <div class="movie-rating">\${movie.vote_average.toFixed(1)}</div>
      </div>
      <div class="movie-info">
        <h3 class="movie-title">\${movie.title}</h3>
        <p class="movie-year">\${releaseDate}</p>
      </div>
    \`;
    
    // Add click event to show movie details
    movieCard.addEventListener('click', () => {
      getMovieDetails(movie.id);
      movieModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
    
    moviesGrid.appendChild(movieCard);
  });
}

// Display Movie Details
function displayMovieDetails(movie) {
  // Format release date
  const releaseDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown';
  
  // Format runtime
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const runtime = movie.runtime ? \`\${hours}h \${minutes}m\` : 'Unknown';
  
  // Create backdrop URL or use poster as fallback
  const backdropPath = movie.backdrop_path 
    ? \`\${IMAGE_BASE_URL}\${BACKDROP_SIZE}\${movie.backdrop_path}\`
    : (movie.poster_path ? \`\${IMAGE_BASE_URL}\${POSTER_SIZE}\${movie.poster_path}\` : 'placeholder.jpg');
  
  // Get trailer if available
  let trailerKey = '';
  if (movie.videos && movie.videos.results.length > 0) {
    const trailer = movie.videos.results.find(video => video.type === 'Trailer') || movie.videos.results[0];
    trailerKey = trailer.key;
  }
  
  // Get cast (limit to 6)
  const cast = movie.credits.cast.slice(0, 6).map(actor => {
    const profilePath = actor.profile_path 
      ? \`\${IMAGE_BASE_URL}w185\${actor.profile_path}\`
      : 'placeholder-person.jpg';
    
    return \`
      <div class="cast-member">
        <img src="\${profilePath}" alt="\${actor.name}" loading="lazy">
        <p class="actor-name">\${actor.name}</p>
        <p class="character-name">\${actor.character}</p>
      </div>
    \`;
  }).join('');
  
  // Get genres
  const genres = movie.genres.map(genre => genre.name).join(', ');
  
  movieDetails.innerHTML = \`
    <div class="movie-backdrop" style="background-image: url('\${backdropPath}')">
      <div class="backdrop-overlay"></div>
    </div>
    
    <div class="movie-content">
      <h2 class="detail-title">\${movie.title}</h2>
      
      <div class="movie-meta">
        <span class="meta-item">\${releaseDate}</span>
        <span class="meta-item">\${runtime}</span>
        <span class="meta-item">\${genres}</span>
        <span class="meta-item rating"><span class="star">★</span> \${movie.vote_average.toFixed(1)}/10</span>
      </div>
      
      <div class="movie-tagline">\${movie.tagline || ''}</div>
      
      <div class="movie-overview">
        <h3>Overview</h3>
        <p>\${movie.overview}</p>
      </div>
      
      \${trailerKey ? \`
        <div class="movie-trailer">
          <h3>Trailer</h3>
          <div class="trailer-container">
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/\${trailerKey}" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      \` : ''}
      
      <div class="movie-cast">
        <h3>Cast</h3>
        <div class="cast-grid">
          \${cast}
        </div>
      </div>
    </div>
  \`;
}

// Display Pagination
function displayPagination(currentPage, totalPages) {
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
  
  if (currentTab === 'search-results' && searchQuery) {
    searchMovies(searchQuery, page);
  } else if (currentTab === 'trending') {
    loadTrending(page);
  } else {
    loadMovies('popular', page);
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show Loading State
function showLoading() {
  moviesGrid.innerHTML = '<div class="loading">Loading...</div>';
}

// Show Error Message
function showError(message) {
  moviesGrid.innerHTML = \`<div class="error">Error: \${message}</div>\`;
}

// Make changePage function available globally for pagination buttons
window.changePage = changePage;`

  const cssCode = `:root {
  --primary-color: #032541;
  --secondary-color: #01b4e4;
  --text-color: #333;
  --background-color: #f8f9fa;
  --card-color: #fff;
  --border-color: #e3e3e3;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

h1 {
  color: var(--primary-color);
  margin-bottom: 20px;
  text-align: center;
}

.search-container {
  display: flex;
  width: 100%;
  max-width: 600px;
}

#search-input {
  flex: 1;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

#search-btn {
  padding: 12px 24px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
}

#search-btn:hover {
  background-color: #0099c9;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--border-color);
}

.tab-btn {
  padding: 12px 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  border-bottom: 3px solid transparent;
}

.tab-btn:hover {
  color: var(--secondary-color);
}

.tab-btn.active {
  color: var(--secondary-color);
  border-bottom-color: var(--secondary-color);
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.movie-card {
  background-color: var(--card-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-poster {
  position: relative;
  height: 300px;
}

.movie-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.movie-info {
  padding: 15px;
}

.movie-title {
  font-size: 16px;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-year {
  color: #777;
  font-size: 14px;
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
  border: 1px solid var(--border-color);
  background-color: var(--card-color);
  cursor: pointer;
  border-radius: 4px;
}

.pagination-btn:hover:not(.disabled):not(.active) {
  background-color: #f0f0f0;
}

.pagination-btn.active {
  background-color: var(--secondary-color);
  color: white;
  border-color: var(--secondary-color);
}

.pagination-btn.disabled {
  color: #ccc;
  cursor: not-allowed;
}

/* Modal Styles */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  overflow-y: auto;
}

.modal-content {
  position: relative;
  background-color: var(--background-color);
  margin: 50px auto;
  width: 90%;
  max-width: 1000px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  color: white;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
}

.movie-backdrop {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.backdrop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8));
}

.movie-content {
  padding: 30px;
}

.detail-title {
  font-size: 28px;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.movie-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #555;
}

.meta-item.rating {
  color: #f5c518;
  font-weight: bold;
}

.star {
  margin-right: 3px;
}

.movie-tagline {
  font-style: italic;
  color: #555;
  margin-bottom: 20px;
  font-size: 18px;
}

.movie-overview, .movie-trailer, .movie-cast {
  margin-bottom: 30px;
}

.movie-overview h3, .movie-trailer h3, .movie-cast h3 {
  margin-bottom: 15px;
  color: var(--primary-color);
}

.trailer-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
}

.trailer-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.cast-member {
  text-align: center;
}

.cast-member img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.actor-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.character-name {
  font-size: 14px;
  color: #777;
}

.loading {
  text-align: center;
  padding: 40px;
  grid-column: 1 / -1;
  color: #777;
  font-style: italic;
}

.error {
  text-align: center;
  padding: 20px;
  grid-column: 1 / -1;
  color: #e53935;
  background-color: #ffebee;
  border-radius: 4px;
}

.no-results {
  text-align: center;
  padding: 40px;
  grid-column: 1 / -1;
  color: #777;
}

/* Responsive styles */
@media (max-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .movie-poster {
    height: 225px;
  }
  
  .tabs {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 5px;
  }
  
  .tab-btn {
    padding: 10px 15px;
  }
  
  .movie-backdrop {
    height: 250px;
  }
  
  .detail-title {
    font-size: 24px;
  }
  
  .cast-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  
  .cast-member img {
    height: 180px;
  }
  
  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }
  
  .movie-poster {
    height: 195px;
  }
  
  .movie-info {
    padding: 10px;
  }
  
  .movie-title {
    font-size: 14px;
  }
  
  .movie-content {
    padding: 20px;
  }
  
  .cast-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
  
  .cast-member img {
    height: 150px;
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
                  <p className="mb-4">
                    To use The Movie Database API, you need to sign up for an account and request an API key.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                      Visit{" "}
                      <a
                        href="https://www.themoviedb.org/signup"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        TMDB Sign Up
                      </a>{" "}
                      to create an account
                    </li>
                    <li>Verify your email address</li>
                    <li>
                      Go to your{" "}
                      <a
                        href="https://www.themoviedb.org/settings/api"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        API Settings
                      </a>{" "}
                      page
                    </li>
                    <li>Request an API key for developer use</li>
                    <li>Fill out the required information about your application</li>
                    <li>Once approved, you'll receive your API key</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your movie explorer application:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>index.html - The HTML structure</li>
                    <li>styles.css - CSS for styling</li>
                    <li>movies.js - JavaScript for API integration</li>
                    <li>placeholder.jpg - A fallback image for movies without posters</li>
                    <li>placeholder-person.jpg - A fallback image for actors without profile pictures</li>
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
                    Open your HTML file in a browser to test your movie explorer application. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Browse popular and trending movies</li>
                    <li>Search for movies by title</li>
                    <li>View detailed information about a movie by clicking on it</li>
                    <li>Watch movie trailers</li>
                    <li>See the cast of each movie</li>
                    <li>Navigate through paginated results</li>
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
                      <strong>401 Unauthorized</strong>: Invalid API key
                    </li>
                    <li>
                      <strong>404 Not Found</strong>: The resource you requested could not be found
                    </li>
                    <li>
                      <strong>429 Too Many Requests</strong>: Rate limit exceeded
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
                  <p>The Movie Database API has rate limits to prevent abuse:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>40 requests every 10 seconds</li>
                    <li>Approximately 3 requests per second</li>
                  </ul>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      Implement caching for frequently accessed data like popular movies or movie details to reduce the
                      number of API calls. Also, consider adding a small delay between rapid successive requests to
                      avoid hitting rate limits.
                    </AlertDescription>
                  </Alert>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Image Handling</h3>
                  <p>
                    The Movie Database API provides different image sizes for posters and backdrops. The base URL for
                    images is <code className="bg-muted px-1 py-0.5 rounded">https://image.tmdb.org/t/p/</code>
                    followed by the size and file path.
                  </p>
                  <p className="mt-2">Common poster sizes:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>w92 - Small</li>
                    <li>w185 - Medium</li>
                    <li>w500 - Large</li>
                    <li>original - Original size</li>
                  </ul>
                  <p className="mt-2">
                    Always implement fallback images for cases where movie posters or actor profiles are not available.
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
                        href="https://developers.themoviedb.org/3/getting-started/introduction"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official TMDB API Documentation"
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
