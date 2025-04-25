import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Updated API categories
const categories = [
  "All",
  "Weather",
  "Entertainment",
  "Developer Tools",
  "Images",
  "Payments",
  "Maps",
  "Social Media",
  "E-commerce",
  "Communication",
  "Animals",
  "Data",
  "Food & Drink",
  "Finance",
  "Education",
  "Health",
  "Music",
  "News",
  "Sports",
  "Travel",
]

// Expanded APIs data with 50 simple APIs
const apis = [
  // Original APIs
  {
    id: "weather",
    name: "Weather API",
    description: "Get current weather data and forecasts for any location",
    category: "Weather",
    difficulty: "Beginner",
    url: "/apis/weather",
  },
  {
    id: "chuck-norris",
    name: "Chuck Norris Facts",
    description: "Random Chuck Norris facts and jokes API",
    category: "Entertainment",
    difficulty: "Beginner",
    url: "/apis/chuck-norris",
  },
  {
    id: "github",
    name: "GitHub API",
    description: "Access GitHub repositories, issues, and user data",
    category: "Developer Tools",
    difficulty: "Intermediate",
    url: "/apis/github",
  },
  {
    id: "unsplash",
    name: "Unsplash API",
    description: "High-quality, royalty-free images for your applications",
    category: "Images",
    difficulty: "Beginner",
    url: "/apis/unsplash",
  },
  {
    id: "stripe",
    name: "Stripe API",
    description: "Process payments and manage subscriptions",
    category: "Payments",
    difficulty: "Advanced",
    url: "/apis/stripe",
  },
  {
    id: "google-maps",
    name: "Google Maps API",
    description: "Integrate maps, geocoding, and location services",
    category: "Maps",
    difficulty: "Intermediate",
    url: "/apis/google-maps",
  },

  // New simple APIs
  {
    id: "random-user",
    name: "Random User API",
    description: "Generate random user data for testing and prototyping",
    category: "Data",
    difficulty: "Beginner",
    url: "/apis/random-user",
  },
  {
    id: "dog-api",
    name: "Dog API",
    description: "Random dog images and breed information",
    category: "Animals",
    difficulty: "Beginner",
    url: "/apis/dog-api",
  },
  {
    id: "cat-facts",
    name: "Cat Facts API",
    description: "Random facts about cats for your applications",
    category: "Animals",
    difficulty: "Beginner",
    url: "/apis/cat-facts",
  },
  {
    id: "advice-slip",
    name: "Advice Slip API",
    description: "Random advice slips for inspiration and fun",
    category: "Entertainment",
    difficulty: "Beginner",
    url: "/apis/advice-slip",
  },
  {
    id: "bored-api",
    name: "Bored API",
    description: "Activity suggestions to cure boredom",
    category: "Entertainment",
    difficulty: "Beginner",
    url: "/apis/bored-api",
  },
  {
    id: "pokemon-api",
    name: "Pokemon API",
    description: "Comprehensive Pokemon data and information",
    category: "Entertainment",
    difficulty: "Beginner",
    url: "/apis/pokemon-api",
  },
  {
    id: "star-wars-api",
    name: "Star Wars API",
    description: "All the Star Wars data you've ever wanted",
    category: "Entertainment",
    difficulty: "Beginner",
    url: "/apis/star-wars-api",
  },
  {
    id: "open-trivia",
    name: "Open Trivia Database",
    description: "Free trivia questions and answers for your quiz app",
    category: "Entertainment",
    difficulty: "Beginner",
    url: "/apis/open-trivia",
  },
  {
    id: "random-fox",
    name: "Random Fox API",
    description: "Random fox images for your applications",
    category: "Animals",
    difficulty: "Beginner",
    url: "/apis/random-fox",
  },
  {
    id: "json-placeholder",
    name: "JSON Placeholder",
    description: "Fake data for testing and prototyping",
    category: "Developer Tools",
    difficulty: "Beginner",
    url: "/apis/json-placeholder",
  },
  {
    id: "rest-countries",
    name: "REST Countries",
    description: "Information about countries, flags, and more",
    category: "Data",
    difficulty: "Beginner",
    url: "/apis/rest-countries",
  },
  {
    id: "random-joke",
    name: "Random Joke API",
    description: "Random jokes for your applications",
    category: "Entertainment",
    difficulty: "Beginner",
    url: "/apis/random-joke",
  },
  {
    id: "numbers-api",
    name: "Numbers API",
    description: "Interesting facts about numbers",
    category: "Education",
    difficulty: "Beginner",
    url: "/apis/numbers-api",
  },
  {
    id: "ip-geolocation",
    name: "IP Geolocation API",
    description: "Get location information from IP addresses",
    category: "Data",
    difficulty: "Beginner",
    url: "/apis/ip-geolocation",
  },
  {
    id: "random-data",
    name: "Random Data API",
    description: "Generate random data for various use cases",
    category: "Data",
    difficulty: "Beginner",
    url: "/apis/random-data",
  },
  {
    id: "quotes-api",
    name: "Quotes API",
    description: "Inspirational quotes for your applications",
    category: "Entertainment",
    difficulty: "Beginner",
    url: "/apis/quotes-api",
  },
  {
    id: "nasa-apod",
    name: "NASA APOD API",
    description: "NASA's Astronomy Picture of the Day",
    category: "Education",
    difficulty: "Beginner",
    url: "/apis/nasa-apod",
  },
  {
    id: "open-brewery",
    name: "Open Brewery DB",
    description: "Breweries, cideries, brewpubs, and bottleshops",
    category: "Food & Drink",
    difficulty: "Beginner",
    url: "/apis/open-brewery",
  },
  {
    id: "meal-db",
    name: "MealDB API",
    description: "Food recipes and meal information",
    category: "Food & Drink",
    difficulty: "Beginner",
    url: "/apis/meal-db",
  },
  {
    id: "cocktail-db",
    name: "CocktailDB API",
    description: "Cocktail recipes and drink information",
    category: "Food & Drink",
    difficulty: "Beginner",
    url: "/apis/cocktail-db",
  },
  {
    id: "exchange-rates",
    name: "Exchange Rates API",
    description: "Foreign exchange rates and currency conversion",
    category: "Finance",
    difficulty: "Beginner",
    url: "/apis/exchange-rates",
  },
  {
    id: "agify",
    name: "Agify API",
    description: "Predicts age based on a person's name",
    category: "Data",
    difficulty: "Beginner",
    url: "/apis/agify",
  },
  {
    id: "genderize",
    name: "Genderize API",
    description: "Predicts gender based on a person's name",
    category: "Data",
    difficulty: "Beginner",
    url: "/apis/genderize",
  },
  {
    id: "nationalize",
    name: "Nationalize API",
    description: "Predicts nationality based on a person's name",
    category: "Data",
    difficulty: "Beginner",
    url: "/apis/nationalize",
  },
  {
    id: "lyrics-ovh",
    name: "Lyrics.ovh API",
    description: "Song lyrics for your music applications",
    category: "Music",
    difficulty: "Beginner",
    url: "/apis/lyrics-ovh",
  },
  {
    id: "open-library",
    name: "Open Library API",
    description: "Books, authors, and library information",
    category: "Education",
    difficulty: "Beginner",
    url: "/apis/open-library",
  },
  {
    id: "jikan",
    name: "Jikan API",
    description: "Unofficial MyAnimeList API for anime and manga",
    category: "Entertainment",
    difficulty: "Beginner",
    url: "/apis/jikan",
  },
  {
    id: "marvel",
    name: "Marvel API",
    description: "Information about Marvel comics and characters",
    category: "Entertainment",
    difficulty: "Intermediate",
    url: "/apis/marvel",
  },
  {
    id: "giphy",
    name: "Giphy API",
    description: "Animated GIFs for your applications",
    category: "Images",
    difficulty: "Beginner",
    url: "/apis/giphy",
  },
  {
    id: "news-api",
    name: "News API",
    description: "Headlines and news articles from various sources",
    category: "News",
    difficulty: "Beginner",
    url: "/apis/news-api",
  },
  {
    id: "pixabay",
    name: "Pixabay API",
    description: "Free images and videos for your applications",
    category: "Images",
    difficulty: "Beginner",
    url: "/apis/pixabay",
  },
  {
    id: "pexels",
    name: "Pexels API",
    description: "Free stock photos and videos",
    category: "Images",
    difficulty: "Beginner",
    url: "/apis/pexels",
  },
  {
    id: "spotify",
    name: "Spotify API",
    description: "Music data and playback control",
    category: "Music",
    difficulty: "Intermediate",
    url: "/apis/spotify",
  },
  {
    id: "youtube",
    name: "YouTube API",
    description: "Search for videos and manage YouTube content",
    category: "Entertainment",
    difficulty: "Intermediate",
    url: "/apis/youtube",
  },
  {
    id: "twitter",
    name: "Twitter API",
    description: "Access tweets, user data, and post to Twitter",
    category: "Social Media",
    difficulty: "Intermediate",
    url: "/apis/twitter",
  },
  {
    id: "reddit",
    name: "Reddit API",
    description: "Access Reddit posts, comments, and subreddits",
    category: "Social Media",
    difficulty: "Intermediate",
    url: "/apis/reddit",
  },
  {
    id: "twilio",
    name: "Twilio API",
    description: "Send SMS, make calls, and communicate with users",
    category: "Communication",
    difficulty: "Intermediate",
    url: "/apis/twilio",
  },
  {
    id: "sendgrid",
    name: "SendGrid API",
    description: "Send emails and manage email campaigns",
    category: "Communication",
    difficulty: "Intermediate",
    url: "/apis/sendgrid",
  },
  {
    id: "mailchimp",
    name: "Mailchimp API",
    description: "Email marketing and newsletter management",
    category: "Communication",
    difficulty: "Intermediate",
    url: "/apis/mailchimp",
  },
  {
    id: "firebase",
    name: "Firebase API",
    description: "Backend services for web and mobile applications",
    category: "Developer Tools",
    difficulty: "Intermediate",
    url: "/apis/firebase",
  },
  {
    id: "auth0",
    name: "Auth0 API",
    description: "Authentication and authorization services",
    category: "Developer Tools",
    difficulty: "Intermediate",
    url: "/apis/auth0",
  },
  {
    id: "cloudinary",
    name: "Cloudinary API",
    description: "Image and video management in the cloud",
    category: "Images",
    difficulty: "Intermediate",
    url: "/apis/cloudinary",
  },
  {
    id: "algolia",
    name: "Algolia API",
    description: "Search functionality for your applications",
    category: "Developer Tools",
    difficulty: "Intermediate",
    url: "/apis/algolia",
  },
]

export default function ApiCatalog() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">API Catalog</h1>
          <p className="text-muted-foreground">
            Browse our collection of 50+ APIs with detailed documentation and integration guides.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input type="search" placeholder="Search APIs..." className="w-full pl-8" aria-label="Search APIs" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter by difficulty:</span>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer">
                All
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                Beginner
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                Intermediate
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                Advanced
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="All">
          <TabsList className="flex flex-wrap h-auto" aria-label="API Categories">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="All" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {apis.map((api) => (
                <Card key={api.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{api.name}</CardTitle>
                      <Badge variant="outline">{api.category}</Badge>
                    </div>
                    <CardDescription>{api.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{api.difficulty}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={api.url}>View Documentation</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          {/* Other tab contents would be similar but filtered by category */}
        </Tabs>
      </div>
    </div>
  )
}
