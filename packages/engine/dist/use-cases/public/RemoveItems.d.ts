import { ApiRemoveSingleItem_Payload, ApiRemoveSingleItem_Result } from "../../use-cases/internal/remove-single-item.js";
import { MaybeArray } from "@cnbn/schema";
import { ResultOfMaybeArray } from "../types.js";
export interface ApiRemoveItems_Fn {
    <P extends MaybeArray<ApiRemoveSingleItem_Payload>>(payload: P): ResultOfMaybeArray<P, ApiRemoveSingleItem_Result>;
}
export declare const removeItemsUC: import("../../index.js").ApiConfigFactory<import("../../index.js").ApiToken<ApiRemoveItems_Fn, "public">>;
//# sourceMappingURL=RemoveItems.d.ts.map