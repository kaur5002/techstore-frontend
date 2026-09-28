import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({ test: { environment: "jsdom", setupFiles: ["./tests/setup.ts"], include: ["tests/**/*.test.tsx"], maxWorkers: 1, fileParallelism: false, isolate: false }, resolve: { alias: { "@": root } } });
