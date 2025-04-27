import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import CodeBlock from "@/components/code-block"

export default function RateLimitingGuide() {
  // Sample code snippets
  const rateLimitHeadersExample = `// Checking rate limit headers
async function fetchWithRateLimitAwareness(url, options = {}) {
  const response = await fetch(url, options);
  
  // Check for rate limit headers
  const rateLimitLimit = response.headers.get('X-RateLimit-Limit');
  const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
  const rateLimitReset = response.headers.get('X-RateLimit-Reset');
  
  console.log(\`Rate limit: \${rateLimitRemaining}/\${rateLimitLimit} requests remaining\`);
  console.log(\`Rate limit resets at: \${new Date(rateLimitReset * 1000).toLocaleTimeString()}\`);
  
  // Handle rate limiting
  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After') || 60;
    console.warn(\`Rate limit exceeded. Retry after \${retryAfter} seconds\`);
    
    // You could implement retry logic here
    // await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    // return fetchWithRateLimitAwareness(url, options);
  }
  
  return response;
}`

  const throttlingExample = `// Simple throttling implementation
class APIThrottler {
  constructor(requestsPerMinute) {
    this.requestsPerMinute = requestsPerMinute;
    this.requestTimestamps = [];
  }
  
  async throttle() {
    // Remove timestamps older than 1 minute
    const now = Date.now();
    this.requestTimestamps = this.requestTimestamps.filter(
      timestamp => now - timestamp < 60000
    );
    
    // Check if we've hit the rate limit
    if (this.requestTimestamps.length >= this.requestsPerMinute) {
      // Calculate time to wait
      const oldestTimestamp = this.requestTimestamps[0];
      const timeToWait = 60000 - (now - oldestTimestamp);
      
      console.log(\`Rate limit reached. Waiting \${timeToWait}ms before next request\`);
      
      // Wait until we can make another request
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }
    
    // Add current timestamp and proceed
    this.requestTimestamps.push(Date.now());
  }
  
  async fetch(url, options = {}) {
    await this.throttle();
    return fetch(url, options);
  }
}

// Usage
const apiThrottler = new APIThrottler(60); // 60 requests per minute

async function fetchData() {
  try {
    const response = await apiThrottler.fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`

  const exponentialBackoffExample = `// Exponential backoff with jitter
async function fetchWithBackoff(url, options = {}, maxRetries = 5) {
  let retries = 0;
  
  while (true) {
    try {
      const response = await fetch(url, options);
      
      if (response.status !== 429) {
        // Success or non-rate-limit error
        return response;
      }
      
      // Handle rate limit (429 Too Many Requests)
      if (retries >= maxRetries) {
        console.error(\`Rate limit exceeded after \${maxRetries} retries\`);
        return response; // Return the 429 response after max retries
      }
      
      // Get retry delay from header or calculate with exponential backoff
      let delay;
      const retryAfter = response.headers.get('Retry-After');
      
      if (retryAfter) {
        // Use the server's recommendation if available
        delay = parseInt(retryAfter, 10) * 1000;
      } else {
        // Exponential backoff with jitter
        const baseDelay = Math.pow(2, retries) * 1000; // 1s, 2s, 4s, 8s, 16s, ...
        const jitter = Math.random() * 0.5 * baseDelay; // Add up to 50% jitter
        delay = baseDelay + jitter;
      }
      
      console.log(\`Rate limited. Retrying in \${delay}ms (retry \${retries + 1}/\${maxRetries})\`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
      
      retries++;
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
      throw error;
    }
  }
}`

  const queueExample = `// Request queue implementation
class RequestQueue {
  constructor(requestsPerSecond = 5) {
    this.queue = [];
    this.processing = false;
    this.interval = 1000 / requestsPerSecond; // Time between requests
  }
  
  async add(request) {
    return new Promise((resolve, reject) => {
      // Add to queue
      this.queue.push({
        request,
        resolve,
        reject
      });
      
      // Start processing if not already running
      if (!this.processing) {
        this.processQueue();
      }
    });
  }
  
  async processQueue() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }
    
    this.processing = true;
    
    // Get the next request
    const { request, resolve, reject } = this.queue.shift();
    
    try {
      // Execute the request
      const result = await request();
      resolve(result);
    } catch (error) {
      reject(error);
    }
    
    // Wait before processing next request
    await new Promise(resolve => setTimeout(resolve, this.interval));
    
    // Process next request
    this.processQueue();
  }
}

// Usage
const requestQueue = new RequestQueue(5); // 5 requests per second

async function fetchData(url) {
  return requestQueue.add(() => fetch(url).then(res => res.json()));
}

// Example usage
async function fetchMultipleItems() {
  const urls = [
    'https://api.example.com/item/1',
    'https://api.example.com/item/2',
    'https://api.example.com/item/3',
    // ... more URLs
  ];
  
  const promises = urls.map(url => fetchData(url));
  const results = await Promise.all(promises);
  
  console.log('All requests completed:', results);
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
          <h1 className="text-3xl font-bold tracking-tight">Dealing with Rate Limits</h1>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Advanced</span>
          <span>•</span>
          <span>30 min read</span>
          <span>•</span>
          <span>Last updated: April 26, 2024</span>
        </div>

        <div className="prose prose-green dark:prose-invert max-w-none">
          <h2>Understanding API Rate Limits</h2>
          <p>
            Rate limiting is a strategy used by API providers to control the amount of incoming and outgoing traffic to
            their servers. By limiting the number of requests a client can make within a specific time period, API
            providers can:
          </p>
          <ul>
            <li>Prevent abuse and denial-of-service attacks</li>
            <li>Ensure fair usage among all clients</li>
            <li>Reduce server load and maintain performance</li>
            <li>Control costs associated with serving API requests</li>
          </ul>

          <p>
            As a developer integrating with APIs, understanding and properly handling rate limits is essential for
            building reliable applications.
          </p>

          <h2>Common Rate Limiting Strategies</h2>
          <p>API providers implement rate limits in various ways:</p>

          <h3>Fixed Window Rate Limiting</h3>
          <p>
            Allows a fixed number of requests in a specific time window (e.g., 100 requests per minute). The counter
            resets at the end of each time window.
          </p>

          <h3>Sliding Window Rate Limiting</h3>
          <p>
            Similar to fixed window, but the time window "slides" continuously rather than resetting at fixed intervals.
            This provides a smoother rate limiting experience.
          </p>

          <h3>Token Bucket Rate Limiting</h3>
          <p>
            Uses a "bucket" of tokens that refill at a constant rate. Each request consumes a token. When the bucket is
            empty, requests are rejected until more tokens are added.
          </p>

          <h3>Leaky Bucket Rate Limiting</h3>
          <p>
            Similar to token bucket, but processes requests at a constant rate regardless of the incoming rate. Excess
            requests are queued until they can be processed or until the queue overflows.
          </p>

          <h2>Identifying Rate Limits</h2>
          <p>Most APIs communicate their rate limits through:</p>

          <h3>Documentation</h3>
          <p>API documentation typically specifies:</p>
          <ul>
            <li>The number of requests allowed per time period</li>
            <li>Whether limits apply per endpoint, API key, user, or IP address</li>
            <li>Any differences in rate limits between free and paid tiers</li>
            <li>Special considerations for bulk operations</li>
          </ul>

          <h3>HTTP Headers</h3>
          <p>Many APIs include rate limit information in response headers:</p>
          <ul>
            <li>
              <code>X-RateLimit-Limit</code>: Maximum number of requests allowed in a period
            </li>
            <li>
              <code>X-RateLimit-Remaining</code>: Number of requests remaining in the current period
            </li>
            <li>
              <code>X-RateLimit-Reset</code>: Time when the rate limit will reset (Unix timestamp or seconds)
            </li>
            <li>
              <code>Retry-After</code>: Seconds to wait before making another request (when rate limited)
            </li>
          </ul>

          <p>Here's how to check for these headers in your code:</p>

          <CodeBlock code={rateLimitHeadersExample} language="javascript" />

          <h3>HTTP Status Codes</h3>
          <p>When you exceed a rate limit, the API typically responds with:</p>
          <ul>
            <li>
              <code>429 Too Many Requests</code>: The standard status code for rate limiting
            </li>
            <li>
              Sometimes <code>403 Forbidden</code> is used instead
            </li>
          </ul>

          <h2>Strategies for Handling Rate Limits</h2>
          <p>
            Implementing proper rate limit handling is crucial for building reliable applications. Here are several
            strategies:
          </p>

          <h3>1. Client-Side Throttling</h3>
          <p>Proactively limit your request rate to stay under the API's limits:</p>

          <CodeBlock code={throttlingExample} language="javascript" />

          <p>Benefits of client-side throttling:</p>
          <ul>
            <li>Prevents hitting rate limits in the first place</li>
            <li>Distributes requests evenly over time</li>
            <li>Reduces the need for error handling and retries</li>
          </ul>

          <h3>2. Exponential Backoff with Jitter</h3>
          <p>When rate limited, wait progressively longer between retry attempts:</p>

          <CodeBlock code={exponentialBackoffExample} language="javascript" />

          <p>Key aspects of this approach:</p>
          <ul>
            <li>Exponential increase in wait time between retries</li>
            <li>Random jitter to prevent synchronized retries from multiple clients</li>
            <li>
              Respects the <code>Retry-After</code> header when available
            </li>
            <li>Maximum retry limit to prevent infinite retry loops</li>
          </ul>

          <h3>3. Request Queuing</h3>
          <p>Queue requests and process them at a controlled rate:</p>

          <CodeBlock code={queueExample} language="javascript" />

          <p>Benefits of request queuing:</p>
          <ul>
            <li>Ensures requests are processed in order</li>
            <li>Maintains a consistent request rate</li>
            <li>Can handle bursts of requests without overwhelming the API</li>
          </ul>

          <h3>4. Caching</h3>
          <p>Cache API responses to reduce the number of requests:</p>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Simple caching implementation
class APICache {
  constructor(ttlSeconds = 300) {
    this.cache = new Map();
    this.ttl = ttlSeconds * 1000;
  }
  
  set(key, value) {
    const item = {
      value,
      expiry: Date.now() + this.ttl
    };
    this.cache.set(key, item);
  }
  
  get(key) {
    const item = this.cache.get(key);
    
    // Return null if item doesn't exist or is expired
    if (!item || Date.now() > item.expiry) {
      if (item) this.cache.delete(key); // Clean up expired items
      return null;
    }
    
    return item.value;
  }
  
  async fetchWithCache(url, options = {}) {
    const cacheKey = url + (options.body ? JSON.stringify(options.body) : '');
    
    // Check cache first
    const cachedResponse = this.get(cacheKey);
    if (cachedResponse) {
      console.log('Cache hit for:', url);
      return cachedResponse;
    }
    
    // If not in cache, make the request
    console.log('Cache miss for:', url);
    const response = await fetch(url, options);
    const data = await response.json();
    
    // Cache the response
    this.set(cacheKey, data);
    
    return data;
  }
}

// Usage
const apiCache = new APICache(60); // 60 seconds TTL

async function fetchData(url) {
  return apiCache.fetchWithCache(url);
}`}
          </pre>

          <p>
            For more details on caching, see our{" "}
            <Link href="/guides/caching" className="text-primary hover:underline">
              API Response Caching
            </Link>{" "}
            guide.
          </p>

          <h3>5. Batch Requests</h3>
          <p>Combine multiple operations into a single API request when supported:</p>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Example of batching requests
async function fetchUsersBatch(userIds) {
  // Instead of fetching each user individually:
  // userIds.forEach(id => fetch(\`/users/\${id}\`))
  
  // Fetch all users in a single request
  const response = await fetch('/users/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids: userIds })
  });
  
  return response.json();
}`}
          </pre>

          <p>Benefits of batching:</p>
          <ul>
            <li>Reduces the number of HTTP requests</li>
            <li>Often more efficient for both client and server</li>
            <li>Helps stay under rate limits</li>
          </ul>

          <h2>Advanced Rate Limit Handling</h2>

          <h3>Distributed Rate Limiting</h3>
          <p>For applications running on multiple servers or serverless functions, consider:</p>
          <ul>
            <li>Using a centralized rate limit tracker (e.g., Redis)</li>
            <li>Implementing a token bucket algorithm across instances</li>
            <li>Distributing your requests across multiple API keys if allowed</li>
          </ul>

          <h3>Adaptive Rate Limiting</h3>
          <p>Adjust your request rate based on the API's responses:</p>
          <ul>
            <li>Increase request rate when far from limits</li>
            <li>Decrease request rate as you approach limits</li>
            <li>Implement circuit breakers for temporary API outages</li>
          </ul>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Adaptive rate limiting example
class AdaptiveThrottler {
  constructor(maxRequestsPerMinute = 60) {
    this.maxRequestsPerMinute = maxRequestsPerMinute;
    this.currentRate = maxRequestsPerMinute / 2; // Start at 50% capacity
    this.requestTimestamps = [];
  }
  
  updateRate(rateLimitRemaining, rateLimitLimit) {
    if (!rateLimitRemaining || !rateLimitLimit) return;
    
    // Calculate percentage of remaining requests
    const remainingPercent = rateLimitRemaining / rateLimitLimit;
    
    if (remainingPercent > 0.5) {
      // Plenty of capacity, increase rate
      this.currentRate = Math.min(this.currentRate * 1.1, this.maxRequestsPerMinute);
    } else if (remainingPercent < 0.2) {
      // Getting close to limit, decrease rate significantly
      this.currentRate = this.currentRate * 0.5;
    } else {
      // Moderate usage, decrease rate slightly
      this.currentRate = this.currentRate * 0.9;
    }
    
    console.log(\`Adjusted request rate to \${this.currentRate.toFixed(2)} requests/minute\`);
  }
  
  async throttle() {
    // Remove timestamps older than 1 minute
    const now = Date.now();
    this.requestTimestamps = this.requestTimestamps.filter(
      timestamp => now - timestamp < 60000
    );
    
    // Calculate current requests per minute
    const currentRequestsPerMinute = this.requestTimestamps.length;
    
    // Check if we've hit our adaptive rate limit
    if (currentRequestsPerMinute >= this.currentRate) {
      // Calculate time to wait
      const timeToWait = 60000 / this.currentRate;
      
      console.log(\`Throttling. Waiting \${timeToWait.toFixed(0)}ms before next request\`);
      
      // Wait before proceeding
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }
    
    // Add current timestamp and proceed
    this.requestTimestamps.push(now);
  }
  
  async fetch(url, options = {}) {
    await this.throttle();
    
    const response = await fetch(url, options);
    
    // Update rate based on response headers
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const limit = response.headers.get('X-RateLimit-Limit');
    this.updateRate(remaining, limit);
    
    return response;
  }
}`}
          </pre>

          <h2>Rate Limiting Best Practices</h2>
          <p>Follow these best practices to effectively handle API rate limits:</p>

          <h3>Understand the API's Rate Limits</h3>
          <ul>
            <li>Read the API documentation thoroughly</li>
            <li>Note different limits for different endpoints</li>
            <li>Understand how limits are applied (per key, per user, per IP)</li>
            <li>Be aware of different limits for different subscription tiers</li>
          </ul>

          <h3>Monitor Your Usage</h3>
          <ul>
            <li>Track your request rates and patterns</li>
            <li>Set up alerts for approaching rate limits</li>
            <li>Log rate limit responses for analysis</li>
          </ul>

          <h3>Optimize Your Requests</h3>
          <ul>
            <li>Only request the data you need</li>
            <li>Use pagination for large data sets</li>
            <li>Implement caching for frequently accessed data</li>
            <li>Batch requests when possible</li>
          </ul>

          <h3>Implement Graceful Degradation</h3>
          <ul>
            <li>Design your application to function with reduced API access</li>
            <li>Provide fallback content when API requests fail</li>
            <li>Communicate limitations to users when rate limited</li>
          </ul>

          <h3>Consider API Quotas</h3>
          <p>
            Some APIs have both rate limits (requests per time period) and quotas (total requests over a longer period):
          </p>
          <ul>
            <li>Track your quota usage</li>
            <li>Implement strategies to spread usage over time</li>
            <li>Consider upgrading your subscription if you consistently hit quotas</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            Effectively handling rate limits is essential for building reliable applications that integrate with APIs.
            By implementing the strategies outlined in this guide, you can:
          </p>
          <ul>
            <li>Prevent disruptions due to rate limiting</li>
            <li>Optimize your API usage</li>
            <li>Provide a better user experience</li>
            <li>Reduce costs by using API resources efficiently</li>
          </ul>

          <p>
            Remember that different APIs have different rate limiting implementations, so always adapt your approach to
            the specific APIs you're working with.
          </p>

          <h2>Further Reading</h2>
          <ul>
            <li>
              <Link href="/guides/caching" className="text-primary hover:underline">
                API Response Caching
              </Link>
            </li>
            <li>
              <Link href="/guides/error-handling" className="text-primary hover:underline">
                Error Handling Best Practices
              </Link>
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  )
}
