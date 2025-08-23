import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"], // pega todos os arquivos TS
  outDir: "dist",
  format: ["esm"],
  dts: false,
  clean: true,
  splitting: true, // permite múltiplos arquivos
  outExtension({ format }) {
    return { js: `.js` };
  },
  skipNodeModulesBundle: true,
  loader: {
    ".yaml": "file",
  },
});
