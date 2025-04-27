"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function ApiCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const apis = [
    {
      id: "weather",
      name: "Weather API",
      description: "Get current weather data and forecasts for any location",
      category: "Weather",
      difficulty: "Beginner",
    },
    {
      id: "chuck-norris",
      name: "Chuck Norris API",
      description: "Free JSON API for hand curated Chuck Norris facts",
      category: "Entertainment",
      difficulty: "Beginner",
    },
    {
      id: "random-user",
      name: "Random User API",
      description: "Generate random user data for testing and prototyping",
      category: "Data",
      difficulty: "Beginner",
    },
    {
      id: "advice-slip",
      name: "Advice Slip API",
      description: "Free API for random advice slips",
      category: "Entertainment",
      difficulty: "Beginner",
    },
    {
      id: "quotes-api",
      name: "Quotable API",
      description: "Free API for quotes from famous historical figures",
      category: "Entertainment",
      difficulty: "Beginner",
    },
    {
      id: "dog-api",
      name: "Dog API",
      description: "Free API for random dog images and breed information",
      category: "Animals",
      difficulty: "Beginner",
    },
    {
      id: "cat-facts",
      name: "Cat Facts API",
      description: "Free API for random facts about cats",
      category: "Animals",
      difficulty: "Beginner",
    },
    {
      id: "bored-api",
      name: "Bored API",
      description: "Free API for activity suggestions to cure boredom",
      category: "Entertainment",
      difficulty: "Beginner",
    },
    {
      id: "pokemon-api",
      name: "Pokémon API",
      description: "All the Pokémon data you'll ever need in one place",
      category: "Gaming",
      difficulty: "Intermediate",
    },
    {
      id: "star-wars-api",
      name: "Star Wars API",
      description: "All the Star Wars data you've ever wanted",
      category: "Entertainment",
      difficulty: "Intermediate",
    },
    {
      id: "github-api",
      name: "GitHub API",
      description: "Access GitHub repositories, users, issues, and more",
      category: "Development",
      difficulty: "Intermediate",
    },
    {
      id: "news-api",
      name: "News API",
      description: "Search for news articles and headlines from various sources worldwide",
      category: "News",
      difficulty: "Beginner",
    },
    {
      id: "movie-database-api",
      name: "The Movie Database API",
      description: "Access information about movies, TV shows, actors, and more",
      category: "Entertainment",
      difficulty: "Intermediate",
    },
    {
      id: "nasa-apod-api",
      name: "NASA APOD API",
      description: "Get NASA's Astronomy Picture of the Day with explanations",
      category: "Science",
      difficulty: "Beginner",
    },
    {
      id: "twitter-api",
      name: "Twitter API",
      description: "Access tweets, user data, and social media interactions",
      category: "Social Media",
      difficulty: "Intermediate",
    },
    {
      id: "spotify-api",
      name: "Spotify API",
      description: "Access music data, playlists, and user information from Spotify",
      category: "Music",
      difficulty: "Intermediate",
    },
    {
      id: "unsplash-api",
      name: "Unsplash API",
      description: "Access high-quality, royalty-free images for your projects",
      category: "Photography",
      difficulty: "Beginner",
    },
  ]

  // Get unique categories
  const categories = ["all", ...new Set(apis.map((api) => api.category).map((category) => category.toLowerCase()))]

  // Filter APIs based on search query and category
  const filteredApis = apis.filter((api) => {
    const searchMatch =
      api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.description.toLowerCase().includes(searchQuery.toLowerCase())
    const categoryMatch = activeCategory === "all" || api.category.toLowerCase() === activeCategory
    return searchMatch && categoryMatch
  })

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">API Catalog</h1>
          <p className="text-muted-foreground">
            Browse our collection of APIs with detailed documentation and integration guides.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <Input
              type="text"
              placeholder="Search APIs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter by difficulty:</span>
            <div className="flex flex-wrap gap-2">
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
          </div> */}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex flex-wrap h-auto overflow-x-auto" aria-label="API Categories">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} onClick={() => setActiveCategory(category)}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredApis.map((api) => (
                <Card key={api.id} className="flex flex-col h-full">
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
                      <Link href={`/apis/${api.id}`}>View Documentation</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          {categories.slice(1).map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredApis
                  .filter((api) => api.category.toLowerCase() === category)
                  .map((api) => (
                    <Card key={api.id} className="flex flex-col h-full">
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
                          <Link href={`/apis/${api.id}`}>View Documentation</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
