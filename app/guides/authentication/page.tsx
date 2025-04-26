import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "API Authentication Methods | Bless API Book",
  description: "Learn about different API authentication methods including API keys, OAuth, JWT, and more.",
}

export default function AuthenticationGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/guides" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to Guides
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-6">API Authentication Methods</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead text-xl mb-8">
          Authentication is a critical aspect of API security. This guide covers the most common authentication methods
          used in APIs and how to implement them in your applications.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-8">
          <h3 className="text-blue-800 dark:text-blue-300 font-medium mb-2">In this guide:</h3>
          <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-400">
            <li>API Keys</li>
            <li>Basic Authentication</li>
            <li>OAuth 2.0</li>
            <li>JWT (JSON Web Tokens)</li>
            <li>API Key Best Practices</li>
            <li>Choosing the Right Authentication Method</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4" id="api-keys">
          API Keys
        </h2>
        <p>
          API keys are simple string tokens that are passed with API requests to identify the calling application or
          user. They are one of the most common authentication methods due to their simplicity.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">How API Keys Work</h3>
        <p>
          API keys are typically included in the request header or as a query parameter. The API provider validates the
          key against their database to authenticate the request.
        </p>

        <h4 className="text-lg font-medium mt-5 mb-2">Example: Using API Keys in Headers</h4>
        <CodeBlock
          code={`// Using fetch with an API key in the header
fetch('https://api.example.com/data', {
  headers: {
    'X-API-Key': 'your_api_key_here',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
          language="javascript"
        />

        <h4 className="text-lg font-medium mt-5 mb-2">Example: Using API Keys as Query Parameters</h4>
        <CodeBlock
          code={`// Using fetch with an API key as a query parameter
fetch('https://api.example.com/data?api_key=your_api_key_here')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
          language="javascript"
        />

        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg my-6">
          <h4 className="text-yellow-800 dark:text-yellow-300 font-medium mb-2">⚠️ Security Note</h4>
          <p className="text-yellow-700 dark:text-yellow-400">
            When using API keys as query parameters, they become visible in the URL. This is less secure as URLs can be
            logged in server logs, browser history, and can be visible to third parties. Whenever possible, use
            header-based authentication instead.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4" id="basic-auth">
          Basic Authentication
        </h2>
        <p>
          Basic Authentication is a simple authentication scheme built into the HTTP protocol. It requires sending a
          username and password with each request.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">How Basic Authentication Works</h3>
        <p>
          The client sends a request with an Authorization header containing the word "Basic" followed by a space and a
          base64-encoded string of "username:password".
        </p>

        <h4 className="text-lg font-medium mt-5 mb-2">Example: Using Basic Authentication</h4>
        <CodeBlock
          code={`// Using fetch with Basic Authentication
const username = 'your_username';
const password = 'your_password';
const credentials = btoa(username + ':' + password);

fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Basic ' + credentials,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
          language="javascript"
        />

        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg my-6">
          <h4 className="text-yellow-800 dark:text-yellow-300 font-medium mb-2">⚠️ Security Note</h4>
          <p className="text-yellow-700 dark:text-yellow-400">
            Basic Authentication sends credentials with every request and should only be used over HTTPS. The base64
            encoding is easily reversible and does not provide any security by itself.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4" id="oauth">
          OAuth 2.0
        </h2>
        <p>
          OAuth 2.0 is an authorization framework that enables third-party applications to obtain limited access to a
          user's account on an HTTP service. It's widely used for delegated authorization.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">How OAuth 2.0 Works</h3>
        <p>OAuth 2.0 involves several steps:</p>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li>The client requests authorization from the resource owner</li>
          <li>The client receives an authorization grant</li>
          <li>The client requests an access token from the authorization server</li>
          <li>The authorization server authenticates the client and validates the grant</li>
          <li>The authorization server issues an access token</li>
          <li>The client uses the access token to access protected resources</li>
        </ol>

        <h4 className="text-lg font-medium mt-5 mb-2">Example: Using OAuth 2.0 Access Token</h4>
        <CodeBlock
          code={`// Using fetch with an OAuth 2.0 access token
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer your_access_token_here',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
          language="javascript"
        />

        <h4 className="text-lg font-medium mt-5 mb-2">Example: OAuth 2.0 Authorization Code Flow</h4>
        <CodeBlock
          code={`// Step 1: Redirect user to authorization URL
function redirectToAuth() {
  const authUrl = 'https://auth.example.com/authorize';
  const clientId = 'your_client_id';
  const redirectUri = encodeURIComponent('https://your-app.com/callback');
  const scope = encodeURIComponent('read write');
  const state = generateRandomString(); // For CSRF protection
  
  // Store state in localStorage for verification later
  localStorage.setItem('oauth_state', state);
  
  // Redirect to authorization server
  window.location.href = \`\${authUrl}?client_id=\${clientId}&redirect_uri=\${redirectUri}&scope=\${scope}&response_type=code&state=\${state}\`;
}

// Step 2: Handle the callback and exchange code for token
async function handleCallback() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  
  // Verify state to prevent CSRF attacks
  if (state !== localStorage.getItem('oauth_state')) {
    throw new Error('State validation failed');
  }
  
  // Exchange code for token
  const tokenResponse = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'https://your-app.com/callback',
      client_id: 'your_client_id',
      client_secret: 'your_client_secret'
    })
  });
  
  const tokenData = await tokenResponse.json();
  
  // Store the tokens
  localStorage.setItem('access_token', tokenData.access_token);
  localStorage.setItem('refresh_token', tokenData.refresh_token);
  
  // Redirect to the app
  window.location.href = '/dashboard';
}`}
          language="javascript"
        />

        <h2 className="text-2xl font-bold mt-10 mb-4" id="jwt">
          JWT (JSON Web Tokens)
        </h2>
        <p>
          JSON Web Tokens (JWT) are an open standard for securely transmitting information between parties as a JSON
          object. They are commonly used for authentication and information exchange.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">How JWT Works</h3>
        <p>A JWT consists of three parts separated by dots:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Header - Contains the type of token and the signing algorithm</li>
          <li>Payload - Contains the claims (statements about an entity and additional data)</li>
          <li>Signature - Used to verify that the sender of the JWT is who it says it is</li>
        </ul>

        <h4 className="text-lg font-medium mt-5 mb-2">Example: Using JWT for Authentication</h4>
        <CodeBlock
          code={`// Using fetch with a JWT token
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer your_jwt_token_here',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
          language="javascript"
        />

        <h4 className="text-lg font-medium mt-5 mb-2">Example: Creating and Verifying JWTs (Server-side Node.js)</h4>
        <CodeBlock
          code={`// Server-side JWT handling with Node.js
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

// Creating a JWT
function generateToken(user) {
  const payload = {
    sub: user.id,
    name: user.name,
    admin: user.isAdmin,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
  };
  
  return jwt.sign(payload, secretKey);
}

// Verifying a JWT
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { valid: true, data: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const verification = verifyToken(token);
  
  if (!verification.valid) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
  
  req.user = verification.data;
  next();
}`}
          language="javascript"
        />

        <h2 className="text-2xl font-bold mt-10 mb-4" id="best-practices">
          API Key Best Practices
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Never expose API keys in client-side code</li>
          <li>Use environment variables to store API keys</li>
          <li>Implement key rotation policies</li>
          <li>Use different API keys for different environments (development, staging, production)</li>
          <li>Limit API key permissions to only what's necessary</li>
          <li>Monitor API key usage for suspicious activity</li>
          <li>Revoke compromised API keys immediately</li>
        </ul>

        <h4 className="text-lg font-medium mt-5 mb-2">Example: Storing API Keys Securely in Next.js</h4>
        <CodeBlock
          code={`// .env.local file
API_KEY=your_api_key_here

// In your Next.js API route (pages/api/data.js)
export default async function handler(req, res) {
  try {
    const response = await fetch('https://external-api.com/data', {
      headers: {
        'Authorization': \`Bearer \${process.env.API_KEY}\`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}`}
          language="javascript"
        />

        <h2 className="text-2xl font-bold mt-10 mb-4" id="choosing">
          Choosing the Right Authentication Method
        </h2>
        <p>The choice of authentication method depends on your specific requirements:</p>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Method</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Use Case</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Pros</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">API Keys</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Simple server-to-server communication
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Easy to implement, low overhead
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Limited security, no built-in expiration
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Basic Auth</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Simple username/password authentication
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Widely supported, easy to implement
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Credentials sent with every request, no delegation
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">OAuth 2.0</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Third-party access, user-centric permissions
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Delegated authorization, fine-grained scopes
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Complex to implement, more overhead
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">JWT</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Stateless authentication, microservices
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Self-contained, stateless, can include claims
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  Token size, can't be invalidated before expiry
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-3">Decision Flowchart</h3>
        <p>Use this simplified flowchart to help decide which authentication method is best for your use case:</p>

        <ul className="list-none space-y-2 ml-4 my-4">
          <li>
            <strong>Q: Are you building a public API?</strong>
            <ul className="list-none ml-6 mt-2">
              <li>
                <strong>Yes:</strong> Do you need user-specific permissions?
                <ul className="list-none ml-6 mt-2">
                  <li>
                    <strong>Yes:</strong> Use OAuth 2.0
                  </li>
                  <li>
                    <strong>No:</strong> Use API Keys
                  </li>
                </ul>
              </li>
              <li>
                <strong>No:</strong> Is it for internal services only?
                <ul className="list-none ml-6 mt-2">
                  <li>
                    <strong>Yes:</strong> Do you need stateless authentication?
                    <ul className="list-none ml-6 mt-2">
                      <li>
                        <strong>Yes:</strong> Use JWT
                      </li>
                      <li>
                        <strong>No:</strong> Use API Keys or Basic Auth
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4" id="conclusion">
          Conclusion
        </h2>
        <p>
          Choosing the right authentication method is crucial for the security and usability of your API. Consider your
          specific requirements, the sensitivity of your data, and the technical capabilities of your users when making
          this decision.
        </p>
        <p>
          Remember that security is a continuous process. Regularly review and update your authentication mechanisms to
          address new threats and vulnerabilities.
        </p>

        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg my-8">
          <h3 className="text-green-800 dark:text-green-300 font-medium mb-2">Next Steps</h3>
          <p className="text-green-700 dark:text-green-400 mb-3">
            Now that you understand different authentication methods, you might want to explore:
          </p>
          <ul className="list-disc list-inside space-y-1 text-green-700 dark:text-green-400">
            <li>
              <Link href="/guides/security" className="text-blue-600 dark:text-blue-400 hover:underline">
                API Security Best Practices
              </Link>
            </li>
            <li>
              <Link href="/guides/error-handling" className="text-blue-600 dark:text-blue-400 hover:underline">
                Error Handling Best Practices
              </Link>
            </li>
            <li>
              <Link href="/guides/testing" className="text-blue-600 dark:text-blue-400 hover:underline">
                Testing API Integrations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
