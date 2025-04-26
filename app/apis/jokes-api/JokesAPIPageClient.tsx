"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "@/components/code-block"
import { BlessCliIntegration } from "@/components/bless-cli-integration"
import { InfoIcon } from "lucide-react"

export default function JokesAPIPageClient() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">Jokes API</h1>
      <p className="text-xl text-muted-foreground mb-8">
        A simple API for getting random jokes to add humor to your applications
      </p>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              The Jokes API provides a simple way to get random jokes for your applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The Jokes API (JokeAPI) is a free REST API that serves jokes in various categories. It's perfect for
              adding a bit of humor to your applications, chatbots, or websites. The API is simple to use and doesn't
              require authentication.
            </p>

            <h3 className="text-lg font-semibold mt-6">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Free to use with no API key required</li>
              <li>Multiple joke categories (Programming, Misc, Dark, Pun, Spooky, Christmas)</li>
              <li>Filter jokes by category, type, and content flags</li>
              <li>Get single jokes or multiple jokes at once</li>
              <li>JSON and plain text response formats</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>How to start using the Jokes API</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">Base URL</h3>
            <p className="mb-4">The base URL for all API requests is:</p>
            <CodeBlock code="https://v2.jokeapi.dev" language="plaintext" />

            <h3 className="text-lg font-semibold mt-6">Authentication</h3>
            <p>
              The Jokes API doesn't require authentication. You can start making requests right away without an API key.
            </p>

            <Alert className="mt-6">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Rate Limiting</AlertTitle>
              <AlertDescription>
                The API has a rate limit of 120 requests per minute. If you exceed this limit, you'll receive a 429 Too
                Many Requests response.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
            <CardDescription>Available endpoints and how to use them</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="random">
              <TabsList>
                <TabsTrigger value="random">Random Joke</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="filters">Filters</TabsTrigger>
              </TabsList>
              <TabsContent value="random">
                <h3 className="text-lg font-semibold">Get a Random Joke</h3>
                <p className="mb-4">Retrieve a random joke from any category:</p>
                <CodeBlock code="GET https://v2.jokeapi.dev/joke/Any" language="plaintext" />

                <h4 className="text-md font-semibold mt-6">Example Response</h4>
                <CodeBlock
                  code={`{
  "error": false,
  "category": "Programming",
  "type": "twopart",
  "setup": "Why do programmers prefer dark mode?",
  "delivery": "Because light attracts bugs!",
  "flags": {
    "nsfw": false,
    "religious": false,
    "political": false,
    "racist": false,
    "sexist": false,
    "explicit": false
  },
  "id": 13,
  "safe": true,
  "lang": "en"
}`}
                  language="json"
                />
              </TabsContent>
              <TabsContent value="categories">
                <h3 className="text-lg font-semibold">Get Jokes by Category</h3>
                <p className="mb-4">Retrieve jokes from specific categories:</p>
                <CodeBlock code="GET https://v2.jokeapi.dev/joke/Programming" language="plaintext" />

                <p className="mt-4">Available categories:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Programming</li>
                  <li>Misc</li>
                  <li>Dark</li>
                  <li>Pun</li>
                  <li>Spooky</li>
                  <li>Christmas</li>
                </ul>

                <p className="mt-4">You can also request multiple categories:</p>
                <CodeBlock code="GET https://v2.jokeapi.dev/joke/Programming,Misc" language="plaintext" />
              </TabsContent>
              <TabsContent value="filters">
                <h3 className="text-lg font-semibold">Filter Jokes</h3>
                <p className="mb-4">You can filter jokes using various parameters:</p>

                <h4 className="text-md font-semibold mt-4">By Type</h4>
                <p className="mb-2">Get only single or twopart jokes:</p>
                <CodeBlock code="GET https://v2.jokeapi.dev/joke/Any?type=single" language="plaintext" />
                <CodeBlock code="GET https://v2.jokeapi.dev/joke/Any?type=twopart" language="plaintext" />

                <h4 className="text-md font-semibold mt-4">By Content Flags</h4>
                <p className="mb-2">Filter out jokes with specific content:</p>
                <CodeBlock
                  code="GET https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political"
                  language="plaintext"
                />

                <h4 className="text-md font-semibold mt-4">Safe Mode</h4>
                <p className="mb-2">Get only safe-for-work jokes:</p>
                <CodeBlock code="GET https://v2.jokeapi.dev/joke/Any?safe-mode" language="plaintext" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Code Examples</CardTitle>
            <CardDescription>How to use the Jokes API in your code</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript">
              <TabsList>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
              </TabsList>
              <TabsContent value="javascript">
                <h3 className="text-lg font-semibold">Fetch a Random Joke</h3>
                <CodeBlock
                  code={`// Using fetch API
async function getRandomJoke() {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any');
    const data = await response.json();
    
    if (data.error) {
      console.error('Error fetching joke:', data.message);
      return null;
    }
    
    if (data.type === 'single') {
      console.log('Joke:', data.joke);
    } else {
      console.log('Setup:', data.setup);
      console.log('Delivery:', data.delivery);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching joke:', error);
    return null;
  }
}

// Call the function
getRandomJoke();`}
                  language="javascript"
                />
              </TabsContent>
              <TabsContent value="python">
                <h3 className="text-lg font-semibold">Fetch a Random Joke</h3>
                <CodeBlock
                  code={`import requests

def get_random_joke():
    try:
        response = requests.get('https://v2.jokeapi.dev/joke/Any')
        data = response.json()
        
        if data.get('error'):
            print(f"Error fetching joke: {data.get('message')}")
            return None
        
        if data.get('type') == 'single':
            print(f"Joke: {data.get('joke')}")
        else:
            print(f"Setup: {data.get('setup')}")
            print(f"Delivery: {data.get('delivery')}")
        
        return data
    except Exception as e:
        print(f"Error fetching joke: {e}")
        return None

# Call the function
get_random_joke()`}
                  language="python"
                />
              </TabsContent>
              <TabsContent value="react">
                <h3 className="text-lg font-semibold">Joke Component</h3>
                <CodeBlock
                  code={`import { useState, useEffect } from 'react';

function JokeComponent() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode');
      const data = await response.json();
      
      if (data.error) {
        setError(data.message);
        setJoke(null);
      } else {
        setJoke(data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch joke');
      setJoke(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  if (loading) return <p>Loading joke...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!joke) return <p>No joke found</p>;

  return (
    <div className="joke-container">
      <h2>Random Joke</h2>
      {joke.type === 'single' ? (
        <p>{joke.joke}</p>
      ) : (
        <>
          <p><strong>{joke.setup}</strong></p>
          <p>{joke.delivery}</p>
        </>
      )}
      <button onClick={fetchJoke}>Get Another Joke</button>
    </div>
  );
}

export default JokeComponent;`}
                  language="jsx"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Handling</CardTitle>
            <CardDescription>Common errors and how to handle them</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">Common Error Responses</h3>
            <p className="mb-4">The API may return the following error responses:</p>

            <div className="space-y-4">
              <div>
                <h4 className="text-md font-semibold">404 Not Found</h4>
                <p>The requested endpoint or resource doesn't exist.</p>
                <CodeBlock
                  code={`{
  "error": true,
  "internalError": false,
  "code": 404,
  "message": "No matching joke found",
  "causedBy": [
    "No jokes were found that match your provided filter(s)"
  ],
  "timestamp": 1642456789
}`}
                  language="json"
                />
              </div>

              <div>
                <h4 className="text-md font-semibold">429 Too Many Requests</h4>
                <p>You've exceeded the rate limit of 120 requests per minute.</p>
                <CodeBlock
                  code={`{
  "error": true,
  "internalError": false,
  "code": 429,
  "message": "Too many requests",
  "causedBy": [
    "You've exceeded the rate limit of 120 requests per minute"
  ],
  "timestamp": 1642456789
}`}
                  language="json"
                />
              </div>

              <div>
                <h4 className="text-md font-semibold">500 Internal Server Error</h4>
                <p>Something went wrong on the server.</p>
                <CodeBlock
                  code={`{
  "error": true,
  "internalError": true,
  "code": 500,
  "message": "Internal server error",
  "timestamp": 1642456789
}`}
                  language="json"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6">Best Practices for Error Handling</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Always check the "error" field in the response to determine if an error occurred</li>
              <li>Implement retry logic with exponential backoff for rate limit errors</li>
              <li>Provide user-friendly error messages in your application</li>
              <li>Log detailed error information for debugging purposes</li>
            </ul>
          </CardContent>
        </Card>

        <BlessCliIntegration
          apiName="Jokes API"
          apiBaseUrl="https://v2.jokeapi.dev"
          apiEndpoint="/joke/Any"
          authType="none"
        />

        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>More information about the Jokes API</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://jokeapi.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Official Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Sv443/JokeAPI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://jokeapi.dev/#try-it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Try It Tool
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
