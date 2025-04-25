import Link from "next/link"
import { ArrowRight, Code, Database, Globe, Server, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import FeaturedApis from "@/components/featured-apis"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Master API Integration with Bless API Book
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Your comprehensive guide to integrating 50+ APIs with step-by-step tutorials and ready-to-use code
              snippets.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/apis">Browse APIs</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/guides">Read Guides</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bless Network Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Powered by Bless.network</div>
          <h2 className="text-3xl font-bold tracking-tight">Built for the Bless Network Ecosystem</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Bless API Book is created by Bless.network to help developers integrate APIs with the Bless Network CLI and
            ecosystem.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
            <Button asChild>
              <a href="https://bless.network" target="_blank" rel="noopener noreferrer">
                Visit Bless.network
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://docs.bless.network/build-on-bless/" target="_blank" rel="noopener noreferrer">
                Bless Network CLI Docs
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <Globe className="h-6 w-6 mb-2 text-primary" aria-hidden="true" />
              <CardTitle>50+ APIs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comprehensive collection of popular and useful APIs ready for integration.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Code className="h-6 w-6 mb-2 text-primary" aria-hidden="true" />
              <CardTitle>Code Snippets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ready-to-use HTML, JavaScript, and other code examples for quick implementation.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Server className="h-6 w-6 mb-2 text-primary" aria-hidden="true" />
              <CardTitle>Step-by-Step Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detailed tutorials for seamless integration into your projects.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Database className="h-6 w-6 mb-2 text-primary" aria-hidden="true" />
              <CardTitle>Error Handling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn how to handle API rate limits, errors, and edge cases effectively.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Terminal className="h-6 w-6 mb-2 text-primary" aria-hidden="true" />
              <CardTitle>Bless Network CLI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Specialized guides for integrating APIs with the Bless Network CLI.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured APIs Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Featured APIs</h2>
            <Button variant="ghost" asChild>
              <Link href="/apis" className="flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <FeaturedApis />
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Choose an API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse our catalog of 50+ APIs and find the one that fits your project needs.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link href="/apis">Browse APIs</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Follow the Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Each API comes with a detailed step-by-step integration guide and code examples.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link href="/guides">View Guides</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Implement with Bless CLI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn how to use the Bless Network CLI to streamline API integration and enhance your development
                  workflow.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <a href="https://docs.bless.network/build-on-bless/" target="_blank" rel="noopener noreferrer">
                    Bless CLI Docs
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
