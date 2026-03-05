import { describe, expect, it } from "vitest";
import type { CatalogItem } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { getCompositionDependencies } from "../getCompositionDependencies";

const createItem = (modules: CatalogItem["modules"]): CatalogItem => ({
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
        width: 120,
        height: 80,
    },
    modules,
});

describe("getCompositionDependencies", () => {
    it("returns unique refs from composition module", () => {
        const item = createItem([
            {
                type: "composition",
                config: {
                    items: [
                        {
                            id: "inner-0",
                            ref: {
                                libraryId: "std",
                                path: ["gates"],
                                itemName: "AND",
                            },
                        },
                        {
                            id: "inner-1",
                            ref: {
                                libraryId: "std",
                                path: ["gates"],
                                itemName: "AND",
                            },
                        },
                    ],
                    connections: [],
                    boundary: { inputs: [], outputs: [] },
                    inputBindings: [],
                    outputBindings: [],
                },
            },
        ]);

        expect(getCompositionDependencies(item)).toEqual([
            {
                libraryId: "std",
                path: ["gates"],
                itemName: "AND",
            },
        ]);
    });

    it("returns empty array when item has no composition module", () => {
        const item = createItem([
            {
                type: "logic",
                config: {
                    executor: "std.half-adder",
                },
            },
        ]);

        expect(getCompositionDependencies(item)).toEqual([]);
    });
});
