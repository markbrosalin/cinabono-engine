import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    test: {
        include: ["src/**/__tests__/**/*.test.ts"],
        environment: "node",
        globals: true,
    },
    plugins: [tsconfigPaths()],
});
