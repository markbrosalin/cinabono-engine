import { createCatalogValidationIssue } from "../../../helpers/createValidationIssue";

export const catalogExportIssueDefs = {
    libraryIdRequired: {
        code: "catalog.io.export.library-id.required",
        message: "libraryId is required to export a library.",
    },
    libraryNotFound: {
        code: "catalog.io.export.library.not-found",
        message: "The requested library was not found.",
    },
    bundleRootRefsRequired: {
        code: "catalog.io.export.bundle.root-refs.required",
        message: "At least one rootRef is required to export a bundle.",
    },
    bundleRootNotFound: {
        code: "catalog.io.export.bundle.root.not-found",
        message: "A rootRef could not be resolved in the catalog.",
    },
    bundleDependencyNotFound: {
        code: "catalog.io.export.bundle.dependency.not-found",
        message: "A dependency ref could not be resolved in the catalog.",
    },
} as const;

export const catalogExportIssues = {
    libraryIdRequired: () =>
        createCatalogValidationIssue(catalogExportIssueDefs.libraryIdRequired, ["libraryId"]),
    libraryNotFound: (libraryId: string) =>
        createCatalogValidationIssue(
            {
                ...catalogExportIssueDefs.libraryNotFound,
                message: `Library "${libraryId}" was not found.`,
            },
            ["libraryId"],
        ),
    bundleRootRefsRequired: () =>
        createCatalogValidationIssue(catalogExportIssueDefs.bundleRootRefsRequired, ["rootRefs"]),
    bundleRootNotFound: (index: number) =>
        createCatalogValidationIssue(catalogExportIssueDefs.bundleRootNotFound, [
            "rootRefs",
            index,
        ]),
    bundleDependencyNotFound: (refPath: Array<string | number>) =>
        createCatalogValidationIssue(catalogExportIssueDefs.bundleDependencyNotFound, refPath),
} as const;
