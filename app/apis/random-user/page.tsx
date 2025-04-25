import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"

export default function RandomUserApiPage() {
  const api = {
    id: "random-user",
    name: "Random User API",
    description: "Generate random user data for testing and prototyping",
    category: "Data",
    difficulty: "Beginner",
    baseUrl: "https://randomuser.me/api",
    authType: "None",
    endpoints: [
      {
        name: "Random Users",
        path: "/",
        method: "GET",
        description: "Generate random user data",
        parameters: [
          {
            name: "results",
            type: "number",
            required: false,
            description: "Number of results to return (default: 1)",
          },
          {
            name: "gender",
            type: "string",
            required: false,
            description: "Specify gender (male or female)",
          },
          {
            name: "nat",
            type: "string",
            required: false,
            description:
              "Specify nationality (AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IN, IR, MX, NL, NO, NZ, RS, TR, UA, US)",
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
  <title>Random User Generator</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Random User Generator</h1>
    
    <div class="controls">
      <div class="form-group">
        <label for="results">Number of Users:</label>
        <input type="number" id="results" min="1" max="50" value="1">
      </div>
      
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select id="gender">
          <option value="">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="nationality">Nationality:</label>
        <select id="nationality">
          <option value="">Any</option>
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
        </select>
      </div>
      
      <button id="generate-btn">Generate Users</button>
    </div>
    
    <div id="user-container"></div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`

  const javascriptCode = `// DOM Elements
const resultsInput = document.getElementById('results');
const genderSelect = document.getElementById('gender');
const nationalitySelect = document.getElementById('nationality');
const generateBtn = document.getElementById('generate-btn');
const userContainer = document.getElementById('user-container');

// Event Listeners
generateBtn.addEventListener('click', generateUsers);

// Generate Users Function
async function generateUsers() {
  // Get values from form
  const results = resultsInput.value || 1;
  const gender = genderSelect.value;
  const nationality = nationalitySelect.value;
  
  // Build API URL with parameters
  let apiUrl = 'https://randomuser.me/api/?';
  
  // Add parameters if they exist
  if (results) apiUrl += \`results=\${results}&\`;
  if (gender) apiUrl += \`gender=\${gender}&\`;
  if (nationality) apiUrl += \`nat=\${nationality}&\`;
  
  // Show loading state
  userContainer.innerHTML = '<div class="loading">Loading users...</div>';
  
  try {
    // Fetch data from API
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    displayUsers(data.results);
  } catch (error) {
    console.error('Error fetching users:', error);
    userContainer.innerHTML = '<div class="error">Failed to load users. Please try again.</div>';
  }
}

// Display Users Function
function displayUsers(users) {
  // Clear previous results
  userContainer.innerHTML = '';
  
  // Create user cards
  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
    
    userCard.innerHTML = \`
      <div class="user-image">
        <img src="\${user.picture.large}" alt="User Image">
      </div>
      <div class="user-info">
        <h2>\${user.name.first} \${user.name.last}</h2>
        <p><strong>Email:</strong> \${user.email}</p>
        <p><strong>Phone:</strong> \${user.phone}</p>
        <p><strong>Location:</strong> \${user.location.city}, \${user.location.country}</p>
        <p><strong>Age:</strong> \${user.dob.age}</p>
      </div>
    \`;
    
    userContainer.appendChild(userCard);
  });
}

// Generate initial user on page load
generateUsers();`

  const cssCode = `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #2e7d32;
  margin-bottom: 30px;
}

.controls {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;
}

.form-group {
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

#generate-btn {
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

#generate-btn:hover {
  background-color: #1b5e20;
}

#user-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.user-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.user-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  padding: 15px;
}

.user-info h2 {
  margin-top: 0;
  color: #2e7d32;
}

.loading {
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #666;
}

.error {
  text-align: center;
  padding: 20px;
  color: #d32f2f;
  font-weight: bold;
}`

  return (
    <div>
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
                      The Random User API is a free, public API that doesn't require authentication. It generates random
                      user data for testing and prototyping purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                    <p className="mb-4">Create the necessary files for your random user generator application:</p>
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
                      Open your HTML file in a browser to test your random user generator application. You should be
                      able to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Generate random users</li>
                      <li>Filter users by gender</li>
                      <li>Filter users by nationality</li>
                      <li>Specify the number of users to generate</li>
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
                      The Random User API doesn't explicitly state rate limits, but as with any public API, it's good
                      practice to implement reasonable request limits in your application.
                    </p>
                    <Alert className="mt-4">
                      <AlertTitle>Best Practice</AlertTitle>
                      <AlertDescription>
                        To be a good API citizen, avoid making excessive requests in short periods. Consider adding a
                        small delay between rapid successive requests or implementing caching for repeated requests.
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
                          href="https://randomuser.me/documentation"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                          aria-label="Official Random User API Documentation"
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
    </div>
  )
}
