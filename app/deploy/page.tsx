import Link from "next/link"
import { ArrowLeft, Terminal, ExternalLink, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CodeBlock from "@/components/code-block"

export default function DeployWithBlessPage() {
  // Sample code snippets
  const installCode = `# Install the Bless Network CLI
npm install -g @bless/cli

# Verify installation
bless --version`

  const loginCode = `# Login to your Bless Network account
bless login

# Verify your authentication status
bless whoami`

  const initProjectCode = `# Initialize a new project
bless init my-api-project

# Navigate to the project directory
cd my-api-project`

  const configureApiCode = `# Add an API to your project
bless api add weather-api

# Configure the API with your credentials
bless api config set weather-api --url "https://api.weatherapi.com/v1" --header "key: YOUR_API_KEY_HERE"`

  const createEndpointCode = `# Create a new endpoint file
touch endpoints/weather.js

# Edit the file with your preferred editor
# Example content:
/*
module.exports = async (req, res) => {
  const location = req.query.location || 'London';
  const weatherData = await bless.api.request('weather-api', \`/current.json?q=\${location}\`);
  return res.json(weatherData);
};
*/`

  const deployCode = `# Deploy your project to Bless Network
bless deploy

# Check deployment status
bless status`

  const customDomainCode = `# Add a custom domain to your deployment
bless domain add api.mywebsite.com

# Verify domain configuration
bless domain list`

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label="Back to home">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Deploy with Bless CLI</h1>
        </div>

        <div className="prose prose-green dark:prose-invert max-w-none">
          <p className="lead">
            Learn how to deploy your API integrations using the Bless Network CLI. This guide will walk you through the
            process of setting up, configuring, and deploying your API projects to the Bless Network.
          </p>

          <div className="not-prose">
            <Alert className="my-6">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Official Documentation</AlertTitle>
              <AlertDescription>
                This guide is based on the{" "}
                <a
                  href="https://docs.bless.network/build-on-bless/introduction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  official Bless Network documentation
                </a>
                . For the most up-to-date information, please refer to the official docs.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="setup" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="setup">Setup</TabsTrigger>
                <TabsTrigger value="configure">Configure</TabsTrigger>
                <TabsTrigger value="develop">Develop</TabsTrigger>
                <TabsTrigger value="deploy">Deploy</TabsTrigger>
              </TabsList>

              <TabsContent value="setup" className="space-y-6 mt-6">
                <h2 className="text-2xl font-bold">Setting Up Bless CLI</h2>
                <p className="text-muted-foreground">
                  Before you can deploy your API integrations, you need to install and set up the Bless Network CLI.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Step 1: Install the Bless CLI</h3>
                    <p className="mb-4">
                      The Bless CLI is available as an npm package. Install it globally on your system:
                    </p>
                    <CodeBlock code={installCode} language="bash" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Step 2: Create a Bless Network Account</h3>
                    <p className="mb-4">
                      If you don't already have a Bless Network account, visit{" "}
                      <a
                        href="https://bless.network/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        bless.network/signup
                      </a>{" "}
                      to create one.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Step 3: Log in to Bless Network</h3>
                    <p className="mb-4">Use the CLI to log in to your Bless Network account:</p>
                    <CodeBlock code={loginCode} language="bash" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      This will open a browser window where you can authenticate with your Bless Network credentials.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="configure" className="space-y-6 mt-6">
                <h2 className="text-2xl font-bold">Configuring Your Project</h2>
                <p className="text-muted-foreground">
                  After setting up the CLI, you need to initialize and configure your project for deployment.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Step 1: Initialize a New Project</h3>
                    <p className="mb-4">Create a new Bless Network project:</p>
                    <CodeBlock code={initProjectCode} language="bash" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      This creates a new directory with the basic structure for a Bless Network project.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Step 2: Configure API Integrations</h3>
                    <p className="mb-4">Add and configure the APIs you want to use in your project:</p>
                    <CodeBlock code={configureApiCode} language="bash" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      You can add multiple APIs to your project and configure each with its own settings.
                    </p>
                  </div>

                  <div className="not-prose">
                    <Alert>
                      <AlertTitle>Security Note</AlertTitle>
                      <AlertDescription>
                        API keys and other sensitive credentials are securely stored and encrypted by the Bless Network.
                        They are never exposed in your code or deployment.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="develop" className="space-y-6 mt-6">
                <h2 className="text-2xl font-bold">Developing Your API Endpoints</h2>
                <p className="text-muted-foreground">
                  Now that your project is configured, you can develop your API endpoints.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Step 1: Create Endpoint Files</h3>
                    <p className="mb-4">Create files for your API endpoints:</p>
                    <CodeBlock code={createEndpointCode} language="bash" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Step 2: Test Locally</h3>
                    <p className="mb-4">Test your endpoints locally before deploying:</p>
                    <CodeBlock code="# Start the local development server\nbless dev" language="bash" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      This starts a local server at http://localhost:3000 where you can test your endpoints.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Example Endpoint Implementation</h3>
                    <p className="mb-4">Here's an example of a weather API endpoint implementation:</p>
                    <CodeBlock
                      code={`// endpoints/weather.js
module.exports = async (req, res) => {
  try {
    // Get location from query parameter or use default
    const location = req.query.location || 'London';
    
    // Make request to the configured weather API
    const weatherData = await bless.api.request(
      'weather-api', 
      \`/current.json?q=\${encodeURIComponent(location)}\`
    );
    
    // Return the data as JSON
    return res.json({
      success: true,
      location: location,
      weather: weatherData.data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};`}
                      language="javascript"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="deploy" className="space-y-6 mt-6">
                <h2 className="text-2xl font-bold">Deploying Your Project</h2>
                <p className="text-muted-foreground">
                  Once you've developed and tested your API endpoints, you can deploy them to the Bless Network.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Step 1: Deploy Your Project</h3>
                    <p className="mb-4">Deploy your project to the Bless Network:</p>
                    <CodeBlock code={deployCode} language="bash" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      This deploys your project to the Bless Network and provides you with a unique URL.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Step 2: Configure Custom Domain (Optional)</h3>
                    <p className="mb-4">If you want to use a custom domain for your API:</p>
                    <CodeBlock code={customDomainCode} language="bash" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Follow the DNS configuration instructions provided by the CLI to set up your custom domain.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Step 3: Monitor Your Deployment</h3>
                    <p className="mb-4">Monitor the performance and usage of your deployed API:</p>
                    <CodeBlock
                      code="# View logs for your deployment\nbless logs\n\n# View usage statistics\nbless stats"
                      language="bash"
                    />
                  </div>

                  <div className="not-prose">
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>Deployment Complete</AlertTitle>
                      <AlertDescription>
                        Your API is now deployed and available at your Bless Network URL or custom domain. You can
                        continue to update and redeploy your API as needed.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Reference</CardTitle>
                  <CardDescription>Common Bless CLI commands</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Installation</h3>
                    <code className="text-xs bg-muted px-2 py-1 rounded block mt-1">npm install -g @bless/cli</code>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Authentication</h3>
                    <code className="text-xs bg-muted px-2 py-1 rounded block mt-1">bless login</code>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Project Setup</h3>
                    <code className="text-xs bg-muted px-2 py-1 rounded block mt-1">bless init project-name</code>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Local Development</h3>
                    <code className="text-xs bg-muted px-2 py-1 rounded block mt-1">bless dev</code>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Deployment</h3>
                    <code className="text-xs bg-muted px-2 py-1 rounded block mt-1">bless deploy</code>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Helpful links and documentation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <ExternalLink className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <a
                      href="https://docs.bless.network/build-on-bless/introduction"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Bless Network Documentation
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <ExternalLink className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <a
                      href="https://docs.bless.network/build-on-bless/cli/commands"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      CLI Command Reference
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <ExternalLink className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <a
                      href="https://docs.bless.network/build-on-bless/examples"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Example Projects
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <ExternalLink className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <a
                      href="https://discord.gg/yXUWUzQU"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Join Discord Community
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>Get support for your deployment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you're having trouble deploying your API, you can get help from the Bless Network community or
                    support team.
                  </p>
                  <Button asChild className="w-full">
                    <a href="https://discord.com/invite/blessnetwork" target="_blank" rel="noopener noreferrer">
                      Contact Support
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">How much does it cost to deploy on Bless Network?</h3>
              <p className="text-muted-foreground mt-2">
                Bless Network offers a free tier for small projects and paid plans for larger deployments. Visit the{" "}
                <a
                  href="https://bless.network/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  pricing page
                </a>{" "}
                for details.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Can I deploy multiple APIs in one project?</h3>
              <p className="text-muted-foreground mt-2">
                Yes, you can configure and deploy multiple API integrations within a single Bless Network project.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">How do I update my deployed API?</h3>
              <p className="text-muted-foreground mt-2">
                Make your changes locally, test them with{" "}
                <code className="bg-muted px-1 py-0.5 rounded">bless dev</code>, and then run{" "}
                <code className="bg-muted px-1 py-0.5 rounded">bless deploy</code> again to update your deployment.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Is there a limit to the number of requests my API can handle?</h3>
              <p className="text-muted-foreground mt-2">
                Request limits depend on your plan. The free tier includes a generous allocation, and paid plans offer
                higher limits. Bless Network automatically scales to handle traffic spikes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
