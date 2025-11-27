import { ItemBuilderResult } from "../../item-builder/types/ItemBuilder.js";
import { ApiCreateSingleItem_Data } from "../../use-cases/internal/create-single-item.js";
import { KindKey, MaybeArray } from "@cnbn/schema";
import { KindFromPayload, ResultOfMaybeArray } from "../types.js";
export interface ApiCreateItems_Fn {
    <P extends MaybeArray<ApiCreateSingleItem_Data<KindKey>["payload"]>>(payload: P): ResultOfMaybeArray<P, ItemBuilderResult<KindFromPayload<P>>>;
}
export declare const createItemsUC: import("../../api/index.js").ApiConfigFactory<import("../../api/index.js").ApiToken<ApiCreateItems_Fn, "public">>;
//# sourceMappingURL=CreateItems.d.ts.map