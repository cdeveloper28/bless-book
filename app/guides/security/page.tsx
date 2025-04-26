import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import CodeBlock from "@/components/code-block"

export default function SecurityGuide() {
  // Sample code snippets
  const secureAuthExample = `// Secure authentication example
async function authenticateSecurely() {
  try {
    // Use HTTPS for all requests
    const response = await fetch('https://api.example.com/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
      // Ensure cookies are sent with the request
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(\`Authentication failed: \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Store token securely
    if (data.token) {
      // For JWT or similar tokens
      // Don't store in localStorage for sensitive applications
      sessionStorage.setItem('auth_token', data.token);
      
      // Set token expiration
      const expiresAt = Date.now() + data.expiresIn * 1000;
      sessionStorage.setItem('token_expires_at', expiresAt.toString());
    }
    
    return data;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}`

  const secureRequestExample = `// Making secure API requests
async function fetchSecureData(url) {
  try {
    // Get token from secure storage
    const token = sessionStorage.getItem('auth_token');
    const tokenExpiresAt = sessionStorage.getItem('token_expires_at');
    
    // Check if token is expired
    if (tokenExpiresAt && Date.now() > parseInt(tokenExpiresAt)) {
      // Token is expired, refresh it
      await refreshToken();
      // Get the new token
      token = sessionStorage.getItem('auth_token');
    }
    
    // Make the request with authorization
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      },
      // Prevent CSRF
      credentials: 'include'
    });
    
    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        // Unauthorized - token might be invalid
        sessionStorage.removeItem('auth_token');
        // Redirect to login
        window.location.href = '/login';
        throw new Error('Authentication required');
      }
      
      throw new Error(\`Request failed: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Secure request error:', error);
    throw error;
  }
}`

  const inputValidationExample = `// Client-side input validation
function validateUserInput(input) {
  // Define validation rules
  const validations = {
    username: {
      pattern: /^[a-zA-Z0-9_]{3,20}$/,
      message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores'
    },
    email: {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
      message: 'Please enter a valid email address'
    },
    password: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/,
      message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
    }
  };
  
  const errors = {};
  
  // Validate each field
  Object.keys(input).forEach(field => {
    // Skip fields that don't have validation rules
    if (!validations[field]) return;
    
    const value = input[field];
    const validation = validations[field];
    
    // Check if value matches pattern
    if (!validation.pattern.test(value)) {
      errors[field] = validation.message;
    }
  });
  
  // Sanitize input to prevent XSS
  const sanitized = {};
  Object.keys(input).forEach(field => {
    if (typeof input[field] === 'string') {
      // Basic sanitization - in production use a library like DOMPurify
      sanitized[field] = input[field]
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    } else {
      sanitized[field] = input[field];
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized
  };
}`

  const csrfProtectionExample = `// CSRF protection example
// This assumes your server provides a CSRF token

// Get CSRF token from a cookie or meta tag
function getCsrfToken() {
  // From meta tag
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  if (metaTag) {
    return metaTag.getAttribute('content');
  }
  
  // From cookie
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'XSRF-TOKEN') {
      return decodeURIComponent(value);
    }
  }
  
  return null;
}

// Include CSRF token in requests
async function postWithCsrfProtection(url, data) {
  const csrfToken = getCsrfToken();
  
  if (!csrfToken) {
    throw new Error('CSRF token not found');
  }
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    // Include cookies in the request
    credentials: 'include',
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error(\`Request failed: \${response.status}\`);
  }
  
  return response.json();
}`

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/guides" aria-label="Back to guides">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">API Security Best Practices</h1>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Advanced</span>
          <span>•</span>
          <span>35 min read</span>
          <span>•</span>
          <span>Last updated: April 26, 2024</span>
        </div>

        <div className="prose prose-green dark:prose-invert max-w-none">
          <h2>Introduction to API Security</h2>
          <p>
            API security is a critical aspect of modern application development. As applications increasingly rely on
            APIs to connect services and share data, securing these interfaces becomes essential to protect sensitive
            information and maintain user trust.
          </p>
          <p>
            This guide covers best practices for securing your API integrations, from authentication and authorization
            to data validation and protection against common attacks.
          </p>

          <h2>Understanding API Security Risks</h2>
          <p>
            Before diving into best practices, it's important to understand the common security risks associated with
            API usage:
          </p>

          <h3>OWASP API Security Top 10</h3>
          <p>The Open Web Application Security Project (OWASP) identifies these top API security risks:</p>
          <ol>
            <li>
              <strong>Broken Object Level Authorization</strong>: Improper access control allowing unauthorized access
              to data
            </li>
            <li>
              <strong>Broken User Authentication</strong>: Flaws in authentication mechanisms
            </li>
            <li>
              <strong>Excessive Data Exposure</strong>: APIs returning more data than necessary
            </li>
            <li>
              <strong>Lack of Resources & Rate Limiting</strong>: No protection against resource exhaustion
            </li>
            <li>
              <strong>Broken Function Level Authorization</strong>: Improper access control for functions
            </li>
            <li>
              <strong>Mass Assignment</strong>: Client-provided data binding to internal objects
            </li>
            <li>
              <strong>Security Misconfiguration</strong>: Insecure default configurations, incomplete setups
            </li>
            <li>
              <strong>Injection</strong>: Untrusted data sent to interpreters
            </li>
            <li>
              <strong>Improper Assets Management</strong>: Unpatched systems, outdated documentation
            </li>
            <li>
              <strong>Insufficient Logging & Monitoring</strong>: Lack of visibility into suspicious activities
            </li>
          </ol>

          <h2>Secure Authentication</h2>
          <p>
            Authentication verifies the identity of clients accessing your API. Implementing secure authentication is
            the first line of defense.
          </p>

          <h3>Authentication Best Practices</h3>
          <ul>
            <li>
              <strong>Use HTTPS</strong>: Always use HTTPS to encrypt data in transit
            </li>
            <li>
              <strong>Implement Strong Authentication</strong>: Use OAuth 2.0, JWT, or API keys depending on your needs
            </li>
            <li>
              <strong>Secure Token Storage</strong>: Store tokens securely and handle them properly
            </li>
            <li>
              <strong>Implement Token Expiration</strong>: Set reasonable expiration times for tokens
            </li>
            <li>
              <strong>Use Refresh Tokens</strong>: Implement refresh token rotation for long-lived sessions
            </li>
          </ul>

          <h3>Implementation Example</h3>
          <CodeBlock code={secureAuthExample} language="javascript" />

          <p>
            For more details on authentication methods, see our{" "}
            <Link href="/guides/authentication" className="text-primary hover:underline">
              API Authentication Methods
            </Link>{" "}
            guide.
          </p>

          <h2>Authorization</h2>
          <p>While authentication verifies who you are, authorization determines what you're allowed to do.</p>

          <h3>Authorization Best Practices</h3>
          <ul>
            <li>
              <strong>Implement Principle of Least Privilege</strong>: Grant only the permissions necessary
            </li>
            <li>
              <strong>Use Role-Based Access Control (RBAC)</strong>: Assign permissions based on roles
            </li>
            <li>
              <strong>Implement Object-Level Authorization</strong>: Verify access rights for specific resources
            </li>
            <li>
              <strong>Validate Authorization on Every Request</strong>: Don't rely on client-side checks
            </li>
            <li>
              <strong>Use Scoped Tokens</strong>: Include permission scopes in access tokens
            </li>
          </ul>

          <h3>Making Secure API Requests</h3>
          <CodeBlock code={secureRequestExample} language="javascript" />

          <h2>Data Validation and Sanitization</h2>
          <p>Never trust input from clients. Always validate and sanitize data before processing it.</p>

          <h3>Input Validation Best Practices</h3>
          <ul>
            <li>
              <strong>Validate All Input</strong>: Check type, format, length, and range
            </li>
            <li>
              <strong>Implement Both Client and Server Validation</strong>: Client for UX, server for security
            </li>
            <li>
              <strong>Use Whitelisting</strong>: Accept only known good input
            </li>
            <li>
              <strong>Sanitize Output</strong>: Prevent XSS by encoding output
            </li>
            <li>
              <strong>Use Parameterized Queries</strong>: Prevent SQL injection
            </li>
          </ul>

          <h3>Implementation Example</h3>
          <CodeBlock code={inputValidationExample} language="javascript" />

          <h2>Protecting Against Common Attacks</h2>
          <p>APIs are vulnerable to various attacks. Here's how to protect against the most common ones:</p>

          <h3>Cross-Site Request Forgery (CSRF)</h3>
          <p>CSRF attacks trick users into performing unwanted actions on a site they're authenticated to.</p>

          <h4>CSRF Protection Strategies</h4>
          <ul>
            <li>
              <strong>Use Anti-CSRF Tokens</strong>: Include tokens in forms and requests
            </li>
            <li>
              <strong>Check Origin and Referer Headers</strong>: Verify requests come from legitimate sources
            </li>
            <li>
              <strong>Use SameSite Cookies</strong>: Set cookies with SameSite=Strict or Lax
            </li>
          </ul>

          <h4>Implementation Example</h4>
          <CodeBlock code={csrfProtectionExample} language="javascript" />

          <h3>Cross-Site Scripting (XSS)</h3>
          <p>XSS attacks inject malicious scripts into web pages viewed by other users.</p>

          <h4>XSS Protection Strategies</h4>
          <ul>
            <li>
              <strong>Sanitize User Input</strong>: Encode special characters
            </li>
            <li>
              <strong>Use Content Security Policy (CSP)</strong>: Restrict which scripts can run
            </li>
            <li>
              <strong>Use HttpOnly and Secure Flags for Cookies</strong>: Prevent JavaScript access to cookies
            </li>
            <li>
              <strong>Implement Output Encoding</strong>: Encode data before rendering
            </li>
          </ul>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Setting up Content Security Policy
// In your HTML head or HTTP headers
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trusted-cdn.com;">

// Using a library like DOMPurify for sanitization
import DOMPurify from 'dompurify';

function renderUserContent(content) {
  // Sanitize content before rendering
  const sanitized = DOMPurify.sanitize(content);
  document.getElementById('user-content').innerHTML = sanitized;
}`}
          </pre>

          <h3>Injection Attacks</h3>
          <p>Injection attacks insert malicious code into interpreters through untrusted data.</p>

          <h4>Injection Protection Strategies</h4>
          <ul>
            <li>
              <strong>Use Parameterized Queries</strong>: For database operations
            </li>
            <li>
              <strong>Validate and Sanitize Input</strong>: Filter out malicious patterns
            </li>
            <li>
              <strong>Use ORMs</strong>: Object-Relational Mappers often include protection
            </li>
            <li>
              <strong>Implement Least Privilege</strong>: Limit database user permissions
            </li>
          </ul>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Example of parameterized query in Node.js with prepared statements
const { Pool } = require('pg');
const pool = new Pool(/* connection config */);

async function getUserById(userId) {
  // Use parameterized query instead of string concatenation
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [userId];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}`}
          </pre>

          <h2>Rate Limiting and Resource Protection</h2>
          <p>Protect your API from abuse and denial-of-service attacks with rate limiting.</p>

          <h3>Rate Limiting Best Practices</h3>
          <ul>
            <li>
              <strong>Implement Request Rate Limiting</strong>: Limit requests per client
            </li>
            <li>
              <strong>Add Complexity Limits</strong>: Restrict query complexity
            </li>
            <li>
              <strong>Set Timeouts</strong>: Prevent long-running operations
            </li>
            <li>
              <strong>Implement Graceful Degradation</strong>: Handle overload conditions
            </li>
            <li>
              <strong>Monitor Usage Patterns</strong>: Detect and block abusive behavior
            </li>
          </ul>

          <p>
            For more details on rate limiting, see our{" "}
            <Link href="/guides/rate-limiting" className="text-primary hover:underline">
              Dealing with Rate Limits
            </Link>{" "}
            guide.
          </p>

          <h2>Secure Data Handling</h2>
          <p>Protect sensitive data throughout its lifecycle.</p>

          <h3>Data Protection Best Practices</h3>
          <ul>
            <li>
              <strong>Classify Data</strong>: Identify sensitive information
            </li>
            <li>
              <strong>Encrypt Sensitive Data</strong>: Both in transit and at rest
            </li>
            <li>
              <strong>Implement Proper Key Management</strong>: Secure storage and rotation of encryption keys
            </li>
            <li>
              <strong>Minimize Data Exposure</strong>: Return only necessary data
            </li>
            <li>
              <strong>Implement Data Masking</strong>: Hide sensitive parts of data
            </li>
            <li>
              <strong>Follow Data Protection Regulations</strong>: Comply with GDPR, CCPA, etc.
            </li>
          </ul>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Example of minimizing data exposure
// Instead of returning the entire user object
async function getUserProfile(userId) {
  const user = await db.users.findById(userId);
  
  // Return only necessary fields, exclude sensitive data
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    // Don't include password, SSN, etc.
  };
}

// Example of data masking
function maskCreditCard(cardNumber) {
  // Only show last 4 digits
  return cardNumber.replace(/\\d(?=\\d{4})/g, '*');
}`}
          </pre>

          <h2>Secure Development Lifecycle</h2>
          <p>Security should be integrated throughout the development process.</p>

          <h3>Secure Development Practices</h3>
          <ul>
            <li>
              <strong>Security Requirements</strong>: Define security requirements early
            </li>
            <li>
              <strong>Threat Modeling</strong>: Identify potential threats and vulnerabilities
            </li>
            <li>
              <strong>Secure Coding Guidelines</strong>: Follow established best practices
            </li>
            <li>
              <strong>Code Reviews</strong>: Include security in code reviews
            </li>
            <li>
              <strong>Security Testing</strong>: Perform regular security testing
            </li>
            <li>
              <strong>Dependency Management</strong>: Keep dependencies updated
            </li>
          </ul>

          <h3>Security Testing</h3>
          <ul>
            <li>
              <strong>Static Application Security Testing (SAST)</strong>: Analyze code for vulnerabilities
            </li>
            <li>
              <strong>Dynamic Application Security Testing (DAST)</strong>: Test running applications
            </li>
            <li>
              <strong>Penetration Testing</strong>: Simulate attacks to find vulnerabilities
            </li>
            <li>
              <strong>Dependency Scanning</strong>: Check for vulnerabilities in dependencies
            </li>
          </ul>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Example of using npm audit to check dependencies
{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "prestart": "npm audit"
  }
}`}
          </pre>

          <h2>Logging, Monitoring, and Incident Response</h2>
          <p>Detect and respond to security incidents effectively.</p>

          <h3>Logging and Monitoring Best Practices</h3>
          <ul>
            <li>
              <strong>Implement Comprehensive Logging</strong>: Log security-relevant events
            </li>
            <li>
              <strong>Protect Log Data</strong>: Secure access to logs
            </li>
            <li>
              <strong>Monitor for Suspicious Activity</strong>: Set up alerts for unusual patterns
            </li>
            <li>
              <strong>Implement Real-time Monitoring</strong>: Detect incidents as they happen
            </li>
            <li>
              <strong>Establish Baselines</strong>: Know what normal activity looks like
            </li>
          </ul>

          <h3>Incident Response</h3>
          <ul>
            <li>
              <strong>Develop an Incident Response Plan</strong>: Know what to do when incidents occur
            </li>
            <li>
              <strong>Define Roles and Responsibilities</strong>: Assign clear responsibilities
            </li>
            <li>
              <strong>Practice Response Procedures</strong>: Conduct regular drills
            </li>
            <li>
              <strong>Learn from Incidents</strong>: Improve security based on past incidents
            </li>
          </ul>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Example of security logging
function logSecurityEvent(event) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: event.type,
    user: event.userId,
    ip: event.ipAddress,
    userAgent: event.userAgent,
    details: event.details,
    severity: event.severity
  };
  
  // Log to secure storage
  secureLogger.log(logEntry);
  
  // Alert on high-severity events
  if (event.severity === 'high') {
    alertSystem.trigger(logEntry);
  }
}`}
          </pre>

          <h2>API Security Checklist</h2>
          <p>Use this checklist to ensure you've covered the essential security aspects of your API integration:</p>

          <h3>Authentication and Authorization</h3>
          <ul>
            <li>☐ Use HTTPS for all API communications</li>
            <li>☐ Implement proper authentication (OAuth, JWT, API keys)</li>
            <li>☐ Set appropriate token expiration</li>
            <li>☐ Implement role-based access control</li>
            <li>☐ Validate authorization on every request</li>
          </ul>

          <h3>Data Validation and Protection</h3>
          <ul>
            <li>☐ Validate all input data</li>
            <li>☐ Sanitize output to prevent XSS</li>
            <li>☐ Use parameterized queries for database operations</li>
            <li>☐ Encrypt sensitive data</li>
            <li>☐ Minimize data exposure in responses</li>
          </ul>

          <h3>Attack Prevention</h3>
          <ul>
            <li>☐ Implement CSRF protection</li>
            <li>☐ Set up Content Security Policy</li>
            <li>☐ Use secure cookie flags (HttpOnly, Secure, SameSite)</li>
            <li>☐ Implement rate limiting</li>
            <li>☐ Set up proper CORS configuration</li>
          </ul>

          <h3>Monitoring and Response</h3>
          <ul>
            <li>☐ Implement comprehensive logging</li>
            <li>☐ Set up monitoring and alerts</li>
            <li>☐ Develop an incident response plan</li>
            <li>☐ Regularly review security measures</li>
            <li>☐ Keep dependencies updated</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            API security is a complex and evolving field. By following the best practices outlined in this guide, you
            can significantly reduce the risk of security incidents and protect your users' data.
          </p>
          <p>
            Remember that security is not a one-time effort but an ongoing process. Regularly review and update your
            security measures to address new threats and vulnerabilities.
          </p>

          <h2>Further Reading</h2>
          <ul>
            <li>
              <Link href="/guides/authentication" className="text-primary hover:underline">
                API Authentication Methods
              </Link>
            </li>
            <li>
              <Link href="/guides/rate-limiting" className="text-primary hover:underline">
                Dealing with Rate Limits
              </Link>
            </li>
            <li>
            
            <li>
              <a
                href="https://owasp.org/API-Security/editions/2023/en/0x00-introduction/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                OWASP API Security Top 10
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
