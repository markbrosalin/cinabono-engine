import { describe, expect, it } from "vitest";
import type {
    CatalogBundleDocument,
    CATALOG_FORMAT_VERSION,
    CatalogDocument,
    CatalogLibraryDocument,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { createCatalogValidationService } from "../../validation";
import { catalogImportIssueDefs } from "./issues";
import { createCatalogImportService } from "./createCatalogImportService";

const createLibrary = (): CatalogLibraryDocument => ({
    formatVersion: 1,
    manifest: {
        id: "std",
        name: "Standard",
        version: "1.0.0",
        createdAt: 1,
    },
    items: [],
});

const createDocument = (): CatalogDocument => ({
    formatVersion: 1,
    libraries: [createLibrary()],
});

const createBundle = (): CatalogBundleDocument => ({
    formatVersion: 1,
    rootRefs: [
        {
            libraryId: "std",
            path: ["gates"],
            itemName: "AND",
        },
    ],
    libraries: [
        {
            manifest: {
                id: "std",
                name: "Standard",
                version: "1.0.0",
                createdAt: 1,
            },
            items: [
                {
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
                },
            ],
        },
    ],
});

const createBundleWithMissingDependency = (): CatalogBundleDocument => ({
    formatVersion: 1,
    rootRefs: [
        {
            libraryId: "std",
            path: ["arith"],
            itemName: "HALF-ADDER",
        },
    ],
    libraries: [
        {
            manifest: {
                id: "std",
                name: "Standard",
                version: "1.0.0",
                createdAt: 1,
            },
            items: [
                {
                    ref: {
                        libraryId: "std",
                        path: ["arith"],
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
                    modules: [
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
                                ],
                                connections: [],
                                boundary: {
                                    inputs: [],
                                    outputs: [],
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
                },
            ],
        },
    ],
});

describe("createCatalogImportService", () => {
    it("returns cloned validated payloads for import", () => {
        const service = createCatalogImportService({
            validation: createCatalogValidationService(),
        });

        const document = createDocument();
        const library = createLibrary();
        const bundle = createBundle();

        const documentResult = service.importDocument(document);
        const libraryResult = service.importLibrary(library);
        const bundleResult = service.importBundle(bundle);

        expect(documentResult.ok).toBe(true);
        expect(documentResult.value).toEqual(document);
        expect(documentResult.value).not.toBe(document);
        expect(libraryResult.ok).toBe(true);
        expect(libraryResult.value).toEqual(library);
        expect(libraryResult.value).not.toBe(library);
        expect(bundleResult.ok).toBe(true);
        expect(bundleResult.value).toEqual(bundle);
        expect(bundleResult.value).not.toBe(bundle);
    });

    it("returns validation issues for invalid payloads", () => {
        const service = createCatalogImportService({
            validation: createCatalogValidationService(),
        });

        const invalidDocument = {
            ...createDocument(),
            formatVersion: 999 as typeof CATALOG_FORMAT_VERSION,
        } as CatalogDocument;

        expect(service.importDocument(invalidDocument)).toMatchObject({
            ok: false,
            subject: "document",
        });
        expect(
            service.importBundle({
                ...createBundle(),
                rootRefs: [],
            }),
        ).toMatchObject({
            ok: false,
            subject: "bundle",
            issues: [{ code: catalogImportIssueDefs.bundleRootRefsRequired.code }],
        });
        expect(service.importBundle(createBundleWithMissingDependency())).toMatchObject({
            ok: false,
            subject: "bundle",
            issues: [{ code: catalogImportIssueDefs.bundleDependencyMissing.code }],
        });
    });
});
