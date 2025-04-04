
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, X, Copy, ArrowRight, AlertCircle } from "lucide-react";
import { McpTestResult } from "@/services/mcpService";
import { toast } from "sonner";
import { useState } from "react";

interface TestResultsProps {
  results: McpTestResult | null;
}

const TestResults: React.FC<TestResultsProps> = ({ results }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  if (!results) return null;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const copyResults = () => {
    const resultText = JSON.stringify(results, null, 2);
    navigator.clipboard.writeText(resultText);
    toast.success("Results copied to clipboard");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Test Results</CardTitle>
          <Badge variant={results.success ? "default" : "destructive"}>
            {results.success ? "Passed" : "Failed"}
          </Badge>
        </div>
        <CardDescription>
          Results from testing your MCP server configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Connection</h3>
            {results.connectionStatus === "connected" ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800">
                <Check className="mr-1 h-3 w-3" /> Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800">
                <X className="mr-1 h-3 w-3" /> Failed
              </Badge>
            )}
          </div>
          {results.responseTime !== undefined && (
            <p className="text-xs text-muted-foreground">
              Response time: {results.responseTime}ms
            </p>
          )}
        </div>

        {results.serverInfo && (
          <>
            <Separator />
            <div className="space-y-2">
              <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={() => toggleSection('serverInfo')}
              >
                <h3 className="text-sm font-medium">Server Information</h3>
                <ArrowRight className={`h-4 w-4 transition-transform ${expandedSections.includes('serverInfo') ? 'rotate-90' : ''}`} />
              </div>
              {expandedSections.includes('serverInfo') && (
                <div className="p-3 bg-secondary/50 rounded-md text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Name:</span>
                    <span>{results.serverInfo.name || 'Not available'}</span>
                    <span className="text-muted-foreground">Version:</span>
                    <span>{results.serverInfo.version || 'Not available'}</span>
                    <span className="text-muted-foreground">Description:</span>
                    <span>{results.serverInfo.description || 'Not available'}</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {results.functionalityTest && (
          <>
            <Separator />
            <div className="space-y-2">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('functionalityTest')}
              >
                <h3 className="text-sm font-medium">Functionality Test</h3>
                <div className="flex items-center gap-2">
                  {results.functionalityTest.success ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800">
                      <Check className="mr-1 h-3 w-3" /> Passed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800">
                      <X className="mr-1 h-3 w-3" /> Failed
                    </Badge>
                  )}
                  <ArrowRight className={`h-4 w-4 transition-transform ${expandedSections.includes('functionalityTest') ? 'rotate-90' : ''}`} />
                </div>
              </div>
              {expandedSections.includes('functionalityTest') && (
                <div className="p-3 bg-secondary/50 rounded-md text-xs max-h-[300px] overflow-y-auto">
                  {results.functionalityTest.error ? (
                    <div className="text-red-600 dark:text-red-400">
                      <AlertCircle className="inline-block mr-1 h-3 w-3" />
                      Error: {results.functionalityTest.error}
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(results.functionalityTest.response, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {results.errorMessage && (
          <>
            <Separator />
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-red-600 dark:text-red-400">Error</h3>
              <p className="text-xs">{results.errorMessage}</p>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={copyResults} className="w-full">
          <Copy className="mr-2 h-4 w-4" /> Copy Results
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestResults;
