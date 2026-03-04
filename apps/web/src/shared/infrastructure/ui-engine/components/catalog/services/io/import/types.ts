import type {
    CatalogBundleDocument,
    CatalogDocument,
    CatalogLibraryDocument,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { CatalogValidationService } from "../../validation";
import type {
    CatalogImportDocumentResult,
    CatalogImportBundleResult,
    CatalogImportLibraryResult,
    CatalogImportOptions,
} from "../types";

export type CatalogImportServiceDeps = {
    validation: CatalogValidationService;
};

export type CatalogImportService = {
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
};
