import { createCatalogValidationIssue } from "../../../helpers/createValidationIssue";

export const catalogImportIssueDefs = {
    bundleFormatVersionInvalid: {
        code: "catalog.io.import.bundle.format-version.invalid",
        message: "Unsupported bundle format version.",
    },
    bundleRootRefsRequired: {
        code: "catalog.io.import.bundle.root-refs.required",
        message: "At least one rootRef is required to import a bundle.",
    },
    bundleRootMissing: {
        code: "catalog.io.import.bundle.root.missing",
        message: "A rootRef could not be resolved inside the bundle.",
    },
} as const;

export const catalogImportIssues = {
    bundleFormatVersionInvalid: (value: unknown) =>
        createCatalogValidationIssue(
            {
                ...catalogImportIssueDefs.bundleFormatVersionInvalid,
                message: `Unsupported bundle format version "${String(value)}".`,
            },
            ["formatVersion"],
        ),
    bundleRootRefsRequired: () =>
        createCatalogValidationIssue(catalogImportIssueDefs.bundleRootRefsRequired, ["rootRefs"]),
    bundleRootMissing: (index: number) =>
        createCatalogValidationIssue(catalogImportIssueDefs.bundleRootMissing, ["rootRefs", index]),
} as const;
