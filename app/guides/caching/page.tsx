import { Badge } from "@/components/ui/badge"

export default function CachingGuide() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold tracking-tight">API Response Caching</h1>
            <Badge>Intermediate</Badge>
          </div>
          <p className="text-muted-foreground">Estimated reading time: 25 min</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2>Understanding API Caching</h2>
          <p>
            Caching is a technique used to store and reuse API responses to improve performance,
            reduce server load, and enhance user experience by minimizing unnecessary network requests.
          </p>

          <h2>Types of Caching</h2>
          <div className="grid gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Browser Cache</h3>
              <p>Stores responses locally in the user's browser using HTTP cache headers</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Memory Cache</h3>
              <p>Temporary storage in application memory for quick access to frequently used data</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Disk Cache</h3>
              <p>Persistent storage on disk for longer-term caching needs</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">CDN Cache</h3>
              <p>Distributed caching at the network level using Content Delivery Networks</p>
            </div>
          </div>

          <h2>Implementing Client-Side Caching</h2>
          <p>Here's an example of implementing a simple in-memory cache:</p>
          <pre className="bg-slate-100 p-4 rounded-lg">
{`class APICache {
  constructor(maxAge = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.maxAge = maxAge;
  }

  async fetch(url, options = {}) {
    const cacheKey = this.getCacheKey(url, options);
    const cached = this.cache.get(cacheKey);

    if (cached && !this.isExpired(cached.timestamp)) {
      console.log('Cache hit:', url);
      return cached.data;
    }

    console.log('Cache miss:', url);
    const response = await fetch(url, options);
    const data = await response.json();

    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  }

  getCacheKey(url, options) {
    return \`\${url}-\${JSON.stringify(options)}\`;
  }

  isExpired(timestamp) {
    return Date.now() - timestamp > this.maxAge;
  }

  clear() {
    this.cache.clear();
  }
}`}</pre>

          <h2>HTTP Cache Headers</h2>
          <p>Understanding and using HTTP cache headers effectively:</p>
          <pre className="bg-slate-100 p-4 rounded-lg">
{`// Server-side cache control headers
response.setHeader('Cache-Control', 'public, max-age=3600');
response.setHeader('ETag', '"123456789"');
response.setHeader('Last-Modified', new Date().toUTCString());

// Client-side conditional requests
fetch(url, {
  headers: {
    'If-None-Match': '"123456789"',
    'If-Modified-Since': lastModified
  }
});`}</pre>

          <h2>Cache Invalidation Strategies</h2>
          <ol>
            <li>
              <strong>Time-Based Invalidation</strong>
              <p>Cache entries expire after a specified time period</p>
            </li>
            <li>
              <strong>Version-Based Invalidation</strong>
              <p>Cache keys include a version number that changes when data updates</p>
            </li>
            <li>
              <strong>Event-Based Invalidation</strong>
              <p>Cache is cleared when specific events occur (e.g., data updates)</p>
            </li>
          </ol>

          <h2>Advanced Caching Implementation</h2>
          <pre className="bg-slate-100 p-4 rounded-lg">
{`class AdvancedCache {
  constructor() {
    this.cache = new Map();
    this.subscribers = new Map();
  }

  // Versioned cache key
  getCacheKey(key, version) {
    return \`\${key}@v\${version}\`;
  }

  // Set cache with versioning
  set(key, value, version = 1) {
    const cacheKey = this.getCacheKey(key, version);
    this.cache.set(cacheKey, {
      value,
      version,
      timestamp: Date.now()
    });
    this.notifySubscribers(key);
  }

  // Get latest version of cached data
  get(key) {
    const versions = Array.from(this.cache.entries())
      .filter(([k]) => k.startsWith(key + '@'))
      .map(([k, v]) => v.version);
    
    if (versions.length === 0) return null;
    
    const latestVersion = Math.max(...versions);
    const cacheKey = this.getCacheKey(key, latestVersion);
    return this.cache.get(cacheKey)?.value;
  }

  // Subscribe to cache updates
  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key).add(callback);
  }

  // Notify subscribers of updates
  notifySubscribers(key) {
    const subscribers = this.subscribers.get(key);
    if (subscribers) {
      const value = this.get(key);
      subscribers.forEach(callback => callback(value));
    }
  }
}`}</pre>

          <h2>Best Practices</h2>
          <ul>
            <li>Set appropriate cache durations based on data volatility</li>
            <li>Implement cache warming for critical data</li>
            <li>Use cache hierarchies (browser → memory → disk)</li>
            <li>Monitor cache hit rates and performance</li>
            <li>Implement proper error handling for cache failures</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
            <p className="text-blue-700">
              💡 Pro Tip: Consider using established caching libraries like Redis or Memcached for
              production applications with complex caching needs.
            </p>
          </div>

          <h2>Cache Monitoring and Debugging</h2>
          <p>
            Important metrics to track:
          </p>
          <ul>
            <li>Cache hit rate</li>
            <li>Cache size and memory usage</li>
            <li>Cache invalidation frequency</li>
            <li>Cache-related errors</li>
            <li>Response time differences (cached vs. uncached)</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 
 