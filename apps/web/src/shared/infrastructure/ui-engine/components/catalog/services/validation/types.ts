import type {
    CatalogItem,
    CatalogItemRef,
    CatalogLibraryDocument,
    CatalogDocument,
    CatalogValidationResult,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";

export type CatalogValidationService = {
    validateRef: (ref: CatalogItemRef) => CatalogValidationResult<"ref">;
    validateItem: (item: CatalogItem) => CatalogValidationResult<"item">;
    validateLibrary: (library: CatalogLibraryDocument) => CatalogValidationResult<"library">;
    validateDocument: (document: CatalogDocument) => CatalogValidationResult<"document">;
};
