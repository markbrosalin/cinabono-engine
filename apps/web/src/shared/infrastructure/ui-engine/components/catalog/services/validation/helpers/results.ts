import type {
    CatalogValidationIssue,
    CatalogValidationResult,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";

export const createValidationResult = <TSubject extends string>(
    subject: TSubject,
): CatalogValidationResult<TSubject> => ({
    ok: true,
    subject,
    issues: [],
});

export const pushIssues = (
    result: CatalogValidationResult,
    issues: CatalogValidationIssue | CatalogValidationIssue[],
): void => {
    const array = Array.isArray(issues) ? issues : [issues];
    if (array.length === 0) return;

    result.ok = false;
    result.issues = [...result.issues, ...array];
};

export const prefixIssues = (
    issues: CatalogValidationIssue[],
    prefix: Array<string | number>,
): CatalogValidationIssue[] => {
    return issues.map((issue) => ({
        ...issue,
        path: [...prefix, ...issue.path],
    }));
};
