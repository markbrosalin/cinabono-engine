import type {
    CatalogDocument,
    CatalogItem,
    CatalogItemKind,
    CatalogItemModuleType,
    CatalogItemRef,
    CatalogLibraryDocument,
    CatalogLibrarySummary,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";

export type CatalogQueryService = {
    document: () => CatalogDocument;
    libraries: () => CatalogLibraryDocument[];
    librarySummaries: () => CatalogLibrarySummary[];
    getLibrary: (libraryId: string) => CatalogLibraryDocument | undefined;
    hasLibrary: (libraryId: string) => boolean;
    getLibraryItems: (libraryId: string) => CatalogItem[];
    getItem: (ref: CatalogItemRef) => CatalogItem | undefined;
    hasItem: (ref: CatalogItemRef) => boolean;
    findItemsByKind: (kind: CatalogItemKind) => CatalogItem[];
    findItemsByModuleType: (moduleType: CatalogItemModuleType) => CatalogItem[];
};
