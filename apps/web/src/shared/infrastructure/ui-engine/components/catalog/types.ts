import { ComponentDeps } from "../../model";
import * as Services from "./services";
import type {
    CatalogCreateItemUseCase,
    CatalogCreateLibraryUseCase,
    CatalogDeleteLibraryUseCase,
    CatalogDeleteItemUseCase,
    CatalogExportBundleUseCase,
    CatalogExportCatalogUseCase,
    CatalogExportLibraryUseCase,
    CatalogImportBundleUseCase,
    CatalogImportLibraryUseCase,
    CatalogInitCatalogUseCase,
    CatalogUpdateItemUseCase,
} from "./use-cases";

export type CatalogExternal = {};

export type CatalogDeps = ComponentDeps<CatalogExternal>;

export type CatalogStateApi = Services.CatalogQueryService;

export type CatalogApi = Services.CatalogValidationService & {
    state: CatalogStateApi;
    initCatalog: CatalogInitCatalogUseCase;
    createLibrary: CatalogCreateLibraryUseCase;
    createItem: CatalogCreateItemUseCase;
    updateItem: CatalogUpdateItemUseCase;
    deleteItem: CatalogDeleteItemUseCase;
    deleteLibrary: CatalogDeleteLibraryUseCase;
    importBundle: CatalogImportBundleUseCase;
    importLibrary: CatalogImportLibraryUseCase;
    exportLibrary: CatalogExportLibraryUseCase;
    exportBundle: CatalogExportBundleUseCase;
    exportCatalog: CatalogExportCatalogUseCase;
};
