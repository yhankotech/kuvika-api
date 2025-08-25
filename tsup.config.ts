import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  outDir: "dist",
  format: ["cjs"],
  clean: true,
  dts: true,
  skipNodeModulesBundle: true,
  sourcemap: true,
  minify: false,
  external: ["@prisma/client", "winston", "@/shared/logs/winston"],
  ignoreWatch: ["src/mf-infra", "src/@types"],
  esbuildOptions(options) {
    options.alias = {
      "@": "./src",
    };
  },
});