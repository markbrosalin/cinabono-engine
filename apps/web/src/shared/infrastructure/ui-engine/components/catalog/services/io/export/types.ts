import type { CatalogQueryService } from "../../query";
import type {
    CatalogExportBundleOptions,
    CatalogExportBundleResult,
    CatalogExportDocumentOptions,
    CatalogExportDocumentResult,
    CatalogExportLibraryOptions,
    CatalogExportLibraryResult,
} from "../types";

export type CatalogExportServiceDeps = {
    query: CatalogQueryService;
};

export type CatalogExportService = {
    exportLibrary: (options: CatalogExportLibraryOptions) => CatalogExportLibraryResult;
    exportBundle: (options: CatalogExportBundleOptions) => CatalogExportBundleResult;
    exportDocument: (options?: CatalogExportDocumentOptions) => CatalogExportDocumentResult;
};
