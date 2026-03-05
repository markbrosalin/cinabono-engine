import { createRoot } from "solid-js";
import { describe, expect, it } from "vitest";
import type {
    CatalogItem,
    CatalogLibraryDocument,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { createUninitializedGetter } from "@gately/shared/infrastructure/ui-engine/lib/registry";
import { createCatalogQueryService } from "./createCatalogQueryService";
import { createCatalogStateService } from "../state";
import type { CatalogServiceContext } from "../types";

const createLibrary = (items: CatalogItem[] = []): CatalogLibraryDocument => ({
    formatVersion: 1,
    manifest: {
        id: "std",
        name: "Standard",
        version: "1.0.0",
        createdAt: 1,
    },
    items,
});

const createLogicItem = (): CatalogItem => ({
    ref: {
        libraryId: "std",
        path: ["gates"],
        itemName: "AND",
    },
    kind: "logic",
    meta: {
        name: "AND",
        createdAt: 1,
    },
    layout: {
        width: 120,
        height: 80,
    },
    modules: [
        {
            type: "logic",
            config: {
                executor: "std.and",
            },
        },
        {
            type: "ports",
            config: {
                items: [],
            },
        },
    ],
});

const createCompositionItem = (dependencyRef: CatalogItem["ref"]): CatalogItem => ({
    ref: {
        libraryId: "std",
        path: ["circuits"],
        itemName: "HALF-ADDER",
    },
    kind: "logic",
    meta: {
        name: "HALF-ADDER",
        createdAt: 1,
    },
    layout: {
        width: 180,
        height: 120,
    },
    modules: [
        {
            type: "composition",
            config: {
                items: [
                    {
                        id: "inner-0",
                        ref: dependencyRef,
                    },
                ],
                connections: [],
                boundary: {
                    inputs: [
                        {
                            outerPortId: "in-0",
                            position: { x: 0, y: 20 },
                        },
                    ],
                    outputs: [
                        {
                            outerPortId: "out-0",
                            position: { x: 180, y: 20 },
                        },
                    ],
                },
                inputBindings: [],
                outputBindings: [],
            },
        },
        {
            type: "ports",
            config: {
                items: [],
            },
        },
    ],
});

describe("createCatalogQueryService", () => {
    it("reads catalog state and supports semantic queries", () => {
        createRoot((dispose) => {
            const state = createCatalogStateService();
            const item = createLogicItem();
            const compositionItem = createCompositionItem(item.ref);

            state.upsertLibrary(createLibrary([item, compositionItem]));

            const ctx: CatalogServiceContext = {
                external: {},
                getSharedService: createUninitializedGetter("Shared"),
                getService: createUninitializedGetter("Catalog"),
            };
            ctx.getService = ((name) => {
                if (name === "state") {
                    return state;
                }

                throw new Error(`Unknown service: ${String(name)}`);
            }) as CatalogServiceContext["getService"];

            const query = createCatalogQueryService(ctx);

            expect(query.librarySummaries()).toEqual([
                {
                    id: "std",
                    name: "Standard",
                    version: "1.0.0",
                },
            ]);
            expect(query.getItem(item.ref)).toEqual(item);
            expect(query.findItemsByKind("logic")).toEqual([item, compositionItem]);
            expect(query.findItemsByModuleType("logic")).toEqual([item]);
            expect(query.getItemComposition(compositionItem.ref)?.type).toBe("composition");
            expect(query.getItemBoundary(compositionItem.ref)).toEqual({
                inputs: [
                    {
                        outerPortId: "in-0",
                        position: { x: 0, y: 20 },
                    },
                ],
                outputs: [
                    {
                        outerPortId: "out-0",
                        position: { x: 180, y: 20 },
                    },
                ],
            });
            expect(query.getDirectDependencies(item.ref)).toEqual([]);

            dispose();
        });
    });
});
