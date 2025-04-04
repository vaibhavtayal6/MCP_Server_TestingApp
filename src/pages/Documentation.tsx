
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, Info, Bug, Search, Link, Settings } from "lucide-react";

const Documentation = () => {
  return (
    <Layout>
      <div className="container py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Documentation</h1>

        <Tabs defaultValue="usage" className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-500" /> Getting Started
                </CardTitle>
                <CardDescription>
                  How to use the MCP Server Inspector
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. Enter Your MCP Configuration</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    You have two options for configuring the MCP server:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <strong>Installation Code:</strong> Paste the full installation code from your MCP server provider (like Smithery).
                    </li>
                    <li>
                      <strong>Advanced Configuration:</strong> Manually enter the server URL and API key if you have them directly.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2. Run the Test</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Click the "Test MCP Server" button to run the test suite against your server. The system will:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Check connectivity to your MCP server</li>
                    <li>Verify the server's response format</li>
                    <li>Test basic functionality</li>
                    <li>Collect and display performance metrics</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">3. Review Results</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    The test results are displayed in an easy-to-read format, showing:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Connection status (success or failure)</li>
                    <li>Server information (when available)</li>
                    <li>Functionality test results</li>
                    <li>Any error messages or warnings</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    You can expand sections for more details and copy the results to share or document them.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-500" /> Using with Smithery MCPs
                </CardTitle>
                <CardDescription>
                  Specific instructions for testing Smithery MCP servers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Smithery is a popular marketplace for MCP servers. Here's how to test a Smithery MCP:
                </p>

                <div className="space-y-2">
                  <h3 className="text-md font-medium">Find Your MCP Server</h3>
                  <p className="text-sm text-muted-foreground">
                    Visit the Smithery marketplace at <a href="https://smithery.ai" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">smithery.ai</a> and navigate to your chosen MCP server.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-md font-medium">Copy the Installation Code</h3>
                  <p className="text-sm text-muted-foreground">
                    Look for an "Installation" or "Integration" section on the MCP server's page. Copy the provided code.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-md font-medium">Paste into MCP Server Inspector</h3>
                  <p className="text-sm text-muted-foreground">
                    Return to the MCP Server Inspector, paste the code into the Installation Code field, and run the test.
                  </p>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Example MCP Server</AlertTitle>
                  <AlertDescription>
                    Try testing the Sequential Thinking MCP at <a href="https://smithery.ai/server/@smithery-ai/server-sequential-thinking" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">smithery.ai/server/@smithery-ai/server-sequential-thinking</a>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-purple-500" /> Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-1">What is an MCP server?</h3>
                  <p className="text-sm text-muted-foreground">
                    MCP (Machine Comprehension and Processing) servers are specialized servers that provide AI capabilities through standardized interfaces.
                    They allow developers to integrate advanced AI functionality into their applications without having to build the AI systems themselves.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Is my MCP server data secure when using this tool?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes. The MCP Server Inspector runs all tests in your browser and doesn't store your API keys or server configurations.
                    No data is sent to our servers during testing.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Can I test any MCP server with this tool?</h3>
                  <p className="text-sm text-muted-foreground">
                    This tool is designed to work with MCP servers that follow the standard MCP protocol.
                    It has been specifically tested with Smithery MCPs but should work with other providers that use similar formats.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-1">What information should I include when reporting issues?</h3>
                  <p className="text-sm text-muted-foreground">
                    Please include the error message, the type of MCP server you're testing (without sharing private API keys),
                    and any specific steps to reproduce the issue.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="troubleshooting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5 text-purple-500" /> Common Issues & Solutions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-1">Connection Failed</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    If your connection test fails, try these steps:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Verify that the server URL is correct and includes the proper protocol (http:// or https://)</li>
                    <li>Check if the MCP server requires authentication and that your API key is valid</li>
                    <li>Ensure your network can reach the server (it may be behind a firewall or VPN)</li>
                    <li>Try accessing the server URL directly in your browser to see if it's online</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Invalid Installation Code</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    If your installation code isn't being recognized:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Make sure you've copied the entire code from your provider</li>
                    <li>Check for extra spaces or line breaks that may have been included</li>
                    <li>Try using the Advanced Configuration option to enter the URL and API key manually</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Functionality Test Failed</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    If the functionality test fails but connection succeeds:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Check if your MCP server requires specific parameters in requests</li>
                    <li>Verify that your API key has the proper permissions for the operations being tested</li>
                    <li>Review the server's documentation for any specific requirements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Still Having Issues?</h3>
                  <p className="text-sm text-muted-foreground">
                    If you're still experiencing problems, consider opening an issue on our GitHub repository with details 
                    about the specific error and the MCP server you're trying to test. This helps us improve the tool for everyone.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Documentation;
