import type { Issue } from "../../../issue";
import { createErrResult, createOkResult } from "../../../result";
import type { UseCaseErrResult, UseCaseOkResult } from "./types";

export const createUseCaseOkResult = <TValue = void, TIssue extends Issue = Issue>(
    ...args: [TValue] extends [void] ? [] : [TValue]
): UseCaseOkResult<TValue, TIssue> =>
    createOkResult<TValue, TIssue>(...args) as UseCaseOkResult<TValue, TIssue>;

export const createUseCaseErrResult = <TIssue extends Issue = Issue>(
    issues: TIssue | TIssue[],
): UseCaseErrResult<TIssue> => createErrResult(issues);
