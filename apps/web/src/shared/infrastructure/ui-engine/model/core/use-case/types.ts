import type { Issue } from "../issue/types";
import type { ErrResult, OkResult, Result } from "../../result";

export type UseCaseOkResult<TValue = void, TIssue extends Issue = Issue> = OkResult<TValue, TIssue>;

export type UseCaseErrResult<TIssue extends Issue = Issue> = ErrResult<TIssue>;

export type UseCaseResult<TValue = void, TIssue extends Issue = Issue> = Result<TValue, TIssue>;

export type UseCase<TInput = void, TResult = void> = [TInput] extends [void]
    ? () => TResult
    : (input: TInput) => TResult;

export type AsyncUseCase<TInput = void, TResult = void> = [TInput] extends [void]
    ? () => Promise<TResult>
    : (input: TInput) => Promise<TResult>;
