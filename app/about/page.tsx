import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">About Bless API Book</h1>
          <p className="text-muted-foreground max-w-3xl">
            Bless API Book is a comprehensive resource for developers looking to integrate APIs into their applications.
            Our mission is to provide clear, concise, and practical guidance for working with a wide range of APIs,
            making integration as seamless as possible for developers of all skill levels.
          </p>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg border border-border">
          <h2 className="text-2xl font-bold mb-4">Created by Bless.network</h2>
          <p className="text-muted-foreground mb-4">
            Bless API Book is proudly created and maintained by{" "}
            <a
              href="https://bless.network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Bless.network
            </a>
            , a platform dedicated to simplifying and enhancing the developer experience. Our goal is to bridge the gap
            between different APIs and provide tools that make integration easier and more efficient.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To simplify API integration by providing comprehensive documentation, code examples, and best practices
                that enable developers to quickly implement and maintain robust API connections, with special focus on
                integration with the Bless Network ecosystem.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Who We Are</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We are a team of experienced developers and technical writers from Bless.network, passionate about
                creating high-quality documentation and tutorials. We believe that good documentation is essential for
                successful API integration.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We focus on practical, hands-on examples that you can implement right away. Each API documentation
                includes working code samples, step-by-step guides, and tips for handling common issues and edge cases,
                including integration with the Bless Network CLI.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">What Makes Us Different</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Comprehensive Coverage</h3>
                <p className="text-muted-foreground">
                  We document over 50 popular APIs with detailed integration guides, covering everything from
                  authentication to error handling.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Ready-to-Use Code</h3>
                <p className="text-muted-foreground">
                  Every API documentation includes copy-paste code snippets that you can immediately implement in your
                  projects.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Bless Network CLI Integration</h3>
                <p className="text-muted-foreground">
                  We provide specialized guides on how to integrate each API with the Bless Network CLI, making it
                  easier to build on the Bless ecosystem.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Edge Case Handling</h3>
                <p className="text-muted-foreground">
                  We address common edge cases like rate limiting, error responses, and API changes to help you build
                  robust integrations.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Accessibility Focus</h3>
                <p className="text-muted-foreground">
                  Our website adheres to WCAG 2.1 AA standards, ensuring that our content is accessible to all
                  developers.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Get Involved</h2>
          <p className="text-muted-foreground mb-4">
            Bless API Book is an open-source project, and we welcome contributions from the community. Whether you want
            to add a new API, improve existing documentation, or fix a bug, your help is appreciated.
          </p>
          <p className="text-muted-foreground">
            Visit our{" "}
            <a
              href="https://github.com/blessnetwork"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>{" "}
            to learn how you can contribute to making API integration easier for developers worldwide.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Button asChild>
              <Link href="/contribute">Contribute to Bless API Book</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://discord.gg/yXUWUzQU" target="_blank" rel="noopener noreferrer">
                Join Our Discord
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
