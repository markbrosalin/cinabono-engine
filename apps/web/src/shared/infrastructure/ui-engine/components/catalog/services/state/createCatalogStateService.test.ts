import { createRoot } from "solid-js";
import { describe, expect, it } from "vitest";
import type {
    CatalogItem,
    CatalogLibraryDocument,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { createCatalogStateService } from "./createCatalogStateService";

const createLibrary = (overrides?: Partial<CatalogLibraryDocument>): CatalogLibraryDocument => ({
    manifest: {
        id: "std",
        name: "Standard",
        version: "1.0.0",
        createdAt: 1,
        ...overrides?.manifest,
    },
    items: overrides?.items ?? [],
    extensions: overrides?.extensions,
});

const createLogicItem = (overrides?: Partial<CatalogItem>): CatalogItem => ({
    ref: {
        libraryId: "std",
        path: ["gates"],
        itemName: "AND",
        ...overrides?.ref,
    },
    kind: "logic",
    meta: {
        title: "AND",
        createdAt: 1,
        ...overrides?.meta,
    },
    layout: {
        width: 120,
        height: 80,
        ...overrides?.layout,
    },
    modules:
        overrides?.modules ??
        [
            {
                type: "logic",
                config: {
                    executor: "std.and",
                },
            },
            {
                type: "ports",
                config: {
                    items: [
                        {
                            id: "in-1",
                            direction: "input",
                        },
                        {
                            id: "out-1",
                            direction: "output",
                        },
                    ],
                },
            },
        ],
    extensions: overrides?.extensions,
});

describe("createCatalogStateService", () => {
    it("stores libraries inside the in-memory document", () => {
        createRoot((dispose) => {
            const state = createCatalogStateService();
            const library = createLibrary();

            state.upsertLibrary(library);

            expect(state.document()).toEqual({
                libraries: [library],
            });
            expect(state.libraries()).toEqual([library]);

            dispose();
        });
    });

    it("upserts and removes items inside a registered library", () => {
        createRoot((dispose) => {
            const state = createCatalogStateService();
            state.upsertLibrary(createLibrary());

            const item = createLogicItem();

            state.upsertItem(item);

            expect(state.document().libraries[0]?.items).toEqual([item]);

            const removed = state.removeItem(item);

            expect(removed).toEqual(item);
            expect(state.document().libraries[0]?.items).toEqual([]);

            dispose();
        });
    });
});
