import { createItemUseCase } from "./createItem";
import { createLibraryUseCase } from "./createLibrary";
import { createDeleteItemUseCase } from "./deleteItem";
import { createInitCatalogUseCase } from "./initCatalog";
import { createImportLibraryUseCase } from "./importLibrary";
import { createUpdateItemUseCase } from "./updateItem";
import type { CatalogUseCaseDeps, CatalogUseCases } from "./types";

export const buildCatalogUseCases = (deps: CatalogUseCaseDeps): CatalogUseCases => {
    return {
        initCatalog: createInitCatalogUseCase(deps),
        createLibrary: createLibraryUseCase(deps),
        createItem: createItemUseCase(deps),
        updateItem: createUpdateItemUseCase(deps),
        deleteItem: createDeleteItemUseCase(deps),
        importLibrary: createImportLibraryUseCase(deps),
    };
};
