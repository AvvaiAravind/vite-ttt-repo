import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  // build
  build: {
    sourcemap: true, // Helpful for debugging production
  },

  //server
  server: {
    port: 5173, // Optional: set custom port
    open: true, // Optional: auto-open browser
  },

  // alias path
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
