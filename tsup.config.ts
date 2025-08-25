import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/bootstrap/server.ts"],
  outDir: "dist",
  format: ["cjs"],
  clean: true,
  dts: false,
  skipNodeModulesBundle: true,
  sourcemap: true,
  minify: false,
  external: ["@prisma/client", "winston", "@/shared/logs/winston"],
  ignoreWatch: ["src/mf-infra"],
  esbuildOptions(options) {
    options.alias = {
      "@": "./src",
    };
  },
});