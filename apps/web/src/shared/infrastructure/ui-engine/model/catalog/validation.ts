import type { Issue } from "../core/issue";
import type { SubjectIssuesResult } from "../result";

export type CatalogValidationResult<TSubject extends string = string> = SubjectIssuesResult<
    TSubject,
    Issue
>;
