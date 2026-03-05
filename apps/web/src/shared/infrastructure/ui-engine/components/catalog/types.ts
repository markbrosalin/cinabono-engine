import * as Model from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { UIEngineComponentDeps } from "@gately/shared/infrastructure/ui-engine/model/types";
import * as Services from "./services";
import type { CatalogValidationResult } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type {
    CatalogCreateItemResult,
    CatalogCreateLibraryResult,
    CatalogDeleteItemInput,
    CatalogDeleteItemResult,
    CatalogImportLibraryInput,
    CatalogImportLibraryResult,
    CatalogInitCatalogInput,
    CatalogInitCatalogResult,
    CatalogUpdateItemInput,
    CatalogUpdateItemResult,
} from "./use-cases";

export type CatalogExternal = {};

export type CatalogDeps = UIEngineComponentDeps<CatalogExternal>;

export type CatalogStateApi = Pick<
    Services.CatalogQueryService,
    | "document"
    | "libraries"
    | "librarySummaries"
    | "getLibrary"
    | "getLibraryItems"
    | "getItem"
    | "getItemModules"
    | "getItemComposition"
    | "getItemBoundary"
    | "getDirectDependencies"
    | "collectDependenciesFromRoots"
    | "findItemsByKind"
    | "findItemsByModuleType"
> & {
    document: () => Model.CatalogDocument;
    libraries: () => Model.CatalogLibraryDocument[];
    librarySummaries: () => Model.CatalogLibrarySummary[];
    getLibrary: (libraryId: string) => Model.CatalogLibraryDocument | undefined;
    getLibraryItems: (libraryId: string) => Model.CatalogItem[];
    getItem: (ref: Model.CatalogItemRef) => Model.CatalogItem | undefined;
    getItemModules: (ref: Model.CatalogItemRef) => Model.CatalogItemModule[];
    getItemComposition: (ref: Model.CatalogItemRef) => Model.CatalogCompositionModule | undefined;
    getItemBoundary: (ref: Model.CatalogItemRef) => Model.CatalogCompositionBoundary | undefined;
    getDirectDependencies: (ref: Model.CatalogItemRef) => Model.CatalogItemRef[];
    collectDependenciesFromRoots: (rootRefs: Model.CatalogItemRef[]) => {
        items: Model.CatalogItem[];
        missingRefs: Model.CatalogItemRef[];
    };
    findItemsByKind: (kind: Model.CatalogItemKind) => Model.CatalogItem[];
    findItemsByModuleType: (moduleType: Model.CatalogItemModuleType) => Model.CatalogItem[];
};

export type CatalogApi = {
    state: CatalogStateApi;
    initCatalog: (input?: CatalogInitCatalogInput) => CatalogInitCatalogResult;
    createLibrary: (input: Services.CatalogCreateLibraryInput) => CatalogCreateLibraryResult;
    createItem: (input: Services.CatalogCreateItemInput) => CatalogCreateItemResult;
    updateItem: (input: CatalogUpdateItemInput) => CatalogUpdateItemResult;
    deleteItem: (input: CatalogDeleteItemInput) => CatalogDeleteItemResult;
    validateRef: (ref: Model.CatalogItemRef) => CatalogValidationResult<"ref">;
    validateItem: (item: Model.CatalogItem) => CatalogValidationResult<"item">;
    validateLibrary: (library: Model.CatalogLibraryDocument) => CatalogValidationResult<"library">;
    validateDocument: (document: Model.CatalogDocument) => CatalogValidationResult<"document">;
    importDocument: (document: Model.CatalogDocument) => Services.CatalogImportDocumentResult;
    importBundle: (bundle: Model.CatalogBundleDocument) => Services.CatalogImportBundleResult;
    importLibrary: (input: CatalogImportLibraryInput) => CatalogImportLibraryResult;
    exportLibrary: (
        options: Services.CatalogExportLibraryOptions,
    ) => Services.CatalogExportLibraryResult;
    exportBundle: (
        options: Services.CatalogExportBundleOptions,
    ) => Services.CatalogExportBundleResult;
    exportDocument: () => Services.CatalogExportDocumentResult;
    replaceDocument: (document: Model.CatalogDocument) => void;
    upsertLibrary: (library: Model.CatalogLibraryDocument) => Model.CatalogLibraryDocument;
    removeLibrary: (libraryId: string) => Model.CatalogLibraryDocument | undefined;
    upsertItem: (item: Model.CatalogItem) => Model.CatalogItem;
    removeItem: (ref: Model.CatalogItemRef) => Model.CatalogItem | undefined;
};
