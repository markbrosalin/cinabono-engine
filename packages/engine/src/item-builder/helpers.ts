import { ItemOfKind } from "@cnbn/schema";
import { ItemBuilderResult } from "./types/ItemBuilder";
import { StructureBuilderResult } from "./types/StructureBuilder";

export const getBuiltItem = (data: { items: ItemOfKind[] }): ItemOfKind => data.items[0];

export const exportBuilderResult = (res: StructureBuilderResult): ItemBuilderResult => {
    return {
        items: res.items,
        scopes: res.scopes,
        linkIds: Array.from(res.linkIds),
        builtItem: getBuiltItem(res),
    };
};
