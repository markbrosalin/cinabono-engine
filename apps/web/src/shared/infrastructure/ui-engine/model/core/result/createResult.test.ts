import { describe, expect, it } from "vitest";
import type { Issue } from "../core/issue";
import { createErrResult, createOkResult } from "./createResult";

describe("createResult helpers", () => {
    it("creates a success result with no value", () => {
        expect(createOkResult()).toEqual({
            ok: true,
            issues: [],
        });
    });

    it("creates a success result with value", () => {
        expect(createOkResult({ id: "std" })).toEqual({
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

        expect(createErrResult(issue)).toEqual({
            ok: false,
            issues: [issue],
        });
        expect(createErrResult([issue])).toEqual({
            ok: false,
            issues: [issue],
        });
    });
});
