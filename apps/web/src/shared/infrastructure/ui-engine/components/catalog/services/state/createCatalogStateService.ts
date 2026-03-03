import { createStore, produce } from "solid-js/store";
import {
    CATALOG_FORMAT_VERSION,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type {
    CatalogDocument,
    CatalogItem,
    CatalogLibraryDocument,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { isSameItemRef } from "../../helpers/isSameItemRef";
import type { CatalogStateService } from "./types";

type CatalogStateStore = {
    document: CatalogDocument;
};

const createDefaultCatalogDocument = (): CatalogDocument => ({
    formatVersion: CATALOG_FORMAT_VERSION,
    libraries: [],
});

/** Stores the in-memory catalog document and applies write operations to it. */
export const createCatalogStateService = (): CatalogStateService => {
    const [store, setStore] = createStore<CatalogStateStore>({
        document: createDefaultCatalogDocument(),
    });

    const document = () => store.document;
    const libraries = () => store.document.libraries;
    const getLibrary = (libraryId: string): CatalogLibraryDocument | undefined => {
        return libraries().find((library) => library.manifest.id === libraryId);
    };

    const replaceDocument = (nextDocument: CatalogDocument): void => {
        setStore("document", nextDocument);
    };

    const upsertLibrary = (library: CatalogLibraryDocument): CatalogLibraryDocument => {
        setStore(
            produce((state) => {
                const existingIndex = state.document.libraries.findIndex(
                    (entry) => entry.manifest.id === library.manifest.id,
                );

                if (existingIndex >= 0) {
                    state.document.libraries[existingIndex] = library;
                    return;
                }

                state.document.libraries = [...state.document.libraries, library];
            }),
        );

        return library;
    };

    const removeLibrary = (libraryId: string): CatalogLibraryDocument | undefined => {
        const existing = getLibrary(libraryId);
        if (!existing) return;

        setStore(
            produce((state) => {
                state.document.libraries = state.document.libraries.filter(
                    (library) => library.manifest.id !== libraryId,
                );
            }),
        );

        return existing;
    };

    const upsertItem = (item: CatalogItem): CatalogItem => {
        const library = libraries().find((entry) => entry.manifest.id === item.ref.libraryId);
        if (!library) {
            throw new Error(
                `[UIEngine.catalogState.upsertItem]: library "${item.ref.libraryId}" is not registered`,
            );
        }

        setStore(
            produce((state) => {
                const targetLibrary = state.document.libraries.find(
                    (entry) => entry.manifest.id === item.ref.libraryId,
                );
                if (!targetLibrary) return;

                const existingIndex = targetLibrary.items.findIndex((entry) =>
                    isSameItemRef(entry.ref, item.ref),
                );

                if (existingIndex >= 0) {
                    targetLibrary.items[existingIndex] = item;
                    return;
                }

                targetLibrary.items = [...targetLibrary.items, item];
            }),
        );

        return item;
    };

    const removeItem = (item: CatalogItem): CatalogItem | undefined => {
        setStore(
            produce((state) => {
                const targetLibrary = state.document.libraries.find(
                    (entry) => entry.manifest.id === item.ref.libraryId,
                );
                if (!targetLibrary) return;

                targetLibrary.items = targetLibrary.items.filter(
                    (entry) => !isSameItemRef(entry.ref, item.ref),
                );
            }),
        );

        return item;
    };

    return {
        document,
        libraries,
        replaceDocument,
        upsertLibrary,
        removeLibrary,
        upsertItem,
        removeItem,
    };
};
