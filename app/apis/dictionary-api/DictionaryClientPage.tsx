"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "@/components/code-block"
import { BlessCliIntegration } from "@/components/bless-cli-integration"
import { InfoIcon } from "lucide-react"

export default function DictionaryClientPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">Dictionary API</h1>
      <p className="text-xl text-muted-foreground mb-8">
        A free API for retrieving word definitions, pronunciations, and more
      </p>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>The Dictionary API provides word definitions, pronunciations, and more</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The Dictionary API is a free, open-source API that provides definitions, pronunciations, examples, and
              other information about English words. It's perfect for educational applications, word games, or any
              project that needs dictionary functionality.
            </p>

            <h3 className="text-lg font-semibold mt-6">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Free to use with no API key required</li>
              <li>Comprehensive word definitions from multiple sources</li>
              <li>Phonetic pronunciations and audio files</li>
              <li>Word usage examples</li>
              <li>Parts of speech, synonyms, and antonyms</li>
              <li>Etymology information</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>How to start using the Dictionary API</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">Base URL</h3>
            <p className="mb-4">The base URL for all API requests is:</p>
            <CodeBlock code="https://api.dictionaryapi.dev/api/v2" language="plaintext" />

            <h3 className="text-lg font-semibold mt-6">Authentication</h3>
            <p>
              The Dictionary API doesn't require authentication. You can start making requests right away without an API
              key.
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
            <Tabs defaultValue="entries">
              <TabsList>
                <TabsTrigger value="entries">Word Entries</TabsTrigger>
              </TabsList>
              <TabsContent value="entries">
                <h3 className="text-lg font-semibold">Get Word Entries</h3>
                <p className="mb-4">Retrieve information about a specific word:</p>
                <CodeBlock code="GET https://api.dictionaryapi.dev/api/v2/entries/en/{word}" language="plaintext" />

                <p className="mt-4">Replace {"{word}"} with the word you want to look up.</p>

                <h4 className="text-md font-semibold mt-6">Example Request</h4>
                <CodeBlock code="GET https://api.dictionaryapi.dev/api/v2/entries/en/hello" language="plaintext" />

                <h4 className="text-md font-semibold mt-6">Example Response</h4>
                <CodeBlock
                  code={`[
  {
    "word": "hello",
    "phonetic": "həˈləʊ",
    "phonetics": [
      {
        "text": "həˈləʊ",
        "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3"
      },
      {
        "text": "həˈloʊ",
        "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-us.mp3"
      }
    ],
    "meanings": [
      {
        "partOfSpeech": "noun",
        "definitions": [
          {
            "definition": "\"Hello!\" or an equivalent greeting.",
            "synonyms": [],
            "antonyms": []
          }
        ],
        "synonyms": ["greeting"],
        "antonyms": []
      },
      {
        "partOfSpeech": "verb",
        "definitions": [
          {
            "definition": "To gr  []
      },
      {
        "partOfSpeech": "verb",
        "definitions": [
          {
            "definition": "To greet with 'hello'.",
            "synonyms": [],
            "antonyms": []
          }
        ],
        "synonyms": [],
        "antonyms": []
      },
      {
        "partOfSpeech": "interjection",
        "definitions": [
          {
            "definition": "A greeting (salutation) said when meeting someone or acknowledging someone's arrival or presence.",
            "example": "Hello, everyone.",
            "synonyms": [],
            "antonyms": []
          },
          {
            "definition": "A greeting used when answering the telephone.",
            "example": "Hello? How may I help you?",
            "synonyms": [],
            "antonyms": []
          },
          {
            "definition": "A call for response if it is not clear if anyone is present or listening, or if a telephone conversation may have been disconnected.",
            "example": "Hello? Is anyone there?",
            "synonyms": [],
            "antonyms": []
          }
        ],
        "synonyms": ["hi"],
        "antonyms": ["bye", "goodbye"]
      }
    ],
    "license": {
      "name": "CC BY-SA 3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    "sourceUrls": [
      "https://en.wiktionary.org/wiki/hello"
    ]
  }
]`}
                  language="json"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Code Examples</CardTitle>
            <CardDescription>How to use the Dictionary API in your code</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript">
              <TabsList>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
              </TabsList>
              <TabsContent value="javascript">
                <h3 className="text-lg font-semibold">Fetch Word Definition</h3>
                <CodeBlock
                  code={`// Using fetch API
async function getWordDefinition(word) {
  try {
    const response = await fetch(\`https://api.dictionaryapi.dev/api/v2/entries/en/\${word}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Display the first definition
    if (data && data.length > 0) {
      const firstEntry = data[0];
      console.log(\`Word: \${firstEntry.word}\`);
      
      if (firstEntry.phonetics && firstEntry.phonetics.length > 0) {
        console.log(\`Pronunciation: \${firstEntry.phonetics[0].text || 'N/A'}\`);
        console.log(\`Audio: \${firstEntry.phonetics[0].audio || 'N/A'}\`);
      }
      
      if (firstEntry.meanings && firstEntry.meanings.length > 0) {
        const firstMeaning = firstEntry.meanings[0];
        console.log(\`Part of Speech: \${firstMeaning.partOfSpeech}\`);
        
        if (firstMeaning.definitions && firstMeaning.definitions.length > 0) {
          console.log(\`Definition: \${firstMeaning.definitions[0].definition}\`);
          if (firstMeaning.definitions[0].example) {
            console.log(\`Example: \${firstMeaning.definitions[0].example}\`);
          }
        }
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching word definition:', error);
    return null;
  }
}

// Call the function
getWordDefinition('example');`}
                  language="javascript"
                />
              </TabsContent>
              <TabsContent value="python">
                <h3 className="text-lg font-semibold">Fetch Word Definition</h3>
                <CodeBlock
                  code={`import requests

def get_word_definition(word):
    try:
        response = requests.get(f'https://api.dictionaryapi.dev/api/v2/entries/en/{word}')
        response.raise_for_status()  # Raise an exception for HTTP errors
        
        data = response.json()
        
        # Display the first definition
        if data and len(data) > 0:
            first_entry = data[0]
            print(f"Word: {first_entry['word']}")
            
            if 'phonetics' in first_entry and len(first_entry['phonetics']) > 0:
                phonetic = first_entry['phonetics'][0]
                print(f"Pronunciation: {phonetic.get('text', 'N/A')}")
                print(f"Audio: {phonetic.get('audio', 'N/A')}")
            
            if 'meanings' in first_entry and len(first_entry['meanings']) > 0:
                first_meaning = first_entry['meanings'][0]
                print(f"Part of Speech: {first_meaning['partOfSpeech']}")
                
                if 'definitions' in first_meaning and len(first_meaning['definitions']) > 0:
                    definition = first_meaning['definitions'][0]
                    print(f"Definition: {definition['definition']}")
                    if 'example' in definition:
                        print(f"Example: {definition['example']}")
        
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching word definition: {e}")
        return None

# Call the function
get_word_definition('example')`}
                  language="python"
                />
              </TabsContent>
              <TabsContent value="react">
                <h3 className="text-lg font-semibold">Dictionary Component</h3>
                <CodeBlock
                  code={`import { useState } from 'react';

function DictionaryComponent() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDefinition = async () => {
    if (!word.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(\`https://api.dictionaryapi.dev/api/v2/entries/en/\${word.trim()}\`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Word not found. Please check the spelling and try again.');
        }
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      setDefinition(data);
    } catch (err) {
      setError(err.message);
      setDefinition(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDefinition();
  };

  return (
    <div className="dictionary-container">
      <h2>Dictionary Lookup</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Looking up...' : 'Look up'}
        </button>
      </form>
      
      {error && <p className="error">{error}</p>}
      
      {definition && definition.length > 0 && (
        <div className="definition-results">
          <h3>{definition[0].word}</h3>
          
          {definition[0].phonetics && definition[0].phonetics.length > 0 && (
            <div className="phonetics">
              <p>{definition[0].phonetics[0].text}</p>
              {definition[0].phonetics[0].audio && (
                <audio controls src={definition[0].phonetics[0].audio}>
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          )}
          
          {definition[0].meanings && definition[0].meanings.map((meaning, index) => (
            <div key={index} className="meaning">
              <h4>{meaning.partOfSpeech}</h4>
              <ul>
                {meaning.definitions.map((def, idx) => (
                  <li key={idx}>
                    <p>{def.definition}</p>
                    {def.example && <p className="example">Example: "{def.example}"</p>}
                  </li>
                ))}
              </ul>
              
              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <div className="synonyms">
                  <h5>Synonyms:</h5>
                  <p>{meaning.synonyms.join(', ')}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DictionaryComponent;`}
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
                <p>The requested word was not found in the dictionary.</p>
                <CodeBlock
                  code={`{
  "title": "No Definitions Found",
  "message": "Sorry pal, we couldn't find definitions for the word you were looking for.",
  "resolution": "You can try the search again at later time or head to the web instead."
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
              <li>Check HTTP status codes to determine if an error occurred</li>
              <li>Provide user-friendly error messages in your application</li>
              <li>Implement a "Did you mean?" feature for misspelled words</li>
              <li>Add retry logic for temporary server errors</li>
              <li>Log detailed error information for debugging purposes</li>
            </ul>
          </CardContent>
        </Card>

        <BlessCliIntegration
          apiName="Dictionary API"
          apiBaseUrl="https://api.dictionaryapi.dev/api/v2"
          apiEndpoint="/entries/en/hello"
          authType="none"
        />

        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>More information about the Dictionary API</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://dictionaryapi.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Official Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/meetDeveloper/freeDictionaryAPI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
