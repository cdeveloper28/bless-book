import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "@/components/code-block"

export default function GettingStartedGuide() {
  // Sample code snippets
  const fetchExample = `// Basic fetch example
fetch('https://api.example.com/data')
  .then(response => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`

  const asyncAwaitExample = `// Using async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('Success:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function
fetchData();`

  const axiosExample = `// Using Axios
import axios from 'axios';

axios.get('https://api.example.com/data')
  .then(response => {
    console.log('Success:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`

  const nodeExample = `// Using Node.js
import https from 'https';

https.get('https://api.example.com/data', (res) => {
  let data = '';

  // A chunk of data has been received
  res.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received
  res.on('end', () => {
    console.log(JSON.parse(data));
  });

}).on('error', (error) => {
  console.error('Error:', error);
});`

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/guides" aria-label="Back to guides">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Getting Started with APIs</h1>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Beginner</span>
          <span>•</span>
          <span>15 min read</span>
          <span>•</span>
          <span>Last updated: April 25, 2025</span>
        </div>

        <div className="prose prose-green dark:prose-invert max-w-none">
          <h2>What is an API?</h2>
          <p>
            API stands for <strong>Application Programming Interface</strong>. In simple terms, an API is a set of rules
            and protocols that allows one software application to interact with another. It defines the methods and data
            formats that applications can use to communicate with each other.
          </p>

          <p>
            Think of an API as a waiter in a restaurant. You (the client) don't go directly into the kitchen (the
            server) to prepare your meal. Instead, you give your order to the waiter (the API), who takes it to the
            kitchen, and then brings back your food.
          </p>

          <h2>Types of APIs</h2>
          <p>There are several types of APIs, but the most common ones you'll encounter are:</p>

          <ul>
            <li>
              <strong>REST APIs</strong> (Representational State Transfer): These use standard HTTP methods (GET, POST,
              PUT, DELETE) to perform operations on resources. They're stateless and typically return data in JSON or
              XML format.
            </li>
            <li>
              <strong>SOAP APIs</strong> (Simple Object Access Protocol): These use XML for message format and typically
              rely on HTTP and SMTP for message transmission.
            </li>
            <li>
              <strong>GraphQL APIs</strong>: These allow clients to request exactly the data they need, making them more
              efficient than REST APIs in many cases.
            </li>
            <li>
              <strong>WebSocket APIs</strong>: These provide full-duplex communication channels over a single TCP
              connection, enabling real-time data transfer.
            </li>
          </ul>

          <h2>Making Your First API Call</h2>
          <p>
            Let's start by making a simple API call using JavaScript's fetch API, which is available in all modern
            browsers and Node.js environments.
          </p>

          <Tabs defaultValue="fetch">
            <TabsList>
              <TabsTrigger value="fetch">Fetch API</TabsTrigger>
              <TabsTrigger value="async">Async/Await</TabsTrigger>
              <TabsTrigger value="axios">Axios</TabsTrigger>
              <TabsTrigger value="node">Node.js</TabsTrigger>
            </TabsList>
            <TabsContent value="fetch">
              <p>The Fetch API provides a simple interface for fetching resources. Here's a basic example:</p>
              <CodeBlock code={fetchExample} language="javascript" />
            </TabsContent>
            <TabsContent value="async">
              <p>Using async/await makes your code cleaner and easier to read:</p>
              <CodeBlock code={asyncAwaitExample} language="javascript" />
            </TabsContent>
            <TabsContent value="axios">
              <p>Axios is a popular HTTP client that simplifies making API requests:</p>
              <CodeBlock code={axiosExample} language="javascript" />
            </TabsContent>
            <TabsContent value="node">
              <p>If you're using Node.js without additional libraries, you can use the built-in https module:</p>
              <CodeBlock code={nodeExample} language="javascript" />
            </TabsContent>
          </Tabs>

          <h2>Understanding API Responses</h2>
          <p>When you make an API request, the server will respond with:</p>
          <ul>
            <li>
              A <strong>status code</strong> indicating the result of the request (e.g., 200 for success, 404 for not
              found)
            </li>
            <li>
              <strong>Headers</strong> containing metadata about the response
            </li>
            <li>
              A <strong>body</strong> containing the actual data, typically in JSON or XML format
            </li>
          </ul>

          <p>Here's an example of a typical JSON response:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2023-04-25T10:30:00Z"
}`}
          </pre>

          <h2>Common HTTP Methods</h2>
          <p>When working with REST APIs, you'll use different HTTP methods for different operations:</p>
          <ul>
            <li>
              <strong>GET</strong>: Retrieve data from the server
            </li>
            <li>
              <strong>POST</strong>: Create a new resource on the server
            </li>
            <li>
              <strong>PUT</strong>: Update an existing resource on the server
            </li>
            <li>
              <strong>DELETE</strong>: Remove a resource from the server
            </li>
            <li>
              <strong>PATCH</strong>: Partially update a resource
            </li>
          </ul>

          <h2>API Authentication</h2>
          <p>
            Most APIs require some form of authentication to ensure that only authorized users can access them. Common
            authentication methods include:
          </p>
          <ul>
            <li>
              <strong>API Keys</strong>: A simple string that identifies your application
            </li>
            <li>
              <strong>OAuth</strong>: A protocol that allows third-party applications to access user data without
              exposing credentials
            </li>
            <li>
              <strong>JWT (JSON Web Tokens)</strong>: A compact, self-contained way for securely transmitting
              information between parties
            </li>
            <li>
              <strong>Basic Authentication</strong>: Using a username and password
            </li>
          </ul>

          <p>
            For more details on authentication methods, check out our{" "}
            <Link href="/guides/authentication" className="text-primary hover:underline">
              API Authentication Methods
            </Link>{" "}
            guide.
          </p>

          <h2>Best Practices</h2>
          <p>When working with APIs, keep these best practices in mind:</p>
          <ul>
            <li>Always handle errors gracefully</li>
            <li>Implement proper error handling and retry mechanisms</li>
            <li>Be mindful of rate limits</li>
            <li>Cache responses when appropriate</li>
            <li>Keep your authentication credentials secure</li>
            <li>Use HTTPS for all API requests</li>
          </ul>

          <h2>Next Steps</h2>
          <p>
            Now that you understand the basics of APIs, you're ready to start integrating them into your applications.
            Check out our other guides for more advanced topics:
          </p>
          <ul>
            <li>
              <Link href="/guides/authentication" className="text-primary hover:underline">
                API Authentication Methods
              </Link>
            </li>
            <li>
              <Link href="/guides/error-handling" className="text-primary hover:underline">
                Error Handling Best Practices
              </Link>
            </li>
            <li>
              <Link href="/guides/rate-limiting" className="text-primary hover:underline">
                Dealing with Rate Limits
              </Link>
            </li>
          </ul>

          <p>
            Or browse our{" "}
            <Link href="/apis" className="text-primary hover:underline">
              API Catalog
            </Link>{" "}
            to find specific APIs to integrate into your projects.
          </p>
        </div>
      </div>
    </div>
  )
}
