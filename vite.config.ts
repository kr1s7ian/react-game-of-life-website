import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
/// <reference types="vitest" />

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react-game-of-life-website",
  plugins: [react()],
  test: {
    environment: "happy-dom",
  },
});
