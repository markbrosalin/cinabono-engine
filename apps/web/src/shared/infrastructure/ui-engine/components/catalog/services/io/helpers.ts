import type {
    CatalogValidationIssue,
    CatalogValidationResult,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { CatalogIOResult } from "./types";

/** Clones serializable catalog payloads before crossing the IO boundary. */
export const cloneCatalogValue = <TValue>(value: TValue): TValue =>
    JSON.parse(JSON.stringify(value)) as TValue;

/** Creates a normalized IO result for import/export operations. */
export const createCatalogIOResult = <TSubject extends string, TValue>(
    subject: TSubject,
    value?: TValue,
    issues: CatalogValidationIssue[] = [],
): CatalogIOResult<TSubject, TValue> => {
    const base: CatalogValidationResult<TSubject> = {
        ok: issues.length === 0,
        subject,
        issues,
    };

    if (value === undefined) {
        return base;
    }

    return {
        ...base,
        value,
    };
};

/** Prefixes nested IO issues with the parent path. */
export const prefixCatalogIOIssues = (
    issues: CatalogValidationIssue[],
    prefix: Array<string | number>,
): CatalogValidationIssue[] =>
    issues.map((issue) => ({
        ...issue,
        path: [...prefix, ...issue.path],
    }));
