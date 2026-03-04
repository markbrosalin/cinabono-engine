import { CatalogValidationPath, CatalogValidationIssue } from "../../../model/catalog";

/**
 * Creates a normalized catalog validation issue from a reusable definition.
 */
export const createCatalogValidationIssue = (
    definition: {
        code: string;
        message: string;
    },
    path: CatalogValidationPath,
): CatalogValidationIssue => ({
    code: definition.code,
    message: definition.message,
    path,
});
