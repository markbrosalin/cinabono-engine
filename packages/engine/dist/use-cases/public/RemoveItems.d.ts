import { ApiRemoveSingleItem_Payload, ApiRemoveSingleItem_Result } from "../../use-cases/internal/remove-single-item";
import { MaybeArray } from "@cnbn/schema";
import { ResultOfMaybeArray } from "../types";
export interface ApiRemoveItems_Fn {
    <P extends MaybeArray<ApiRemoveSingleItem_Payload>>(payload: P): ResultOfMaybeArray<P, ApiRemoveSingleItem_Result>;
}
export declare const removeItemsUC: import("../..").ApiConfigFactory<import("../..").ApiToken<ApiRemoveItems_Fn, "public">>;
//# sourceMappingURL=RemoveItems.d.ts.map