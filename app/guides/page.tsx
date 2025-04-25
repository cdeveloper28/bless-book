import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Sample guides data
const guides = [
  {
    id: "getting-started",
    title: "Getting Started with APIs",
    description: "Learn the basics of API integration and how to make your first API call",
    category: "Beginner",
    estimatedTime: "15 min",
    url: "/guides/getting-started",
  },
  {
    id: "authentication",
    title: "API Authentication Methods",
    description: "Understand different authentication methods: API keys, OAuth, JWT, and more",
    category: "Intermediate",
    estimatedTime: "25 min",
    url: "/guides/authentication",
  },
  {
    id: "error-handling",
    title: "Error Handling Best Practices",
    description: "Learn how to handle API errors and edge cases in your applications",
    category: "Intermediate",
    estimatedTime: "20 min",
    url: "/guides/error-handling",
  },
  {
    id: "rate-limiting",
    title: "Dealing with Rate Limits",
    description: "Strategies for handling API rate limits and quotas effectively",
    category: "Advanced",
    estimatedTime: "30 min",
    url: "/guides/rate-limiting",
  },
  {
    id: "caching",
    title: "API Response Caching",
    description: "Implement caching strategies to improve performance and reduce API calls",
    category: "Intermediate",
    estimatedTime: "25 min",
    url: "/guides/caching",
  },
  {
    id: "security",
    title: "API Security Best Practices",
    description: "Secure your API integrations and protect sensitive data",
    category: "Advanced",
    estimatedTime: "35 min",
    url: "/guides/security",
  },
]

export default function GuidesPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Integration Guides</h1>
          <p className="text-muted-foreground">
            Learn how to integrate APIs effectively with our comprehensive guides and tutorials.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Card key={guide.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>{guide.title}</CardTitle>
                  <Badge>{guide.category}</Badge>
                </div>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">Estimated reading time: {guide.estimatedTime}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={guide.url}>Read Guide</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
