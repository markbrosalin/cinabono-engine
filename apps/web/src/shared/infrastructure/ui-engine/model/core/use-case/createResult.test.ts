import { describe, expect, it } from "vitest";
import type { Issue } from "../issue";
import { createUseCaseErrResult, createUseCaseOkResult } from "./createResult";

describe("createUIEngineUseCaseResult helpers", () => {
    it("creates a success result with no value", () => {
        expect(createUseCaseOkResult()).toEqual({
            ok: true,
            issues: [],
        });
    });

    it("creates a success result with value", () => {
        expect(createUseCaseOkResult({ id: "std" })).toEqual({
            ok: true,
            issues: [],
            value: { id: "std" },
        });
    });

    it("creates a failure result from one issue or an issue array", () => {
        const issue: Issue = {
            code: "test.issue",
            message: "boom",
            path: [],
        };

        expect(createUseCaseErrResult(issue)).toEqual({
            ok: false,
            issues: [issue],
        });
        expect(createUseCaseErrResult([issue])).toEqual({
            ok: false,
            issues: [issue],
        });
    });
});
