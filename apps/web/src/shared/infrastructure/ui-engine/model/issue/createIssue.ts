import type { UIEngineIssue, UIEngineIssueDefinition, UIEngineIssuePath } from "./types";

/**
 * Builds a normalized UI-engine issue from a reusable definition.
 */
export const createUIEngineIssue = <TParams = void>(
    definition: UIEngineIssueDefinition<TParams>,
    path: UIEngineIssuePath,
    ...params: TParams extends void ? [] : [TParams]
): UIEngineIssue => {
    const message =
        typeof definition.message === "function"
            ? definition.message(params[0] as TParams)
            : definition.message;

    return {
        code: definition.code,
        message,
        path,
    };
};
