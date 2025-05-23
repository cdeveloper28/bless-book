import Link from "next/link"
import { ArrowRight, Code, Database, Globe, Server, Terminal, Copy, AlertTriangle } from "lucide-react"
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
              Master API Integration with <span className="bg-green-600 mr-1 p-1 font-mono "> Bless API Book</span>
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Your comprehensive guide to integrating APIs with step-by-step tutorials and ready-to-use code snippets.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/apis">
                  Browse APIs
                  <svg
                    className="animate-pulse ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                    <path d="M20 3v4" />
                    <path d="M22 5h-4" />
                    <path d="M4 17v2" />
                    <path d="M5 18H3" />
                  </svg>
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/guides">Read Guides</Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="bg-green-600 rounded-full animate-ping text-green-700 h-2 w-2 inline mt-2 mr-1"></div>
              <span className="max-w-[700px] text-muted-foreground md:text-xl inline">
                View on desktop for better interactivity
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bless Network Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className=" rounded-2xl shadow-xl border border-green-600 max-w-3xl w-full overflow-hidden">
            {/* Header with green-700 */}
            <div className="bg-green-700 px-6 py-5 text-white">
              <span className="bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                Configuration Update
              </span>
              <h1 className="text-2xl text-white font-bold mt-3 mb-0">Updating BLESS CLI Configuration</h1>
              <p className="text-white mt-1">Adding API permissions to your bls.toml file</p>
            </div>

            {/* Body */}
            <div className="p-6 ">
              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed">
                  In your <span className="font-semibold text-green-600">[deployment]</span> section of the{" "}
                  <span className="font-semibold text-green-600">bls.toml</span> file, you need to add the following
                  permission line:
                </p>

                <div className="bg-gray-100 text-green-600 font-mono text-sm px-3 py-1 rounded my-3 inline-block">
                  permissions = [ "https://yourapiwebsite/" ]
                </div>

                <p className="text-gray-600">Simply copy and paste it directly under the existing settings.</p>

                <div className="flex items-center bg-red-50 border-l-4 border-red-500 p-4 rounded mt-5">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                  <span className="text-red-800 font-medium">
                    Important: Replace <span className="text-green-600">https://yourapiwebsite/</span> with your actual
                    API endpoint URL.
                  </span>
                </div>
              </div>

              {/* Code Block */}
              <div className="bg-gray-900 rounded-xl overflow-hidden mt-6">
                <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
                  <span className="text-gray-300 text-sm font-mono">bls.toml</span>
                  <div className="flex space-x-2">
                  
                  </div>
                </div>
                <div className="p-5 font-mono text-sm leading-relaxed text-gray-300 overflow-x-auto">
                  <div>
                    <span className="text-blue-400">[deployment]</span>
                  </div>
                  <div>
                    permission = <span className="text-yellow-400">"public"</span>
                  </div>
                  <div>
                    nodes = <span className="text-pink-400">1</span>
                  </div>
                  <div>
                    permissions = [ <span className="text-yellow-400">"https://yourapiwebsite/"</span> ]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center text-center mt-6 mb-4">
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
              <CardTitle>APIs</CardTitle>
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
                  Browse our catalog of APIs and find the one that fits your project needs.
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
