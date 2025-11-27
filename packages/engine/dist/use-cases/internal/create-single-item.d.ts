import { ItemBuilderResult } from "../../item-builder/types/ItemBuilder.js";
import { ItemArgsOfKind, KindKey, PartialExcept } from "@cnbn/schema";
export type ApiCreateSingleItem_Fn = {
    <K extends KindKey>(payload: ApiCreateSingleItem_Data<K>["payload"]): ApiCreateSingleItem_Data<K>["result"];
};
export interface ApiCreateSingleItem_Data<K extends KindKey> {
    payload: PartialExcept<ItemArgsOfKind<K>, "path" | "hash"> & {
        kind: K;
    };
    result: ItemBuilderResult<K>;
}
export declare const _createSingleItemUC: import("../../api/index.js").ApiConfigFactory<import("../../api/index.js").ApiToken<ApiCreateSingleItem_Fn, "internal">>;
//# sourceMappingURL=create-single-item.d.ts.map