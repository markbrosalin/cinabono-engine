import { describe, expect, it } from "vitest";
import type {
    CatalogItem,
    CatalogItemRef,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { collectDependenciesFromRoots } from "../collectDependenciesFromRoots";
import { getCompositionDependencies } from "../getCompositionDependencies";

const makeRef = (libraryId: string, path: string[], itemName: string): CatalogItemRef => ({
    libraryId,
    path,
    itemName,
});

const withDeps = (ref: CatalogItemRef, deps: CatalogItemRef[]): CatalogItem => ({
    ref,
    kind: "logic",
    meta: { name: ref.itemName, createdAt: 1 },
    layout: { width: 1, height: 1 },
    modules: [
        {
            type: "composition",
            config: {
                items: deps.map((d, i) => ({ id: `inner-${i}`, ref: d })),
                connections: [],
                boundary: { inputs: [], outputs: [] },
                inputBindings: [],
                outputBindings: [],
            },
        },
    ],
});

describe("collectDependencyClosure helper", () => {
    it("returns items and missing refs with deduplication", () => {
        const aRef = makeRef("std", ["a"], "A");
        const bRef = makeRef("std", ["b"], "B");
        const cRef = makeRef("std", ["c"], "C"); // missing

        const items = new Map<string, CatalogItem>([
            ["std::a::A", withDeps(aRef, [bRef, cRef])],
            ["std::b::B", withDeps(bRef, [])],
        ]);

        const closure = collectDependenciesFromRoots({
            rootRefs: [aRef],
            resolveItem: (ref) => items.get([ref.libraryId, ...ref.path, ref.itemName].join("::")),
            getDependencies: getCompositionDependencies,
        });

        expect(closure.items.map((i) => i.ref.itemName)).toEqual(["A", "B"]);
        expect(closure.missingRefs.map((r) => r.itemName)).toEqual(["C"]);
    });

    it("skips invalid refs when validateRef is provided", () => {
        const aRef = makeRef("std", ["a"], "A");
        const badRef = makeRef("", ["x"], "BAD");

        const items = new Map<string, CatalogItem>([["std::a::A", withDeps(aRef, [badRef])]]);

        const closure = collectDependenciesFromRoots({
            rootRefs: [aRef],
            resolveItem: (ref) => items.get([ref.libraryId, ...ref.path, ref.itemName].join("::")),
            getDependencies: getCompositionDependencies,
            validateRef: (ref) => ref.libraryId.length > 0 && ref.itemName.length > 0,
        });

        expect(closure.items.map((i) => i.ref.itemName)).toEqual(["A"]);
        expect(closure.missingRefs).toHaveLength(0);
    });
});
