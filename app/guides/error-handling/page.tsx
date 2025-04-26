import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Error Handling Best Practices | Bless API Book",
  description: "Discover best practices for handling API errors gracefully in your applications.",
}

export default function ErrorHandlingGuidePage() {
  // Sample code snippets
  const basicErrorHandlingExample = `// Basic error handling with fetch
fetch('https://api.example.com/data')
  .then(response => {
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

  const detailedErrorHandlingExample = `// More detailed error handling
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    // Check for HTTP errors
    if (!response.ok) {
      // Try to parse error response
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || \`HTTP error! Status: \${response.status}\`;
      } catch (e) {
        errorMessage = \`HTTP error! Status: \${response.status}\`;
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      console.error('Network error: Please check your connection');
      // Implement retry logic or fallback
    } else {
      console.error('Error:', error.message);
    }
    
    // Rethrow or handle appropriately
    throw error;
  }
}`

  const retryLogicExample = `// Implementing retry logic
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || \`HTTP error! Status: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    // Check if we should retry
    if (retries > 0) {
      // Check if error is retryable (e.g., 429, 503, network errors)
      const isRetryable = 
        error.name === 'TypeError' || // Network error
        (error.message && error.message.includes('429')) || // Too Many Requests
        (error.message && error.message.includes('503')); // Service Unavailable
      
      if (isRetryable) {
        console.log(\`Retrying... Attempts remaining: \${retries}\`);
        
        // Wait for backoff duration
        await new Promise(resolve => setTimeout(resolve, backoff));
        
        // Exponential backoff
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
      }
    }
    
    // If we're out of retries or error is not retryable
    throw error;
  }
}`

  const errorClassExample = `// Creating custom error classes
class APIError extends Error {
  constructor(message, status, code, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
    this.data = data;
  }
  
  isClientError() {
    return this.status >= 400 && this.status < 500;
  }
  
  isServerError() {
    return this.status >= 500;
  }
  
  isAuthError() {
    return this.status === 401 || this.status === 403;
  }
  
  isRateLimitError() {
    return this.status === 429;
  }
}

// Using the custom error class
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || 'An error occurred',
        response.status,
        errorData.code || 'unknown_error',
        errorData
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      if (error.isAuthError()) {
        console.error('Authentication error:', error.message);
        // Redirect to login or refresh token
      } else if (error.isRateLimitError()) {
        console.error('Rate limit exceeded:', error.message);
        // Implement backoff strategy
      } else if (error.isServerError()) {
        console.error('Server error:', error.message);
        // Show appropriate UI message
      } else {
        console.error('API error:', error.message);
        // Handle other API errors
      }
    } else {
      console.error('Network or parsing error:', error);
      // Handle network errors
    }
    
    throw error;
  }
}`

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/guides" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to Guides
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-6">Error Handling Best Practices</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead text-xl mb-8">
          Effective error handling is crucial for building robust API integrations. This guide covers best practices for
          handling API errors gracefully in your applications.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-8">
          <h3 className="text-blue-800 dark:text-blue-300 font-medium mb-2">In this guide:</h3>
          <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-400">
            <li>Understanding API Errors</li>
            <li>Common HTTP Status Codes</li>
            <li>Client-Side Error Handling</li>
            <li>Server-Side Error Handling</li>
            <li>Error Logging and Monitoring</li>
            <li>User-Friendly Error Messages</li>
            <li>Retry Strategies</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4" id="understanding-errors">
          Understanding API Errors
        </h2>
        <p>API errors can occur for various reasons, including:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Invalid input or parameters</li>
          <li>Authentication or authorization failures</li>
          <li>Resource not found</li>
          <li>Rate limiting or quota exceeded</li>
          <li>Server-side issues</li>
          <li>Network problems</li>
        </ul>

        <p className="mt-4">
          Understanding the different types of errors and how to handle them appropriately is essential for building
          resilient applications.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4" id="http-status-codes">
          Common HTTP Status Codes
        </h2>
        <p>
          HTTP status codes are standardized codes returned by a server in response to a client&apos;s request. They are
          grouped into five classes:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Code Range</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Category</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">1xx</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Informational</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Request received, continuing process
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">2xx</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Success</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Request successfully received, understood, and accepted
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">3xx</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Redirection</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Further action needs to be taken to complete the request
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">4xx</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Client Error</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Request contains bad syntax or cannot be fulfilled
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">5xx</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Server Error</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Server failed to fulfill a valid request
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Common error status codes you&apos;ll encounter when working with APIs:</p>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Status Code</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Name</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">400</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Bad Request</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  The request was malformed or contains invalid parameters
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">401</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Unauthorized</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Authentication is required and has failed or not been provided
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">403</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Forbidden</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  The server understood the request but refuses to authorize it
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">404</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Not Found</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  The requested resource could not be found
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">429</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Too Many Requests</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  The user has sent too many requests in a given amount of time (rate limiting)
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">500</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Internal Server Error</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  The server encountered an unexpected condition
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">503</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Service Unavailable</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  The server is not ready to handle the request (temporary overload or maintenance)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4" id="client-side-error-handling">
          Client-Side Error Handling
        </h2>
        <p>
          Proper client-side error handling is essential for creating a good user experience. Here are some best
          practices:
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Basic Error Handling</h3>
        <p>At a minimum, always check if the response was successful before processing it:</p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
          <pre className="text-sm">{basicErrorHandlingExample}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Detailed Error Handling</h3>
        <p>For more robust error handling, consider different types of errors and handle them appropriately:</p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
          <pre className="text-sm">{detailedErrorHandlingExample}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Implementing Retry Logic</h3>
        <p>
          For transient errors (like network issues or rate limiting), implementing retry logic with exponential backoff
          can improve reliability:
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
          <pre className="text-sm">{retryLogicExample}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Custom Error Classes</h3>
        <p>Creating custom error classes can help standardize error handling across your application:</p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
          <pre className="text-sm">{errorClassExample}</pre>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4" id="server-side-error-handling">
          Server-Side Error Handling
        </h2>
        <p>When building APIs, it&apos;s important to provide clear and consistent error responses:</p>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Use appropriate HTTP status codes</li>
          <li>Include error messages that are helpful but don&apos;t expose sensitive information</li>
          <li>Consider including error codes that clients can use for programmatic handling</li>
          <li>Include request IDs to help with debugging and support</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Example Error Response Format</h3>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
          <pre className="text-sm">{`{
  "error": {
    "status": 400,
    "code": "invalid_parameter",
    "message": "The 'email' parameter is not a valid email address",
    "details": {
      "parameter": "email",
      "value": "not-an-email",
      "constraint": "email"
    },
    "requestId": "req_1234567890"
  }
}`}</pre>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4" id="error-logging">
          Error Logging and Monitoring
        </h2>
        <p>Proper error logging and monitoring are essential for identifying and resolving issues:</p>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Log all errors with relevant context (request details, user information, etc.)</li>
          <li>Use structured logging for easier parsing and analysis</li>
          <li>Set up alerts for critical errors</li>
          <li>Use error monitoring services (like Sentry, Rollbar, or New Relic) to track and analyze errors</li>
          <li>Implement distributed tracing for complex systems</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4" id="user-friendly-errors">
          User-Friendly Error Messages
        </h2>
        <p>When displaying errors to users, consider the following:</p>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Use clear, non-technical language</li>
          <li>Provide actionable steps for resolution when possible</li>
          <li>Don&apos;t expose sensitive information or implementation details</li>
          <li>Consider the user&apos;s emotional state and use empathetic language</li>
          <li>For critical errors, provide alternative contact methods or support options</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg my-6">
          <h4 className="text-blue-800 dark:text-blue-300 font-medium mb-2">Good Example:</h4>
          <p className="text-blue-700 dark:text-blue-400">
            &quot;We couldn&apos;t save your changes because the connection was lost. Please check your internet
            connection and try again. If the problem persists, please contact support.&quot;
          </p>

          <h4 className="text-red-800 dark:text-red-300 font-medium mt-4 mb-2">Bad Example:</h4>
          <p className="text-red-700 dark:text-red-400">
            &quot;Error 500: Internal server error occurred in module XYZ. Failed to execute database query: Connection
            timeout after 30s.&quot;
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4" id="retry-strategies">
          Retry Strategies
        </h2>
        <p>When implementing retry logic, consider these strategies:</p>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Exponential Backoff:</strong> Increase the delay between retries exponentially
          </li>
          <li>
            <strong>Jitter:</strong> Add randomness to retry intervals to prevent thundering herd problems
          </li>
          <li>
            <strong>Circuit Breaker Pattern:</strong> Stop retrying after a certain threshold to prevent cascading
            failures
          </li>
          <li>
            <strong>Retry Budgets:</strong> Limit the number of retries across your system
          </li>
          <li>
            <strong>Idempotency:</strong> Ensure operations can be safely retried without side effects
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4" id="conclusion">
          Conclusion
        </h2>
        <p>
          Effective error handling is a critical aspect of building robust API integrations. By implementing the best
          practices outlined in this guide, you can create applications that gracefully handle errors, provide a better
          user experience, and are easier to maintain and debug.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mt-10">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Always check for and handle errors in API responses</li>
            <li>Implement retry logic for transient errors</li>
            <li>Use appropriate HTTP status codes and error formats</li>
            <li>Log errors with context for debugging</li>
            <li>Provide user-friendly error messages</li>
            <li>Consider different retry strategies for different types of errors</li>
          </ul>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Further Reading</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <a href="/guides/authentication" className="text-blue-600 dark:text-blue-400 hover:underline">
                API Authentication Methods
              </a>
            </li>
            <li>
              <a href="/guides/rate-limiting" className="text-blue-600 dark:text-blue-400 hover:underline">
                Dealing with Rate Limits
              </a>
            </li>
            <li>
              <a href="/guides/caching" className="text-blue-600 dark:text-blue-400 hover:underline">
                API Response Caching
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
