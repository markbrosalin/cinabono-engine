export type UIEngineIssuePath = Array<string | number>;

export type UIEngineIssue = {
    code: string;
    message: string;
    path: UIEngineIssuePath;
};

export type UIEngineIssueDefinition<TParams = void> = {
    code: string;
    message: string | ((params: TParams) => string);
};
