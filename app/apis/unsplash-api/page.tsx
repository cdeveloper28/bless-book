import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Unsplash API Documentation | Bless API Book",
  description: "Learn how to use the Unsplash API to access high-quality, royalty-free images for your applications.",
}

export default function UnsplashApiPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Unsplash API</h1>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          The Unsplash API provides access to Unsplash&apos;s library of high-quality, royalty-free images. It allows
          developers to search, download, and track photos, as well as get information about users, collections, and
          more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold mb-2">Base URL</h3>
            <code className="text-sm bg-background p-2 rounded block">https://api.unsplash.com</code>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold mb-2">Response Format</h3>
            <p>JSON</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold mb-2">Authentication</h3>
            <p>OAuth 2.0 or API Key</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold mb-2">Rate Limits</h3>
            <p>50 requests per hour (Demo)</p>
            <p>5,000 requests per hour (Production)</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access to millions of high-quality, royalty-free images</li>
          <li>Powerful search functionality with filters</li>
          <li>Photo statistics and download tracking</li>
          <li>User and collection information</li>
          <li>Random photo endpoint for dynamic content</li>
        </ul>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Register an Application</h3>
            <p>
              Before using the Unsplash API, you need to register your application on the
              <a
                href="https://unsplash.com/developers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {" "}
                Unsplash Developer Portal
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. Get Your API Keys</h3>
            <p>
              After registering, you&apos;ll receive an Access Key and Secret Key. The Access Key is used for most API
              requests.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Authentication</h3>
            <p>For most endpoints, you can authenticate using your Access Key in the Authorization header:</p>
            <CodeBlock
              language="javascript"
              code={`// Example using fetch
fetch('https://api.unsplash.com/photos', {
  headers: {
    'Authorization': 'Client-ID YOUR_ACCESS_KEY'
  }
})`}
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Common Endpoints</h2>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">List Photos</h3>
            <code className="text-sm bg-background p-2 rounded block mb-2">GET /photos</code>
            <p className="text-sm mb-2">Get a list of photos, sorted by latest.</p>
            <div className="mt-2">
              <h4 className="font-medium text-sm">Parameters:</h4>
              <ul className="list-disc pl-6 text-sm">
                <li>
                  <code>page</code> - Page number (default: 1)
                </li>
                <li>
                  <code>per_page</code> - Number of items per page (default: 10, max: 30)
                </li>
                <li>
                  <code>order_by</code> - How to sort photos (latest, oldest, popular)
                </li>
              </ul>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">Search Photos</h3>
            <code className="text-sm bg-background p-2 rounded block mb-2">GET /search/photos</code>
            <p className="text-sm mb-2">Search for photos by keyword.</p>
            <div className="mt-2">
              <h4 className="font-medium text-sm">Parameters:</h4>
              <ul className="list-disc pl-6 text-sm">
                <li>
                  <code>query</code> - Search terms
                </li>
                <li>
                  <code>page</code> - Page number (default: 1)
                </li>
                <li>
                  <code>per_page</code> - Number of items per page (default: 10, max: 30)
                </li>
                <li>
                  <code>color</code> - Filter by color (black_and_white, black, white, yellow, orange, red, purple,
                  magenta, green, teal, blue)
                </li>
                <li>
                  <code>orientation</code> - Filter by photo orientation (landscape, portrait, squarish)
                </li>
              </ul>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">Get a Random Photo</h3>
            <code className="text-sm bg-background p-2 rounded block mb-2">GET /photos/random</code>
            <p className="text-sm mb-2">Retrieve a random photo, optionally filtered by topic, collection, or user.</p>
            <div className="mt-2">
              <h4 className="font-medium text-sm">Parameters:</h4>
              <ul className="list-disc pl-6 text-sm">
                <li>
                  <code>collections</code> - Collection ID(s) to filter by
                </li>
                <li>
                  <code>topics</code> - Topic ID(s) to filter by
                </li>
                <li>
                  <code>username</code> - Limit to a specific user&apos;s photos
                </li>
                <li>
                  <code>query</code> - Limit to photos matching a search term
                </li>
                <li>
                  <code>orientation</code> - Filter by photo orientation
                </li>
                <li>
                  <code>count</code> - Number of photos to return (max: 30)
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Get a Photo</h3>
            <code className="text-sm bg-background p-2 rounded block mb-2">GET /photos/:id</code>
            <p className="text-sm mb-2">Retrieve a specific photo by ID.</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Example: Image Gallery</h2>
        <p className="mb-4">
          Let&apos;s build a responsive image gallery that fetches and displays images from Unsplash.
        </p>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">HTML</h3>
          <CodeBlock
            language="html"
            code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsplash Gallery</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Unsplash Image Gallery</h1>
    <div class="search-container">
      <input type="text" id="search-input" placeholder="Search for images...">
      <button id="search-button">Search</button>
    </div>
    <div class="gallery" id="image-gallery"></div>
    <div class="load-more">
      <button id="load-more">Load More</button>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>`}
          />
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">CSS</h3>
          <CodeBlock
            language="css"
            code={`* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.search-container {
  display: flex;
  margin-bottom: 30px;
}

#search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

#search-button {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 16px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.gallery-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.gallery-item .info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  transform: translateY(100%);
  transition: transform 0.3s;
}

.gallery-item:hover .info {
  transform: translateY(0);
}

.load-more {
  text-align: center;
  margin-top: 30px;
}

#load-more {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}`}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">JavaScript</h3>
          <CodeBlock
            language="javascript"
            code={`// Replace with your Unsplash API Access Key
const ACCESS_KEY = 'YOUR_ACCESS_KEY';
const API_URL = 'https://api.unsplash.com';
let currentPage = 1;
let currentQuery = '';
let isLoading = false;

// DOM Elements
const gallery = document.getElementById('image-gallery');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const loadMoreButton = document.getElementById('load-more');

// Event Listeners
searchButton.addEventListener('click', searchImages);
loadMoreButton.addEventListener('click', loadMoreImages);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchImages();
  }
});

// Load initial images
fetchImages();

// Fetch images from Unsplash
async function fetchImages(query = '') {
  if (isLoading) return;
  
  isLoading = true;
  let url = '';
  
  if (query) {
    url = \`\${API_URL}/search/photos?page=\${currentPage}&per_page=12&query=\${query}\`;
  } else {
    url = \`\${API_URL}/photos?page=\${currentPage}&per_page=12\`;
  }
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': \`Client-ID \${ACCESS_KEY}\`
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    const images = query ? data.results : data;
    
    displayImages(images);
    isLoading = false;
  } catch (error) {
    console.error('Error fetching images:', error);
    isLoading = false;
  }
}

// Display images in the gallery
function displayImages(images) {
  images.forEach(image => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = image.urls.regular;
    img.alt = image.alt_description || 'Unsplash Image';
    
    const info = document.createElement('div');
    info.className = 'info';
    
    const photographer = document.createElement('p');
    photographer.textContent = \`Photo by \${image.user.name}\`;
    
    const link = document.createElement('a');
    link.href = image.links.html;
    link.target = '_blank';
    link.textContent = 'View on Unsplash';
    link.style.color = 'white';
    
    info.appendChild(photographer);
    info.appendChild(link);
    
    item.appendChild(img);
    item.appendChild(info);
    
    gallery.appendChild(item);
  });
}

// Search for images
function searchImages() {
  const query = searchInput.value.trim();
  if (!query) return;
  
  // Reset gallery and page
  gallery.innerHTML = '';
  currentPage = 1;
  currentQuery = query;
  
  fetchImages(query);
}

// Load more images
function loadMoreImages() {
  currentPage++;
  fetchImages(currentQuery);
}`}
          />
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Response Example</h2>
        <p className="mb-4">Here&apos;s an example of the response from the GET /photos endpoint:</p>
        <CodeBlock
          language="json"
          code={`[
  {
    "id": "Dwu85P9SOIk",
    "created_at": "2016-05-03T11:00:28-04:00",
    "updated_at": "2016-07-10T11:00:01-05:00",
    "width": 2448,
    "height": 3264,
    "color": "#6E633A",
    "blur_hash": "LFC$yHwc8^$yIAS$%M%00KxukYIp",
    "downloads": 1345,
    "likes": 24,
    "liked_by_user": false,
    "description": "A man drinking a coffee.",
    "alt_description": "A man drinking a coffee.",
    "exif": {
      "make": "Canon",
      "model": "Canon EOS 40D",
      "exposure_time": "0.011111111111111112",
      "aperture": "4.970854",
      "focal_length": "37",
      "iso": 100
    },
    "location": {
      "city": "Montreal",
      "country": "Canada",
      "position": {
        "latitude": 45.4732984,
        "longitude": -73.6384879
      }
    },
    "tags": [
      {
        "title": "man"
      },
      {
        "title": "drinking"
      },
      {
        "title": "coffee"
      }
    ],
    "urls": {
      "raw": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d",
      "full": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg",
      "regular": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max",
      "small": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max",
      "thumb": "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max"
    },
    "links": {
      "self": "https://api.unsplash.com/photos/Dwu85P9SOIk",
      "html": "https://unsplash.com/photos/Dwu85P9SOIk",
      "download": "https://unsplash.com/photos/Dwu85P9SOIk/download",
      "download_location": "https://api.unsplash.com/photos/Dwu85P9SOIk/download"
    },
    "user": {
      "id": "QPxL2MGqfrw",
      "updated_at": "2016-07-10T11:00:01-05:00",
      "username": "exampleuser",
      "name": "Joe Example",
      "portfolio_url": "https://example.com/",
      "bio": "Just an everyday Joe",
      "location": "Montreal",
      "total_likes": 5,
      "total_photos": 10,
      "total_collections": 13,
      "links": {
        "self": "https://api.unsplash.com/users/exampleuser",
        "html": "https://unsplash.com/@exampleuser",
        "photos": "https://api.unsplash.com/users/exampleuser/photos",
        "likes": "https://api.unsplash.com/users/exampleuser/likes",
        "portfolio": "https://api.unsplash.com/users/exampleuser/portfolio"
      }
    }
  }
]`}
        />
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Attribution:</strong> When using Unsplash images, it&apos;s good practice to credit the
            photographer, though not required.
          </li>
          <li>
            <strong>Download Tracking:</strong> Use the download endpoint to help Unsplash track photo downloads.
          </li>
          <li>
            <strong>Rate Limiting:</strong> Be mindful of the rate limits, especially in demo applications.
          </li>
          <li>
            <strong>Caching:</strong> Implement caching to reduce the number of API calls and improve performance.
          </li>
          <li>
            <strong>Error Handling:</strong> Always implement proper error handling for API requests.
          </li>
        </ul>
      </div>
    </div>
  )
}
