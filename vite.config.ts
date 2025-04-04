import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  // Remove the server configuration as Vercel will handle this
  base: '/',
  plugins: [react()],
  build: {
    sourcemap: true,
    outDir: 'dist'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
