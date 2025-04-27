import Link from "next/link"
import { ArrowLeft, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContributePage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label="Back to home">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Contribute to Bless API Book</h1>
        </div>

        <div className="prose prose-green max-w-none">
          <p>
            Bless API Book is an open-source project dedicated to making API integration easier for developers of all
            skill levels. We welcome contributions from the community to help expand our collection of API
            documentation, improve existing content, and enhance the overall user experience.
          </p>

          <h2>Ways to Contribute</h2>
          <div className="grid gap-6 md:grid-cols-2 not-prose">
            <Card>
              <CardHeader>
                <CardTitle>Add API Documentation</CardTitle>
                <CardDescription>Help expand our collection of API tutorials</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create comprehensive documentation for APIs not yet covered in our catalog. Follow our documentation
                  template to ensure consistency.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Improve Existing Content</CardTitle>
                <CardDescription>Help us keep our documentation up-to-date</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Update existing API documentation to reflect changes in APIs, fix errors, or improve explanations and
                  code examples.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fix Bugs</CardTitle>
                <CardDescription>Help improve the website functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Report bugs you encounter or submit pull requests to fix issues with the website's functionality or
                  user interface.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enhance Features</CardTitle>
                <CardDescription>Help add new features to the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Contribute to the development of new features that would enhance the learning experience for users of
                  Bless API Book.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="mt-8">Contribution Guidelines</h2>
          <ol>
            <li>
              <strong>Fork the Repository</strong>: Start by forking the Bless API Book repository on GitHub.
            </li>
            <li>
              <strong>Create a Branch</strong>: Create a branch for your contribution with a descriptive name.
            </li>
            <li>
              <strong>Follow the Style Guide</strong>: Ensure your contributions follow our documentation style guide
              and coding standards.
            </li>
            <li>
              <strong>Test Your Changes</strong>: Make sure your changes work as expected and don't break existing
              functionality.
            </li>
            <li>
              <strong>Submit a Pull Request</strong>: Once your contribution is ready, submit a pull request with a
              clear description of the changes.
            </li>
          </ol>

          <h2>Documentation Template</h2>
          <p>
            When adding new API documentation, please follow our template structure to ensure consistency across the
            platform:
          </p>
          <ul>
            <li>
              <strong>Overview</strong>: A brief description of the API and its purpose.
            </li>
            <li>
              <strong>Integration Guide</strong>: Step-by-step instructions for integrating the API.
            </li>
            <li>
              <strong>Code Examples</strong>: Working code examples in HTML, CSS, and JavaScript.
            </li>
            <li>
              <strong>Error Handling</strong>: Common errors and how to handle them.
            </li>
            <li>
              <strong>API Details</strong>: Endpoints, parameters, and authentication methods.
            </li>
          </ul>

          <div className="flex justify-center mt-8 not-prose">
            <Button asChild size="lg" className="gap-2">
              <a href="https://github.com/bless-api-book" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                Contribute on GitHub
              </a>
            </Button>
          </div>

          <h2 className="mt-8">Join Our Community</h2>
          <p>
            Have questions about contributing? Join our Discord community to connect with other contributors and get
            help with your contributions.
          </p>

          <div className="flex justify-center mt-4 not-prose">
            <Button asChild variant="outline" size="lg">
              <a href="https://discord.gg/yXUWUzQU" target="_blank" rel="noopener noreferrer">
                Join Our Discord
              </a>
            </Button>
          </div>

          <h2 className="mt-8">Code of Conduct</h2>
          <p>
            We expect all contributors to adhere to our Code of Conduct. We are committed to providing a welcoming and
            inclusive environment for everyone, regardless of background or identity.
          </p>

          <h2>Recognition</h2>
          <p>
            All contributors will be recognized for their work. Your name will be added to our contributors list, and
            significant contributions may be highlighted in our newsletter and social media channels.
          </p>

          <p className="mt-8">
            Thank you for considering contributing to Bless API Book. Your efforts help make API integration more
            accessible to developers worldwide!
          </p>
        </div>
      </div>
    </div>
  )
}
