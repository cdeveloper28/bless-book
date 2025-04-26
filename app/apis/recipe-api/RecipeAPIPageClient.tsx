"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "@/components/code-block"
import { BlessCliIntegration } from "@/components/bless-cli-integration"
import { InfoIcon } from "lucide-react"

export default function RecipeAPIPageClient() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">Recipe API</h1>
      <p className="text-xl text-muted-foreground mb-8">
        A comprehensive API for retrieving food recipes, ingredients, and cooking instructions
      </p>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              The Recipe API provides access to thousands of food recipes and cooking instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The Recipe API (Spoonacular) is a powerful API that provides access to over 5,000 recipes, ingredients,
              food products, and cooking instructions. It's perfect for recipe apps, meal planning services, or any
              food-related project.
            </p>

            <h3 className="text-lg font-semibold mt-6">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Search recipes by ingredients, nutrients, diets, and more</li>
              <li>Get detailed recipe information including ingredients, instructions, and nutritional data</li>
              <li>Convert ingredient amounts and units</li>
              <li>Generate meal plans based on dietary preferences</li>
              <li>Analyze recipe costs and nutrition</li>
              <li>Visualize recipe ingredients and instructions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>How to start using the Recipe API</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">Base URL</h3>
            <p className="mb-4">The base URL for all API requests is:</p>
            <CodeBlock code="https://api.spoonacular.com" language="plaintext" />

            <h3 className="text-lg font-semibold mt-6">Authentication</h3>
            <p className="mb-4">
              The Recipe API requires an API key for authentication. You can get a free API key by signing up at{" "}
              <a
                href="https://spoonacular.com/food-api/console#Dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Spoonacular API Console
              </a>
              .
            </p>

            <p>Once you have your API key, include it as a query parameter in all your requests:</p>
            <CodeBlock code="https://api.spoonacular.com/recipes/random?apiKey=YOUR_API_KEY" language="plaintext" />

            <Alert className="mt-6">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>API Quotas</AlertTitle>
              <AlertDescription>
                The free plan includes 150 points per day. Different endpoints consume different numbers of points.
                Check the{" "}
                <a
                  href="https://spoonacular.com/food-api/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  pricing page
                </a>{" "}
                for more details.
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
            <Tabs defaultValue="search">
              <TabsList>
                <TabsTrigger value="search">Search Recipes</TabsTrigger>
                <TabsTrigger value="random">Random Recipes</TabsTrigger>
                <TabsTrigger value="info">Recipe Information</TabsTrigger>
              </TabsList>
              <TabsContent value="search">
                <h3 className="text-lg font-semibold">Search Recipes</h3>
                <p className="mb-4">Search for recipes based on various criteria:</p>
                <CodeBlock
                  code="GET https://api.spoonacular.com/recipes/complexSearch?query={query}&apiKey=YOUR_API_KEY"
                  language="plaintext"
                />

                <h4 className="text-md font-semibold mt-6">Query Parameters</h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>
                    <strong>query</strong>: The search query (e.g., "pasta", "vegetarian dinner")
                  </li>
                  <li>
                    <strong>cuisine</strong>: The cuisine(s) of the recipes (e.g., "italian", "chinese")
                  </li>
                  <li>
                    <strong>diet</strong>: The diet(s) for which the recipes must be suitable (e.g., "vegetarian",
                    "vegan")
                  </li>
                  <li>
                    <strong>intolerances</strong>: A comma-separated list of intolerances (e.g., "gluten", "dairy")
                  </li>
                  <li>
                    <strong>includeIngredients</strong>: A comma-separated list of ingredients that should be included
                  </li>
                  <li>
                    <strong>excludeIngredients</strong>: A comma-separated list of ingredients that should be excluded
                  </li>
                  <li>
                    <strong>type</strong>: The type of recipe (e.g., "main course", "dessert")
                  </li>
                  <li>
                    <strong>maxReadyTime</strong>: The maximum time in minutes it should take to prepare the recipe
                  </li>
                  <li>
                    <strong>number</strong>: The number of results to return (default: 10, max: 100)
                  </li>
                </ul>

                <h4 className="text-md font-semibold mt-6">Example Request</h4>
                <CodeBlock
                  code="GET https://api.spoonacular.com/recipes/complexSearch?query=pasta&cuisine=italian&diet=vegetarian&number=5&apiKey=YOUR_API_KEY"
                  language="plaintext"
                />

                <h4 className="text-md font-semibold mt-6">Example Response</h4>
                <CodeBlock
                  code={`{
  "results": [
    {
      "id": 716429,
      "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      "image": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
      "imageType": "jpg"
    },
    {
      "id": 715538,
      "title": "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
      "image": "https://spoonacular.com/recipeImages/715538-312x231.jpg",
      "imageType": "jpg"
    },
    // More results...
  ],
  "offset": 0,
  "number": 5,
  "totalResults": 86
}`}
                  language="json"
                />
              </TabsContent>
              <TabsContent value="random">
                <h3 className="text-lg font-semibold">Get Random Recipes</h3>
                <p className="mb-4">Get random recipes:</p>
                <CodeBlock
                  code="GET https://api.spoonacular.com/recipes/random?number=1&apiKey=YOUR_API_KEY"
                  language="plaintext"
                />

                <h4 className="text-md font-semibold mt-6">Query Parameters</h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>
                    <strong>number</strong>: The number of random recipes to return (default: 1, max: 100)
                  </li>
                  <li>
                    <strong>tags</strong>: Comma-separated tags that the recipes must have (e.g., "vegetarian,dessert")
                  </li>
                </ul>

                <h4 className="text-md font-semibold mt-6">Example Request</h4>
                <CodeBlock
                  code="GET https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,main%20course&apiKey=YOUR_API_KEY"
                  language="plaintext"
                />

                <h4 className="text-md font-semibold mt-6">Example Response</h4>
                <CodeBlock
                  code={`{
  "recipes": [
    {
      "vegetarian": true,
      "vegan": false,
      "glutenFree": false,
      "dairyFree": false,
      "veryHealthy": false,
      "cheap": false,
      "veryPopular": false,
      "sustainable": false,
      "weightWatcherSmartPoints": 16,
      "gaps": "no",
      "lowFodmap": false,
      "aggregateLikes": 209,
      "spoonacularScore": 83.0,
      "healthScore": 39.0,
      "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      "license": "CC BY 3.0",
      "sourceName": "Foodista",
      "pricePerServing": 157.06,
      "id": 716429,
      "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      "readyInMinutes": 45,
      "servings": 2,
      "sourceUrl": "http://www.foodista.com/recipe/8YWMQBSF/pasta-with-garlic-scallions-cauliflower-breadcrumbs",
      "image": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      "imageType": "jpg",
      "summary": "...",
      "cuisines": [
        "Italian",
        "European"
      ],
      "dishTypes": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ],
      "diets": [
        "lacto ovo vegetarian"
      ],
      "occasions": [],
      "instructions": "...",
      "analyzedInstructions": [...],
      "originalId": null,
      "spoonacularSourceUrl": "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429"
    }
  ]
}`}
                  language="json"
                />
              </TabsContent>
              <TabsContent value="info">
                <h3 className="text-lg font-semibold">Get Recipe Information</h3>
                <p className="mb-4">Get detailed information about a specific recipe by ID:</p>
                <CodeBlock
                  code="GET https://api.spoonacular.com/recipes/{id}/information?apiKey=YOUR_API_KEY"
                  language="plaintext"
                />

                <h4 className="text-md font-semibold mt-6">Path Parameters</h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>
                    <strong>id</strong>: The ID of the recipe
                  </li>
                </ul>

                <h4 className="text-md font-semibold mt-6">Query Parameters</h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>
                    <strong>includeNutrition</strong>: Whether to include nutrition data (default: false)
                  </li>
                </ul>

                <h4 className="text-md font-semibold mt-6">Example Request</h4>
                <CodeBlock
                  code="GET https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&apiKey=YOUR_API_KEY"
                  language="plaintext"
                />

                <h4 className="text-md font-semibold mt-6">Example Response</h4>
                <CodeBlock
                  code={`{
  "vegetarian": true,
  "vegan": false,
  "glutenFree": false,
  "dairyFree": false,
  "veryHealthy": false,
  "cheap": false,
  "veryPopular": false,
  "sustainable": false,
  "weightWatcherSmartPoints": 16,
  "gaps": "no",
  "lowFodmap": false,
  "aggregateLikes": 209,
  "spoonacularScore": 83.0,
  "healthScore": 39.0,
  "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
  "license": "CC BY 3.0",
  "sourceName": "Foodista",
  "pricePerServing": 157.06,
  "extendedIngredients": [
    {
      "id": 1001,
      "aisle": "Milk, Eggs, Other Dairy",
      "image": "butter-sliced.jpg",
      "consistency": "solid",
      "name": "butter",
      "original": "1 tbsp butter",
      "originalString": "1 tbsp butter",
      "originalName": "butter",
      "amount": 1.0,
      "unit": "tbsp",
      "meta": [],
      "metaInformation": [],
      "measures": {
        "us": {
          "amount": 1.0,
          "unitShort": "Tbsp",
          "unitLong": "Tbsp"
        },
        "metric": {
          "amount": 1.0,
          "unitShort": "Tbsp",
          "unitLong": "Tbsp"
        }
      }
    },
    // More ingredients...
  ],
  "id": 716429,
  "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
  "readyInMinutes": 45,
  "servings": 2,
  "sourceUrl": "http://www.foodista.com/recipe/8YWMQBSF/pasta-with-garlic-scallions-cauliflower-breadcrumbs",
  "image": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
  "imageType": "jpg",
  "summary": "...",
  "cuisines": [
    "Italian",
    "European"
  ],
  "dishTypes": [
    "lunch",
    "main course",
    "main dish",
    "dinner"
  ],
  "diets": [
    "lacto ovo vegetarian"
  ],
  "occasions": [],
  "winePairing": {...},
  "instructions": "...",
  "analyzedInstructions": [...],
  "originalId": null,
  "spoonacularSourceUrl": "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429"
}`}
                  language="json"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Code Examples</CardTitle>
            <CardDescription>How to use the Recipe API in your code</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript">
              <TabsList>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
              </TabsList>
              <TabsContent value="javascript">
                <h3 className="text-lg font-semibold">Search Recipes</h3>
                <CodeBlock
                  code={`// Using fetch API
async function searchRecipes(query, cuisine, diet, number = 5) {
  try {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const url = new URL('https://api.spoonacular.com/recipes/complexSearch');
    
    // Add query parameters
    url.searchParams.append('apiKey', apiKey);
    url.searchParams.append('query', query);
    if (cuisine) url.searchParams.append('cuisine', cuisine);
    if (diet) url.searchParams.append('diet', diet);
    url.searchParams.append('number', number);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    console.log('Search Results:', data.results);
    return data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    return null;
  }
}

// Get recipe information
async function getRecipeInformation(id) {
  try {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const url = new URL(\`https://api.spoonacular.com/recipes/\${id}/information\`);
    
    // Add query parameters
    url.searchParams.append('apiKey', apiKey);
    url.searchParams.append('includeNutrition', false);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    console.log('Recipe Information:', data);
    return data;
  } catch (error) {
    console.error('Error getting recipe information:', error);
    return null;
  }
}

// Example usage
searchRecipes('pasta', 'italian', 'vegetarian');
getRecipeInformation(716429);`}
                  language="javascript"
                />
              </TabsContent>
              <TabsContent value="python">
                <h3 className="text-lg font-semibold">Search Recipes</h3>
                <CodeBlock
                  code={`import requests

def search_recipes(query, cuisine=None, diet=None, number=5):
    try:
        api_key = 'YOUR_API_KEY'  # Replace with your actual API key
        url = 'https://api.spoonacular.com/recipes/complexSearch'
        
        # Add query parameters
        params = {
            'apiKey': api_key,
            'query': query,
            'number': number
        }
        
        if cuisine:
            params['cuisine'] = cuisine
        if diet:
            params['diet'] = diet
        
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        
        data = response.json()
        
        print('Search Results:', data['results'])
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error searching recipes: {e}")
        return None

# Get recipe information
def get_recipe_information(id):
    try:
        api_key = 'YOUR_API_KEY'  # Replace with your actual API key
        url = f'https://api.spoonacular.com/recipes/{id}/information'
        
        # Add query parameters
        params = {
            'apiKey': api_key,
            'includeNutrition': False
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        
        data = response.json()
        
        print('Recipe Information:', data)
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error getting recipe information: {e}")
        return None

# Example usage
search_recipes('pasta', cuisine='italian', diet='vegetarian')
get_recipe_information(716429)`}
                  language="python"
                />
              </TabsContent>
              <TabsContent value="react">
                <h3 className="text-lg font-semibold">Recipe Search Component</h3>
                <CodeBlock
                  code={`import { useState } from 'react';

function RecipeSearchComponent() {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

  const searchRecipes = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setSelectedRecipe(null);
    
    try {
      const url = new URL('https://api.spoonacular.com/recipes/complexSearch');
      
      // Add query parameters
      url.searchParams.append('apiKey', apiKey);
      url.searchParams.append('query', query);
      if (cuisine) url.searchParams.append('cuisine', cuisine);
      if (diet) url.searchParams.append('diet', diet);
      url.searchParams.append('number', 10);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      setRecipes(data.results);
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const getRecipeDetails = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = new URL(\`https://api.spoonacular.com/recipes/\${id}/information\`);
      
      // Add query parameters
      url.searchParams.append('apiKey', apiKey);
      url.searchParams.append('includeNutrition', false);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (err) {
      setError(err.message);
      setSelectedRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-search-container">
      <h2>Recipe Search</h2>
      
      <form onSubmit={searchRecipes} className="search-form">
        <div className="form-group">
          <label htmlFor="query">Search Term:</label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., pasta, chicken, salad"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cuisine">Cuisine (optional):</label>
          <select id="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
            <option value="">Any Cuisine</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="asian">Asian</option>
            <option value="french">French</option>
            <option value="mediterranean">Mediterranean</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="diet">Diet (optional):</label>
          <select id="diet" value={diet} onChange={(e) => setDiet(e.target.value)}>
            <option value="">No Restrictions</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="paleo">Paleo</option>
          </select>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Recipes'}
        </button>
      </form>
      
      {error && <p className="error">{error}</p>}
      
      <div className="results-container">
        {recipes.length > 0 && !selectedRecipe && (
          <div className="recipe-list">
            <h3>Search Results</h3>
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.id} onClick={() => getRecipeDetails(recipe.id)}>
                  <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} />
                  <span>{recipe.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {selectedRecipe && (
          <div className="recipe-details">
            <button onClick={() => setSelectedRecipe(null)} className="back-button">
              Back to Results
            </button>
            
            <h3>{selectedRecipe.title}</h3>
            <img src={selectedRecipe.image || "/placeholder.svg"} alt={selectedRecipe.title} />
            
            <div className="recipe-info">
              <p>Ready in {selectedRecipe.readyInMinutes} minutes</p>
              <p>Servings: {selectedRecipe.servings}</p>
              
              {selectedRecipe.diets && selectedRecipe.diets.length > 0 && (
                <p>Diets: {selectedRecipe.diets.join(', ')}</p>
              )}
            </div>
            
            <div className="recipe-ingredients">
              <h4>Ingredients</h4>
              <ul>
                {selectedRecipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            </div>
            
            <div className="recipe-instructions">
              <h4>Instructions</h4>
              <div dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeSearchComponent;`}
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
                <h4 className="text-md font-semibold">401 Unauthorized</h4>
                <p>Invalid or missing API key.</p>
                <CodeBlock
                  code={`{
  "status": "failure",
  "code": 401,
  "message": "You are not authorized. Please read https://spoonacular.com/food-api/docs#Authentication"
}`}
                  language="json"
                />
              </div>

              <div>
                <h4 className="text-md font-semibold">402 Payment Required</h4>
                <p>You've exceeded your quota for the day.</p>
                <CodeBlock
                  code={`{
  "status": "failure",
  "code": 402,
  "message": "Your daily quota has been reached. Please add your credit card details to continue using the API."
}`}
                  language="json"
                />
              </div>

              <div>
                <h4 className="text-md font-semibold">404 Not Found</h4>
                <p>The requested recipe or resource doesn't exist.</p>
              </div>

              <div>
                <h4 className="text-md font-semibold">429 Too Many Requests</h4>
                <p>You've made too many requests in a short period.</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6">Best Practices for Error Handling</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Always check HTTP status codes to determine if an error occurred</li>
              <li>Implement retry logic with exponential backoff for rate limit errors</li>
              <li>Monitor your API usage to avoid exceeding your quota</li>
              <li>Provide user-friendly error messages in your application</li>
              <li>Cache responses when possible to reduce API calls</li>
            </ul>
          </CardContent>
        </Card>

        <BlessCliIntegration
          apiName="Recipe API"
          apiBaseUrl="https://api.spoonacular.com"
          apiEndpoint="/recipes/random?number=1"
          authType="apiKey"
          authParam="query=apiKey"
        />

        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>More information about the Recipe API</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://spoonacular.com/food-api/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Official Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://spoonacular.com/food-api/console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  API Console
                </a>
              </li>
              <li>
                <a
                  href="https://spoonacular.com/food-api/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Pricing Information
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
