import type { Issue } from "../issue";
import type { SubjectIssuesResult } from "../result";

export type CatalogValidationResult<TSubject extends string = string> = SubjectIssuesResult<
    TSubject,
    Issue
>;
