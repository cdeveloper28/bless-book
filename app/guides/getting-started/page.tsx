import { Badge } from "@/components/ui/badge"

export default function GettingStartedGuide() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold tracking-tight">Getting Started with APIs</h1>
            <Badge>Beginner</Badge>
          </div>
          <p className="text-muted-foreground">Estimated reading time: 15 min</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2>What is an API?</h2>
          <p>
            An API (Application Programming Interface) is a set of rules and protocols that allows different software
            applications to communicate with each other. Think of it as a waiter in a restaurant - you (the client)
            make requests, and the kitchen (the server) fulfills them according to a predefined menu (the API documentation).
          </p>

          <h2>Making Your First API Call</h2>
          <p>
            The most common way to interact with APIs is through HTTP requests. Here are the basic components:
          </p>
          <ul>
            <li><strong>Endpoint URL:</strong> The specific address where the API can be accessed</li>
            <li><strong>HTTP Method:</strong> GET (retrieve data), POST (create data), PUT/PATCH (update data), DELETE (remove data)</li>
            <li><strong>Headers:</strong> Additional information sent with the request (authentication, content type)</li>
            <li><strong>Body:</strong> Data sent with the request (for POST, PUT, PATCH methods)</li>
          </ul>

          <h3>Example API Call</h3>
          <pre className="bg-slate-100 p-4 rounded-lg">
{`// Using fetch in JavaScript
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
          </pre>

          <h2>Understanding API Responses</h2>
          <p>
            API responses typically include:
          </p>
          <ul>
            <li><strong>Status Code:</strong> Indicates the result of the request (200 for success, 404 for not found, etc.)</li>
            <li><strong>Response Body:</strong> The actual data returned by the API</li>
            <li><strong>Response Headers:</strong> Additional metadata about the response</li>
          </ul>

          <h2>Best Practices for Getting Started</h2>
          <ol>
            <li>Always read the API documentation thoroughly</li>
            <li>Start with simple GET requests to understand the API's response format</li>
            <li>Use API testing tools like Postman for initial experimentation</li>
            <li>Implement proper error handling from the beginning</li>
            <li>Keep track of API rate limits and usage quotas</li>
          </ol>

          <h2>Next Steps</h2>
          <p>
            Now that you understand the basics, you might want to explore:
          </p>
          <ul>
            <li>Different authentication methods</li>
            <li>Working with query parameters and request bodies</li>
            <li>Handling API errors gracefully</li>
            <li>Implementing API caching</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 