import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { Terminal } from "lucide-react"

interface BlessCliIntegrationProps {
  apiName: string
  apiBaseUrl: string
  apiEndpoint: string
  authType?: string
  authParam?: string
}

export function BlessCliIntegration({
  apiName,
  apiBaseUrl,
  apiEndpoint,
  authType = "none",
  authParam = "",
}: BlessCliIntegrationProps) {
  // Generate example code for Bless Network CLI integration
  const cliInstallCode = `# Install the Bless Network CLI
npm install -g @bless/cli

# Login to your Bless Network account
bless login`

  const cliConfigCode = `# Create a new Bless API integration
bless api create ${apiName.toLowerCase().replace(/\s+/g, "-")}

# Configure the API endpoint
bless api config set ${apiName.toLowerCase().replace(/\s+/g, "-")} --url "${apiBaseUrl}"`

  const cliAuthCode =
    authType === "none"
      ? "# This API doesn't require authentication"
      : authType === "apiKey"
        ? `# Set your API key
bless api config set ${apiName.toLowerCase().replace(/\s+/g, "-")} --header "X-API-Key: YOUR_API_KEY_HERE"`
        : authType === "bearer"
          ? `# Set your Bearer token
bless api config set ${apiName.toLowerCase().replace(/\s+/g, "-")} --header "Authorization: Bearer YOUR_TOKEN_HERE"`
          : `# Set your authentication parameters
bless api config set ${apiName.toLowerCase().replace(/\s+/g, "-")} --${authParam}`

  const cliUsageCode = `# Make a request to the API
bless api request ${apiName.toLowerCase().replace(/\s+/g, "-")} "${apiEndpoint}"

# Save the response to a file
bless api request ${apiName.toLowerCase().replace(/\s+/g, "-")} "${apiEndpoint}" --output response.json

# Use the response in your application
bless api request ${apiName.toLowerCase().replace(/\s+/g, "-")} "${apiEndpoint}" --pipe "node process-data.js"`

  const nodeIntegrationCode = `// Import the Bless Network SDK
const { BlessAPI } = require('@bless/sdk');

// Initialize the API client
const apiClient = new BlessAPI('${apiName.toLowerCase().replace(/\s+/g, "-")}');

// Make a request to the API
async function fetchData() {
  try {
    const response = await apiClient.request('${apiEndpoint}');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();`

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Integration with Bless Network CLI</h2>

      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Bless Network Integration</AlertTitle>
        <AlertDescription>
          Learn how to integrate this API with the Bless Network CLI for enhanced functionality and easier management.
          The Bless Network CLI allows you to manage API requests, handle authentication, and process responses in a
          standardized way.
        </AlertDescription>
      </Alert>

      <p>
        The{" "}
        <a
          href="https://docs.bless.network/build-on-bless/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Bless Network CLI
        </a>{" "}
        provides a unified interface for working with multiple APIs. Follow these steps to integrate the {apiName} with
        the Bless Network CLI:
      </p>

      <Tabs defaultValue="setup">
        <TabsList>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="node">Node.js Integration</TabsTrigger>
        </TabsList>
        <TabsContent value="setup">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">1. Install and Setup</h3>
            <p>First, install the Bless Network CLI and authenticate with your Bless Network account:</p>
            <CodeBlock code={cliInstallCode} language="bash" />
            <h3 className="text-lg font-semibold mt-6">2. Configure API Integration</h3>
            <p>Create and configure the API integration:</p>
            <CodeBlock code={cliConfigCode} language="bash" />
          </div>
        </TabsContent>
        <TabsContent value="auth">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configure Authentication</h3>
            <p>
              {authType === "none"
                ? "This API doesn't require authentication."
                : `Set up ${authType} authentication for the API:`}
            </p>
            <CodeBlock code={cliAuthCode} language="bash" />
            <p className="text-sm text-muted-foreground mt-4">
              Note: Replace placeholder values with your actual credentials. Your credentials are securely stored in the
              Bless Network CLI configuration.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="usage">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Making API Requests</h3>
            <p>Now you can use the Bless Network CLI to make requests to the {apiName}:</p>
            <CodeBlock code={cliUsageCode} language="bash" />
            <h3 className="text-lg font-semibold mt-6">Advanced Usage</h3>
            <p>
              The Bless Network CLI supports advanced features like request templating, response transformation, and
              integration with other Bless Network services. See the{" "}
              <a
                href="https://docs.bless.network/build-on-bless/cli/advanced"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                advanced documentation
              </a>{" "}
              for more details.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="node">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Node.js SDK Integration</h3>
            <p>
              You can also use the Bless Network SDK in your Node.js applications to interact with the configured API:
            </p>
            <CodeBlock code={nodeIntegrationCode} language="javascript" />
            <p className="text-sm text-muted-foreground mt-4">
              The Bless Network SDK automatically uses the configuration from your CLI setup, making it easy to
              transition between CLI and programmatic usage.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <Alert className="mt-6">
        <AlertTitle>Benefits of Using Bless Network CLI</AlertTitle>
        <AlertDescription>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Unified interface for managing multiple APIs</li>
            <li>Secure credential storage and management</li>
            <li>Simplified request and response handling</li>
            <li>Integration with other Bless Network services</li>
            <li>Consistent error handling across different APIs</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}

// Also export as default for backward compatibility
export default BlessCliIntegration
