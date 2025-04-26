"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "@/components/code-block"
import { BlessCliIntegration } from "@/components/bless-cli-integration"
import { InfoIcon } from "lucide-react"

export default function IPGeolocationClientPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">IP Geolocation API</h1>
      <p className="text-xl text-muted-foreground mb-8">An API for retrieving location information from IP addresses</p>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>The IP Geolocation API provides location data based on IP addresses</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The IP Geolocation API (ipapi) is a free, simple API that provides location information based on IP
              addresses. It can determine a user's country, region, city, timezone, and more from their IP address. This
              API is useful for customizing content based on location, implementing geo-restrictions, or analyzing user
              demographics.
            </p>

            <h3 className="text-lg font-semibold mt-6">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Free tier with generous usage limits</li>
              <li>No API key required for basic usage</li>
              <li>Accurate geolocation data</li>
              <li>Country, region, and city information</li>
              <li>Timezone and currency data</li>
              <li>Multiple response formats (JSON, XML, CSV, YAML)</li>
              <li>CORS support for browser-based applications</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>How to start using the IP Geolocation API</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">Base URL</h3>
            <p className="mb-4">The base URL for all API requests is:</p>
            <CodeBlock code="https://ipapi.co" language="plaintext" />

            <h3 className="text-lg font-semibold mt-6">Authentication</h3>
            <p>
              The IP Geolocation API doesn't require authentication for basic usage. However, there are usage limits for
              the free tier:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>1,000 requests per day</li>
              <li>Rate limit of 30 requests per minute</li>
            </ul>
            <p className="mt-4">
              For higher limits, you can sign up for a paid plan at{" "}
              <a
                href="https://ipapi.co/pricing/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ipapi.co/pricing
              </a>
              .
            </p>

            <Alert className="mt-6">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Important Note</AlertTitle>
              <AlertDescription>
                For production applications, it's recommended to use the API with an access key to avoid rate limiting
                and get higher quotas. You can get an access key by signing up for a paid plan.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
            <CardDescription>Available endpoints and how to use them</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current">
              <TabsList>
                <TabsTrigger value="current">Current IP</TabsTrigger>
                <TabsTrigger value="specific">Specific IP</TabsTrigger>
                <TabsTrigger value="fields">Specific Fields</TabsTrigger>
              </TabsList>
              <TabsContent value="current">
                <h3 className="text-lg font-semibold">Get Current IP Information</h3>
                <p className="mb-4">Retrieve information about the IP address making the request:</p>
                <CodeBlock code="GET https://ipapi.co/json/" language="plaintext" />

                <h4 className="text-md font-semibold mt-6">Example Response</h4>
                <CodeBlock
                  code={`{
  "ip": "8.8.8.8",
  "network": "8.8.8.0/24",
  "version": "IPv4",
  "city": "Mountain View",
  "region": "California",
  "region_code": "CA",
  "country": "US",
  "country_name": "United States",
  "country_code": "US",
  "country_code_iso3": "USA",
  "country_capital": "Washington",
  "country_tld": ".us",
  "continent_code": "NA",
  "in_eu": false,
  "postal": "94035",
  "latitude": 37.386,
  "longitude": -122.0838,
  "timezone": "America/Los_Angeles",
  "utc_offset": "-0700",
  "country_calling_code": "+1",
  "currency": "USD",
  "currency_name": "Dollar",
  "languages": "en-US,es-US,haw,fr",
  "country_area": 9629091.0,
  "country_population": 327167434,
  "asn": "AS15169",
  "org": "Google LLC"
}`}
                  language="json"
                />
              </TabsContent>
              <TabsContent value="specific">
                <h3 className="text-lg font-semibold">Get Specific IP Information</h3>
                <p className="mb-4">Retrieve information about a specific IP address:</p>
                <CodeBlock code="GET https://ipapi.co/{ip}/json/" language="plaintext" />

                <p className="mt-4">Replace {"{ip}"} with the IP address you want to look up.</p>

                <h4 className="text-md font-semibold mt-6">Example Request</h4>
                <CodeBlock code="GET https://ipapi.co/8.8.8.8/json/" language="plaintext" />

                <h4 className="text-md font-semibold mt-6">Example Response</h4>
                <CodeBlock
                  code={`{
  "ip": "8.8.8.8",
  "network": "8.8.8.0/24",
  "version": "IPv4",
  "city": "Mountain View",
  "region": "California",
  "region_code": "CA",
  "country": "US",
  "country_name": "United States",
  "country_code": "US",
  "country_code_iso3": "USA",
  "country_capital": "Washington",
  "country_tld": ".us",
  "continent_code": "NA",
  "in_eu": false,
  "postal": "94035",
  "latitude": 37.386,
  "longitude": -122.0838,
  "timezone": "America/Los_Angeles",
  "utc_offset": "-0700",
  "country_calling_code": "+1",
  "currency": "USD",
  "currency_name": "Dollar",
  "languages": "en-US,es-US,haw,fr",
  "country_area": 9629091.0,
  "country_population": 327167434,
  "asn": "AS15169",
  "org": "Google LLC"
}`}
                  language="json"
                />
              </TabsContent>
              <TabsContent value="fields">
                <h3 className="text-lg font-semibold">Get Specific Fields</h3>
                <p className="mb-4">Retrieve specific fields for an IP address:</p>
                <CodeBlock code="GET https://ipapi.co/{ip}/{field}/" language="plaintext" />

                <p className="mt-4">
                  Replace {"{ip}"} with the IP address and {"{field}"} with the field you want to retrieve.
                </p>

                <h4 className="text-md font-semibold mt-6">Available Fields</h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>city</li>
                  <li>region</li>
                  <li>region_code</li>
                  <li>country</li>
                  <li>country_name</li>
                  <li>continent_code</li>
                  <li>postal</li>
                  <li>latitude</li>
                  <li>longitude</li>
                  <li>timezone</li>
                  <li>utc_offset</li>
                  <li>country_calling_code</li>
                  <li>currency</li>
                  <li>currency_name</li>
                  <li>languages</li>
                  <li>asn</li>
                  <li>org</li>
                </ul>

                <h4 className="text-md font-semibold mt-6">Example Request</h4>
                <CodeBlock code="GET https://ipapi.co/8.8.8.8/country_name/" language="plaintext" />

                <h4 className="text-md font-semibold mt-6">Example Response</h4>
                <CodeBlock code="United States" language="plaintext" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Code Examples</CardTitle>
            <CardDescription>How to use the IP Geolocation API in your code</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript">
              <TabsList>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
              </TabsList>
              <TabsContent value="javascript">
                <h3 className="text-lg font-semibold">Get IP Information</h3>
                <CodeBlock
                  code={`// Using fetch API
async function getIPInfo(ip = null) {
  try {
    // Construct the URL based on whether an IP is provided
    const url = ip ? \`https://ipapi.co/\${ip}/json/\` : 'https://ipapi.co/json/';
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Display the IP information
    console.log('IP Information:');
    console.log(\`IP: \${data.ip}\`);
    console.log(\`Location: \${data.city}, \${data.region}, \${data.country_name}\`);
    console.log(\`Coordinates: \${data.latitude}, \${data.longitude}\`);
    console.log(\`Timezone: \${data.timezone}\`);
    console.log(\`Organization: \${data.org}\`);
    
    return data;
  } catch (error) {
    console.error('Error fetching IP information:', error);
    return null;
  }
}

// Get specific field for an IP
async function getIPField(ip, field) {
  try {
    const url = \`https://ipapi.co/\${ip}/\${field}/\`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.text();
    
    console.log(\`\${field} for IP \${ip}: \${data}\`);
    
    return data;
  } catch (error) {
    console.error(\`Error fetching \${field} for IP \${ip}:, error\`);
    return null;
  }
}

// Example usage
getIPInfo(); // Get information about the current IP
getIPInfo('8.8.8.8'); // Get information about a specific IP
getIPField('8.8.8.8', 'country_name'); // Get the country name for a specific IP`}
                  language="javascript"
                />
              </TabsContent>
              <TabsContent value="python">
                <h3 className="text-lg font-semibold">Get IP Information</h3>
                <CodeBlock
                  code={`import requests

def get_ip_info(ip=None):
    try:
        # Construct the URL based on whether an IP is provided
        url = f'https://ipapi.co/{ip}/json/' if ip else 'https://ipapi.co/json/'
        
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        
        data = response.json()
        
        # Display the IP information
        print('IP Information:')
        print(f"IP: {data['ip']}")
        print(f"Location: {data['city']}, {data['region']}, {data['country_name']}")
        print(f"Coordinates: {data['latitude']}, {data['longitude']}")
        print(f"Timezone: {data['timezone']}")
        print(f"Organization: {data['org']}")
        
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching IP information: {e}")
        return None

# Get specific field for an IP
def get_ip_field(ip, field):
    try:
        url = f'https://ipapi.co/{ip}/{field}/'
        
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        
        data = response.text
        
        print(f"{field} for IP {ip}: {data}")
        
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {field} for IP {ip}: {e}")
        return None

# Example usage
get_ip_info()  # Get information about the current IP
get_ip_info('8.8.8.8')  # Get information about a specific IP
get_ip_field('8.8.8.8', 'country_name')  # Get the country name for a specific IP`}
                  language="python"
                />
              </TabsContent>
              <TabsContent value="react">
                <h3 className="text-lg font-semibold">IP Geolocation Component</h3>
                <CodeBlock
                  code={`import { useState, useEffect } from 'react';

function IPGeolocationComponent() {
  const [ipInfo, setIpInfo] = useState(null);
  const [customIP, setCustomIP] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch information about the current IP on component mount
  useEffect(() => {
    fetchIPInfo();
  }, []);

  const fetchIPInfo = async (ip = null) => {
    setLoading(true);
    setError(null);
    
    try {
      // Construct the URL based on whether an IP is provided
      const url = ip ? \`https://ipapi.co/\${ip}/json/\` : 'https://ipapi.co/json/';
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.reason || 'Unknown error');
      }
      
      setIpInfo(data);
    } catch (err) {
      setError(err.message);
      setIpInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customIP.trim()) {
      fetchIPInfo(customIP.trim());
    }
  };

  return (
    <div className="ip-geolocation-container">
      <h2>IP Geolocation Lookup</h2>
      
      <form onSubmit={handleSubmit} className="ip-form">
        <input
          type="text"
          value={customIP}
          onChange={(e) => setCustomIP(e.target.value)}
          placeholder="Enter an IP address (e.g., 8.8.8.8)"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Looking up...' : 'Lookup'}
        </button>
      </form>
      
      <button
        onClick={() => fetchIPInfo()}
        disabled={loading}
        className="current-ip-button"
      >
        Get My IP Info
      </button>
      
      {error && <p className="error">{error}</p>}
      
      {loading && <p>Loading IP information...</p>}
      
      {ipInfo && !loading && (
        <div className="ip-info">
          <h3>IP Information: {ipInfo.ip}</h3>
          
          <div className="info-grid">
            <div className="info-section">
              <h4>Location</h4>
              <p><strong>City:</strong> {ipInfo.city || 'N/A'}</p>
              <p><strong>Region:</strong> {ipInfo.region || 'N/A'}</p>
              <p><strong>Country:</strong> {ipInfo.country_name || 'N/A'}</p>
              <p><strong>Postal Code:</strong> {ipInfo.postal || 'N/A'}</p>
            </div>
            
            <div className="info-section">
              <h4>Coordinates</h4>
              <p><strong>Latitude:</strong> {ipInfo.latitude || 'N/A'}</p>
              <p><strong>Longitude:</strong> {ipInfo.longitude || 'N/A'}</p>
              <p><strong>Timezone:</strong> {ipInfo.timezone || 'N/A'}</p>
              <p><strong>UTC Offset:</strong> {ipInfo.utc_offset || 'N/A'}</p>
            </div>
            
            <div className="info-section">
              <h4>Network</h4>
              <p><strong>ASN:</strong> {ipInfo.asn || 'N/A'}</p>
              <p><strong>Organization:</strong> {ipInfo.org || 'N/A'}</p>
            </div>
            
            <div className="info-section">
              <h4>Other</h4>
              <p><strong>Currency:</strong> {ipInfo.currency_name} ({ipInfo.currency})</p>
              <p><strong>Languages:</strong> {ipInfo.languages || 'N/A'}</p>
              <p><strong>Calling Code:</strong> {ipInfo.country_calling_code || 'N/A'}</p>
            </div>
          </div>
          
          {ipInfo.latitude && ipInfo.longitude && (
            <div className="map-container">
              <h4>Map</h4>
              <a
                href={\`https://www.openstreetmap.org/?mlat=\${ipInfo.latitude}&mlon=\${ipInfo.longitude}&zoom=12\`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                View on OpenStreetMap
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default IPGeolocationComponent;`}
                  language="jsx"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Handling</CardTitle>
            <CardDescription>Common errors and how to handle them</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">Common Error Responses</h3>
            <p className="mb-4">The API may return the following error responses:</p>

            <div className="space-y-4">
              <div>
                <h4 className="text-md font-semibold">400 Bad Request</h4>
                <p>Invalid IP address format or other request error.</p>
                <CodeBlock
                  code={`{
  "error": true,
  "reason": "Invalid IP address"
}`}
                  language="json"
                />
              </div>

              <div>
                <h4 className="text-md font-semibold">429 Too Many Requests</h4>
                <p>You've exceeded the rate limit or daily quota.</p>
                <CodeBlock
                  code={`{
  "error": true,
  "reason": "Rate limit exceeded"
}`}
                  language="json"
                />
              </div>

              <div>
                <h4 className="text-md font-semibold">403 Forbidden</h4>
                <p>Access denied, possibly due to IP blocking or security measures.</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6">Best Practices for Error Handling</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Always check for error responses and handle them gracefully</li>
              <li>Implement retry logic with exponential backoff for rate limit errors</li>
              <li>Consider caching results to reduce API calls</li>
              <li>Provide user-friendly error messages in your application</li>
              <li>For production applications, consider upgrading to a paid plan to avoid rate limits</li>
            </ul>
          </CardContent>
        </Card>

        <BlessCliIntegration
          apiName="IP Geolocation API"
          apiBaseUrl="https://ipapi.co"
          apiEndpoint="/json/"
          authType="none"
        />

        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>More information about the IP Geolocation API</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://ipapi.co/api/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Official Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://ipapi.co/pricing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Pricing Information
                </a>
              </li>
              <li>
                <a
                  href="https://ipapi.co/examples/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Code Examples
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
