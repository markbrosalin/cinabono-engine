import type {
    CatalogDocument,
    CatalogItemKind,
    CatalogItemModuleType,
    CatalogItem,
    CatalogItemRef,
    CatalogLibraryDocument,
    CatalogLibrarySummary,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { UIEngineComponentDeps } from "@gately/shared/infrastructure/ui-engine/model/types";
import type {
    CatalogCreateAnnotationItemInput,
    CatalogCreateDebugItemInput,
    CatalogCreateItemInput,
    CatalogCreateLayoutItemInput,
    CatalogCreateLibraryInput,
    CatalogCreateLogicItemInput,
    CatalogQueryService,
} from "./services";

export type CatalogExternal = {};

export type CatalogDeps = UIEngineComponentDeps<CatalogExternal>;

export type CatalogStateApi = Pick<
    CatalogQueryService,
    | "document"
    | "libraries"
    | "librarySummaries"
    | "getLibrary"
    | "getLibraryItems"
    | "getItem"
    | "findItemsByKind"
    | "findItemsByModuleType"
> & {
    document: () => CatalogDocument;
    libraries: () => CatalogLibraryDocument[];
    librarySummaries: () => CatalogLibrarySummary[];
    getLibrary: (libraryId: string) => CatalogLibraryDocument | undefined;
    getLibraryItems: (libraryId: string) => CatalogItem[];
    getItem: (ref: CatalogItemRef) => CatalogItem | undefined;
    findItemsByKind: (kind: CatalogItemKind) => CatalogItem[];
    findItemsByModuleType: (moduleType: CatalogItemModuleType) => CatalogItem[];
};

export type CatalogApi = {
    state: CatalogStateApi;
    createLibrary: (input: CatalogCreateLibraryInput) => CatalogLibraryDocument;
    createItem: (input: CatalogCreateItemInput) => CatalogItem;
    createLogicItem: (input: CatalogCreateLogicItemInput) => CatalogItem;
    createAnnotationItem: (input: CatalogCreateAnnotationItemInput) => CatalogItem;
    createDebugItem: (input: CatalogCreateDebugItemInput) => CatalogItem;
    createLayoutItem: (input: CatalogCreateLayoutItemInput) => CatalogItem;
    replaceDocument: (document: CatalogDocument) => void;
    upsertLibrary: (library: CatalogLibraryDocument) => CatalogLibraryDocument;
    removeLibrary: (libraryId: string) => CatalogLibraryDocument | undefined;
    upsertItem: (item: CatalogItem) => CatalogItem;
    removeItem: (ref: CatalogItemRef) => CatalogItem | undefined;
};
