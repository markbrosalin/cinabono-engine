import { ItemBuilderResult } from "../../item-builder/types/ItemBuilder";
import { ApiCreateSingleItem_Data } from "../../use-cases/internal/create-single-item";
import { KindKey, MaybeArray } from "@cnbn/schema";
import { KindFromPayload, ResultOfMaybeArray } from "../types";
export interface ApiCreateItems_Fn {
    <P extends MaybeArray<ApiCreateSingleItem_Data<KindKey>["payload"]>>(payload: P): ResultOfMaybeArray<P, ItemBuilderResult<KindFromPayload<P>>>;
}
export declare const createItemsUC: import("../../api").ApiConfigFactory<import("../../api").ApiToken<ApiCreateItems_Fn, "public">>;
//# sourceMappingURL=CreateItems.d.ts.map