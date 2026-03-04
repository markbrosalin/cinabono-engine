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
    bundleLibraryDuplicate: {
        code: "catalog.io.import.bundle.library.duplicate",
        message: "Bundle contains duplicate library ids.",
    },
    bundleItemDuplicateRef: {
        code: "catalog.io.import.bundle.item.duplicate-ref",
        message: "Bundle contains duplicate item refs.",
    },
    bundleDependencyMissing: {
        code: "catalog.io.import.bundle.dependency.missing",
        message: "A dependency required by bundle roots is missing in the bundle payload.",
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
    bundleLibraryDuplicate: (index: number, libraryId: string) =>
        createCatalogValidationIssue(
            {
                ...catalogImportIssueDefs.bundleLibraryDuplicate,
                message: `Bundle contains duplicate library id "${libraryId}".`,
            },
            ["libraries", index, "manifest", "id"],
        ),
    bundleItemDuplicateRef: (path: Array<string | number>, refKey: string) =>
        createCatalogValidationIssue(
            {
                ...catalogImportIssueDefs.bundleItemDuplicateRef,
                message: `Bundle contains duplicate item ref "${refKey}".`,
            },
            path,
        ),
    bundleDependencyMissing: (path: Array<string | number>) =>
        createCatalogValidationIssue(catalogImportIssueDefs.bundleDependencyMissing, path),
} as const;
