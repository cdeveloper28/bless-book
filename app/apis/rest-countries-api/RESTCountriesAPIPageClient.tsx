"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "@/components/code-block"
import { BlessCliIntegration } from "@/components/bless-cli-integration"
import { InfoIcon } from "lucide-react"

export default function RESTCountriesAPIPageClient() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">REST Countries API</h1>
      <p className="text-xl text-muted-foreground mb-8">
        A simple API for getting information about countries around the world
      </p>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              The REST Countries API provides information about countries around the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The REST Countries API is a free API that provides information about countries, including details like
              population, area, capital, languages, currencies, flag images, and more. It's perfect for educational
              applications, travel apps, or any project that needs country data.
            </p>

            <h3 className="text-lg font-semibold mt-6">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Free to use with no API key required</li>
              <li>Comprehensive information about all countries</li>
              <li>Multiple search options (by name, code, currency, language, etc.)</li>
              <li>Flag images in SVG and PNG formats</li>
              <li>Regional and subregional grouping</li>
              <li>Border countries information</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>How to start using the REST Countries API</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">Base URL</h3>
            <p className="mb-4">The base URL for all API requests is:</p>
            <CodeBlock code="https://restcountries.com/v3.1" language="plaintext" />

            <h3 className="text-lg font-semibold mt-6">Authentication</h3>
            <p>
              The REST Countries API doesn't require authentication. You can start making requests right away without an
              API key.
            </p>

            <Alert className="mt-6">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Rate Limiting</AlertTitle>
              <AlertDescription>
                While there's no official rate limit, please be considerate and limit your requests to a reasonable
                number to ensure the service remains available for everyone.
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
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Countries</TabsTrigger>
                <TabsTrigger value="name">By Name</TabsTrigger>
                <TabsTrigger value="code">By Code</TabsTrigger>
                <TabsTrigger value="filters">Other Filters</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <h3 className="text-lg font-semibold">Get All Countries</h3>
                <p className="mb-4">Retrieve information about all countries:</p>
                <CodeBlock code="GET https://restcountries.com/v3.1/all" language="plaintext" />

                <h4 className="text-md font-semibold mt-6">Example Response (Partial)</h4>
                <CodeBlock
                  code={`[
  {
    "name": {
      "common": "Germany",
      "official": "Federal Republic of Germany",
      "nativeName": {
        "deu": {
          "official": "Bundesrepublik Deutschland",
          "common": "Deutschland"
        }
      }
    },
    "tld": [".de"],
    "cca2": "DE",
    "ccn3": "276",
    "cca3": "DEU",
    "cioc": "GER",
    "independent": true,
    "status": "officially-assigned",
    "unMember": true,
    "currencies": {
      "EUR": {
        "name": "Euro",
        "symbol": "€"
      }
    },
    "idd": {
      "root": "+4",
      "suffixes": ["9"]
    },
    "capital": ["Berlin"],
    "altSpellings": [
      "DE",
      "Federal Republic of Germany",
      "Bundesrepublik Deutschland"
    ],
    "region": "Europe",
    "subregion": "Western Europe",
    "languages": {
      "deu": "German"
    },
    "translations": {
      // translations in different languages
    },
    "latlng": [51.0, 9.0],
    "landlocked": false,
    "borders": ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"],
    "area": 357114.0,
    "demonyms": {
      // demonyms in different languages
    },
    "flag": "🇩🇪",
    "maps": {
      "googleMaps": "https://goo.gl/maps/mD9FBMq1nvXUBrkv6",
      "openStreetMaps": "https://www.openstreetmap.org/relation/51477"
    },
    "population": 83240525,
    "gini": {
      "2016": 31.9
    },
    "fifa": "GER",
    "car": {
      "signs": ["D"],
      "side": "right"
    },
    "timezones": ["UTC+01:00"],
    "continents": ["Europe"],
    "flags": {
      "png": "https://flagcdn.com/w320/de.png",
      "svg": "https://flagcdn.com/de.svg",
      "alt": "The flag of Germany is composed of three equal horizontal bands of black, red and gold."
    },
    "coatOfArms": {
      "png": "https://mainfacts.com/media/images/coats_of_arms/de.png",
      "svg": "https://mainfacts.com/media/images/coats_of_arms/de.svg"
    },
    "startOfWeek": "monday",
    "capitalInfo": {
      "latlng": [52.52, 13.4]
    },
    "postalCode": {
      "format": "#####",
      "regex": "^(\\d{5})$"
    }
  },
  // More countries...
]`}
                  language="json"
                />
              </TabsContent>
              <TabsContent value="name">
                <h3 className="text-lg font-semibold">Search by Country Name</h3>
                <p className="mb-4">Search for countries by name:</p>
                <CodeBlock code="GET https://restcountries.com/v3.1/name/{name}" language="plaintext" />

                <p className="mt-4">Replace {"{name}"} with the name of the country you want to search for.</p>

                <h4 className="text-md font-semibold mt-6">Example Request</h4>
                <CodeBlock code="GET https://restcountries.com/v3.1/name/united" language="plaintext" />

                <p className="mt-4">This will return all countries with "united" in their name.</p>

                <h4 className="text-md font-semibold mt-6">Exact Match</h4>
                <p className="mb-4">For an exact match, use the "fullText" query parameter:</p>
                <CodeBlock
                  code="GET https://restcountries.com/v3.1/name/united%20kingdom?fullText=true"
                  language="plaintext"
                />
              </TabsContent>
              <TabsContent value="code">
                <h3 className="text-lg font-semibold">Search by Country Code</h3>
                <p className="mb-4">Search for countries by their code:</p>

                <h4 className="text-md font-semibold mt-4">By ISO 3166-1 2-letter code (Alpha-2)</h4>
                <CodeBlock code="GET https://restcountries.com/v3.1/alpha/{code}" language="plaintext" />
                <p className="mt-2">
                  Example: <code>https://restcountries.com/v3.1/alpha/us</code>
                </p>

                <h4 className="text-md font-semibold mt-4">By ISO 3166-1 3-letter code (Alpha-3)</h4>
                <CodeBlock code="GET https://restcountries.com/v3.1/alpha/{code}" language="plaintext" />
                <p className="mt-2">
                  Example: <code>https://restcountries.com/v3.1/alpha/usa</code>
                </p>

                <h4 className="text-md font-semibold mt-4">By ISO 3166-1 numeric code</h4>
                <CodeBlock code="GET https://restcountries.com/v3.1/alpha/{code}" language="plaintext" />
                <p className="mt-2">
                  Example: <code>https://restcountries.com/v3.1/alpha/840</code>
                </p>

                <h4 className="text-md font-semibold mt-4">By list of codes</h4>
                <CodeBlock
                  code="GET https://restcountries.com/v3.1/alpha?codes={code},{code},{code}"
                  language="plaintext"
                />
                <p className="mt-2">
                  Example: <code>https://restcountries.com/v3.1/alpha?codes=usa,fra,can</code>
                </p>
              </TabsContent>
              <TabsContent value="filters">
                <h3 className="text-lg font-semibold">Other Search Filters</h3>

                <h4 className="text-md font-semibold mt-4">By Currency</h4>
                <CodeBlock code="GET https://restcountries.com/v3.1/currency/{currency}" language="plaintext" />
                <p className="mt-2">
                  Example: <code>https://restcountries.com/v3.1/currency/eur</code>
                </p>

                <h4 className="text-md font-semibold mt-4">By Language</h4>
                <CodeBlock code="GET https://restcountries.com/v3.1/lang/{language}" language="plaintext" />
                <p className="mt-2">
                  Example: <code>https://restcountries.com/v3.1/lang/spanish</code>
                </p>

                <h4 className="text-md font-semibold mt-4">By Capital City</h4>
                <CodeBlock code="GET https://restcountries.com/v3.1/capital/{capital}" language="plaintext" />
                <p className="mt-2">
                  Example: <code>https://restcountries.com/v3.1/capital/paris</code>
                </p>

                <h4 className="text-md font-semibold mt-4">By Region</h4>
                <CodeBlock code="GET https://restcountries.com/v3.1/region/{region}" language="plaintext" />
                <p className="mt-2">
                  Example: <code>https://restcountries.com/v3.1/region/europe</code>
                </p>

                <h4 className="text-md font-semibold mt-4">By Subregion</h4>
                <CodeBlock code="GET https://restcountries.com/v3.1/subregion/{subregion}" language="plaintext" />
                <p className="mt-2">
                  Example: <code>https://restcountries.com/v3.1/subregion/northern%20europe</code>
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Code Examples</CardTitle>
            <CardDescription>How to use the REST Countries API in your code</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript">
              <TabsList>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
              </TabsList>
              <TabsContent value="javascript">
                <h3 className="text-lg font-semibold">Fetch All Countries</h3>
                <CodeBlock
                  code={`// Using fetch API
async function getAllCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Sort countries by name
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    
    // Display the first 5 countries
    console.log('First 5 countries:');
    for (let i = 0; i < 5 && i < data.length; i++) {
      const country = data[i];
      console.log(\`\${country.name.common} - Capital: \${country.capital?.[0] || 'N/A'}, Population: \${country.population.toLocaleString()}\`);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return null;
  }
}

// Search for a country by name
async function searchCountryByName(name) {
  try {
    const response = await fetch(\`https://restcountries.com/v3.1/name/\${name}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Display information about the first matching country
    if (data && data.length > 0) {
      const country = data[0];
      console.log(\`Country: \${country.name.common} (\${country.name.official})\`);
      console.log(\`Capital: \${country.capital?.[0] || 'N/A'}\`);
      console.log(\`Region: \${country.region}, Subregion: \${country.subregion || 'N/A'}\`);
      console.log(\`Population: \${country.population.toLocaleString()}\`);
      console.log(\`Languages: \${Object.values(country.languages || {}).join(', ') || 'N/A'}\`);
      console.log(\`Currencies: \${Object.values(country.currencies || {}).map(c => \`\${c.name} (\${c.symbol || 'N/A'})\`).join(', ') || 'N/A'}\`);
      console.log(\`Flag: \${country.flags.svg}\`);
    }
    
    return data;
  } catch (error) {
    console.error('Error searching for country:', error);
    return null;
  }
}

// Example usage
getAllCountries();
searchCountryByName('canada');`}
                  language="javascript"
                />
              </TabsContent>
              <TabsContent value="python">
                <h3 className="text-lg font-semibold">Fetch All Countries</h3>
                <CodeBlock
                  code={`import requests

def get_all_countries():
    try:
        response = requests.get('https://restcountries.com/v3.1/all')
        response.raise_for_status()  # Raise an exception for HTTP errors
        
        data = response.json()
        
        # Sort countries by name
        data.sort(key=lambda x: x['name']['common'])
        
        # Display the first 5 countries
        print('First 5 countries:')
        for i in range(min(5, len(data))):
            country = data[i]
            capital = country['capital'][0] if 'capital' in country and country['capital'] else 'N/A'
            print(f"{country['name']['common']} - Capital: {capital}, Population: {country['population']:,}")
        
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching countries: {e}")
        return None

# Search for a country by name
def search_country_by_name(name):
    try:
        response = requests.get(f'https://restcountries.com/v3.1/name/{name}')
        response.raise_for_status()  # Raise an exception for HTTP errors
        
        data = response.json()
        
        # Display information about the first matching country
        if data and len(data) > 0:
            country = data[0]
            print(f"Country: {country['name']['common']} ({country['name']['official']})")
            
            capital = country['capital'][0] if 'capital' in country and country['capital'] else 'N/A'
            print(f"Capital: {capital}")
            
            subregion = country.get('subregion', 'N/A')
            print(f"Region: {country['region']}, Subregion: {subregion}")
            
            print(f"Population: {country['population']:,}")
            
            languages = ', '.join(country.get('languages', {}).values()) or 'N/A'
            print(f"Languages: {languages}")
            
            currencies = ', '.join([f"{c['name']} ({c.get('symbol', 'N/A')})" for c in country.get('currencies', {}).values()]) or 'N/A'
            print(f"Currencies: {currencies}")
            
            print(f"Flag: {country['flags']['svg']}")
        
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error searching for country: {e}")
        return None

# Search for countries by region
def search_countries_by_region(region):
    try:
        response = requests.get(f'https://restcountries.com/v3.1/region/{region}')
        response.raise_for_status()  # Raise an exception for HTTP errors
        
        data = response.json()
        
        # Sort countries by name
        data.sort(key=lambda x: x['name']['common'])
        
        print(f"Found {len(data)} countries in {region}:")
        for country in data[:5]:  # Show first 5 countries
            print(f"- {country['name']['common']}")
        
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error searching for countries by region: {e}")
        return None

# Example usage
get_all_countries()
search_country_by_name('france')
search_countries_by_region('africa')`}
                  language="python"
                />
              </TabsContent>
              <TabsContent value="react">
                <h3 className="text-lg font-semibold">Country Explorer Component</h3>
                <CodeBlock
                  code={`import { useState, useEffect } from 'react';

function CountryExplorer() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all');
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const data = await response.json();
        
        // Sort countries by name
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search term and region
  useEffect(() => {
    let result = countries;
    
    if (searchTerm) {
      result = result.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.name.official.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (regionFilter) {
      result = result.filter(country => country.region === regionFilter);
    }
    
    setFilteredCountries(result);
  }, [countries, searchTerm, regionFilter]);

  // Get unique regions for the filter dropdown
  const regions = [...new Set(countries.map(country => country.region))].sort();

  return (
    <div className="country-explorer">
      <h2>Country Explorer</h2>
      
      {error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <>
          <div className="filters">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a country..."
              disabled={loading}
            />
            
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              disabled={loading}
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          {loading ? (
            <p>Loading countries...</p>
          ) : (
            <div className="country-container">
              {selectedCountry ? (
                <div className="country-details">
                  <button onClick={() => setSelectedCountry(null)} className="back-button">
                    Back to List
                  </button>
                  
                  <div className="country-header">
                    <img src={selectedCountry.flags.svg || "/placeholder.svg"} alt={selectedCountry.flags.alt || \`Flag of \${selectedCountry.name.common}\`} />
                    <h3>{selectedCountry.name.common}</h3>
                  </div>
                  
                  <div className="country-info">
                    <p><strong>Official Name:</strong> {selectedCountry.name.official}</p>
                    <p><strong>Capital:</strong> {selectedCountry.capital?.[0] || 'N/A'}</p>
                    <p><strong>Region:</strong> {selectedCountry.region}</p>
                    <p><strong>Subregion:</strong> {selectedCountry.subregion || 'N/A'}</p>
                    <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
                    
                    {selectedCountry.languages && (
                      <p><strong>Languages:</strong> {Object.values(selectedCountry.languages).join(', ')}</p>
                    )}
                    
                    {selectedCountry.currencies && (
                      <p>
                        <strong>Currencies:</strong> {
                          Object.values(selectedCountry.currencies)
                            .map(c => \`\${c.name} (\${c.symbol || 'N/A'})\`)
                            .join(', ')
                        }
                      </p>
                    )}
                    
                    {selectedCountry.borders && selectedCountry.borders.length > 0 && (
                      <p><strong>Borders:</strong> {selectedCountry.borders.join(', ')}</p>
                    )}
                    
                    <p>
                      <strong>Maps:</strong>{' '}
                      <a href={selectedCountry.maps.googleMaps} target="_blank" rel="noopener noreferrer">
                        Google Maps
                      </a>
                      {' | '}
                      <a href={selectedCountry.maps.openStreetMaps} target="_blank" rel="noopener noreferrer">
                        OpenStreetMap
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <p>Found {filteredCountries.length} countries</p>
                  
                  <div className="country-grid">
                    {filteredCountries.map(country => (
                      <div key={country.cca3} className="country-card" onClick={() => setSelectedCountry(country)}>
                        <img src={country.flags.svg || "/placeholder.svg"} alt={country.flags.alt || \`Flag of \${country.name.common}\`} />
                        <h4>{country.name.common}</h4>
                        <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                        <p><strong>Region:</strong> {country.region}</p>
                        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CountryExplorer;`}
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
                <h4 className="text-md font-semibold">404 Not Found</h4>
                <p>The requested resource doesn't exist or no countries match the search criteria.</p>
                <CodeBlock
                  code={`{
  "status": 404,
  "message": "Not Found"
}`}
                  language="json"
                />
              </div>

              <div>
                <h4 className="text-md font-semibold">500 Internal Server Error</h4>
                <p>Something went wrong on the server.</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6">Best Practices for Error Handling</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Always check HTTP status codes to determine if an error occurred</li>
              <li>Implement retry logic for temporary server errors</li>
              <li>Provide user-friendly error messages in your application</li>
              <li>Cache responses when possible to reduce API calls</li>
              <li>Consider downloading and storing the full country dataset locally for offline use</li>
            </ul>
          </CardContent>
        </Card>

        <BlessCliIntegration
          apiName="REST Countries API"
          apiBaseUrl="https://restcountries.com/v3.1"
          apiEndpoint="/all"
          authType="none"
        />

        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>More information about the REST Countries API</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://restcountries.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Official Website
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mledoze/countries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub Repository (Data Source)
                </a>
              </li>
              <li>
                <a
                  href="https://restcountries.com/#api-endpoints-v3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  API Documentation
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
