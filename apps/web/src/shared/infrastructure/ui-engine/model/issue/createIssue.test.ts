import { describe, expect, it } from "vitest";
import { createUIEngineIssue } from "./createIssue";

describe("createUIEngineIssue", () => {
    it("creates issue from static message definition", () => {
        const issue = createUIEngineIssue(
            {
                code: "ui-engine.test.static",
                message: "Static issue message.",
            },
            ["field"],
        );

        expect(issue).toEqual({
            code: "ui-engine.test.static",
            message: "Static issue message.",
            path: ["field"],
        });
    });

    it("creates issue from parametrized message definition", () => {
        const issue = createUIEngineIssue(
            {
                code: "ui-engine.test.dynamic",
                message: ({ value }: { value: string }) => `Invalid value "${value}".`,
            },
            ["field"],
            { value: "abc" },
        );

        expect(issue).toEqual({
            code: "ui-engine.test.dynamic",
            message: 'Invalid value "abc".',
            path: ["field"],
        });
    });
});
