
import { useState } from "react";
import Layout from "@/components/Layout";
import McpConfigInput from "@/components/mcp/McpConfigInput";
import TestResults from "@/components/mcp/TestResults";
import { McpConfig, McpTestResult, testMcpServer } from "@/services/mcpService";
import { toast } from "sonner";

const Index = () => {
  const [testResults, setTestResults] = useState<McpTestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async (config: McpConfig) => {
    try {
      setIsLoading(true);
      setTestResults(null);
      
      // Add a small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const results = await testMcpServer(config);
      setTestResults(results);
      
      if (results.success) {
        toast.success("MCP server test completed successfully");
      } else {
        toast.error("MCP server test failed", {
          description: results.errorMessage || "See test results for details",
        });
      }
    } catch (error) {
      console.error("Test error:", error);
      toast.error("Test failed", { 
        description: error instanceof Error ? error.message : "An unexpected error occurred" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8 max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">MCP Server Inspector</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Test your MCP server configuration before integration. Verify connectivity,
            functionality, and inspect response formats with ease.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <McpConfigInput onTest={handleTest} isLoading={isLoading} />
          </div>
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full border-4 border-t-purple-500 border-purple-200 animate-spin" />
                  <p className="mt-4 text-sm text-muted-foreground">Testing MCP server...</p>
                </div>
              </div>
            ) : testResults ? (
              <TestResults results={testResults} />
            ) : (
              <div className="flex items-center justify-center h-full border rounded-lg border-dashed p-8">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Test results will appear here after you submit your MCP server configuration.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
