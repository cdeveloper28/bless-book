import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import CodeBlock from "@/components/code-block"

export default function CachingGuide() {
  // Sample code snippets
  const inMemoryCacheExample = `// Simple in-memory cache implementation
class InMemoryCache {
  constructor(maxAge = 60000) {
    this.cache = new Map();
    this.maxAge = maxAge; // Default: 1 minute in milliseconds
  }
  
  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }
  
  get(key) {
    const item = this.cache.get(key);
    
    // Return null if item doesn't exist
    if (!item) {
      return null;
    }
    
    // Check if the item has expired
    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key); // Remove expired item
      return null;
    }
    
    return item.value;
  }
  
  delete(key) {
    this.cache.delete(key);
  }
  
  clear() {
    this.cache.clear();
  }
}

// Usage example
const apiCache = new InMemoryCache(5 * 60 * 1000); // 5 minutes

async function fetchWithCache(url) {
  // Check cache first
  const cachedData = apiCache.get(url);
  if (cachedData) {
    console.log('Cache hit for:', url);
    return cachedData;
  }
  
  // If not in cache, fetch from API
  console.log('Cache miss for:', url);
  const response = await fetch(url);
  const data = await response.json();
  
  // Store in cache
  apiCache.set(url, data);
  
  return data;
}`

  const localStorageCacheExample = `// Local Storage cache implementation
class LocalStorageCache {
  constructor(prefix = 'api_cache_', maxAge = 60 * 60 * 1000) {
    this.prefix = prefix;
    this.maxAge = maxAge; // Default: 1 hour in milliseconds
  }
  
  getKey(key) {
    return \`\${this.prefix}\${key}\`;
  }
  
  set(key, value) {
    const item = {
      value,
      timestamp: Date.now()
    };
    
    localStorage.setItem(this.getKey(key), JSON.stringify(item));
  }
  
  get(key) {
    try {
      const itemStr = localStorage.getItem(this.getKey(key));
      
      // Return null if item doesn't exist
      if (!itemStr) {
        return null;
      }
      
      const item = JSON.parse(itemStr);
      
      // Check if the item has expired
      if (Date.now() - item.timestamp > this.maxAge) {
        this.delete(key); // Remove expired item
        return null;
      }
      
      return item.value;
    } catch (error) {
      console.error('Error retrieving from cache:', error);
      return null;
    }
  }
  
  delete(key) {
    localStorage.removeItem(this.getKey(key));
  }
  
  clear() {
    // Only clear items with our prefix
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    }
  }
}

// Usage example
const apiCache = new LocalStorageCache('api_v1_');

async function fetchWithCache(url) {
  // Create a cache key from the URL
  const cacheKey = encodeURIComponent(url);
  
  // Check cache first
  const cachedData = apiCache.get(cacheKey);
  if (cachedData) {
    console.log('Cache hit for:', url);
    return cachedData;
  }
  
  // If not in cache, fetch from API
  console.log('Cache miss for:', url);
  const response = await fetch(url);
  const data = await response.json();
  
  // Store in cache
  apiCache.set(cacheKey, data);
  
  return data;
}`

  const indexedDBCacheExample = `// IndexedDB cache implementation
class IndexedDBCache {
  constructor(dbName = 'apiCache', storeName = 'responses', maxAge = 24 * 60 * 60 * 1000) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.maxAge = maxAge; // Default: 24 hours in milliseconds
    this.db = null;
  }
  
  async open() {
    if (this.db) return this.db;
    
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onerror = (event) => {
        console.error('IndexedDB error:', event);
        reject('Error opening IndexedDB');
      };
      
      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'key' });
        }
      };
    });
  }
  
  async set(key, value) {
    const db = await this.open();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const item = {
        key,
        value,
        timestamp: Date.now()
      };
      
      const request = store.put(item);
      
      request.onerror = (event) => {
        console.error('Error storing in cache:', event);
        reject('Error storing in cache');
      };
      
      request.onsuccess = (event) => {
        resolve();
      };
    });
  }
  
  async get(key) {
    const db = await this.open();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      
      const request = store.get(key);
      
      request.onerror = (event) => {
        console.error('Error retrieving from cache:', event);
        reject('Error retrieving from cache');
      };
      
      request.onsuccess = (event) => {
        const item = request.result;
        
        // Return null if item doesn't exist
        if (!item) {
          resolve(null);
          return;
        }
        
        // Check if the item has expired
        if (Date.now() - item.timestamp > this.maxAge) {
          this.delete(key); // Remove expired item
          resolve(null);
          return;
        }
        
        resolve(item.value);
      };
    });
  }
  
  async delete(key) {
    const db = await this.open();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const request = store.delete(key);
      
      request.onerror = (event) => {
        console.error('Error deleting from cache:', event);
        reject('Error deleting from cache');
      };
      
      request.onsuccess = (event) => {
        resolve();
      };
    });
  }
  
  async clear() {
    const db = await this.open();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const request = store.clear();
      
      request.onerror = (event) => {
        console.error('Error clearing cache:', event);
        reject('Error clearing cache');
      };
      
      request.onsuccess = (event) => {
        resolve();
      };
    });
  }
}

// Usage example
const apiCache = new IndexedDBCache();

async function fetchWithCache(url) {
  // Create a cache key from the URL
  const cacheKey = encodeURIComponent(url);
  
  try {
    // Check cache first
    const cachedData = await apiCache.get(cacheKey);
    if (cachedData) {
      console.log('Cache hit for:', url);
      return cachedData;
    }
    
    // If not in cache, fetch from API
    console.log('Cache miss for:', url);
    const response = await fetch(url);
    const data = await response.json();
    
    // Store in cache
    await apiCache.set(cacheKey, data);
    
    return data;
  } catch (error) {
    console.error('Cache error:', error);
    
    // Fallback to direct API call if cache fails
    const response = await fetch(url);
    return response.json();
  }
}`

  const httpCachingExample = `// Using HTTP caching headers
async function fetchWithHttpCaching(url) {
  const response = await fetch(url, {
    // Use cache: 'default' to respect HTTP cache headers
    cache: 'default'
  });
  
  // Log cache-related headers
  console.log('Cache-Control:', response.headers.get('Cache-Control'));
  console.log('ETag:', response.headers.get('ETag'));
  console.log('Last-Modified:', response.headers.get('Last-Modified'));
  
  return response.json();
}

// Making a conditional request with If-None-Match
async function fetchWithETag(url, etag) {
  const headers = {};
  
  if (etag) {
    headers['If-None-Match'] = etag;
  }
  
  const response = await fetch(url, { headers });
  
  // If the resource hasn't changed, we'll get a 304 Not Modified
  if (response.status === 304) {
    console.log('Resource not modified, using cached data');
    return null; // Signal to use cached data
  }
  
  // Store the new ETag for future requests
  const newETag = response.headers.get('ETag');
  if (newETag) {
    console.log('New ETag:', newETag);
    // Save this ETag for future requests
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
          <h1 className="text-3xl font-bold tracking-tight">API Response Caching</h1>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Intermediate</span>
          <span>•</span>
          <span>25 min read</span>
          <span>•</span>
          <span>Last updated: April 26, 2024</span>
        </div>

        <div className="prose prose-green dark:prose-invert max-w-none">
          <h2>Introduction to API Response Caching</h2>
          <p>
            Caching API responses is a powerful technique that can significantly improve the performance, reliability,
            and efficiency of your applications. By storing and reusing API responses, you can:
          </p>
          <ul>
            <li>Reduce latency and improve user experience</li>
            <li>Decrease network usage and bandwidth costs</li>
            <li>Reduce the load on API servers</li>
            <li>Make your application more resilient to API outages</li>
            <li>Stay within API rate limits</li>
          </ul>

          <p>
            In this guide, we'll explore different caching strategies and implementations to help you effectively cache
            API responses in your applications.
          </p>

          <h2>Caching Fundamentals</h2>
          <p>Before diving into implementation details, let's understand some fundamental concepts of caching:</p>

          <h3>Cache Key</h3>
          <p>
            A unique identifier used to store and retrieve cached data. For API requests, this is typically derived
            from:
          </p>
          <ul>
            <li>The request URL</li>
            <li>Query parameters</li>
            <li>Request headers (when relevant)</li>
            <li>Request body (for POST/PUT requests)</li>
          </ul>

          <h3>Cache Lifetime (TTL)</h3>
          <p>
            The duration for which cached data is considered valid. After this period, the data is considered "stale"
            and should be refreshed.
          </p>

          <h3>Cache Invalidation</h3>
          <p>The process of removing or updating cached data when it's no longer valid. This can happen:</p>
          <ul>
            <li>Automatically when the TTL expires</li>
            <li>Manually when data is known to have changed</li>
            <li>Based on specific events or triggers</li>
          </ul>

          <h3>Cache Hit/Miss</h3>
          <ul>
            <li>
              <strong>Cache Hit</strong>: The requested data is found in the cache
            </li>
            <li>
              <strong>Cache Miss</strong>: The requested data is not in the cache and must be fetched from the API
            </li>
          </ul>

          <h2>Caching Strategies</h2>
          <p>Different caching strategies are appropriate for different types of data and use cases:</p>

          <h3>Cache-Aside (Lazy Loading)</h3>
          <p>The most common pattern where the application:</p>
          <ol>
            <li>Checks the cache first</li>
            <li>If the data is not in the cache (cache miss), fetches it from the API</li>
            <li>Stores the fetched data in the cache for future use</li>
          </ol>

          <h3>Write-Through</h3>
          <p>When data is updated:</p>
          <ol>
            <li>The application updates the API</li>
            <li>Then immediately updates the cache</li>
          </ol>
          <p>This ensures the cache is always up-to-date but adds overhead to write operations.</p>

          <h3>Cache Invalidation</h3>
          <p>Strategies for keeping the cache fresh:</p>
          <ul>
            <li>
              <strong>Time-Based Invalidation</strong>: Cache entries expire after a set time
            </li>
            <li>
              <strong>Event-Based Invalidation</strong>: Cache is updated when specific events occur
            </li>
            <li>
              <strong>Version-Based Invalidation</strong>: Cache entries are tagged with a version and invalidated when
              the version changes
            </li>
          </ul>

          <h3>Stale-While-Revalidate</h3>
          <p>A hybrid approach where:</p>
          <ol>
            <li>Return cached data immediately (even if stale)</li>
            <li>Asynchronously fetch fresh data from the API</li>
            <li>Update the cache with the fresh data for next time</li>
          </ol>
          <p>This provides the best of both worlds: immediate responses and eventually fresh data.</p>

          <h2>Client-Side Caching Implementations</h2>
          <p>Let's explore different ways to implement caching in client-side applications:</p>

          <h3>In-Memory Cache</h3>
          <p>The simplest form of caching, storing data in memory:</p>

          <CodeBlock code={inMemoryCacheExample} language="javascript" />

          <p>
            <strong>Advantages:</strong>
          </p>
          <ul>
            <li>Very fast access</li>
            <li>Simple implementation</li>
            <li>No external dependencies</li>
          </ul>

          <p>
            <strong>Limitations:</strong>
          </p>
          <ul>
            <li>Data is lost when the page is refreshed or closed</li>
            <li>Limited by available memory</li>
            <li>Not shared between tabs or windows</li>
          </ul>

          <h3>Local Storage Cache</h3>
          <p>Using the browser's localStorage API for persistent caching:</p>

          <CodeBlock code={localStorageCacheExample} language="javascript" />

          <p>
            <strong>Advantages:</strong>
          </p>
          <ul>
            <li>Data persists across page refreshes and browser sessions</li>
            <li>Simple API</li>
            <li>Available in all modern browsers</li>
          </ul>

          <p>
            <strong>Limitations:</strong>
          </p>
          <ul>
            <li>Limited storage space (typically 5-10MB)</li>
            <li>Synchronous API can block the main thread</li>
            <li>Only supports string data (requires serialization)</li>
            <li>Not suitable for sensitive data</li>
          </ul>

          <h3>IndexedDB Cache</h3>
          <p>Using the browser's IndexedDB for larger and more complex data:</p>

          <CodeBlock code={indexedDBCacheExample} language="javascript" />

          <p>
            <strong>Advantages:</strong>
          </p>
          <ul>
            <li>Larger storage capacity (typically 50-100MB or more)</li>
            <li>Supports complex data structures</li>
            <li>Asynchronous API doesn't block the main thread</li>
            <li>Better performance for large datasets</li>
          </ul>

          <p>
            <strong>Limitations:</strong>
          </p>
          <ul>
            <li>More complex API</li>
            <li>Not suitable for sensitive data</li>
          </ul>

          <h3>HTTP Caching</h3>
          <p>Leveraging the browser's built-in HTTP cache:</p>

          <CodeBlock code={httpCachingExample} language="javascript" />

          <p>
            <strong>Advantages:</strong>
          </p>
          <ul>
            <li>Built into the browser</li>
            <li>Respects standard HTTP caching headers</li>
            <li>Can be controlled by the server</li>
            <li>Works with the browser's back/forward cache</li>
          </ul>

          <p>
            <strong>Limitations:</strong>
          </p>
          <ul>
            <li>Less control over caching behavior</li>
            <li>Depends on proper cache headers from the API</li>
            <li>Can be difficult to debug</li>
          </ul>

          <h2>Server-Side Caching</h2>
          <p>For applications with a server component, server-side caching can be more efficient:</p>

          <h3>Memory Caching (Redis, Memcached)</h3>
          <p>Using in-memory data stores for high-performance caching:</p>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Example using Redis with Node.js
const redis = require('redis');
const { promisify } = require('util');

// Create Redis client
const client = redis.createClient({
  host: 'localhost',
  port: 6379
});

// Promisify Redis commands
const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

async function fetchWithRedisCache(url, ttlSeconds = 300) {
  // Create a cache key from the URL
  const cacheKey = \`api:\${url}\`;
  
  try {
    // Check cache first
    const cachedData = await getAsync(cacheKey);
    if (cachedData) {
      console.log('Cache hit for:', url);
      return JSON.parse(cachedData);
    }
    
    // If not in cache, fetch from API
    console.log('Cache miss for:', url);
    const response = await fetch(url);
    const data = await response.json();
    
    // Store in cache with TTL
    await setexAsync(cacheKey, ttlSeconds, JSON.stringify(data));
    
    return data;
  } catch (error) {
    console.error('Cache error:', error);
    
    // Fallback to direct API call if cache fails
    const response = await fetch(url);
    return response.json();
  }
}`}
          </pre>

          <h3>Response Caching Middleware</h3>
          <p>For frameworks like Express.js, you can use middleware for caching:</p>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Example using express-cache-middleware
const express = require('express');
const cacheMiddleware = require('express-cache-middleware');
const cacheManager = require('cache-manager');

const app = express();

// Create cache instance
const memoryCache = cacheManager.caching({
  store: 'memory',
  max: 100,
  ttl: 60 // seconds
});

// Initialize cache middleware
const cacheMiddlewareInstance = new cacheMiddleware({
  cacheManager: memoryCache
});

cacheMiddlewareInstance.attach(app);

// This route will be cached
app.get('/api/data', async (req, res) => {
  // Expensive operation or external API call
  const data = await fetchDataFromExternalAPI();
  res.json(data);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
          </pre>

          <h3>CDN Caching</h3>
          <p>For public, static, or semi-static content, Content Delivery Networks (CDNs) provide efficient caching:</p>
          <ul>
            <li>Distribute content across global edge locations</li>
            <li>Reduce latency for users worldwide</li>
            <li>Offload traffic from your origin servers</li>
            <li>Provide DDoS protection</li>
          </ul>

          <p>Configure your API responses with appropriate cache headers to leverage CDN caching:</p>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Example setting cache headers in Express.js
app.get('/api/public-data', (req, res) => {
  // Set cache headers
  res.set({
    'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    'Surrogate-Control': 'max-age=86400'     // CDN cache for 24 hours
  });
  
  // Send response
  res.json(publicData);
});`}
          </pre>

          <h2>Advanced Caching Techniques</h2>

          <h3>Cache Stampede Prevention</h3>
          <p>
            When a cached item expires, multiple concurrent requests might try to refresh it simultaneously, causing a
            "cache stampede." Prevent this with:
          </p>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Preventing cache stampede with a mutex
const locks = new Map();

async function fetchWithStampedeProtection(url, ttl = 300000) {
  const cacheKey = \`cache:\${url}\`;
  const lockKey = \`lock:\${url}\`;
  
  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  
  // If another request is already refreshing the cache, wait for it
  if (locks.has(lockKey)) {
    console.log('Waiting for existing request to complete');
    await locks.get(lockKey);
    
    // Check cache again after waiting
    const cachedDataAfterWait = cache.get(cacheKey);
    if (cachedDataAfterWait) {
      return cachedDataAfterWait;
    }
  }
  
  // Create a promise that will resolve when this request completes
  let resolveLock;
  const lockPromise = new Promise(resolve => {
    resolveLock = resolve;
  });
  
  // Set the lock
  locks.set(lockKey, lockPromise);
  
  try {
    // Fetch fresh data
    const response = await fetch(url);
    const data = await response.json();
    
    // Update cache
    cache.set(cacheKey, data, ttl);
    
    return data;
  } finally {
    // Release the lock
    resolveLock();
    locks.delete(lockKey);
  }
}`}
          </pre>

          <h3>Background Refresh</h3>
          <p>Refresh cache items in the background before they expire:</p>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Background refresh implementation
class CacheWithBackgroundRefresh {
  constructor(ttl = 300000, refreshThreshold = 0.8) {
    this.cache = new Map();
    this.ttl = ttl;
    this.refreshThreshold = refreshThreshold; // Refresh when 80% of TTL has elapsed
  }
  
  async get(key, fetchFn) {
    const now = Date.now();
    const cachedItem = this.cache.get(key);
    
    // If item exists in cache
    if (cachedItem) {
      const age = now - cachedItem.timestamp;
      const shouldRefresh = age > this.ttl * this.refreshThreshold;
      
      // If item is still fresh enough, return it
      if (!shouldRefresh) {
        return cachedItem.value;
      }
      
      // If item should be refreshed but is still valid, refresh in background
      if (age < this.ttl) {
        console.log('Background refreshing:', key);
        this.refreshInBackground(key, fetchFn);
        return cachedItem.value;
      }
    }
    
    // If item doesn't exist or is expired, fetch it synchronously
    return this.fetchAndCache(key, fetchFn);
  }
  
  async fetchAndCache(key, fetchFn) {
    try {
      const value = await fetchFn();
      
      this.cache.set(key, {
        value,
        timestamp: Date.now()
      });
      
      return value;
    } catch (error) {
      // If fetch fails and we have a stale value, return it
      const cachedItem = this.cache.get(key);
      if (cachedItem) {
        console.warn('Fetch failed, returning stale data for:', key);
        return cachedItem.value;
      }
      
      throw error;
    }
  }
  
  async refreshInBackground(key, fetchFn) {
    // Use setTimeout to make this non-blocking
    setTimeout(async () => {
      try {
        await this.fetchAndCache(key, fetchFn);
        console.log('Background refresh completed for:', key);
      } catch (error) {
        console.error('Background refresh failed for:', key, error);
      }
    }, 0);
  }
}

// Usage
const cache = new CacheWithBackgroundRefresh(5 * 60 * 1000); // 5 minutes TTL

async function getData(url) {
  return cache.get(url, () => fetch(url).then(res => res.json()));
}`}
          </pre>

          <h3>Tiered Caching</h3>
          <p>Implement multiple layers of caching for optimal performance:</p>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {`// Tiered caching example
class TieredCache {
  constructor() {
    // In-memory cache (fastest, but volatile)
    this.memoryCache = new Map();
    
    // Initialize other cache tiers
    this.initializeLocalStorage();
    this.initializeIndexedDB();
  }
  
  async initializeLocalStorage() {
    // Initialize localStorage wrapper
    this.localStorage = {
      get: (key) => {
        const item = localStorage.getItem(key);
        if (!item) return null;
        
        try {
          const parsed = JSON.parse(item);
          if (parsed.expiry && Date.now() > parsed.expiry) {
            localStorage.removeItem(key);
            return null;
          }
          return parsed.value;
        } catch (e) {
          return null;
        }
      },
      set: (key, value, ttl = 3600000) => {
        const item = {
          value,
          expiry: Date.now() + ttl
        };
        localStorage.setItem(key, JSON.stringify(item));
      }
    };
  }
  
  async initializeIndexedDB() {
    // Initialize IndexedDB (implementation omitted for brevity)
    this.indexedDB = {
      get: async (key) => { /* ... */ },
      set: async (key, value, ttl) => { /* ... */ }
    };
  }
  
  async get(key) {
    // Try memory cache first (fastest)
    if (this.memoryCache.has(key)) {
      const item = this.memoryCache.get(key);
      if (Date.now() < item.expiry) {
        console.log('Memory cache hit:', key);
        return item.value;
      }
      this.memoryCache.delete(key);
    }
    
    // Try localStorage next
    const localStorageValue = this.localStorage.get(key);
    if (localStorageValue) {
      console.log('LocalStorage cache hit:', key);
      // Promote to memory cache
      this.memoryCache.set(key, {
        value: localStorageValue,
        expiry: Date.now() + 60000 // 1 minute in memory
      });
      return localStorageValue;
    }
    
    // Try IndexedDB last
    const indexedDBValue = await this.indexedDB.get(key);
    if (indexedDBValue) {
      console.log('IndexedDB cache hit:', key);
      // Promote to higher cache tiers
      this.localStorage.set(key, indexedDBValue);
      this.memoryCache.set(key, {
        value: indexedDBValue,
        expiry: Date.now() + 60000
      });
      return indexedDBValue;
    }
    
    // Cache miss
    console.log('Cache miss:', key);
    return null;
  }
  
  async set(key, value, ttl = 3600000) {
    // Set in all cache tiers
    this.memoryCache.set(key, {
      value,
      expiry: Date.now() + Math.min(ttl, 300000) // Max 5 minutes in memory
    });  {
      value,
      expiry: Date.now() + Math.min(ttl, 300000) // Max 5 minutes in memory
    });
    
    this.localStorage.set(key, value, ttl);
    await this.indexedDB.set(key, value, ttl);
  }
  
  async invalidate(key) {
    // Remove from all cache tiers
    this.memoryCache.delete(key);
    localStorage.removeItem(key);
    await this.indexedDB.delete(key);
  }
}

// Usage
const tieredCache = new TieredCache();

async function fetchWithTieredCache(url) {
  const cacheKey = \`api:\${url}\`;
  
  // Try to get from cache first
  const cachedData = await tieredCache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  
  // Fetch fresh data
  const response = await fetch(url);
  const data = await response.json();
  
  // Store in cache
  await tieredCache.set(cacheKey, data);
  
  return data;
}`}
          </pre>

          <h2>Caching Best Practices</h2>
          <p>Follow these best practices to implement effective caching:</p>

          <h3>Cache Invalidation Strategies</h3>
          <ul>
            <li>
              <strong>Time-Based Invalidation</strong>: Set appropriate TTLs based on data volatility
            </li>
            <li>
              <strong>Event-Based Invalidation</strong>: Invalidate cache when data changes (e.g., after mutations)
            </li>
            <li>
              <strong>Selective Invalidation</strong>: Only invalidate affected cache entries, not the entire cache
            </li>
          </ul>

          <h3>Security Considerations</h3>
          <ul>
            <li>Never cache sensitive data in client-side storage</li>
            <li>Be cautious with caching authenticated responses</li>
            <li>Consider encryption for cached data when appropriate</li>
            <li>Be aware of cache poisoning attacks</li>
          </ul>

          <h3>Performance Optimization</h3>
          <ul>
            <li>Use the fastest available storage for frequently accessed data</li>
            <li>Implement cache warming for critical data</li>
            <li>Monitor cache hit rates and adjust strategies accordingly</li>
            <li>Consider the memory/storage impact of your cache</li>
          </ul>

          <h3>Offline Support</h3>
          <ul>
            <li>Use caching as part of your offline strategy</li>
            <li>Implement service workers for more advanced offline capabilities</li>
            <li>Provide clear indicators when serving cached data</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            Effective API response caching is a powerful technique for improving application performance, reducing
            costs, and enhancing user experience. By implementing the appropriate caching strategies and techniques for
            your specific use case, you can significantly optimize your API integrations.
          </p>
          <p>
            Remember that caching is a trade-off between freshness and performance. The right balance depends on your
            specific requirements, the nature of your data, and your users' expectations.
          </p>

          <h2>Further Reading</h2>
          <ul>
            <li>
              <Link href="/guides/rate-limiting" className="text-primary hover:underline">
                Dealing with Rate Limits
              </Link>
            </li>
            <li>
              <Link href="/guides/error-handling" className="text-primary hover:underline">
                Error Handling Best Practices
              </Link>
            </li>
            <li>
              <Link href="/guides/security" className="text-primary hover:underline">
                API Security Best Practices
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
