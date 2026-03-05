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
import { isSameItemRef } from "../../helpers/isSameItemRef";
import { getCompositionDependencies } from "../../helpers/getCompositionDependencies";
import { collectDependenciesFromRoots } from "../../helpers/collectDependenciesFromRoots";
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
        const item = getItem(ref);
        if (!item) return [];
        return getCompositionDependencies(item);
    };

    const collectDependenciesFromRootsForCatalog = (rootRefs: CatalogItemRef[]) =>
        collectDependenciesFromRoots({
            rootRefs,
            resolveItem: getItem,
            getDependencies: getCompositionDependencies,
        });

    const findItemsByKind = (kind: CatalogItemKind): CatalogItem[] => {
        return libraries()
            .flatMap((library) => library.items)
            .filter((item) => item.kind === kind);
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
        collectDependenciesFromRoots: collectDependenciesFromRootsForCatalog,
        findItemsByKind,
        findItemsByModuleType,
    };
};
