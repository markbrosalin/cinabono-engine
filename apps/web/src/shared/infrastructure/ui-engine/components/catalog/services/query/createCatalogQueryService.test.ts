import { createRoot } from "solid-js";
import { describe, expect, it } from "vitest";
import type { CatalogItem, CatalogLibraryDocument } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { createUninitializedGetter } from "@gately/shared/infrastructure/ui-engine/lib/registry";
import { createCatalogQueryService } from "./createCatalogQueryService";
import { createCatalogStateService } from "../state";
import type { CatalogServiceContext } from "../types";

const createLibrary = (items: CatalogItem[] = []): CatalogLibraryDocument => ({
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
        title: "AND",
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

describe("createCatalogQueryService", () => {
    it("reads catalog state and supports semantic queries", () => {
        createRoot((dispose) => {
            const state = createCatalogStateService();
            const item = createLogicItem();

            state.upsertLibrary(createLibrary([item]));

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
            expect(query.findItemsByKind("logic")).toEqual([item]);
            expect(query.findItemsByModuleType("logic")).toEqual([item]);

            dispose();
        });
    });
});
