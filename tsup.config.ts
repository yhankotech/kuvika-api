import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/bootstrap/server.ts"],
  outDir: "dist",
  format: ["esm"], 
  dts: false,
  clean: true,
  outExtension({ format }) {
    return { js: `.js` };
  },  
  skipNodeModulesBundle: true,
  loader: {
    ".yaml": "file",
  }
});