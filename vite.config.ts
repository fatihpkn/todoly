import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import tsconfigPaths from "vite-tsconfig-paths";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";

export default defineConfig({
  assetsInclude: "./public",
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  plugins: [
    tsconfigPaths(),
    react(),
    // Additional legcay() plugin for support IE11
    // legacy({
    //   targets: ["defaults", "ie 9-11"],
    //   additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    // }),
    visualizer(),
  ],
  envDir: "./",
  envPrefix: "TODOLY_",
});
