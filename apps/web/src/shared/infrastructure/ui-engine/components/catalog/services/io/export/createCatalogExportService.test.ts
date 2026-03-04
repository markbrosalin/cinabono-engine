import { createRoot } from "solid-js";
import { describe, expect, it } from "vitest";
import type {
    CatalogItem,
    CatalogLibraryDocument,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { createUninitializedGetter } from "@gately/shared/infrastructure/ui-engine/lib/registry";
import { createCatalogQueryService } from "../../query";
import { createCatalogStateService } from "../../state";
import type { CatalogServiceContext } from "../../types";
import { createCatalogExportService } from "./createCatalogExportService";
import { catalogExportIssueDefs } from "./issues";

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
    ],
});

const createCompositionItem = (
    ref: CatalogItem["ref"],
    dependencies: CatalogItem["ref"][],
): CatalogItem => ({
    ref,
    kind: "logic",
    meta: {
        name: ref.itemName,
        createdAt: 1,
    },
    layout: {
        width: 160,
        height: 100,
    },
    modules: [
        {
            type: "composition",
            config: {
                items: dependencies.map((dependency, index) => ({
                    id: `inner-${index}`,
                    ref: dependency,
                })),
                connections: [],
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

describe("createCatalogExportService", () => {
    it("exports a cloned catalog document and library", () => {
        createRoot((dispose) => {
            const state = createCatalogStateService();
            const andItem = createLogicItem();
            const halfAdder = createCompositionItem(
                {
                    libraryId: "std",
                    path: ["arith"],
                    itemName: "HALF-ADDER",
                },
                [andItem.ref],
            );
            const fullAdder = createCompositionItem(
                {
                    libraryId: "std",
                    path: ["arith"],
                    itemName: "FULL-ADDER",
                },
                [halfAdder.ref],
            );
            state.upsertLibrary(createLibrary([andItem, halfAdder, fullAdder]));

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
            const service = createCatalogExportService({ query });

            const documentResult = service.exportDocument();
            const libraryResult = service.exportLibrary({ libraryId: "std" });
            const bundleResult = service.exportBundle({
                rootRefs: [fullAdder.ref],
            });

            expect(documentResult.ok).toBe(true);
            expect(documentResult.value).toEqual(state.document());
            expect(documentResult.value).not.toBe(state.document());
            expect(libraryResult.ok).toBe(true);
            expect(libraryResult.value).toEqual(state.libraries()[0]);
            expect(libraryResult.value).not.toBe(state.libraries()[0]);
            expect(bundleResult.ok).toBe(true);
            expect(bundleResult.value).toEqual({
                formatVersion: 1,
                rootRefs: [fullAdder.ref],
                libraries: [
                    {
                        manifest: state.libraries()[0]!.manifest,
                        items: [fullAdder, halfAdder, andItem],
                    },
                ],
            });

            dispose();
        });
    });

    it("returns structured issues when export input is invalid", () => {
        createRoot((dispose) => {
            const state = createCatalogStateService();
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

            const service = createCatalogExportService({
                query: createCatalogQueryService(ctx),
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
            expect(
                service.exportBundle({
                    rootRefs: [
                        {
                            libraryId: "std",
                            path: ["missing"],
                            itemName: "NOPE",
                        },
                    ],
                }),
            ).toMatchObject({
                ok: false,
                subject: "bundle",
                issues: [{ code: catalogExportIssueDefs.bundleRootNotFound.code }],
            });

            dispose();
        });
    });
});
