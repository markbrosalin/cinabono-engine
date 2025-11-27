import { Id, ItemOfKind } from "@cnbn/schema";
export interface ApiRemoveSingleItem_Fn {
    (payload: ApiRemoveSingleItem_Payload): ApiRemoveSingleItem_Result;
}
export type ApiRemoveSingleItem_Payload = {
    tabId: Id;
    itemId: Id;
};
export type ApiRemoveSingleItem_Result = {
    removedItem: ItemOfKind | undefined;
    tabId: Id;
};
export declare const _removeSingleItemUC: import("../../api/index.js").ApiConfigFactory<import("../../api/index.js").ApiToken<ApiRemoveSingleItem_Fn, "internal">>;
//# sourceMappingURL=remove-single-item.d.ts.map