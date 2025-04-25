import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"

export default function BoredApiPage() {
  const api = {
    id: "bored-api",
    name: "Bored API",
    description: "Free API for activity suggestions to cure boredom",
    category: "Entertainment",
    difficulty: "Beginner",
    baseUrl: "https://www.boredapi.com/api",
    authType: "None",
    endpoints: [
      {
        name: "Random Activity",
        path: "/activity",
        method: "GET",
        description: "Get a random activity suggestion",
        parameters: [],
      },
      {
        name: "Activity by Type",
        path: "/activity?type={type}",
        method: "GET",
        description: "Get an activity of a specific type",
        parameters: [
          {
            name: "type",
            type: "string",
            required: true,
            description:
              "Type of activity (education, recreational, social, diy, charity, cooking, relaxation, music, busywork)",
          },
        ],
      },
      {
        name: "Activity by Participants",
        path: "/activity?participants={participants}",
        method: "GET",
        description: "Get an activity for a specific number of participants",
        parameters: [
          {
            name: "participants",
            type: "number",
            required: true,
            description: "Number of participants (1-5)",
          },
        ],
      },
      {
        name: "Activity by Price Range",
        path: "/activity?minprice={minprice}&maxprice={maxprice}",
        method: "GET",
        description: "Get an activity within a price range",
        parameters: [
          {
            name: "minprice",
            type: "number",
            required: false,
            description: "Minimum price (0.0-1.0)",
          },
          {
            name: "maxprice",
            type: "number",
            required: false,
            description: "Maximum price (0.0-1.0)",
          },
        ],
      },
      {
        name: "Activity by Accessibility",
        path: "/activity?accessibility={accessibility}",
        method: "GET",
        description: "Get an activity with a specific accessibility level",
        parameters: [
          {
            name: "accessibility",
            type: "number",
            required: true,
            description: "Accessibility level (0.0-1.0, where 0 is most accessible)",
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
  <title>Bored? Find Something To Do!</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Bored? Find Something To Do!</h1>
    
    <div class="activity-container">
      <div class="activity-card">
        <h2 id="activity-title">Ready for a suggestion?</h2>
        <p id="activity-description">Click the button below to get an activity suggestion.</p>
        <div id="activity-details" class="activity-details hidden">
          <div class="detail">
            <span class="label">Type:</span>
            <span id="activity-type"></span>
          </div>
          <div class="detail">
            <span class="label">Participants:</span>
            <span id="activity-participants"></span>
          </div>
          <div class="detail">
            <span class="label">Price:</span>
            <div id="activity-price-bar" class="price-bar">
              <div id="activity-price-indicator" class="price-indicator"></div>
            </div>
          </div>
          <div class="detail">
            <span class="label">Accessibility:</span>
            <div id="activity-accessibility-bar" class="accessibility-bar">
              <div id="activity-accessibility-indicator" class="accessibility-indicator"></div>
            </div>
          </div>
        </div>
      </div>
      
      <button id="get-activity-btn">Find Something To Do</button>
    </div>
    
    <div class="filters-container">
      <h2>Filters</h2>
      <div class="filters">
        <div class="filter-group">
          <label for="type-select">Activity Type:</label>
          <select id="type-select">
            <option value="">Any Type</option>
            <option value="education">Education</option>
            <option value="recreational">Recreational</option>
            <option value="social">Social</option>
            <option value="diy">DIY</option>
            <option value="charity">Charity</option>
            <option value="cooking">Cooking</option>
            <option value="relaxation">Relaxation</option>
            <option value="music">Music</option>
            <option value="busywork">Busywork</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="participants-select">Participants:</label>
          <select id="participants-select">
            <option value="">Any Number</option>
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="3">3 People</option>
            <option value="4">4 People</option>
            <option value="5">5+ People</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="price-select">Price Range:</label>
          <select id="price-select">
            <option value="">Any Price</option>
            <option value="free">Free</option>
            <option value="low">Low Cost</option>
            <option value="medium">Medium Cost</option>
            <option value="high">High Cost</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="accessibility-select">Accessibility:</label>
          <select id="accessibility-select">
            <option value="">Any Level</option>
            <option value="high">High (Easy to access)</option>
            <option value="medium">Medium</option>
            <option value="low">Low (Harder to access)</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="saved-activities">
      <h2>Saved Activities</h2>
      <div id="saved-list" class="saved-list">
        <p class="empty-message">No saved activities yet. Click the "Save" button when you find an activity you like!</p>
      </div>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`

  const javascriptCode = `// API Base URL
const API_BASE_URL = 'https://www.boredapi.com/api';

// DOM Elements
const activityTitle = document.getElementById('activity-title');
const activityDescription = document.getElementById('activity-description');
const activityDetails = document.getElementById('activity-details');
const activityType = document.getElementById('activity-type');
const activityParticipants = document.getElementById('activity-participants');
const activityPriceIndicator = document.getElementById('activity-price-indicator');
const activityAccessibilityIndicator = document.getElementById('activity-accessibility-indicator');
const getActivityBtn = document.getElementById('get-activity-btn');
const typeSelect = document.getElementById('type-select');
const participantsSelect = document.getElementById('participants-select');
const priceSelect = document.getElementById('price-select');
const accessibilitySelect = document.getElementById('accessibility-select');
const savedList = document.getElementById('saved-list');

// Current activity
let currentActivity = null;

// Event Listeners
getActivityBtn.addEventListener('click', getActivity);

// Get an activity based on filters
async function getActivity() {
  // Show loading state
  activityTitle.textContent = 'Finding an activity...';
  activityDescription.textContent = 'Please wait a moment.';
  activityDetails.classList.add('hidden');
  getActivityBtn.disabled = true;
  
  try {
    // Build URL with filters
    let url = \`\${API_BASE_URL}/activity\`;
    const params = new URLSearchParams();
    
    // Add type filter if selected
    if (typeSelect.value) {
      params.append('type', typeSelect.value);
    }
    
    // Add participants filter if selected
    if (participantsSelect.value) {
      params.append('participants', participantsSelect.value);
    }
    
    // Add price filter if selected
    if (priceSelect.value) {
      switch (priceSelect.value) {
        case 'free':
          params.append('minprice', 0);
          params.append('maxprice', 0);
          break;
        case 'low':
          params.append('minprice', 0.01);
          params.append('maxprice', 0.3);
          break;
        case 'medium':
          params.append('minprice', 0.3);
          params.append('maxprice', 0.6);
          break;
        case 'high':
          params.append('minprice', 0.6);
          params.append('maxprice', 1);
          break;
      }
    }
    
    // Add accessibility filter if selected
    if (accessibilitySelect.value) {
      switch (accessibilitySelect.value) {
        case 'high':
          params.append('minaccessibility', 0);
          params.append('maxaccessibility', 0.3);
          break;
        case 'medium':
          params.append('minaccessibility', 0.3);
          params.append('maxaccessibility', 0.7);
          break;
        case 'low':
          params.append('minaccessibility', 0.7);
          params.append('maxaccessibility', 1);
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
    
    const data = await response.json();
    
    // Check if we got an error response (no activity found)
    if (data.error) {
      throw new Error(data.error);
    }
    
    // Store current activity
    currentActivity = data;
    
    // Display the activity
    displayActivity(data);
  } catch (error) {
    console.error('Error fetching activity:', error);
    activityTitle.textContent = 'Oops!';
    activityDescription.textContent = \`Couldn't find an activity with those filters. Try different options!\`;
    activityDetails.classList.add('hidden');
  } finally {
    getActivityBtn.disabled = false;
    getActivityBtn.textContent = 'Try Another Activity';
  }
}

// Display an activity
function displayActivity(activity) {
  activityTitle.textContent = activity.activity;
  activityDescription.textContent = \`Here's something to do!\`;
  
  // Show details
  activityDetails.classList.remove('hidden');
  
  // Set type
  activityType.textContent = capitalizeFirstLetter(activity.type);
  
  // Set participants
  activityParticipants.textContent = activity.participants === 1 
    ? '1 person' 
    : \`\${activity.participants} people\`;
  
  // Set price indicator (0 to 1 scale)
  const pricePercentage = activity.price * 100;
  activityPriceIndicator.style.width = \`\${pricePercentage}%\`;
  
  // Set accessibility indicator (0 to 1 scale)
  const accessibilityPercentage = activity.accessibility * 100;
  activityAccessibilityIndicator.style.width = \`\${accessibilityPercentage}%\`;
  
  // Add save button if not already there
  if (!document.getElementById('save-activity-btn')) {
    const saveBtn = document.createElement('button');
    saveBtn.id = 'save-activity-btn';
    saveBtn.className = 'save-btn';
    saveBtn.textContent = 'Save This Activity';
    saveBtn.addEventListener('click', saveCurrentActivity);
    activityDetails.appendChild(saveBtn);
  }
}

// Save current activity to the saved list
function saveCurrentActivity() {
  if (!currentActivity) return;
  
  // Remove empty message if it exists
  const emptyMessage = savedList.querySelector('.empty-message');
  if (emptyMessage) {
    savedList.removeChild(emptyMessage);
  }
  
  // Create saved activity element
  const savedActivity = document.createElement('div');
  savedActivity.className = 'saved-activity';
  
  savedActivity.innerHTML = \`
    <h3>\${currentActivity.activity}</h3>
    <div class="saved-activity-details">
      <span class="saved-type">\${capitalizeFirstLetter(currentActivity.type)}</span>
      <span class="saved-participants">\${currentActivity.participants} participant(s)</span>
    </div>
    <button class="remove-btn">Remove</button>
  \`;
  
  // Add remove functionality
  const removeBtn = savedActivity.querySelector('.remove-btn');
  removeBtn.addEventListener('click', () => {
    savedList.removeChild(savedActivity);
    
    // Add empty message if no saved activities
    if (savedList.children.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.className = 'empty-message';
      emptyMessage.textContent = 'No saved activities yet. Click the "Save" button when you find an activity you like!';
      savedList.appendChild(emptyMessage);
    }
  });
  
  // Add to saved list
  savedList.appendChild(savedActivity);
  
  // Show confirmation
  const saveBtn = document.getElementById('save-activity-btn');
  saveBtn.textContent = 'Saved!';
  setTimeout(() => {
    saveBtn.textContent = 'Save This Activity';
  }, 2000);
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

.activity-container {
  margin-bottom: 40px;
}

.activity-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#activity-title {
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 15px;
  color: #2e7d32;
}

#activity-description {
  font-size: 18px;
  margin-bottom: 20px;
}

.activity-details {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.hidden {
  display: none;
}

.detail {
  margin-bottom: 15px;
}

.label {
  font-weight: bold;
  margin-right: 10px;
  display: inline-block;
  width: 100px;
}

.price-bar, .accessibility-bar {
  display: inline-block;
  width: 200px;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  vertical-align: middle;
}

.price-indicator, .accessibility-indicator {
  height: 100%;
  background-color: #2e7d32;
  border-radius: 5px;
  width: 0;
  transition: width 0.5s ease;
}

#get-activity-btn {
  display: block;
  width: 100%;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#get-activity-btn:hover:not(:disabled) {
  background-color: #1b5e20;
}

#get-activity-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.filters-container {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.filter-group {
  display: flex;
  flex-direction: column;
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

.save-btn {
  display: block;
  margin-top: 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-btn:hover {
  background-color: #0b7dda;
}

.saved-activities {
  margin-top: 40px;
}

.saved-list {
  margin-top: 20px;
}

.saved-activity {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.saved-activity h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #2e7d32;
}

.saved-activity-details {
  display: flex;
  gap: 15px;
}

.saved-type, .saved-participants {
  font-size: 14px;
  color: #666;
}

.remove-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
}

.empty-message {
  text-align: center;
  color: #777;
  font-style: italic;
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
                    The Bored API is a free, public API that doesn't require authentication. It provides random activity
                    suggestions to help cure boredom, with options to filter by type, number of participants, price, and
                    accessibility.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your activity suggestion application:</p>
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
                    Open your HTML file in a browser to test your activity suggestion application. You should be able
                    to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Get random activity suggestions</li>
                    <li>Filter activities by type, participants, price, and accessibility</li>
                    <li>Save activities you're interested in</li>
                    <li>Remove saved activities</li>
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
                      <strong>No Activity Found</strong>: The API may return an error when no activity matches the
                      filters
                    </li>
                    <li>
                      <strong>Network Errors</strong>: Connection issues or API downtime
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Filter Combinations</h3>
                  <p>
                    Some combinations of filters might not yield any results. For example, there might not be any free
                    activities for 5 participants in the cooking category.
                  </p>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      When implementing filters, provide clear feedback to users when no activities match their
                      criteria. Suggest trying different filter combinations to help them find suitable activities.
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
                        href="https://www.boredapi.com/documentation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official Bored API Documentation"
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
