"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import CodeBlock from "@/components/code-block"

export default function PixabayAPIPageClient() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">Pixabay API</h1>
      <p className="text-xl text-muted-foreground mb-8">
        A powerful API for accessing free stock images, videos, and illustrations
      </p>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              The Pixabay API provides access to over 2.7 million free stock images, videos, and illustrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The Pixabay API gives you access to a vast library of high-quality, royalty-free images, videos, and
              illustrations that can be used for commercial and non-commercial purposes. All content on Pixabay is
              released under the Pixabay License, which makes it safe to use without asking for permission or giving
              credit to the artist.
            </p>

            <h3 className="text-lg font-semibold mt-6">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Access to over 2.7 million free stock images, videos, and illustrations</li>
              <li>Powerful search capabilities with filters for orientation, category, colors, and more</li>
              <li>Multiple image sizes and resolutions</li>
              <li>Video content in various resolutions</li>
              <li>Detailed metadata including tags, views, downloads, and likes</li>
              <li>Simple authentication with API key</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>How to start using the Pixabay API</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold">Base URL</h3>
            <p className="mb-4">The base URL for all API requests is:</p>
            <CodeBlock code="https://pixabay.com/api/" language="plaintext" />

            <h3 className="text-lg font-semibold mt-6">Authentication</h3>
            <p className="mb-4">
              The Pixabay API requires an API key for authentication. You can get a free API key by creating an account
              at{" "}
              <a
                href="https://pixabay.com/accounts/register/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Pixabay
              </a>
              .
            </p>

            <p>Once you have your API key, include it as a query parameter in all your requests:</p>
            <CodeBlock code="https://pixabay.com/api/?key=YOUR_API_KEY" language="plaintext" />

            <Alert className="mt-6">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Rate Limiting</AlertTitle>
              <AlertDescription>
                The free API is limited to 5,000 requests per hour. If you need higher limits, you can contact Pixabay
                for a custom plan.
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
            <Tabs defaultValue="images">
              <TabsList>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>
              <TabsContent value="images">
                <h3 className="text-lg font-semibold">Search Images</h3>
                <p className="mb-4">Search for images based on various criteria:</p>
                <CodeBlock code="GET https://pixabay.com/api/?key=YOUR_API_KEY&q=yellow+flowers" language="plaintext" />

                <h4 className="text-md font-semibold mt-6">Query Parameters</h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>
                    <strong>key</strong> (required): Your API key
                  </li>
                  <li>
                    <strong>q</strong>: A URL encoded search term. If omitted, all images are returned. This value can
                    be a list of comma-separated words.
                  </li>
                  <li>
                    <strong>lang</strong>: Language code for the search (default: "en")
                  </li>
                  <li>
                    <strong>id</strong>: Retrieve a specific image by its ID
                  </li>
                  <li>
                    <strong>image_type</strong>: Filter results by image type (all, photo, illustration, vector)
                  </li>
                  <li>
                    <strong>orientation</strong>: Filter results by orientation (all, horizontal, vertical)
                  </li>
                  <li>
                    <strong>category</strong>: Filter results by category (backgrounds, fashion, nature, science, etc.)
                  </li>
                  <li>
                    <strong>min_width</strong>: Minimum image width in pixels
                  </li>
                  <li>
                    <strong>min_height</strong>: Minimum image height in pixels
                  </li>
                  <li>
                    <strong>colors</strong>: Filter images by color (grayscale, transparent, red, orange, etc.)
                  </li>
                  <li>
                    <strong>editors_choice</strong>: Filter images that have received an Editor&apos;s Choice award
                    (true, false)
                  </li>
                  <li>
                    <strong>safesearch</strong>: Filter out potentially unsafe content (true, false)
                  </li>
                  <li>
                    <strong>order</strong>: How to order the results (popular, latest)
                  </li>
                  <li>
                    <strong>page</strong>: Page number for paginated results (default: 1)
                  </li>
                  <li>
                    <strong>per_page</strong>: Number of results per page (default: 20, max: 200)
                  </li>
                </ul>

                <h4 className="text-md font-semibold mt-6">Example Request</h4>
                <CodeBlock
                  code="GET https://pixabay.com/api/?key=YOUR_API_KEY&q=yellow+flowers&image_type=photo&orientation=horizontal&per_page=10"
                  language="plaintext"
                />

                <h4 className="text-md font-semibold mt-6">Example Response</h4>
                <CodeBlock
                  code={`{
  "total": 4692,
  "totalHits": 500,
  "hits": [
    {
      "id": 195893,
      "pageURL": "https://pixabay.com/photos/blossom-bloom-flower-195893/",
      "type": "photo",
      "tags": "blossom, bloom, flower",
      "previewURL": "https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg",
      "previewWidth": 150,
      "previewHeight": 84,
      "webformatURL": "https://pixabay.com/get/35bbf209e13e39d2_640.jpg",
      "webformatWidth": 640,
      "webformatHeight": 360,
      "largeImageURL": "https://pixabay.com/get/ed6a99fd0a76647_1280.jpg",
      "fullHDURL": "https://pixabay.com/get/ed6a9369fd0a76647_1920.jpg",
      "imageURL": "https://pixabay.com/get/ed6a9364a9fd0a76647.jpg",
      "imageWidth": 4000,
      "imageHeight": 2250,
      "imageSize": 4731420,
      "views": 7671,
      "downloads": 6439,
      "likes": 5,
      "comments": 2,
      "user_id": 48777,
      "user": "Josch13",
      "userImageURL": "https://cdn.pixabay.com/user/2013/11/05/02-10-23-2_250x250.jpg"
    },
    // More images...
  ]
}`}
                  language="json"
                />
              </TabsContent>
              <TabsContent value="videos">
                <h3 className="text-lg font-semibold">Search Videos</h3>
                <p className="mb-4">Search for videos based on various criteria:</p>
                <CodeBlock
                  code="GET https://pixabay.com/api/videos/?key=YOUR_API_KEY&q=yellow+flowers"
                  language="plaintext"
                />

                <h4 className="text-md font-semibold mt-6">Query Parameters</h4>
                <p>The video API supports most of the same parameters as the image API, with a few differences:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>
                    <strong>video_type</strong>: Filter results by video type (all, film, animation)
                  </li>
                  <li>
                    <strong>category</strong>: Filter results by category (backgrounds, fashion, nature, science, etc.)
                  </li>
                  <li>
                    <strong>min_width</strong>: Minimum video width in pixels
                  </li>
                  <li>
                    <strong>min_height</strong>: Minimum video height in pixels
                  </li>
                </ul>

                <h4 className="text-md font-semibold mt-6">Example Request</h4>
                <CodeBlock
                  code="GET https://pixabay.com/api/videos/?key=YOUR_API_KEY&q=nature&video_type=film&per_page=10"
                  language="plaintext"
                />

                <h4 className="text-md font-semibold mt-6">Example Response</h4>
                <CodeBlock
                  code={`{
  "total": 1234,
  "totalHits": 500,
  "hits": [
    {
      "id": 1234,
      "pageURL": "https://pixabay.com/videos/id-1234/",
      "type": "film",
      "tags": "nature, water, river",
      "duration": 60,
      "picture_id": "567890",
      "videos": {
        "large": {
          "url": "https://i.vimeocdn.com/video/123456_640x360.mp4",
          "width": 640,
          "height": 360,
          "size": 12345
        },
        "medium": {
          "url": "https://i.vimeocdn.com/video/123456_640x360.mp4",
          "width": 640,
          "height": 360,
          "size": 12345
        },
        "small": {
          "url": "https://i.vimeocdn.com/video/123456_640x360.mp4",
          "width": 640,
          "height": 360,
          "size": 12345
        },
        "tiny": {
          "url": "https://i.vimeocdn.com/video/123456_640x360.mp4",
          "width": 640,
          "height": 360,
          "size": 12345
        }
      },
      "views": 12345,
      "downloads": 1234,
      "likes": 123,
      "comments": 12,
      "user_id": 12345,
      "user": "username",
      "userImageURL": "https://cdn.pixabay.com/user/2016/10/30/12-12-12-123_250x250.jpg"
    },
    // More videos...
  ]
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
            <CardDescription>How to use the Pixabay API in your code</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript">
              <TabsList>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
              </TabsList>
              <TabsContent value="javascript">
                <h3 className="text-lg font-semibold">Search Images</h3>
                <CodeBlock
                  code={`// Using fetch API
async function searchImages(query, options = {}) {
  try {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const url = new URL('https://pixabay.com/api/');
    
    // Add query parameters
    url.searchParams.append('key', apiKey);
    if (query) url.searchParams.append('q', query);
    
    // Add optional parameters
    Object.entries(options).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    console.log(\`Found \${data.totalHits} images for query: "\${query}"\`);
    
    // Display the first 5 images
    data.hits.slice(0, 5).forEach(image => {
      console.log(\`Image ID: \${image.id}\`);
      console.log(\`Preview URL: \${image.previewURL}\`);
      console.log(\`Web Format URL: \${image.webformatURL}\`);
      console.log(\`Large Image URL: \${image.largeImageURL}\`);
      console.log(\`Tags: \${image.tags}\`);
      console.log('---');
    });
    
    return data;
  } catch (error) {
    console.error('Error searching images:', error);
    return null;
  }
}

// Search videos
async function searchVideos(query, options = {}) {
  try {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const url = new URL('https://pixabay.com/api/videos/');
    
    // Add query parameters
    url.searchParams.append('key', apiKey);
    if (query) url.searchParams.append('q', query);
    
    // Add optional parameters
    Object.entries(options).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    
    console.log(\`Found \${data.totalHits} videos for query: "\${query}"\`);
    
    // Display the first 3 videos
    data.hits.slice(0, 3).forEach(video => {
      console.log(\`Video ID: \${video.id}\`);
      console.log(\`Duration: \${video.duration} seconds\`);
      console.log(\`Small Video URL: \${video.videos.small.url}\`);
      console.log(\`Medium Video URL: \${video.videos.medium.url}\`);
      console.log(\`Large Video URL: \${video.videos.large.url}\`);
      console.log(\`Tags: \${video.tags}\`);
      console.log('---');
    });
    
    return data;
  } catch (error) {
    console.error('Error searching videos:', error);
    return null;
  }
}

// Example usage
searchImages('nature', {
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 10
});

searchVideos('ocean', {
  video_type: 'film',
  per_page: 5
});`}
                  language="javascript"
                />
              </TabsContent>
              <TabsContent value="python">
                <h3 className="text-lg font-semibold">Search Images</h3>
                <CodeBlock
                  code={`import requests

def search_images(query, options=None):
    try:
        api_key = 'YOUR_API_KEY'  # Replace with your actual API key
        url = 'https://pixabay.com/api/'
        
        # Prepare parameters
        params = {
            'key': api_key
        }
        
        if query:
            params['q'] = query
        
        # Add optional parameters
        if options:
            params.update(options)
        
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        
        data = response.json()
        
        print(f"Found {data['totalHits']} images for query: '{query}'")
        
        # Display the first 5 images
        for image in data['hits'][:5]:
            print(f"Image ID: {image['id']}")
            print(f"Preview URL: {image['previewURL']}")
            print(f"Web Format URL: {image['webformatURL']}")
            print(f"Large Image URL: {image['largeImageURL']}")
            print(f"Tags: {image['tags']}")
            print('---')
        
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error searching images: {e}")
        return None

# Search videos
def search_videos(query, options=None):
    try:
        api_key = 'YOUR_API_KEY'  # Replace with your actual API key
        url = 'https://pixabay.com/api/videos/'
        
        # Prepare parameters
        params = {
            'key': api_key
        }
        
        if query:
            params['q'] = query
        
        # Add optional parameters
        if options:
            params.update(options)
        
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        
        data = response.json()
        
        print(f"Found {data['totalHits']} videos for query: '{query}'")
        
        # Display the first 3 videos
        for video in data['hits'][:3]:
            print(f"Video ID: {video['id']}")
            print(f"Duration: {video['duration']} seconds")
            print(f"Small Video URL: {video['videos']['small']['url']}")
            print(f"Medium Video URL: {video['videos']['medium']['url']}")
            print(f"Large Video URL: {video['videos']['large']['url']}")
            print(f"Tags: {video['tags']}")
            print('---')
        
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error searching videos: {e}")
        return None

# Example usage
search_images('nature', {
    'image_type': 'photo',
    'orientation': 'horizontal',
    'per_page': 10
})

search_videos('ocean', {
    'video_type': 'film',
    'per_page': 5
})`}
                  language="python"
                />
              </TabsContent>
              <TabsContent value="react">
                <h3 className="text-lg font-semibold">Image Gallery Component</h3>
                <CodeBlock
                  code={`import { useState, useEffect } from 'react';

function PixabayGallery() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useState({
    image_type: 'photo',
    per_page: 20,
    safesearch: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

  const searchImages = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const url = new URL('https://pixabay.com/api/');
      
      // Add query parameters
      url.searchParams.append('key', apiKey);
      url.searchParams.append('q', query);
      url.searchParams.append('page', page);
      
      // Add search parameters
      Object.entries(searchParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      
      setImages(data.hits);
      setTotalHits(data.totalHits);
    } catch (err) {
      setError(err.message);
      setImages([]);
      setTotalHits(0);
    } finally {
      setLoading(false);
    }
  };

  // Search when query, page, or search parameters change
  useEffect(() => {
    if (query.trim()) {
      searchImages();
    }
  }, [query, page, searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    searchImages();
  };

  const handleImageTypeChange = (e) => {
    setSearchParams({
      ...searchParams,
      image_type: e.target.value
    });
    setPage(1); // Reset to first page on filter change
  };

  const handleOrientationChange = (e) => {
    setSearchParams({
      ...searchParams,
      orientation: e.target.value
    });
    setPage(1); // Reset to first page on filter change
  };

  const handleCategoryChange = (e) => {
    setSearchParams({
      ...searchParams,
      category: e.target.value === 'all' ? '' : e.target.value
    });
    setPage(1); // Reset to first page on filter change
  };

  return (
    <div className="pixabay-gallery">
      <h2>Pixabay Image Gallery</h2>
      
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="image-type">Image Type:</label>
          <select
            id="image-type"
            value={searchParams.image_type}
            onChange={handleImageTypeChange}
          >
            <option value="all">All</option>
            <option value="photo">Photo</option>
            <option value="illustration">Illustration</option>
            <option value="vector">Vector</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="orientation">Orientation:</label>
          <select
            id="orientation"
            value={searchParams.orientation || 'all'}
            onChange={handleOrientationChange}
          >
            <option value="all">All</option>
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={searchParams.category || 'all'}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            <option value="backgrounds">Backgrounds</option>
            <option value="fashion">Fashion</option>
            <option value="nature">Nature</option>
            <option value="science">Science</option>
            <option value="education">Education</option>
            <option value="feelings">Feelings</option>
            <option value="health">Health</option>
            <option value="people">People</option>
            <option value="religion">Religion</option>
            <option value="places">Places</option>
            <option value="animals">Animals</option>
            <option value="industry">Industry</option>
            <option value="computer">Computer</option>
            <option value="food">Food</option>
            <option value="sports">Sports</option>
            <option value="transportation">Transportation</option>
            <option value="travel">Travel</option>
            <option value="buildings">Buildings</option>
            <option value="business">Business</option>
            <option value="music">Music</option>
          </select>
        </div>
      </div>
      
      {error && <p className="error">Error: {error}</p>}
      
      {images.length > 0 ? (
        <>
          <p className="results-count">
            Showing {images.length} of {totalHits} results
          </p>
          
          <div className="image-grid">
            {images.map(image => (
              <div key={image.id} className="image-card">
                <a href={image.pageURL} target="_blank" rel="noopener noreferrer">
                  <img src={image.webformatURL || "/placeholder.svg"} alt={image.tags} />
                </a>
                <div className="image-info">
                  <p className="tags">{image.tags}</p>
                  <div className="stats">
                    <span>👁️ {image.views}</span>
                    <span>⬇️ {image.downloads}</span>
                    <span>❤️ {image.likes}</span>
                  </div>
                  <p className="user">
                    By: <a href={\`https://pixabay.com/users/\${image.user}-\${image.user_id}/\`} target="_blank" rel="noopener noreferrer">
                      {image.user}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pagination">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={images.length < searchParams.per_page || loading}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        !loading && query && <p>No images found. Try a different search term.</p>
      )}
    </div>
  );
}

export default PixabayGallery;`}
                  language="jsx"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
            <CardDescription>Tips for using the Pixabay API effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Cache API responses</strong> to reduce the number of API calls and improve performance.
              </li>
              <li>
                <strong>Use appropriate image sizes</strong> for your application to optimize loading times. Pixabay
                provides multiple image sizes for each image.
              </li>
              <li>
                <strong>Implement pagination</strong> to load images as needed, rather than loading all images at once.
              </li>
              <li>
                <strong>Add error handling</strong> to gracefully handle API errors and rate limiting.
              </li>
              <li>
                <strong>Use the safesearch parameter</strong> to filter out potentially unsafe content, especially in
                applications for general audiences.
              </li>
              <li>
                <strong>Optimize search queries</strong> by using specific search terms and filters to get more relevant
                results.
              </li>
              <li>
                <strong>Consider attribution</strong> - While not required by the Pixabay License, it&apos;s good
                practice to credit the photographers when possible.
              </li>
            </ul>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-md">
              <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Pro Tip</h3>
              <p>
                When building an image gallery, implement lazy loading for images to improve page load times and reduce
                bandwidth usage. Only load images as they come into the viewport.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use Cases</CardTitle>
            <CardDescription>Common applications of the Pixabay API</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Building an image search engine or stock photo gallery</li>
              <li>Adding dynamic imagery to websites or applications</li>
              <li>Creating content for blogs, social media, or marketing materials</li>
              <li>Generating random background images for web applications</li>
              <li>Creating mood boards or inspiration galleries</li>
              <li>Implementing image carousels with high-quality photos</li>
              <li>Building video libraries or background video elements</li>
              <li>Creating educational resources with relevant imagery</li>
              <li>Enhancing user-generated content with professional visuals</li>
            </ul>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
              <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Integration Example</h3>
              <p>
                Pixabay API works well with content management systems, allowing content creators to easily search and
                insert images directly into their articles or posts without leaving the editor.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitations</CardTitle>
            <CardDescription>Understanding the constraints of the Pixabay API</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Free API is limited to 5,000 requests per hour</li>
              <li>Maximum of 200 results per page</li>
              <li>Some advanced search features may not be available</li>
              <li>Video content is more limited than image content</li>
              <li>API does not support uploading content</li>
            </ul>

            <Alert className="mt-6">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Important Note</AlertTitle>
              <AlertDescription>
                While Pixabay content is free to use, make sure to review the Pixabay License for any specific use cases
                or restrictions that might apply to your project.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
