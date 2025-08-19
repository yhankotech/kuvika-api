import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/bootstrap/server.ts"],
  outDir: "dist",
  format: ["cjs"], 
  dts: true,
  clean: true,
  outExtension({ format }) {
    return { js: `.js` };
  },  
  skipNodeModulesBundle: true,
  loader: {
    ".yaml": "file",
  },
});