import { ApiLinkSingleItem_Payload, ApiLinkSingleItem_Result } from "../../use-cases/internal/link-single-item.js";
import { MaybeArray } from "@cnbn/schema";
import { ResultOfMaybeArray } from "../types.js";
export interface ApiLinkItems_Fn {
    <P extends MaybeArray<ApiLinkSingleItem_Payload>>(payload: P): ResultOfMaybeArray<P, ApiLinkSingleItem_Result>;
}
export declare const linkItemsUC: import("../../api/index.js").ApiConfigFactory<import("../../api/index.js").ApiToken<ApiLinkItems_Fn, "public">>;
//# sourceMappingURL=LinkItems.d.ts.map