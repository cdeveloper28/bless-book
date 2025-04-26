import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "API Guides | Bless API Book",
  description: "Comprehensive guides for working with APIs effectively",
}

export default function GuidesPage() {
  const guides = [
    {
      title: "API Authentication Methods",
      description: "Learn about different API authentication methods including API keys, OAuth, JWT, and more.",
      slug: "authentication",
      icon: "🔐",
    },
    {
      title: "Error Handling Best Practices",
      description: "Discover best practices for handling API errors gracefully in your applications.",
      slug: "error-handling",
      icon: "⚠️",
    },
    {
      title: "Dealing with Rate Limits",
      description: "Strategies for managing and respecting API rate limits in your applications.",
      slug: "rate-limiting",
      icon: "⏱️",
    },
    {
      title: "API Response Caching",
      description: "Learn how to implement effective caching strategies for API responses.",
      slug: "caching",
      icon: "📦",
    },
    {
      title: "API Security Best Practices",
      description: "Essential security practices to protect your API integrations and user data.",
      slug: "security",
      icon: "🛡️",
    },
    {
      title: "Working with Webhooks",
      description: "Understanding and implementing webhooks for real-time API integrations.",
      slug: "webhooks",
      icon: "🔄",
    },
    {
      title: "Testing API Integrations",
      description: "Comprehensive approaches to testing your API integrations effectively.",
      slug: "testing",
      icon: "🧪",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">API Guides</h1>
      <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
        Comprehensive guides to help you master API integration and development. Each guide provides in-depth knowledge
        and practical examples.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Link
            href={`/guides/${guide.slug}`}
            key={guide.slug}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800"
          >
            <div className="flex flex-col h-full">
              <div className="text-4xl mb-4">{guide.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{guide.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">{guide.description}</p>
              <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium">Read guide →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
