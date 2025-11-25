import { ItemBuilderResult } from "../../item-builder/types/ItemBuilder";
import { ItemArgsOfKind, KindKey, PartialExcept } from "@cnbn/schema";
export type ApiCreateSingleItem_Payload<K extends KindKey> = PartialExcept<ItemArgsOfKind<K>, "path" | "hash"> & {
    kind: K;
};
export type ApiCreateSingleItem_Result = ItemBuilderResult;
export interface ApiCreateSingleItem_Fn {
    <K extends KindKey>(payload: ApiCreateSingleItem_Payload<K>): ItemBuilderResult;
}
export declare const _createSingleItemUC: import("../../api").ApiConfigFactory<import("../../api").ApiToken<ApiCreateSingleItem_Fn, "internal">>;
//# sourceMappingURL=CreateSingleItem.d.ts.map