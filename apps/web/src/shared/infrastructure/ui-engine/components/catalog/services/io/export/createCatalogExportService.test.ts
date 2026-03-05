import { describe, expect, it } from "vitest";
import type {
    CatalogItem,
    CatalogItemRef,
    CatalogLibraryDocument,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { CatalogQueryService } from "../../query";
import { createCatalogExportService } from "./createCatalogExportService";
import { catalogExportIssueDefs } from "./issues";

const createQueryStub = (
    overrides: Partial<CatalogQueryService> = {},
): CatalogQueryService => ({
    document: () => ({ formatVersion: 1, libraries: [] }),
    libraries: () => [],
    librarySummaries: () => [],
    getLibrary: () => undefined,
    hasLibrary: () => false,
    getLibraryItems: () => [],
    getItem: () => undefined,
    hasItem: () => false,
    getItemModules: () => [],
    getItemComposition: () => undefined,
    getItemBoundary: () => undefined,
    getDirectDependencies: () => [],
    collectDependenciesFromRoots: () => ({ items: [], missingRefs: [] }),
    findItemsByKind: () => [],
    findItemsByModuleType: () => [],
    ...overrides,
});

const createLogicItem = (ref: CatalogItemRef): CatalogItem => ({
    ref,
    kind: "logic",
    meta: {
        name: ref.itemName,
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
                executor: "std.logic",
            },
        },
    ],
});

describe("createCatalogExportService", () => {
    it("exports cloned payloads using query service data", () => {
        const andRef: CatalogItemRef = {
            libraryId: "std",
            path: ["gates"],
            itemName: "AND",
        };
        const halfAdderRef: CatalogItemRef = {
            libraryId: "std",
            path: ["arith"],
            itemName: "HALF-ADDER",
        };

        const andItem = createLogicItem(andRef);
        const halfAdder = createLogicItem(halfAdderRef);

        const library: CatalogLibraryDocument = {
            formatVersion: 1,
            manifest: {
                id: "std",
                name: "Standard",
                version: "1.0.0",
                createdAt: 1,
            },
            items: [andItem, halfAdder],
        };

        const document = {
            formatVersion: 1 as const,
            libraries: [library],
        };

        const query = createQueryStub({
            document: () => document,
            getLibrary: (libraryId) => (libraryId === "std" ? library : undefined),
            getItem: (ref) =>
                ref.itemName === halfAdder.ref.itemName && ref.path[0] === halfAdder.ref.path[0]
                    ? halfAdder
                    : undefined,
            collectDependenciesFromRoots: () => ({
                items: [halfAdder, andItem],
                missingRefs: [],
            }),
        });

        const service = createCatalogExportService({ query });

        const documentResult = service.exportDocument();
        const libraryResult = service.exportLibrary({ libraryId: "std" });
        const bundleResult = service.exportBundle({ rootRefs: [halfAdder.ref] });

        expect(documentResult.ok).toBe(true);
        expect(documentResult.value).toEqual(document);
        expect(documentResult.value).not.toBe(document);

        expect(libraryResult.ok).toBe(true);
        expect(libraryResult.value).toEqual(library);
        expect(libraryResult.value).not.toBe(library);

        expect(bundleResult).toMatchObject({
            ok: true,
            subject: "bundle",
            value: {
                formatVersion: 1,
                rootRefs: [halfAdder.ref],
                libraries: [
                    {
                        manifest: library.manifest,
                        items: [halfAdder, andItem],
                    },
                ],
            },
        });
    });

    it("maps invalid export inputs to structured issues", () => {
        const rootRef: CatalogItemRef = {
            libraryId: "std",
            path: ["arith"],
            itemName: "HALF-ADDER",
        };
        const missingRef: CatalogItemRef = {
            libraryId: "std",
            path: ["gates"],
            itemName: "AND",
        };

        const service = createCatalogExportService({
            query: createQueryStub(),
        });

        expect(service.exportLibrary({ libraryId: "" })).toMatchObject({
            ok: false,
            subject: "library",
            issues: [{ code: catalogExportIssueDefs.libraryIdRequired.code }],
        });
        expect(service.exportLibrary({ libraryId: "missing" })).toMatchObject({
            ok: false,
            subject: "library",
            issues: [{ code: catalogExportIssueDefs.libraryNotFound.code }],
        });
        expect(service.exportBundle({ rootRefs: [] })).toMatchObject({
            ok: false,
            subject: "bundle",
            issues: [{ code: catalogExportIssueDefs.bundleRootRefsRequired.code }],
        });
        expect(service.exportBundle({ rootRefs: [rootRef] })).toMatchObject({
            ok: false,
            subject: "bundle",
            issues: [{ code: catalogExportIssueDefs.bundleRootNotFound.code }],
        });

        const dependencyService = createCatalogExportService({
            query: createQueryStub({
                getItem: () => createLogicItem(rootRef),
                collectDependenciesFromRoots: () => ({
                    items: [],
                    missingRefs: [missingRef],
                }),
            }),
        });

        const dependencyResult = dependencyService.exportBundle({ rootRefs: [rootRef] });
        expect(dependencyResult).toMatchObject({
            ok: false,
            subject: "bundle",
            issues: [{ code: catalogExportIssueDefs.bundleDependencyNotFound.code }],
        });
        expect(dependencyResult.issues[0]?.message).toContain("std::gates::AND");
    });
});
