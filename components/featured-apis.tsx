import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Updated featured APIs data with more simple APIs
const featuredApis = [
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
]

export default function FeaturedApis() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {featuredApis.map((api) => (
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
              <Link href={api.url}>
                View Documentation <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
