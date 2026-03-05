import type { CatalogItemRef } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { createIssue } from "@gately/shared/infrastructure/ui-engine/model/issue";
import { createCatalogItemRefKey } from "../helpers/createItemRefKey";

export const catalogUseCaseIssueDefs = {
    libraryAlreadyExists: {
        code: "catalog.use-case.library.duplicate",
        message: ({ libraryId }: { libraryId: string }) =>
            `Library "${libraryId}" already exists in the catalog.`,
    },
    libraryNotFound: {
        code: "catalog.use-case.library.not-found",
        message: ({ libraryId }: { libraryId: string }) => `Library "${libraryId}" was not found.`,
    },
    itemAlreadyExists: {
        code: "catalog.use-case.item.duplicate",
        message: ({ refKey }: { refKey: string }) =>
            `Item "${refKey}" already exists in the catalog.`,
    },
    itemNotFound: {
        code: "catalog.use-case.item.not-found",
        message: ({ refKey }: { refKey: string }) => `Item "${refKey}" was not found.`,
    },
} as const;

export const catalogUseCaseIssues = {
    libraryAlreadyExists: (path: Array<string | number>, libraryId: string) =>
        createIssue(catalogUseCaseIssueDefs.libraryAlreadyExists, path, {
            libraryId,
        }),
    libraryNotFound: (path: Array<string | number>, libraryId: string) =>
        createIssue(catalogUseCaseIssueDefs.libraryNotFound, path, {
            libraryId,
        }),
    itemAlreadyExists: (path: Array<string | number>, ref: CatalogItemRef) =>
        createIssue(catalogUseCaseIssueDefs.itemAlreadyExists, path, {
            refKey: createCatalogItemRefKey(ref),
        }),
    itemNotFound: (path: Array<string | number>, ref: CatalogItemRef) =>
        createIssue(catalogUseCaseIssueDefs.itemNotFound, path, {
            refKey: createCatalogItemRefKey(ref),
        }),
} as const;
