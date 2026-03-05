import type { UIEngineIssue, UIEngineIssuePath } from "../issue";

export type CatalogValidationPath = UIEngineIssuePath;

export type CatalogValidationIssue = UIEngineIssue;

export type CatalogValidationResult<TSubject extends string = string> = {
    ok: boolean;
    subject: TSubject;
    issues: CatalogValidationIssue[];
};
