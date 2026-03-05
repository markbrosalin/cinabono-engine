import { createUninitializedGetter } from "@gately/shared/infrastructure/ui-engine/lib/registry";
import { buildCatalogServices } from "./services";
import { buildCatalogUseCases } from "./use-cases";
import type { CatalogApi, CatalogDeps, CatalogStateApi } from "./types";

export const createCatalog = (deps: CatalogDeps): CatalogApi => {
    const services = buildCatalogServices({
        ...deps,
        getService: createUninitializedGetter("Catalog"),
    });
    const useCases = buildCatalogUseCases({
        factory: services.factory,
        io: services.io,
        query: services.query,
        state: services.state,
        validation: services.validation,
    });

    const state: CatalogStateApi = {
        document: services.query.document,
        libraries: services.query.libraries,
        librarySummaries: services.query.librarySummaries,
        getLibrary: services.query.getLibrary,
        getLibraryItems: services.query.getLibraryItems,
        getItem: services.query.getItem,
        getItemModules: services.query.getItemModules,
        getItemComposition: services.query.getItemComposition,
        getItemBoundary: services.query.getItemBoundary,
        getDirectDependencies: services.query.getDirectDependencies,
        collectDependenciesFromRoots: services.query.collectDependenciesFromRoots,
        findItemsByKind: services.query.findItemsByKind,
        findItemsByModuleType: services.query.findItemsByModuleType,
    };

    return {
        state,
        initCatalog: useCases.initCatalog,
        createLibrary: useCases.createLibrary,
        createItem: useCases.createItem,
        updateItem: useCases.updateItem,
        deleteItem: useCases.deleteItem,
        validateRef: services.validation.validateRef,
        validateItem: services.validation.validateItem,
        validateLibrary: services.validation.validateLibrary,
        validateDocument: services.validation.validateDocument,
        importDocument: services.io.importDocument,
        importBundle: services.io.importBundle,
        importLibrary: useCases.importLibrary,
        exportLibrary: services.io.exportLibrary,
        exportBundle: services.io.exportBundle,
        exportDocument: services.io.exportDocument,
        replaceDocument: services.state.replaceDocument,
        upsertLibrary: services.state.upsertLibrary,
        removeLibrary: services.state.removeLibrary,
        upsertItem: services.state.upsertItem,
        removeItem: (ref) => {
            const item = services.query.getItem(ref);
            if (!item) return;

            return services.state.removeItem(item);
        },
    };
};
