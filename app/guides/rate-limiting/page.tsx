import { Badge } from "@/components/ui/badge"

export default function RateLimitingGuide() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold tracking-tight">Dealing with Rate Limits</h1>
            <Badge>Advanced</Badge>
          </div>
          <p className="text-muted-foreground">Estimated reading time: 30 min</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2>Understanding Rate Limiting</h2>
          <p>
            Rate limiting is a strategy used by APIs to control the number of requests a client can make
            within a specified time period. This helps prevent abuse, ensure fair usage, and maintain
            service stability.
          </p>

          <h2>Common Rate Limiting Strategies</h2>
          <div className="grid gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Fixed Window</h3>
              <p>Allows X requests per fixed time window (e.g., 100 requests per hour)</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Sliding Window</h3>
              <p>Similar to fixed window but the window moves with time, providing smoother rate limiting</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Token Bucket</h3>
              <p>Tokens are added at a fixed rate and consumed by requests</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Leaky Bucket</h3>
              <p>Requests are processed at a fixed rate, with excess requests being queued or dropped</p>
            </div>
          </div>

          <h2>Handling Rate Limits in Code</h2>
          <p>Here's an example of implementing rate limit handling with retry logic:</p>
          <pre className="bg-slate-100 p-4 rounded-lg">
{`class RateLimitHandler {
  constructor(maxRetries = 3, baseDelay = 1000) {
    this.maxRetries = maxRetries;
    this.baseDelay = baseDelay;
    this.remainingRequests = null;
    this.resetTime = null;
  }

  async makeRequest(url) {
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const response = await fetch(url, {
          headers: this.getHeaders()
        });

        // Update rate limit info from headers
        this.updateRateLimitInfo(response.headers);

        if (response.status === 429) {
          const delay = this.calculateBackoff(attempt);
          console.log(\`Rate limited. Retrying in \${delay}ms\`);
          await this.delay(delay);
          continue;
        }

        return response;
      } catch (error) {
        if (attempt === this.maxRetries - 1) throw error;
      }
    }
  }

  updateRateLimitInfo(headers) {
    this.remainingRequests = headers.get('X-RateLimit-Remaining');
    this.resetTime = headers.get('X-RateLimit-Reset');
  }

  calculateBackoff(attempt) {
    return Math.min(
      this.baseDelay * Math.pow(2, attempt),
      10000
    );
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getHeaders() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }
}`}</pre>

          <h2>Best Practices for Rate Limit Handling</h2>
          <ol>
            <li>
              <strong>Monitor Rate Limit Headers</strong>
              <p>Common headers include:</p>
              <ul>
                <li>X-RateLimit-Limit: Maximum requests allowed</li>
                <li>X-RateLimit-Remaining: Remaining requests</li>
                <li>X-RateLimit-Reset: Time until limit resets</li>
              </ul>
            </li>
            <li>
              <strong>Implement Backoff Strategies</strong>
              <p>Use exponential backoff when retrying rate-limited requests</p>
            </li>
            <li>
              <strong>Queue Requests</strong>
              <p>Implement request queuing to manage high-volume API calls</p>
            </li>
            <li>
              <strong>Cache Responses</strong>
              <p>Cache API responses to reduce the number of requests</p>
            </li>
          </ol>

          <h2>Request Queuing Implementation</h2>
          <pre className="bg-slate-100 p-4 rounded-lg">
{`class RequestQueue {
  constructor(concurrency = 2, requestsPerSecond = 10) {
    this.queue = [];
    this.concurrency = concurrency;
    this.interval = 1000 / requestsPerSecond;
    this.running = 0;
  }

  async add(request) {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { request, resolve, reject } = this.queue.shift();

    try {
      const result = await request();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      setTimeout(() => this.process(), this.interval);
    }
  }
}`}</pre>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
            <p className="text-yellow-700">
              ⚠️ Warning: Different APIs may implement rate limiting differently. Always check the API's
              documentation for specific rate limit policies and headers.
            </p>
          </div>

          <h2>Monitoring and Analytics</h2>
          <p>
            Track your API usage and rate limit status:
          </p>
          <ul>
            <li>Monitor rate limit headers in responses</li>
            <li>Set up alerts for approaching limits</li>
            <li>Analyze usage patterns to optimize request timing</li>
            <li>Consider implementing circuit breakers for critical systems</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 