import { Id, ItemLink } from "@cnbn/schema";
import { SimInputEvent } from "@cnbn/simulation";
export interface ApiUnlinkSingleItem_Fn {
    (payload: ApiUnlinkSingleItem_Payload): ApiUnlinkSingleItem_Result;
}
export type ApiUnlinkSingleItem_Payload = {
    tabId: Id;
    linkId: Id;
};
export type ApiUnlinkSingleItem_Result = {
    removedLink: ItemLink | undefined;
    inputEvents: SimInputEvent[];
};
export declare const _unlinkSingleItemUC: import("../../api").ApiConfigFactory<import("../../api").ApiToken<ApiUnlinkSingleItem_Fn, "internal">>;
//# sourceMappingURL=UnlinkSingleItem.d.ts.map