"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"

// API data structure
type API = {
  id: string
  name: string
  description: string
  category: string
  url: string
}

// Sample API data - in a real app, this would come from a database or API
const apiData: API[] = [
  {
    id: "weather",
    name: "Weather API",
    description: "Get current weather data and forecasts for any location",
    category: "Weather",
    url: "/apis/weather",
  },
  {
    id: "chuck-norris",
    name: "Chuck Norris Facts",
    description: "Random Chuck Norris facts and jokes API",
    category: "Entertainment",
    url: "/apis/chuck-norris",
  },
  {
    id: "dog-api",
    name: "Dog API",
    description: "Random dog images and breed information",
    category: "Animals",
    url: "/apis/dog-api",
  },
  {
    id: "cat-facts",
    name: "Cat Facts API",
    description: "Random facts about cats for your applications",
    category: "Animals",
    url: "/apis/cat-facts",
  },
  {
    id: "advice-slip",
    name: "Advice Slip API",
    description: "Random advice slips for inspiration and fun",
    category: "Entertainment",
    url: "/apis/advice-slip",
  },
  {
    id: "bored-api",
    name: "Bored API",
    description: "Activity suggestions to cure boredom",
    category: "Entertainment",
    url: "/apis/bored-api",
  },
  {
    id: "pokemon-api",
    name: "Pokemon API",
    description: "Comprehensive Pokemon data and information",
    category: "Entertainment",
    url: "/apis/pokemon-api",
  },
  {
    id: "quotes-api",
    name: "Quotes API",
    description: "Inspirational quotes for your applications",
    category: "Entertainment",
    url: "/apis/quotes-api",
  },
  {
    id: "random-user",
    name: "Random User API",
    description: "Generate random user data for testing and prototyping",
    category: "Data",
    url: "/apis/random-user",
  },
]

export function Search() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<API[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Handle search query changes
  useEffect(() => {
    if (query.length > 1) {
      const filteredResults = apiData.filter(
        (api) =>
          api.name.toLowerCase().includes(query.toLowerCase()) ||
          api.description.toLowerCase().includes(query.toLowerCase()) ||
          api.category.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filteredResults)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (results.length > 0) {
      router.push(results[0].url)
      setQuery("")
      setIsOpen(false)
    }
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search APIs..."
          className="w-full pl-8 pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search APIs"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-9 w-9"
            onClick={() => {
              setQuery("")
              setIsOpen(false)
            }}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full rounded-md border bg-background shadow-lg z-50">
          <ul className="py-2 max-h-[60vh] overflow-auto">
            {results.map((api) => (
              <li key={api.id}>
                <Link
                  href={api.url}
                  className="block px-4 py-2 hover:bg-muted text-sm"
                  onClick={() => {
                    setQuery("")
                    setIsOpen(false)
                  }}
                >
                  <div className="font-medium">{api.name}</div>
                  <div className="text-xs text-muted-foreground">{api.description}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && query.length > 1 && results.length === 0 && (
        <div className="absolute top-full mt-1 w-full rounded-md border bg-background p-4 shadow-lg z-50">
          <p className="text-sm text-muted-foreground">No APIs found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  )
}
