import { Badge } from "@/components/ui/badge"

export default function ErrorHandlingGuide() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold tracking-tight">Error Handling Best Practices</h1>
            <Badge>Intermediate</Badge>
          </div>
          <p className="text-muted-foreground">Estimated reading time: 20 min</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2>Understanding API Errors</h2>
          <p>
            Proper error handling is crucial for building robust applications that can gracefully handle
            unexpected situations and provide meaningful feedback to users.
          </p>

          <h2>Common HTTP Status Codes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">2xx Success</h3>
              <ul className="mt-2">
                <li><strong>200:</strong> OK</li>
                <li><strong>201:</strong> Created</li>
                <li><strong>204:</strong> No Content</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">4xx Client Errors</h3>
              <ul className="mt-2">
                <li><strong>400:</strong> Bad Request</li>
                <li><strong>401:</strong> Unauthorized</li>
                <li><strong>403:</strong> Forbidden</li>
                <li><strong>404:</strong> Not Found</li>
                <li><strong>429:</strong> Too Many Requests</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">5xx Server Errors</h3>
              <ul className="mt-2">
                <li><strong>500:</strong> Internal Server Error</li>
                <li><strong>502:</strong> Bad Gateway</li>
                <li><strong>503:</strong> Service Unavailable</li>
              </ul>
            </div>
          </div>

          <h2>Implementing Error Handling</h2>
          <p>Here's an example of comprehensive error handling in JavaScript:</p>
          <pre className="bg-slate-100 p-4 rounded-lg">
{`async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      // Handle specific status codes
      switch (response.status) {
        case 401:
          throw new Error('Authentication required');
        case 403:
          throw new Error('Access forbidden');
        case 404:
          throw new Error('Resource not found');
        case 429:
          throw new Error('Rate limit exceeded');
        default:
          throw new Error(\`HTTP error! status: \${response.status}\`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Log the error for debugging
    console.error('API Error:', error);
    
    // Rethrow or handle appropriately
    throw error;
  }
}`}</pre>

          <h2>Best Practices for Error Handling</h2>
          <ol>
            <li>
              <strong>Validate Input Data</strong>
              <p>Always validate input data before making API calls to prevent unnecessary errors.</p>
            </li>
            <li>
              <strong>Use Try-Catch Blocks</strong>
              <p>Wrap API calls in try-catch blocks to handle both expected and unexpected errors.</p>
            </li>
            <li>
              <strong>Implement Retry Logic</strong>
              <p>For transient errors, implement retry logic with exponential backoff.</p>
            </li>
            <li>
              <strong>Provide Meaningful Error Messages</strong>
              <p>Display user-friendly error messages while logging detailed errors for debugging.</p>
            </li>
          </ol>

          <h2>Retry Strategy Implementation</h2>
          <pre className="bg-slate-100 p-4 rounded-lg">
{`async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
      
      // Only retry on specific status codes
      if (![408, 500, 502, 503, 504].includes(response.status)) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      // Calculate exponential backoff delay
      const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}`}</pre>

          <h2>Error Logging and Monitoring</h2>
          <p>
            Implement proper error logging to track and debug issues in production:
          </p>
          <ul>
            <li>Log error details including timestamp, error message, and stack trace</li>
            <li>Include relevant context such as user ID and request parameters</li>
            <li>Use error monitoring services (e.g., Sentry, LogRocket)</li>
            <li>Set up alerts for critical errors</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
            <p className="text-blue-700">
              💡 Pro Tip: Always log errors in a structured format to make them easier to analyze and search.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 