import { createMemo } from "solid-js";
import type {
    CatalogCompositionModule,
    CatalogItem,
    CatalogItemKind,
    CatalogItemModule,
    CatalogItemModuleType,
    CatalogItemRef,
    CatalogLibraryDocument,
    CatalogLibrarySummary,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { createCatalogItemRefKey } from "../../helpers/createItemRefKey";
import { isSameItemRef } from "../../helpers/isSameItemRef";
import type { CatalogServiceContext } from "../types";
import type { CatalogQueryService } from "./types";

/** Exposes semantic read queries over the catalog without mutating state. */
export const createCatalogQueryService = (ctx: CatalogServiceContext): CatalogQueryService => {
    const state = ctx.getService("state");

    const document = () => state.document();
    const libraries = () => state.libraries();
    const librarySummaries = createMemo<CatalogLibrarySummary[]>(() =>
        libraries().map(({ manifest }) => ({
            id: manifest.id,
            name: manifest.name,
            version: manifest.version,
        })),
    );

    const getLibrary = (libraryId: string): CatalogLibraryDocument | undefined => {
        return libraries().find((library) => library.manifest.id === libraryId);
    };

    const hasLibrary = (libraryId: string): boolean => {
        return Boolean(getLibrary(libraryId));
    };

    const getLibraryItems = (libraryId: string): CatalogItem[] => {
        return getLibrary(libraryId)?.items ?? [];
    };

    const getItem = (ref: CatalogItemRef): CatalogItem | undefined => {
        return getLibraryItems(ref.libraryId).find((item) => isSameItemRef(item.ref, ref));
    };

    const hasItem = (ref: CatalogItemRef): boolean => {
        return Boolean(getItem(ref));
    };

    const getItemModules = (ref: CatalogItemRef): CatalogItemModule[] => {
        return getItem(ref)?.modules ?? [];
    };

    const getItemComposition = (ref: CatalogItemRef): CatalogCompositionModule | undefined => {
        return getItemModules(ref).find(
            (module): module is CatalogCompositionModule => module.type === "composition",
        );
    };

    const getItemBoundary = (ref: CatalogItemRef) => {
        return getItemComposition(ref)?.config.boundary;
    };

    const getDirectDependencies = (ref: CatalogItemRef): CatalogItemRef[] => {
        const composition = getItemComposition(ref);
        if (!composition) return [];

        const refsByKey = new Map<string, CatalogItemRef>();
        composition.config.items.forEach(({ ref: dependencyRef }) => {
            const key = createCatalogItemRefKey(dependencyRef);
            if (!refsByKey.has(key)) {
                refsByKey.set(key, dependencyRef);
            }
        });

        return [...refsByKey.values()];
    };

    const collectDependencyClosure = (rootRefs: CatalogItemRef[]) => {
        const itemsByKey = new Map<string, CatalogItem>();
        const missingRefsByKey = new Map<string, CatalogItemRef>();
        const seen = new Set<string>();
        const queue: CatalogItemRef[] = [];

        rootRefs.forEach((ref) => {
            const refKey = createCatalogItemRefKey(ref);
            if (seen.has(refKey)) return;

            seen.add(refKey);
            queue.push(ref);
        });

        while (queue.length > 0) {
            const currentRef = queue.shift();
            if (!currentRef) continue;

            const item = getItem(currentRef);
            if (!item) {
                const missingKey = createCatalogItemRefKey(currentRef);
                if (!missingRefsByKey.has(missingKey)) {
                    missingRefsByKey.set(missingKey, currentRef);
                }
                continue;
            }

            const itemKey = createCatalogItemRefKey(item.ref);
            if (!itemsByKey.has(itemKey)) {
                itemsByKey.set(itemKey, item);
            }

            getDirectDependencies(item.ref).forEach((dependencyRef) => {
                const dependencyKey = createCatalogItemRefKey(dependencyRef);
                if (seen.has(dependencyKey)) return;

                seen.add(dependencyKey);
                queue.push(dependencyRef);
            });
        }

        return {
            items: [...itemsByKey.values()],
            missingRefs: [...missingRefsByKey.values()],
        };
    };

    const findItemsByKind = (kind: CatalogItemKind): CatalogItem[] => {
        return libraries().flatMap((library) => library.items).filter((item) => item.kind === kind);
    };

    const findItemsByModuleType = (moduleType: CatalogItemModuleType): CatalogItem[] => {
        return libraries()
            .flatMap((library) => library.items)
            .filter((item) => item.modules.some((module) => module.type === moduleType));
    };

    return {
        document,
        libraries,
        librarySummaries,
        getLibrary,
        hasLibrary,
        getLibraryItems,
        getItem,
        hasItem,
        getItemModules,
        getItemComposition,
        getItemBoundary,
        getDirectDependencies,
        collectDependencyClosure,
        findItemsByKind,
        findItemsByModuleType,
    };
};
