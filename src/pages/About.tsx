
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Bug, Link } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About MCP Server Inspector</h1>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-purple-500" /> Project Overview
              </CardTitle>
              <CardDescription>
                A tool for developers to test Machine Comprehension and Processing servers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                MCP Server Inspector is an open-source tool designed to help developers test and validate MCP 
                servers before integration into their applications. It allows for quick verification of server 
                connectivity, functionality testing, and response validation.
              </p>
              <p>
                This project was created to solve a common challenge: ensuring that MCP servers are correctly 
                configured and responsive before integrating them into production applications. By providing 
                a simple interface for testing, we aim to streamline the development process and reduce integration issues.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-purple-500" /> Features & Capabilities
              </CardTitle>
              <CardDescription>
                What the MCP Server Inspector can do for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Test connectivity to MCP servers using installation codes</li>
                <li>Validate server responses and functionality</li>
                <li>Display detailed error messages for troubleshooting</li>
                <li>Support for various MCP server providers, including Smithery</li>
                <li>Easy-to-understand test results with copy functionality</li>
                <li>Advanced configuration options for direct server testing</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5 text-purple-500" /> Resources
              </CardTitle>
              <CardDescription>
                Additional resources and related projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium">GitHub Repository</h3>
                  <p className="text-sm text-muted-foreground">
                    View the source code and contribute to the project
                  </p>
                  <a 
                    href="https://github.com/yourusername/mcp-server-inspector"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-500 hover:underline"
                  >
                    github.com/yourusername/mcp-server-inspector
                  </a>
                </div>
                
                <div>
                  <h3 className="font-medium">Smithery</h3>
                  <p className="text-sm text-muted-foreground">
                    Marketplace for MCP servers with many integration options
                  </p>
                  <a 
                    href="https://smithery.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-500 hover:underline"
                  >
                    smithery.ai
                  </a>
                </div>
                
                <div>
                  <h3 className="font-medium">Sequential Thinking MCP</h3>
                  <p className="text-sm text-muted-foreground">
                    An example MCP server that demonstrates sequential thinking capabilities
                  </p>
                  <a 
                    href="https://smithery.ai/server/@smithery-ai/server-sequential-thinking"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-500 hover:underline"
                  >
                    smithery.ai/server/@smithery-ai/server-sequential-thinking
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;
