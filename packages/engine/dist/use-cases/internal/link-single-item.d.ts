import { Id, ItemLink } from "@cnbn/schema";
import { SimInputEvent } from "@cnbn/simulation";
export type ApiLinkSingleItem_Payload = {
    link: ItemLink;
    tabId: Id;
};
export type ApiLinkSingleItem_Result = {
    linkId: Id;
    tabId: Id;
    inputEvents: SimInputEvent[];
};
export interface ApiLinkSingleItem_Fn {
    (payload: ApiLinkSingleItem_Payload): ApiLinkSingleItem_Result;
}
export declare const _linkSingleItemUC: import("../../api").ApiConfigFactory<import("../../api").ApiToken<ApiLinkSingleItem_Fn, "internal">>;
//# sourceMappingURL=link-single-item.d.ts.map