import type {
    CatalogFactoryService,
    CatalogIOService,
    CatalogQueryService,
    CatalogStateService,
    CatalogValidationService,
} from "../services";
import type { CatalogCreateItemUseCase } from "./createItem";
import type { CatalogCreateLibraryUseCase } from "./createLibrary";
import type { CatalogDeleteLibraryUseCase } from "./deleteLibrary";
import type { CatalogDeleteItemUseCase } from "./deleteItem";
import type { CatalogExportBundleUseCase } from "./exportBundle";
import type { CatalogExportCatalogUseCase } from "./exportCatalog";
import type { CatalogExportLibraryUseCase } from "./exportLibrary";
import type { CatalogInitCatalogUseCase } from "./initCatalog";
import type { CatalogImportBundleUseCase } from "./importBundle";
import type { CatalogImportLibraryUseCase } from "./importLibrary";
import type { CatalogUpdateItemUseCase } from "./updateItem";

export type CatalogImportStrategy = "merge" | "replace";

export type CatalogUseCaseDeps = {
    factory: Pick<CatalogFactoryService, "createLibrary" | "createItem">;
    io: Pick<
        CatalogIOService,
        | "importDocument"
        | "importLibrary"
        | "importBundle"
        | "exportLibrary"
        | "exportBundle"
        | "exportDocument"
    >;
    query: Pick<CatalogQueryService, "getLibrary" | "getItem" | "hasItem" | "hasLibrary">;
    state: Pick<
        CatalogStateService,
        "replaceDocument" | "upsertLibrary" | "upsertItem" | "removeItem" | "removeLibrary"
    >;
    validation: Pick<CatalogValidationService, "validateLibrary" | "validateItem">;
};

export type CatalogUseCases = {
    initCatalog: CatalogInitCatalogUseCase;
    createLibrary: CatalogCreateLibraryUseCase;
    createItem: CatalogCreateItemUseCase;
    updateItem: CatalogUpdateItemUseCase;
    deleteItem: CatalogDeleteItemUseCase;
    deleteLibrary: CatalogDeleteLibraryUseCase;
    importLibrary: CatalogImportLibraryUseCase;
    importBundle: CatalogImportBundleUseCase;
    exportLibrary: CatalogExportLibraryUseCase;
    exportBundle: CatalogExportBundleUseCase;
    exportCatalog: CatalogExportCatalogUseCase;
};
