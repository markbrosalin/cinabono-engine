import type { Issue } from "../core/issue";
import type { ErrResult, OkResult } from "./types";

export const createOkResult = <TValue = void, TIssue extends Issue = Issue>(
    ...args: [TValue] extends [void] ? [] : [TValue]
): OkResult<TValue, TIssue> => {
    if (args.length === 0) {
        return {
            ok: true,
            issues: [],
        } as unknown as OkResult<TValue, TIssue>;
    }

    return {
        ok: true,
        issues: [],
        value: args[0],
    } as unknown as OkResult<TValue, TIssue>;
};

export const createErrResult = <TIssue extends Issue = Issue>(
    issues: TIssue | TIssue[],
): ErrResult<TIssue> => ({
    ok: false,
    issues: Array.isArray(issues) ? issues : [issues],
});
