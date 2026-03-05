import type {
    CatalogDocument,
    CatalogItem,
    CatalogItemRef,
    CatalogLibraryDocument,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type {
    CatalogCreateItemInput,
    CatalogCreateLibraryInput,
    CatalogFactoryService,
    CatalogIOService,
    CatalogQueryService,
    CatalogStateService,
    CatalogValidationService,
} from "../services";
import { UseCase, UseCaseResult } from "../../../model";

export type CatalogImportStrategy = "merge" | "replace";

export type CatalogInitCatalogInput = {
    document?: CatalogDocument;
};

export type CatalogInitCatalogResult = UseCaseResult<CatalogDocument>;

export type CatalogInitCatalogUseCase = (input?: CatalogInitCatalogInput) => CatalogInitCatalogResult;

export type CatalogCreateLibraryResult = UseCaseResult<CatalogLibraryDocument>;

export type CatalogCreateLibraryUseCase = UseCase<
    CatalogCreateLibraryInput,
    CatalogCreateLibraryResult
>;

export type CatalogCreateItemResult = UseCaseResult<CatalogItem>;

export type CatalogCreateItemUseCase = UseCase<CatalogCreateItemInput, CatalogCreateItemResult>;

export type CatalogUpdateItemInput = {
    item: CatalogItem;
};

export type CatalogUpdateItemResult = UseCaseResult<CatalogItem>;

export type CatalogUpdateItemUseCase = UseCase<CatalogUpdateItemInput, CatalogUpdateItemResult>;

export type CatalogDeleteItemInput = {
    ref: CatalogItemRef;
};

export type CatalogDeleteItemResult = UseCaseResult<CatalogItem>;

export type CatalogDeleteItemUseCase = UseCase<CatalogDeleteItemInput, CatalogDeleteItemResult>;

export type CatalogImportLibraryInput = {
    library: CatalogLibraryDocument;
    strategy?: CatalogImportStrategy;
};

export type CatalogImportLibraryResult = UseCaseResult<CatalogLibraryDocument>;

export type CatalogImportLibraryUseCase = UseCase<
    CatalogImportLibraryInput,
    CatalogImportLibraryResult
>;

export type CatalogUseCaseDeps = {
    factory: Pick<CatalogFactoryService, "createLibrary" | "createItem">;
    io: Pick<CatalogIOService, "importDocument" | "importLibrary">;
    query: Pick<CatalogQueryService, "getLibrary" | "getItem" | "hasItem" | "hasLibrary">;
    state: Pick<CatalogStateService, "replaceDocument" | "upsertLibrary" | "upsertItem" | "removeItem">;
    validation: Pick<CatalogValidationService, "validateLibrary" | "validateItem">;
};

export type CatalogUseCases = {
    initCatalog: CatalogInitCatalogUseCase;
    createLibrary: CatalogCreateLibraryUseCase;
    createItem: CatalogCreateItemUseCase;
    updateItem: CatalogUpdateItemUseCase;
    deleteItem: CatalogDeleteItemUseCase;
    importLibrary: CatalogImportLibraryUseCase;
};
