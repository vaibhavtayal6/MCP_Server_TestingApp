
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { McpConfig, parseInstallationCode } from "@/services/mcpService";
import { Input } from "@/components/ui/input";

interface McpConfigInputProps {
  onTest: (config: McpConfig) => void;
  isLoading: boolean;
}

const McpConfigInput: React.FC<McpConfigInputProps> = ({ onTest, isLoading }) => {
  const [installationCode, setInstallationCode] = useState("");
  const [advancedMode, setAdvancedMode] = useState(false);
  const [serverUrl, setServerUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleTest = () => {
    let config: McpConfig;
    
    if (advancedMode) {
      config = {
        serverUrl,
        apiKey,
      };
    } else {
      config = parseInstallationCode(installationCode);
    }
    
    onTest(config);
  };

  const handleAdvancedModeToggle = () => {
    if (!advancedMode && installationCode) {
      // When switching to advanced mode, try to pre-fill fields from installation code
      const parsedConfig = parseInstallationCode(installationCode);
      setServerUrl(parsedConfig.serverUrl || '');
      setApiKey(parsedConfig.apiKey || '');
    }
    setAdvancedMode(!advancedMode);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>MCP Server Configuration</CardTitle>
        <CardDescription>
          Enter your MCP server installation code from marketplaces like Smithery, or manually configure connection details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!advancedMode ? (
          <div className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="installation-code">Installation Code</Label>
              <Textarea
                id="installation-code"
                placeholder="Paste your MCP server installation code here..."
                className="min-h-[120px] resize-y"
                value={installationCode}
                onChange={(e) => setInstallationCode(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="server-url">Server URL</Label>
              <Input
                id="server-url"
                placeholder="https://your-mcp-server.com"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
              />
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="api-key">API Key (if required)</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="mt-4 text-sm">
          <Button
            variant="ghost"
            className="h-auto p-0 text-muted-foreground underline"
            onClick={handleAdvancedModeToggle}
          >
            {advancedMode ? "Use installation code" : "Advanced configuration"}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleTest}
          disabled={isLoading || (advancedMode ? !serverUrl : !installationCode)}
        >
          {isLoading ? "Testing..." : "Test MCP Server"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default McpConfigInput;
