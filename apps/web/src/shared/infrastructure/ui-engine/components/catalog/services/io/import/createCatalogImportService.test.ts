import { describe, expect, it } from "vitest";
import type {
    CatalogBundleDocument,
    CatalogDocument,
    CatalogLibraryDocument,
    CatalogValidationResult,
} from "@gately/shared/infrastructure/ui-engine/model/catalog";
import type { CatalogValidationService } from "../../validation";
import { catalogImportIssueDefs } from "./issues";
import { createCatalogImportService } from "./createCatalogImportService";

const okRefResult = (): CatalogValidationResult<"ref"> => ({
    ok: true,
    subject: "ref",
    issues: [],
});

const okItemResult = (): CatalogValidationResult<"item"> => ({
    ok: true,
    subject: "item",
    issues: [],
});

const okLibraryResult = (): CatalogValidationResult<"library"> => ({
    ok: true,
    subject: "library",
    issues: [],
});

const okDocumentResult = (): CatalogValidationResult<"document"> => ({
    ok: true,
    subject: "document",
    issues: [],
});

const createValidationStub = (
    overrides: Partial<CatalogValidationService> = {},
): CatalogValidationService => ({
    validateRef: () => okRefResult(),
    validateItem: () => okItemResult(),
    validateLibrary: () => okLibraryResult(),
    validateDocument: () => okDocumentResult(),
    ...overrides,
});

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
    it("returns cloned payloads when validation accepts input", () => {
        const service = createCatalogImportService({
            validation: createValidationStub(),
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

    it("returns top-level validation failures and bundle header issue", () => {
        const service = createCatalogImportService({
            validation: createValidationStub({
                validateDocument: () => ({
                    ok: false,
                    subject: "document",
                    issues: [
                        { code: "document.invalid", message: "invalid", path: ["formatVersion"] },
                    ],
                }),
                validateLibrary: () => ({
                    ok: false,
                    subject: "library",
                    issues: [{ code: "library.invalid", message: "invalid", path: ["manifest"] }],
                }),
            }),
        });

        expect(service.importDocument(createDocument())).toMatchObject({
            ok: false,
            subject: "document",
            issues: [{ code: "document.invalid" }],
        });
        expect(service.importLibrary(createLibrary())).toMatchObject({
            ok: false,
            subject: "library",
            issues: [{ code: "library.invalid" }],
        });

        const bundleHeaderService = createCatalogImportService({
            validation: createValidationStub(),
        });
        const bundleHeaderResult = bundleHeaderService.importBundle({
            ...createBundle(),
            rootRefs: [],
        });
        expect(bundleHeaderResult.ok).toBe(false);
        expect(bundleHeaderResult.subject).toBe("bundle");
        expect(bundleHeaderResult.issues.map((issue) => issue.code)).toContain(
            catalogImportIssueDefs.bundleRootRefsRequired.code,
        );
    });

    it("maps dependency and invalid-ref issues without duplicate root-missing noise", () => {
        const service = createCatalogImportService({
            validation: createValidationStub({
                validateRef: (ref) =>
                    ref.libraryId && ref.itemName
                        ? okRefResult()
                        : {
                              ok: false,
                              subject: "ref",
                              issues: [
                                  {
                                      code: "ref.invalid",
                                      message: "invalid",
                                      path: ["libraryId"],
                                  },
                              ],
                          },
            }),
        });

        const missingDependencyResult = service.importBundle(createBundleWithMissingDependency());
        expect(missingDependencyResult).toMatchObject({
            ok: false,
            subject: "bundle",
            issues: [{ code: catalogImportIssueDefs.bundleDependencyMissing.code }],
        });

        const invalidRootResult = service.importBundle({
            ...createBundle(),
            rootRefs: [
                {
                    libraryId: "",
                    path: ["gates"],
                    itemName: "",
                },
            ],
        });

        expect(invalidRootResult.ok).toBe(false);
        expect(invalidRootResult.issues.map((issue) => issue.code)).toContain("ref.invalid");
        expect(invalidRootResult.issues.map((issue) => issue.code)).not.toContain(
            catalogImportIssueDefs.bundleRootMissing.code,
        );
    });
});
