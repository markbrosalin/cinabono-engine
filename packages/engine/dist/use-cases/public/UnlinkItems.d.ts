import { ApiUnlinkSingleItem_Payload, ApiUnlinkSingleItem_Result } from "../../use-cases/internal/unlink-single-item.js";
import { MaybeArray } from "@cnbn/schema";
import { ResultOfMaybeArray } from "../types.js";
export interface ApiUnlinkItems_Fn {
    <P extends MaybeArray<ApiUnlinkSingleItem_Payload>>(payload: P): ResultOfMaybeArray<P, ApiUnlinkSingleItem_Result>;
}
export declare const unlinkItemsUC: import("../../api/index.js").ApiConfigFactory<import("../../api/index.js").ApiToken<ApiUnlinkItems_Fn, "public">>;
//# sourceMappingURL=UnlinkItems.d.ts.map