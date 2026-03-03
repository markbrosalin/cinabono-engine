import type { CatalogItem } from "@gately/shared/infrastructure/ui-engine/model/catalog";
import { DEFAULT_ITEM_LAYOUT } from "./constants";
import type { CatalogCreateItemInput } from "./types";

export const createTimestamps = (
    createdAt?: number,
    updatedAt?: number,
): {
    createdAt: number;
    updatedAt?: number;
} => {
    const nextCreatedAt = createdAt ?? Date.now();

    return {
        createdAt: nextCreatedAt,
        ...(updatedAt !== undefined ? { updatedAt } : {}),
    };
};

export const createBaseItemData = (input: CatalogCreateItemInput) => {
    const timestamps = createTimestamps();

    return {
        ref: input.ref,
        meta: {
            name: input.name,
            ...timestamps,
            ...(input.description !== undefined ? { description: input.description } : {}),
            ...(input.tags !== undefined ? { tags: input.tags } : {}),
            ...(input.metaExtensions !== undefined ? { extensions: input.metaExtensions } : {}),
        },
        layout: {
            ...DEFAULT_ITEM_LAYOUT,
            ...input.layout,
        },
        ...(input.extensions !== undefined ? { extensions: input.extensions } : {}),
    };
};

export const createItemByKind = (input: CatalogCreateItemInput): CatalogItem => {
    switch (input.kind) {
        case "logic": {
            return {
                ...createBaseItemData(input),
                kind: "logic",
                modules: input.modules ?? [],
            };
        }
        case "annotation": {
            return {
                ...createBaseItemData(input),
                kind: "annotation",
                modules: input.modules ?? [],
            };
        }
        case "debug": {
            return {
                ...createBaseItemData(input),
                kind: "debug",
                modules: input.modules ?? [],
            };
        }
        case "layout": {
            return {
                ...createBaseItemData(input),
                kind: "layout",
                modules: input.modules ?? [],
            };
        }
        default: {
            const exhaustiveInput: never = input;
            throw new Error(
                `[UIEngine.catalogFactory.createItem]: unsupported item kind "${String(exhaustiveInput)}"`,
            );
        }
    }
};
