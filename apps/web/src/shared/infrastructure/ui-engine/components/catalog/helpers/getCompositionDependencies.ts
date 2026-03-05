import type {
    CatalogItem,
    CatalogItemRef,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { createCatalogItemRefKey } from "./createItemRefKey";

const getCompositionModule = (modules: CatalogItem["modules"]) => {
    for (const module of modules) {
        if (module.type === "composition") {
            return module;
        }
    }
    return;
};

/** Extracts unique composition item refs from a catalog item (if it has a composition module). */
export const getCompositionDependencies = (item: CatalogItem): CatalogItemRef[] => {
    const compositionModule = getCompositionModule(item.modules);
    if (!compositionModule) return [];

    const refsByKey = new Map<string, CatalogItemRef>();
    compositionModule.config.items.forEach(({ ref: dependencyRef }) => {
        const key = createCatalogItemRefKey(dependencyRef);
        if (!refsByKey.has(key)) {
            refsByKey.set(key, dependencyRef);
        }
    });

    return [...refsByKey.values()];
};
