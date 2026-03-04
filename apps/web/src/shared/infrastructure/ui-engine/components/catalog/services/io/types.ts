import type {
    CatalogBundleDocument,
    CatalogDocument,
    CatalogLibraryDocument,
    CatalogValidationResult,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";

export type CatalogImportOptions = {};

export type CatalogExportDocumentOptions = {};

export type CatalogExportLibraryOptions = {
    libraryId: string;
};

export type CatalogExportBundleOptions = {
    rootRefs: CatalogBundleDocument["rootRefs"];
};

export type CatalogIOResult<TSubject extends string, TValue> = CatalogValidationResult<TSubject> & {
    value?: TValue;
};

export type CatalogImportDocumentResult = CatalogIOResult<"document", CatalogDocument>;

export type CatalogImportLibraryResult = CatalogIOResult<"library", CatalogLibraryDocument>;

export type CatalogImportBundleResult = CatalogIOResult<"bundle", CatalogBundleDocument>;

export type CatalogExportDocumentResult = CatalogIOResult<"document", CatalogDocument>;

export type CatalogExportLibraryResult = CatalogIOResult<"library", CatalogLibraryDocument>;

export type CatalogExportBundleResult = CatalogIOResult<"bundle", CatalogBundleDocument>;

export type CatalogIOService = {
    importLibrary: (
        library: CatalogLibraryDocument,
        options?: CatalogImportOptions,
    ) => CatalogImportLibraryResult;
    importDocument: (
        document: CatalogDocument,
        options?: CatalogImportOptions,
    ) => CatalogImportDocumentResult;
    importBundle: (
        bundle: CatalogBundleDocument,
        options?: CatalogImportOptions,
    ) => CatalogImportBundleResult;
    exportLibrary: (options: CatalogExportLibraryOptions) => CatalogExportLibraryResult;
    exportBundle: (options: CatalogExportBundleOptions) => CatalogExportBundleResult;
    exportDocument: (options?: CatalogExportDocumentOptions) => CatalogExportDocumentResult;
};
