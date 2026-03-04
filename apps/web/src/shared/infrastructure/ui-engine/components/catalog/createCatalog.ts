import { createUninitializedGetter } from "@gately/shared/infrastructure/ui-engine/lib/registry";
import { buildCatalogServices } from "./services";
import type { CatalogApi, CatalogDeps, CatalogStateApi } from "./types";

export const createCatalog = (deps: CatalogDeps): CatalogApi => {
    const services = buildCatalogServices({
        ...deps,
        getService: createUninitializedGetter("Catalog"),
    });

    const state: CatalogStateApi = {
        document: services.query.document,
        libraries: services.query.libraries,
        librarySummaries: services.query.librarySummaries,
        getLibrary: services.query.getLibrary,
        getLibraryItems: services.query.getLibraryItems,
        getItem: services.query.getItem,
        findItemsByKind: services.query.findItemsByKind,
        findItemsByModuleType: services.query.findItemsByModuleType,
    };

    return {
        state,
        createLibrary: services.factory.createLibrary,
        createItem: services.factory.createItem,
        createLogicItem: services.factory.createItem,
        createAnnotationItem: services.factory.createItem,
        createDebugItem: services.factory.createItem,
        createLayoutItem: services.factory.createItem,
        validateRef: services.validation.validateRef,
        validateItem: services.validation.validateItem,
        validateLibrary: services.validation.validateLibrary,
        validateDocument: services.validation.validateDocument,
        importLibrary: services.io.importLibrary,
        importDocument: services.io.importDocument,
        importBundle: services.io.importBundle,
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
