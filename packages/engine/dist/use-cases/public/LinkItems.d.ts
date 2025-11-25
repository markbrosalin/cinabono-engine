import { ApiLinkSingleItem_Payload, ApiLinkSingleItem_Result } from "../../use-cases/internal/link-single-item";
import { MaybeArray } from "@cnbn/schema";
import { ResultOfMaybeArray } from "../types";
export interface ApiLinkItems_Fn {
    <P extends MaybeArray<ApiLinkSingleItem_Payload>>(payload: P): ResultOfMaybeArray<P, ApiLinkSingleItem_Result>;
}
export declare const linkItemsUC: import("../../api").ApiConfigFactory<import("../../api").ApiToken<ApiLinkItems_Fn, "public">>;
//# sourceMappingURL=LinkItems.d.ts.map