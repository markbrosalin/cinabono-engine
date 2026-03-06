import type {
    CatalogBundleDocument,
    CatalogDocument,
    CatalogLibraryDocument,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { CatalogExportService } from "./export";
import { CatalogImportService } from "./import";
import { SubjectValueIssuesResult } from "@gately/shared/infrastructure/ui-engine/model";

export type CatalogImportDocumentResult = SubjectValueIssuesResult<"document", CatalogDocument>;
export type CatalogImportLibraryResult = SubjectValueIssuesResult<
    "library",
    CatalogLibraryDocument
>;
export type CatalogImportBundleResult = SubjectValueIssuesResult<"bundle", CatalogBundleDocument>;
export type CatalogExportDocumentResult = SubjectValueIssuesResult<"document", CatalogDocument>;
export type CatalogExportLibraryResult = SubjectValueIssuesResult<
    "library",
    CatalogLibraryDocument
>;
export type CatalogExportBundleResult = SubjectValueIssuesResult<"bundle", CatalogBundleDocument>;

export type CatalogIOService = CatalogExportService & CatalogImportService;
