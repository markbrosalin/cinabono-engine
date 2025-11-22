import globals from "globals";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    prettierConfig,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },
        rules: {
            "@typescript-eslint/no-empty-object-type": "off",
            "no-console": "warn",
            "no-debugger": "warn",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    },
    {
        files: ["packages/di/**/*.ts"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
        },
    }
);
