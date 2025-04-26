import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CodeBlock from "@/components/code-block"
import BlessCliIntegration from "@/components/bless-cli-integration"

export default function PokemonApiPage() {
  const api = {
    id: "pokemon-api",
    name: "PokéAPI",
    description: "The RESTful Pokémon API for all your Pokémon data needs",
    category: "Entertainment",
    difficulty: "Beginner",
    baseUrl: "https://pokeapi.co/api/v2",
    authType: "None",
    endpoints: [
      {
        name: "Get Pokémon",
        path: "/pokemon/{name}",
        method: "GET",
        description: "Get detailed information about a specific Pokémon",
        parameters: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "The name or ID of the Pokémon",
          },
        ],
      },
      {
        name: "Get Pokémon Species",
        path: "/pokemon-species/{id}",
        method: "GET",
        description: "Get Pokémon species information",
        parameters: [
          {
            name: "id",
            type: "number",
            required: true,
            description: "The ID of the Pokémon species",
          },
        ],
      },
      {
        name: "Get Type",
        path: "/type/{id}",
        method: "GET",
        description: "Get information about a specific Pokémon type",
        parameters: [
          {
            name: "id",
            type: "number",
            required: true,
            description: "The ID of the type",
          },
        ],
      },
      {
        name: "Get Ability",
        path: "/ability/{id}",
        method: "GET",
        description: "Get information about a specific Pokémon ability",
        parameters: [
          {
            name: "id",
            type: "number",
            required: true,
            description: "The ID of the ability",
          },
        ],
      },
      {
        name: "Get Move",
        path: "/move/{id}",
        method: "GET",
        description: "Get information about a specific Pokémon move",
        parameters: [
          {
            name: "id",
            type: "number",
            required: true,
            description: "The ID of the move",
          },
        ],
      },
    ],
  }

  // Sample code snippets
  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pokémon Explorer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Pokémon Explorer</h1>
    
    <div class="search-container">
      <input type="text" id="pokemon-search" placeholder="Enter Pokémon name or ID">
      <button id="search-btn">Search</button>
    </div>
    
    <div class="pokemon-card" id="pokemon-card">
      <div class="card-placeholder">
        <p>Search for a Pokémon to see its details</p>
      </div>
    </div>
    
    <div class="pokemon-stats" id="pokemon-stats"></div>
    
    <div class="evolution-chain" id="evolution-chain">
      <h2>Evolution Chain</h2>
      <div class="evolution-container" id="evolution-container"></div>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`

  const javascriptCode = `// API Base URL
const API_BASE_URL = 'https://pokeapi.co/api/v2';

// DOM Elements
const pokemonSearch = document.getElementById('pokemon-search');
const searchBtn = document.getElementById('search-btn');
const pokemonCard = document.getElementById('pokemon-card');
const pokemonStats = document.getElementById('pokemon-stats');
const evolutionContainer = document.getElementById('evolution-container');

// Event Listeners
searchBtn.addEventListener('click', searchPokemon);
pokemonSearch.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchPokemon();
  }
});

// Search for a Pokémon
async function searchPokemon() {
  const query = pokemonSearch.value.toLowerCase().trim();
  
  if (!query) {
    showError('Please enter a Pokémon name or ID');
    return;
  }
  
  // Show loading state
  pokemonCard.innerHTML = '<div class="loading">Searching for Pokémon...</div>';
  pokemonStats.innerHTML = '';
  evolutionContainer.innerHTML = '';
  
  try {
    // Fetch Pokémon data
    const response = await fetch(\`\${API_BASE_URL}/pokemon/\${query}\`);
    
    if (!response.ok) {
      throw new Error(\`Pokémon not found: \${response.status}\`);
    }
    
    const pokemonData = await response.json();
    
    // Fetch species data to get evolution chain
    const speciesResponse = await fetch(pokemonData.species.url);
    const speciesData = await speciesResponse.json();
    
    // Display Pokémon data
    displayPokemon(pokemonData);
    displayStats(pokemonData);
    
    // Fetch and display evolution chain
    if (speciesData.evolution_chain) {
      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();
      displayEvolutionChain(evolutionData.chain);
    }
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    showError(\`Couldn't find Pokémon "\${query}". Please check the name or ID and try again.\`);
  }
}

// Display Pokémon basic information
function displayPokemon(pokemon) {
  // Get official artwork if available, otherwise use default sprite
  const artwork = pokemon.sprites.other['official-artwork']?.front_default || 
                 pokemon.sprites.front_default;
  
  // Format types
  const types = pokemon.types.map(type => 
    \`<span class="type \${type.type.name}">\${capitalizeFirstLetter(type.type.name)}</span>\`
  ).join('');
  
  // Format abilities
  const abilities = pokemon.abilities.map(ability => 
    \`<span class="ability">\${capitalizeFirstLetter(ability.ability.name.replace('-', ' '))}</span>\`
  ).join(', ');
  
  // Create HTML
  const html = \`
    <div class="pokemon-image">
      <img src="\${artwork}" alt="\${pokemon.name}">
    </div>
    <div class="pokemon-info">
      <h2>#\${pokemon.id} \${capitalizeFirstLetter(pokemon.name)}</h2>
      <div class="pokemon-types">\${types}</div>
      <div class="pokemon-details">
        <p><strong>Height:</strong> \${pokemon.height / 10} m</p>
        <p><strong>Weight:</strong> \${pokemon.weight / 10} kg</p>
        <p><strong>Abilities:</strong> \${abilities}</p>
      </div>
    </div>
  \`;
  
  pokemonCard.innerHTML = html;
}

// Display Pokémon stats
function displayStats(pokemon) {
  const statsHTML = \`
    <h2>Base Stats</h2>
    <div class="stats-container">
      \${pokemon.stats.map(stat => {
        const statName = formatStatName(stat.stat.name);
        const statValue = stat.base_stat;
        const statPercentage = Math.min(100, (stat.base_stat / 255) * 100);
        
        return \`
          <div class="stat-row">
            <div class="stat-name">\${statName}</div>
            <div class="stat-value">\${statValue}</div>
            <div class="stat-bar">
              <div class="stat-fill" style="width: \${statPercentage}%"></div>
            </div>
          </div>
        \`;
      }).join('')}
    </div>
  \`;
  
  pokemonStats.innerHTML = statsHTML;
}

// Display evolution chain
async function displayEvolutionChain(chain) {
  evolutionContainer.innerHTML = '<div class="loading">Loading evolution chain...</div>';
  
  try {
    const evolutionHTML = await buildEvolutionChain(chain);
    evolutionContainer.innerHTML = evolutionHTML;
    
    // Add click event to evolution images
    document.querySelectorAll('.evolution-pokemon').forEach(element => {
      element.addEventListener('click', () => {
        pokemonSearch.value = element.dataset.name;
        searchPokemon();
      });
    });
  } catch (error) {
    console.error('Error building evolution chain:', error);
    evolutionContainer.innerHTML = '<p class="error">Failed to load evolution chain</p>';
  }
}

// Recursively build the evolution chain HTML
async function buildEvolutionChain(chain) {
  // Get Pokémon data for the current chain link
  const pokemonResponse = await fetch(\`\${API_BASE_URL}/pokemon/\${chain.species.name}\`);
  const pokemon = await pokemonResponse.json();
  
  // Get sprite
  const sprite = pokemon.sprites.other['official-artwork']?.front_default || 
                pokemon.sprites.front_default;
  
  // Start building HTML for this evolution
  let html = \`
    <div class="evolution-pokemon" data-name="\${chain.species.name}">
      <img src="\${sprite}" alt="\${chain.species.name}">
      <p>\${capitalizeFirstLetter(chain.species.name)}</p>
    </div>
  \`;
  
  // If there are further evolutions
  if (chain.evolves_to && chain.evolves_to.length > 0) {
    html += '<div class="evolution-arrow">→</div>';
    
    // For each evolution path
    for (const evolution of chain.evolves_to) {
      html += await buildEvolutionChain(evolution);
    }
  }
  
  return html;
}

// Show error message
function showError(message) {
  pokemonCard.innerHTML = \`<div class="error">\${message}</div>\`;
  pokemonStats.innerHTML = '';
  evolutionContainer.innerHTML = '';
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Helper function to format stat names
function formatStatName(statName) {
  switch (statName) {
    case 'hp': return 'HP';
    case 'attack': return 'Attack';
    case 'defense': return 'Defense';
    case 'special-attack': return 'Sp. Atk';
    case 'special-defense': return 'Sp. Def';
    case 'speed': return 'Speed';
    default: return capitalizeFirstLetter(statName);
  }
}`

  const cssCode = `.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1, h2 {
  text-align: center;
  color: #2e7d32;
}

.search-container {
  display: flex;
  margin-bottom: 20px;
}

#pokemon-search {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

#search-btn {
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

#search-btn:hover {
  background-color: #1b5e20;
}

.pokemon-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card-placeholder {
  width: 100%;
  text-align: center;
  color: #777;
  padding: 40px 0;
}

.pokemon-image {
  flex: 1;
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon-image img {
  max-width: 100%;
  max-height: 200px;
}

.pokemon-info {
  flex: 2;
  min-width: 300px;
}

.pokemon-info h2 {
  margin-top: 0;
  text-align: left;
}

.pokemon-types {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.type {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  color: white;
  font-weight: bold;
}

/* Type colors */
.normal { background-color: #A8A878; }
.fire { background-color: #F08030; }
.water { background-color: #6890F0; }
.grass { background-color: #78C850; }
.electric { background-color: #F8D030; }
.ice { background-color: #98D8D8; }
.fighting { background-color: #C03028; }
.poison { background-color: #A040A0; }
.ground { background-color: #E0C068; }
.flying { background-color: #A890F0; }
.psychic { background-color: #F85888; }
.bug { background-color: #A8B820; }
.rock { background-color: #B8A038; }
.ghost { background-color: #705898; }
.dragon { background-color: #7038F8; }
.dark { background-color: #705848; }
.steel { background-color: #B8B8D0; }
.fairy { background-color: #EE99AC; }

.pokemon-details {
  margin-top: 15px;
}

.pokemon-stats {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stats-container {
  margin-top: 15px;
}

.stat-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.stat-name {
  width: 80px;
  font-weight: bold;
}

.stat-value {
  width: 40px;
  text-align: right;
  margin-right: 10px;
}

.stat-bar {
  flex: 1;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background-color: #2e7d32;
  border-radius: 5px;
}

.evolution-chain {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.evolution-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.evolution-pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;
}

.evolution-pokemon:hover {
  transform: scale(1.05);
}

.evolution-pokemon img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.evolution-arrow {
  font-size: 24px;
  color: #2e7d32;
  margin: 0 10px;
  align-self: center;
}

.loading {
  text-align: center;
  color: #777;
  padding: 20px;
  width: 100%;
}

.error {
  color: #d32f2f;
  text-align: center;
  padding: 20px;
  width: 100%;
}

/* Responsive styles */
@media (max-width: 600px) {
  .pokemon-card, .pokemon-stats, .evolution-chain {
    padding: 15px;
  }
  
  .pokemon-image, .pokemon-info {
    flex: 1 0 100%;
  }
  
  .pokemon-image {
    margin-bottom: 15px;
  }
  
  .evolution-pokemon img {
    width: 80px;
    height: 80px;
  }
}`

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/apis" aria-label="Back to API catalog">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{api.name}</h1>
          <Badge>{api.category}</Badge>
          <Badge variant="outline">{api.difficulty}</Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overview</h2>
              <p className="text-muted-foreground">{api.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Integration Guide</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Understanding the API</h3>
                  <p className="mb-4">
                    The PokéAPI is a free, RESTful API that provides comprehensive data about Pokémon. It doesn't
                    require authentication and offers information about Pokémon, moves, abilities, types, and more.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Set Up Your Project</h3>
                  <p className="mb-4">Create the necessary files for your Pokémon Explorer application:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>index.html - The HTML structure</li>
                    <li>styles.css - CSS for styling</li>
                    <li>script.js - JavaScript for API integration</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 3: Implement the Code</h3>
                  <p className="mb-4">Copy the following code into your project files:</p>

                  <Tabs defaultValue="html">
                    <TabsList aria-label="Code examples">
                      <TabsTrigger value="html">HTML</TabsTrigger>
                      <TabsTrigger value="js">JavaScript</TabsTrigger>
                      <TabsTrigger value="css">CSS</TabsTrigger>
                    </TabsList>
                    <TabsContent value="html">
                      <CodeBlock code={htmlCode} language="html" />
                    </TabsContent>
                    <TabsContent value="js">
                      <CodeBlock code={javascriptCode} language="javascript" />
                    </TabsContent>
                    <TabsContent value="css">
                      <CodeBlock code={cssCode} language="css" />
                    </TabsContent>
                  </Tabs>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 4: Test Your Implementation</h3>
                  <p className="mb-4">
                    Open your HTML file in a browser to test your Pokémon Explorer application. You should be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Search for Pokémon by name or ID</li>
                    <li>View detailed information about each Pokémon</li>
                    <li>See the Pokémon's stats visualized as bars</li>
                    <li>Explore the Pokémon's evolution chain</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bless Network CLI Integration Section */}
            <BlessCliIntegration
              apiName={api.name}
              apiBaseUrl={api.baseUrl}
              apiEndpoint="/pokemon/pikachu"
              authType="none"
              authParam=""
            />

            <div>
              <h2 className="text-2xl font-bold mb-4">Error Handling</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Common Errors</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>404 Not Found</strong>: Invalid Pokémon name or ID
                    </li>
                    <li>
                      <strong>Network Errors</strong>: Connection issues or API downtime
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
                  <p>
                    The PokéAPI doesn't have strict rate limits, but it's good practice to cache responses to reduce
                    unnecessary requests.
                  </p>
                  <Alert className="mt-4">
                    <AlertTitle>Best Practice</AlertTitle>
                    <AlertDescription>
                      Implement caching for frequently accessed data like Pokémon details. This improves your
                      application's performance and reduces load on the API servers.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">API Details</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Base URL</dt>
                    <dd className="flex items-center gap-1">
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">{api.baseUrl}</code>
                      <Button variant="ghost" size="icon" className="h-4 w-4" aria-label="Copy base URL">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Authentication</dt>
                    <dd>{api.authType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Documentation</dt>
                    <dd>
                      <a
                        href="https://pokeapi.co/docs/v2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                        aria-label="Official PokéAPI Documentation"
                      >
                        Official Docs <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-semibold mb-2">Endpoints</h3>
                <ul className="space-y-4">
                  {api.endpoints.map((endpoint, index) => (
                    <li key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{endpoint.method}</Badge>
                        <code className="text-sm font-semibold">{endpoint.path}</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                      {endpoint.parameters.length > 0 && (
                        <details className="text-sm">
                          <summary className="font-medium cursor-pointer">Parameters</summary>
                          <ul className="mt-2 space-y-2">
                            {endpoint.parameters.map((param, paramIndex) => (
                              <li key={paramIndex} className="grid grid-cols-[1fr,2fr] gap-2">
                                <div>
                                  <code className="text-xs bg-muted px-1 py-0.5 rounded">{param.name}</code>
                                  {param.required && <span className="text-red-500 ml-1">*</span>}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  <span className="text-foreground">{param.type}</span> - {param.description}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border p-4 bg-muted/30">
                <h3 className="text-lg font-semibold mb-2">Bless Network Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://docs.bless.network/build-on-bless/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      Bless Network CLI Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bless.network/templates/pokemon-api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      Pokémon API Template
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/yXUWUzQU"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      Join Bless Network Discord
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
