import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"

export default function DogApiPage() {
  const api = {
    id: "dog-api",
    name: "Dog API",
    description: "Free API for random dog images and breed information",
    category: "Animals",
    difficulty: "Beginner",
    baseUrl: "https://dog.ceo/api",
    authType: "None",
    endpoints: [
      {
        name: "Random Image",
        path: "/breeds/image/random",
        method: "GET",
        description: "Retrieve a random dog image",
        parameters: [],
      },
      {
        name: "Multiple Random Images",
        path: "/breeds/image/random/{count}",
        method: "GET",
        description: "Retrieve multiple random dog images",
        parameters: [
          {
            name: "count",
            type: "number",
            required: true,
            description: "Number of images to return (1-50)",
          },
        ],
      },
      {
        name: "Breed List",
        path: "/breeds/list/all",
        method: "GET",
        description: "List all dog breeds",
        parameters: [],
      },
      {
        name: "Random Image by Breed",
        path: "/breed/{breed}/images/random",
        method: "GET",
        description: "Retrieve a random image of a specific breed",
        parameters: [
          {
            name: "breed",
            type: "string",
            required: true,
            description: "The breed name (e.g., 'labrador', 'poodle')",
          },
        ],
      },
      {
        name: "Images by Breed",
        path: "/breed/{breed}/images",
        method: "GET",
        description: "Retrieve all images of a specific breed",
        parameters: [
          {
            name: "breed",
            type: "string",
            required: true,
            description: "The breed name (e.g., 'labrador', 'poodle')",
          },
        ],
      },
      {
        name: "Random Image by Sub-breed",
        path: "/breed/{breed}/{subbreed}/images/random",
        method: "GET",
        description: "Retrieve a random image of a specific sub-breed",
        parameters: [
          {
            name: "breed",
            type: "string",
            required: true,
            description: "The main breed name (e.g., 'hound')",
          },
          {
            name: "subbreed",
            type: "string",
            required: true,
            description: "The sub-breed name (e.g., 'afghan')",
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
  <title>Dog Gallery</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Dog Gallery</h1>
    
    <div class="controls">
      <div class="breed-selector">
        <label for="breed-select">Select a Breed:</label>
        <select id="breed-select">
          <option value="">All Breeds (Random)</option>
          <!-- Breeds will be populated by JavaScript -->
        </select>
        
        <div id="sub-breed-container" class="hidden">
          <label for="sub-breed-select">Select a Sub-breed:</label>
          <select id="sub-breed-select">
            <!-- Sub-breeds will be populated by JavaScript -->
          </select>
        </div>
      </div>
      
      <div class="buttons">
        <button id="get-dog-btn">Get Dog</button>
        <button id="get-multiple-btn">Get 3 Dogs</button>
      </div>
    </div>
    
    <div id="dog-container" class="dog-container">
      <!-- Dog images will be displayed here -->
      <p class="initial-message">Select a breed and click "Get Dog" to start</p>
    </div>
    
    <div class="breed-info">
      <h2>Breed Information</h2>
      <p id="breed-info-text">Select a breed to see information</p>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`

  const javascriptCode = `// API Base URL
const API_BASE_URL = 'https://dog.ceo/api';

// DOM Elements
const breedSelect = document.getElementById('breed-select');
const subBreedContainer = document.getElementById('sub-breed-container');
const subBreedSelect = document.getElementById('sub-breed-select');
const getDogBtn = document.getElementById('get-dog-btn');
const getMultipleBtn = document.getElementById('get-multiple-btn');
const dogContainer = document.getElementById('dog-container');
const breedInfoText = document.getElementById('breed-info-text');

// State
let breeds = {};

// Event Listeners
document.addEventListener('DOMContentLoaded', initialize);
breedSelect.addEventListener('change', handleBreedChange);
getDogBtn.addEventListener('click', getDog);
getMultipleBtn.addEventListener('click', getMultipleDogs);

// Initialize the app
async function initialize() {
  await loadBreeds();
}

// Load all dog breeds
async function loadBreeds() {
  try {
    const response = await fetch(\`\${API_BASE_URL}/breeds/list/all\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    breeds = data.message;
    
    // Populate breed select dropdown
    for (const breed in breeds) {
      const option = document.createElement('option');
      option.value = breed;
      option.textContent = capitalizeFirstLetter(breed);
      breedSelect.appendChild(option);
    }
  } catch (error) {
    console.error('Error loading breeds:', error);
    breedSelect.innerHTML = '<option value="">Error loading breeds</option>';
  }
}

// Handle breed selection change
function handleBreedChange() {
  const selectedBreed = breedSelect.value;
  
  // Clear sub-breed select
  subBreedSelect.innerHTML = '';
  
  // Hide sub-breed container by default
  subBreedContainer.classList.add('hidden');
  
  // If a breed is selected and it has sub-breeds
  if (selectedBreed && breeds[selectedBreed].length > 0) {
    // Show sub-breed container
    subBreedContainer.classList.remove('hidden');
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Any Sub-breed';
    subBreedSelect.appendChild(defaultOption);
    
    // Add sub-breeds
    breeds[selectedBreed].forEach(subBreed => {
      const option = document.createElement('option');
      option.value = subBreed;
      option.textContent = capitalizeFirstLetter(subBreed);
      subBreedSelect.appendChild(option);
    });
    
    // Update breed info
    breedInfoText.textContent = \`\${capitalizeFirstLetter(selectedBreed)} has \${breeds[selectedBreed].length} sub-breeds.\`;
  } else if (selectedBreed) {
    // Update breed info for breeds without sub-breeds
    breedInfoText.textContent = \`\${capitalizeFirstLetter(selectedBreed)} has no sub-breeds.\`;
  } else {
    // Update breed info for "All Breeds"
    breedInfoText.textContent = 'Select a breed to see information';
  }
}

// Get a single dog image
async function getDog() {
  // Show loading state
  dogContainer.innerHTML = '<p class="loading">Fetching dog...</p>';
  
  try {
    let url;
    const selectedBreed = breedSelect.value;
    const selectedSubBreed = subBreedSelect.value;
    
    if (selectedBreed && selectedSubBreed) {
      // Get image for specific sub-breed
      url = \`\${API_BASE_URL}/breed/\${selectedBreed}/\${selectedSubBreed}/images/random\`;
    } else if (selectedBreed) {
      // Get image for specific breed
      url = \`\${API_BASE_URL}/breed/\${selectedBreed}/images/random\`;
    } else {
      // Get random image from any breed
      url = \`\${API_BASE_URL}/breeds/image/random\`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayDog(data.message);
  } catch (error) {
    console.error('Error fetching dog:', error);
    dogContainer.innerHTML = '<p class="error">Failed to fetch dog. Please try again.</p>';
  }
}

// Get multiple dog images
async function getMultipleDogs() {
  // Show loading state
  dogContainer.innerHTML = '<p class="loading">Fetching dogs...</p>';
  
  try {
    let url;
    const selectedBreed = breedSelect.value;
    const selectedSubBreed = subBreedSelect.value;
    
    if (selectedBreed && selectedSubBreed) {
      // Get 3 images for specific sub-breed (need to make multiple requests as the API doesn't support multiple for sub-breeds)
      const dogs = await Promise.all([
        fetch(\`\${API_BASE_URL}/breed/\${selectedBreed}/\${selectedSubBreed}/images/random\`).then(res => res.json()),
        fetch(\`\${API_BASE_URL}/breed/\${selectedBreed}/\${selectedSubBreed}/images/random\`).then(res => res.json()),
        fetch(\`\${API_BASE_URL}/breed/\${selectedBreed}/\${selectedSubBreed}/images/random\`).then(res => res.json())
      ]);
      
      displayMultipleDogs(dogs.map(dog => dog.message));
    } else if (selectedBreed) {
      // Get 3 images for specific breed
      url = \`\${API_BASE_URL}/breed/\${selectedBreed}/images/random/3\`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      const data = await response.json();
      displayMultipleDogs(data.message);
    } else {
      // Get 3 random images from any breed
      url = \`\${API_BASE_URL}/breeds/image/random/3\`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      const data = await response.json();
      displayMultipleDogs(data.message);
    }
  } catch (error) {
    console.error('Error fetching dogs:', error);
    dogContainer.innerHTML = '<p class="error">Failed to fetch dogs. Please try again.</p>';
  }
}

// Display a single dog image
function displayDog(imageUrl) {
  dogContainer.innerHTML = \`
    <div class="dog-card">
      <img src="\${imageUrl}" alt="Dog" class="dog-image">
    </div>
  \`;
}

// Display multiple dog images
function displayMultipleDogs(imageUrls) {
  dogContainer.innerHTML = '';
  
  imageUrls.forEach(imageUrl => {
    const dogCard = document.createElement('div');
    dogCard.className = 'dog-card';
    dogCard.innerHTML = \`<img src="\${imageUrl}" alt="Dog" class="dog-image">\`;
    dogContainer.appendChild(dogCard);
  });
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}`

  const cssCode = `.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1, h2 {
  text-align: center;
  color: #2e7d32;
}

.controls {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.breed-selector {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 16px;
}

.buttons {
  display: flex;
  gap: 10px;
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
  flex: 1;
}

button:hover {
  background-color: #1b5e20;
}

.hidden {
  display: none;
}

.dog-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.dog-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.dog-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.breed-info {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

#breed-info-text {
  text-align: center;
  margin: 0;
}

.initial-message, .loading, .error {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  font-style: italic;
}

.loading {
  color: #777;
}

.error {
  color: #d32f2f;
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
                    The Dog API is a free, public API that doesn't require authentication. It provides random dog
                    images, breed listings, and breed-specific images.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your dog gallery application:</p>
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
                    Open your HTML file in a browser to test your dog gallery application. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>View random dog images</li>
                    <li>Select specific dog breeds</li>
                    <li>Select sub-breeds when available</li>
                    <li>Get multiple dog images at once</li>
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
                      <strong>404 Not Found</strong>: Invalid endpoint, breed, or sub-breed
                    </li>
                    <li>
                      <strong>Network Errors</strong>: Connection issues or API downtime
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Image Loading</h3>
                  <p>
                    Some dog images might be large and take time to load. Consider implementing loading indicators or
                    lazy loading for better user experience.
                  </p>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      Add error handling for image loading failures. You can use the onerror event on image elements to
                      display a fallback image or message if a dog image fails to load.
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
                        href="https://dog.ceo/dog-api/documentation/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official Dog API Documentation"
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
