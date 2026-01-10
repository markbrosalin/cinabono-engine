import { ItemBuildResult, RemapState } from "@gately/domain-model/shared/item-builder";
import { Item } from "@repo/schema";

export const createRemapState = (): RemapState => {
    return {
        itemIdMap: new Map(),
        connIdMap: new Map(),
    };
};

export const initialResult = (partial: Partial<ItemBuildResult> = {}): ItemBuildResult => {
    return {
        items: partial.items ?? [],
        scopes: partial.scopes ?? [],
        links: partial.links ?? [],
        readyPins: partial.readyPins ?? [],
    };
};

export const mergeResults = (target: ItemBuildResult, source: ItemBuildResult): void => {
    target.items.push(...source.items);
    target.scopes.push(...source.scopes);
    target.links.push(...source.links);
    target.readyPins.push(...source.readyPins);
};

export const getBuiltItem = (data: ItemBuildResult["items"]): Item => data[0];
