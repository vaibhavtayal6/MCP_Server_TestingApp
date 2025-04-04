
import { toast } from "sonner";
import axios from "axios";

export interface McpTestResult {
  success: boolean;
  connectionStatus: 'connected' | 'failed';
  responseTime?: number;
  serverInfo?: {
    version?: string;
    name?: string;
    description?: string;
  };
  functionalityTest?: {
    success: boolean;
    response?: any;
    error?: string;
  };
  errorMessage?: string;
}

export interface McpConfig {
  serverUrl: string;
  apiKey?: string;
  installationCode?: string;
}

const testConnection = async (config: McpConfig): Promise<boolean> => {
  try {
    // Validate URL format first
    const url = new URL(config.serverUrl);
    
    // Try to connect to the server with a timeout of 5 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    // Add headers if API key is provided
    const headers: Record<string, string> = {};
    if (config.apiKey) {
      headers['Authorization'] = `Bearer ${config.apiKey}`;
    }
    
    // Attempt to connect to the server
    const response = await axios.get(`${config.serverUrl}/health`, {
      headers,
      signal: controller.signal,
      validateStatus: (status) => status < 500, // Accept any non-server error response
    }).catch(error => {
      // If we get a 404 on health, try the root endpoint
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return axios.get(config.serverUrl, {
          headers,
          signal: controller.signal,
          validateStatus: (status) => status < 500,
        });
      }
      throw error;
    });
    
    clearTimeout(timeoutId);
    
    // Consider any response (even 4xx) as "connected" since it means the server is running
    // We're just checking if the server is online
    return true;
  } catch (error) {
    console.error("Connection test failed:", error);
    return false;
  }
};

const testFunctionality = async (config: McpConfig): Promise<any> => {
  try {
    // Prepare headers if API key is provided
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (config.apiKey) {
      headers['Authorization'] = `Bearer ${config.apiKey}`;
    }
    
    // Test with a simple prompt to see if the server responds appropriately
    const testPayload = {
      prompt: "Hello, this is a test message to verify MCP functionality.",
      max_tokens: 50
    };
    
    // Attempt to make a POST request to the server
    const response = await axios.post(`${config.serverUrl}/completions`, testPayload, {
      headers,
      timeout: 10000,
    }).catch(async (error) => {
      // If completions endpoint fails, try the standard /v1/completions endpoint
      if (axios.isAxiosError(error)) {
        return await axios.post(`${config.serverUrl}/v1/completions`, testPayload, {
          headers,
          timeout: 10000,
        });
      }
      throw error;
    });
    
    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    console.error("Functionality test failed:", error);
    
    // Provide more detailed error information
    let errorMessage = "Unknown error occurred during functionality test";
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        errorMessage = `Server responded with error: ${error.response.status} - ${error.response.statusText}`;
        if (error.response.data) {
          errorMessage += `\nDetails: ${JSON.stringify(error.response.data)}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response received from server. Server might be unreachable or not running.";
      } else {
        // Something happened in setting up the request
        errorMessage = `Error setting up request: ${error.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const testMcpServer = async (config: McpConfig): Promise<McpTestResult> => {
  try {
    // Step 1: Validate the configuration
    if (!config.serverUrl) {
      throw new Error("Server URL is required");
    }
    
    // Clean up the URL - remove trailing slashes
    config.serverUrl = config.serverUrl.trim().replace(/\/+$/, "");
    
    // Step 2: Test connection with actual HTTP request
    const startTime = performance.now();
    const connectionSuccess = await testConnection(config);
    const endTime = performance.now();
    const responseTime = Math.round(endTime - startTime);
    
    if (!connectionSuccess) {
      return {
        success: false,
        connectionStatus: "failed",
        responseTime,
        errorMessage: "Could not establish connection to the MCP server. The server might be offline or the URL is incorrect.",
      };
    }
    
    // Step 3: Test functionality
    const functionTest = await testFunctionality(config);
    
    // Step 4: Return comprehensive results
    return {
      success: functionTest.success,
      connectionStatus: "connected",
      responseTime,
      serverInfo: {
        name: extractServerName(config.serverUrl),
        version: functionTest.response?.model || "Unknown",
        description: "MCP server is responding to requests",
      },
      functionalityTest: functionTest,
    };
  } catch (error) {
    console.error("MCP server test failed:", error);
    toast.error("Test failed", { 
      description: error instanceof Error ? error.message : "Unknown error occurred" 
    });
    
    return {
      success: false,
      connectionStatus: "failed",
      errorMessage: error instanceof Error ? error.message : "Unknown error occurred during testing",
    };
  }
};

// Helper function to extract a friendly server name from URL
const extractServerName = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch {
    return "MCP Server";
  }
};

export const parseInstallationCode = (code: string): McpConfig => {
  try {
    // For now, we'll implement a simple parser that looks for URLs
    const urlMatch = code.match(/(https?:\/\/[^\s]+)/);
    if (urlMatch) {
      return {
        serverUrl: urlMatch[0],
        installationCode: code,
      };
    }

    // If no URL found, check if it's a JSON
    try {
      const parsed = JSON.parse(code);
      return {
        serverUrl: parsed.serverUrl || parsed.url || '',
        apiKey: parsed.apiKey || parsed.key || '',
        installationCode: code,
      };
    } catch {
      // Not JSON, try to extract keys
      const apiKeyMatch = code.match(/api[-_]?key[=:]\s*["']?([^"'\s]+)/i);
      const urlMatch = code.match(/server[-_]?url[=:]\s*["']?([^"'\s]+)/i);
      
      return {
        serverUrl: urlMatch?.[1] || '',
        apiKey: apiKeyMatch?.[1] || '',
        installationCode: code,
      };
    }
  } catch (error) {
    console.error("Failed to parse installation code:", error);
    return {
      serverUrl: '',
      installationCode: code,
    };
  }
};
